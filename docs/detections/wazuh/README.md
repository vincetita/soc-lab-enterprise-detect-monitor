# Wazuh SIEM and Detection Engineering

## Role

Wazuh is the SIEM and endpoint detection platform.

It collects:

- Ubuntu auth logs
- Apache logs
- Windows Event Logs
- Sysmon logs
- DC01 authentication events

## Access

```text
https://192.168.117.50
```

## Service Commands

```bash
sudo systemctl status wazuh-manager
sudo systemctl restart wazuh-manager
```

Windows agent:

```powershell
Get-Service WazuhSvc
```

Linux agent:

```bash
sudo systemctl status wazuh-agent
```

## Detection Scenarios

| Scenario | Evidence |
|---|---|
| SSH brute force | auth.log, Wazuh alert |
| Nmap recon | Security Onion + Wazuh |
| Web enumeration | Apache logs |
| Windows failed logon | Event ID 4625 |
| Kerberos | Event IDs 4768/4769/4771 |
| Lateral movement | WinRM / SMB / PowerShell |

## Evidence

```text
detections/wazuh/screenshots/
detections/wazuh/gifs/
```
