# ============================================================
# SOC LAB FULL RESTART AUTOMATION - SAFE V3
# VMware Workstation + Non-Blocking Stop + Health Checks
# ============================================================

$ErrorActionPreference = "Continue"

# ---------- CONFIG ----------
$vmrun = "C:\Program Files (x86)\VMware\VMware Workstation\vmrun.exe"

$VMs = @{
    SecOnion = "C:\Users\vincetita\Documents\Virtual Machines\SecOnion\SecOnion.vmx"
    Wazuh    = "C:\Users\vincetita\Documents\Virtual Machines\Wazuh01\Wazuh01.vmx"
    Ubuntu   = "C:\Users\vincetita\Documents\Virtual Machines\Ubuntu\Ubuntu.vmx"
    DC01     = "C:\Users\vincetita\Documents\Virtual Machines\Windows Server 2025\Windows Server 2025.vmx"
    Win11    = "C:\Users\vincetita\Documents\Virtual Machines\win11client\win11client.vmx"
    Kali     = "C:\Users\vincetita\Downloads\SO\kali-linux-2025.4-vmware-amd64.vmwarevm\kali-linux-2025.4-vmware-amd64.vmx"
}

$StopOrder  = @("Kali", "Win11", "DC01", "Ubuntu", "Wazuh", "SecOnion")
$StartOrder = @("SecOnion", "Wazuh", "Ubuntu", "DC01", "Win11", "Kali")

$IPs = @{
    SecOnion = "192.168.117.10"
    Wazuh    = "192.168.117.50"
    Ubuntu   = "192.168.117.30"
    DC01     = "192.168.117.130"
    Win11    = "192.168.117.100"
    Kali     = "192.168.117.129"
}

$BootWait = @{
    SecOnion = 300
    Wazuh    = 300
    Ubuntu   = 90
    DC01     = 180
    Win11    = 120
    Kali     = 45
}

$StopTimeout = @{
    Kali     = 45
    Win11    = 45
    DC01     = 90
    Ubuntu   = 60
    Wazuh    = 90
    SecOnion = 120
}

$ServicePorts = @{
    "Security Onion HTTPS" = @{ IP = "192.168.117.10"; Port = 443 }
    "Wazuh Dashboard"     = @{ IP = "192.168.117.50"; Port = 443 }
    "Nagios HTTP"         = @{ IP = "192.168.117.30"; Port = 80 }
    "Prometheus"          = @{ IP = "192.168.117.30"; Port = 9090 }
    "Grafana"             = @{ IP = "192.168.117.30"; Port = 3000 }
}

$MinimumFreeGB = 60

# ---------- FUNCTIONS ----------

function Write-Section {
    param([string]$Text)

    Write-Host ""
    Write-Host "============================================================" -ForegroundColor DarkCyan
    Write-Host " $Text" -ForegroundColor Cyan
    Write-Host "============================================================" -ForegroundColor DarkCyan
}

function Test-FreeDisk {
    $drive = Get-PSDrive C
    $freeGB = [math]::Round($drive.Free / 1GB, 2)

    Write-Host "C: free space: $freeGB GB" -ForegroundColor Yellow

    if ($freeGB -lt $MinimumFreeGB) {
        Write-Host ""
        Write-Host "WARNING: Low disk space detected." -ForegroundColor Red
        Write-Host "Recommended minimum before restarting SOC lab: $MinimumFreeGB GB free." -ForegroundColor Red
        Write-Host "Current free space: $freeGB GB" -ForegroundColor Red
        Write-Host ""

        $answer = Read-Host "Continue anyway? Type YES to continue"

        if ($answer -ne "YES") {
            Write-Host "Aborted for safety." -ForegroundColor Red
            exit
        }
    }
}

function Test-Requirements {
    Write-Section "Pre-flight Checks"

    if (!(Test-Path $vmrun)) {
        Write-Host "vmrun.exe not found at:" -ForegroundColor Red
        Write-Host $vmrun -ForegroundColor Red
        exit
    }

    Write-Host "vmrun found." -ForegroundColor Green

    foreach ($vm in $VMs.Keys) {
        if (Test-Path $VMs[$vm]) {
            Write-Host "VMX OK: $vm" -ForegroundColor Green
        }
        else {
            Write-Host "VMX MISSING: $vm -> $($VMs[$vm])" -ForegroundColor Red
        }
    }

    Test-FreeDisk
}

function Get-RunningVMs {
    $output = & $vmrun list
    return $output
}

function Test-VMRunning {
    param([string]$Name)

    $running = Get-RunningVMs
    return ($running -contains $VMs[$Name])
}

