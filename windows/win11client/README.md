# Win11Client

## Role

Windows 11 domain endpoint.

## IPs

```text
Host-Only: 192.168.117.100
NAT: 192.168.20.133
```

## Validate Domain Join

```powershell
whoami
systeminfo | findstr /B /C:"Domain"
```

Expected:

```text
corp\username
Domain: corp.local
```

## Evidence

```text
windows/win11client/screenshots/win11-domain-join.png
windows/win11client/screenshots/win11-networking.png
```
