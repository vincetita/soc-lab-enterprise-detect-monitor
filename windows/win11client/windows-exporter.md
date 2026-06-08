# Windows Exporter

Install:

```powershell
msiexec /i windows_exporter.msi ENABLED_COLLECTORS=cpu,logical_disk,net,os,service,system
```

Verify:

```text
http://localhost:9182/metrics
```

Prometheus target:

```text
192.168.117.100:9182
```
