# DC01 — Windows Server 2025 Domain Controller

## Role

DC01 provides:

- Active Directory Domain Services
- DNS
- Kerberos
- authentication
- Windows security events
- GPO support

## IP

```text
192.168.117.130
```

## Commands

```powershell
hostname
ipconfig
Get-WindowsFeature AD-Domain-Services
Get-Service DNS
(Get-WmiObject Win32_ComputerSystem).Domain
```

Expected domain:

```text
corp.local
```

## Kerberos Event Commands

```powershell
Get-WinEvent -FilterHashtable @{LogName='Security'; ID=4768} | Select -First 10
Get-WinEvent -FilterHashtable @{LogName='Security'; ID=4769} | Select -First 10
Get-WinEvent -FilterHashtable @{LogName='Security'; ID=4771} | Select -First 10
```

## Evidence

```text
windows/dc01/screenshots/
```
