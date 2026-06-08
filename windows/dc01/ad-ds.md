# AD DS Setup

Install role:

```powershell
Install-WindowsFeature AD-Domain-Services -IncludeManagementTools
```

Promote:

```powershell
Install-ADDSForest -DomainName "corp.local"
```

Verify:

```powershell
Get-WindowsFeature AD-Domain-Services
```
