# Sysmon on DC01

Install:

```powershell
Sysmon64.exe -accepteula -i sysmonconfig.xml
```

Verify:

```powershell
Get-Service Sysmon64
```

Evidence:

```text
windows/dc01/screenshots/dc01-sysmon-events.png
```