function Stop-VM-Safe {
    param([string]$Name)

    if (!(Test-Path $VMs[$Name])) {
        Write-Host "Skipping $Name. VMX not found." -ForegroundColor Red
        return
    }

    if (!(Test-VMRunning $Name)) {
        Write-Host "$Name already powered off." -ForegroundColor Green
        return
    }

    Write-Host "Stopping $Name softly..." -ForegroundColor Yellow

    $timeout = $StopTimeout[$Name]

    $job = Start-Job -ScriptBlock {
        param($vmrunPath, $vmxPath)
        & $vmrunPath stop $vmxPath soft
    } -ArgumentList $vmrun, $VMs[$Name]

    Wait-Job $job -Timeout $timeout | Out-Null

    if ($job.State -eq "Running") {
        Write-Host "$Name soft stop did not return within $timeout seconds." -ForegroundColor Yellow
    }

    Remove-Job $job -Force -ErrorAction SilentlyContinue

    Start-Sleep -Seconds 5

    if (Test-VMRunning $Name) {
        Write-Host "$Name still running -> forcing hard stop..." -ForegroundColor Red
        & $vmrun stop $VMs[$Name] hard | Out-Null
        Start-Sleep -Seconds 10
    }

    if (Test-VMRunning $Name) {
        Write-Host "$Name failed to stop. Manual check required." -ForegroundColor Red
    }
    else {
        Write-Host "$Name stopped." -ForegroundColor Green
    }
}

function Start-VM-Safe {
    param([string]$Name)

    if (!(Test-Path $VMs[$Name])) {
        Write-Host "Skipping $Name. VMX not found." -ForegroundColor Red
        return
    }

    if (Test-VMRunning $Name) {
        Write-Host "$Name already running." -ForegroundColor Yellow
    }
    else {
        Write-Host "Starting $Name..." -ForegroundColor Green
        & $vmrun start $VMs[$Name] nogui | Out-Null
    }

    $wait = $BootWait[$Name]
    Write-Host "Waiting $wait seconds for $Name boot/services..." -ForegroundColor Yellow
    Start-Sleep -Seconds $wait
}

function Test-PingHost {
    param(
        [string]$Name,
        [string]$IP
    )

    Write-Host "Ping check: $Name ($IP)" -ForegroundColor Cyan

    $ok = Test-Connection -ComputerName $IP -Count 2 -Quiet -ErrorAction SilentlyContinue

    if ($ok) {
        Write-Host "$Name reachable." -ForegroundColor Green
    }
    else {
        Write-Host "$Name NOT reachable." -ForegroundColor Red
    }
}

function Test-Port {
    param(
        [string]$Name,
        [string]$IP,
        [int]$Port
    )

    Write-Host "Service check: $Name $IP`:$Port" -ForegroundColor Cyan

    $result = Test-NetConnection -ComputerName $IP -Port $Port -InformationLevel Quiet

    if ($result) {
        Write-Host "$Name is listening." -ForegroundColor Green
    }
    else {
        Write-Host "$Name is NOT listening." -ForegroundColor Red
    }
}

# ---------- MAIN ----------

Write-Section "SOC LAB FULL RESTART - SAFE V3"

Test-Requirements

Write-Section "Stopping VMs in Safe Order"

foreach ($vm in $StopOrder) {
    Stop-VM-Safe $vm
}

Write-Host ""
Write-Host "Cooling down for 30 seconds..." -ForegroundColor Yellow
Start-Sleep -Seconds 30

Write-Section "Starting VMs in Dependency Order"

foreach ($vm in $StartOrder) {
    Start-VM-Safe $vm
}

Write-Section "Host Ping Health Checks"

foreach ($entry in $IPs.GetEnumerator()) {
    Test-PingHost -Name $entry.Key -IP $entry.Value
}

Write-Section "Service Port Health Checks"

foreach ($svc in $ServicePorts.Keys) {
    Test-Port -Name $svc -IP $ServicePorts[$svc].IP -Port $ServicePorts[$svc].Port
}

Write-Section "SOC Web UI Checklist"

Write-Host "Security Onion: https://192.168.117.10"
Write-Host "Wazuh:          https://192.168.117.50"
Write-Host "Nagios:         http://192.168.117.30/nagios"
Write-Host "Prometheus:     http://192.168.117.30:9090"
Write-Host "Grafana:        http://192.168.117.30:3000"

Write-Host ""
Write-Host "SOC LAB SAFE RESTART V3 COMPLETE." -ForegroundColor Green