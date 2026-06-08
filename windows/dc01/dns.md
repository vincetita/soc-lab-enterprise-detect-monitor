# DNS on DC01

Verify DNS:

```powershell
Get-Service DNS
nslookup dc01
nslookup corp.local
```

Expected:

```text
192.168.117.130
```
