# Incident 06 — Lateral Movement Simulation

**Incident ID:** SOC-IR-006  
**Classification:** Lateral Movement Activity  
**Severity:** Critical  
**MITRE ATT&CK:** T1021 — Remote Services  
**Analyst:** Vincent Takwi  
**Lab Environment:** Enterprise SOC Lab  
**Date:** [Insert Date]

---

# Executive Summary

A controlled lateral movement simulation was executed within the Enterprise SOC Lab to validate enterprise visibility into SMB-based remote access activity between domain-connected systems.

The simulation involved a Windows 11 workstation (**Win11Client - 192.168.117.100**) attempting authenticated remote administrative access to the Domain Controller (**DC01 - 192.168.117.130**) using SMB administrative shares.

The exercise successfully generated:

- Windows authentication telemetry
- SMB traffic visibility
- Active Directory authentication events
- Wazuh SIEM detections
- Security Onion network observations
- cross-platform evidence correlation

This validates enterprise SOC capability to monitor east-west movement inside the network.

---

# Incident Scope

## Source Workstation

| Asset | Value |
|------|------|
| Hostname | Win11Client |
| IP Address | 192.168.117.100 |
| Domain | corp.local |
| Role | Domain Workstation |

---

## Target System

| Asset | Value |
|------|------|
| Hostname | DC01 |
| IP Address | 192.168.117.130 |
| Service | SMB / Administrative Shares |
| Port | 445 |

---

## Monitoring Infrastructure

| Platform | Function |
|---------|----------|
| Wazuh | SIEM |
| Security Onion | Network Detection |
| DC01 | Domain Authentication |
| Prometheus | Metrics |
| Grafana | Visualization |
| Nagios | Availability Monitoring |

---

# Attack Objective

Validate visibility into:

- internal SMB movement
- remote administrative access
- east-west traffic
- Windows authentication telemetry
- domain authentication activity
- lateral movement detection workflows

---

# Threat Context

Lateral movement is commonly used after initial compromise.

Attackers often move laterally to:

- escalate privileges
- access domain controllers
- pivot between hosts
- deploy ransomware
- establish persistence
- exfiltrate data

SMB administrative shares are frequently abused during enterprise attacks.

---

# Simulation Execution

## SMB Administrative Share Access

Executed from Win11Client.

Command:

```powershell
net use \\dc01\c$
```

Purpose:

- simulate authenticated SMB access
- trigger Windows authentication events
- generate lateral movement telemetry

---

## Optional Additional Enumeration

```powershell
dir \\dc01\c$
```

Purpose:

- simulate post-authentication access
- generate SMB file access telemetry

---

# Expected Events

## Windows Security Events

| Event ID | Description |
|---------|-------------|
| 4624 | Successful logon |
| 4625 | Failed logon |
| 4648 | Explicit credentials used |
| 5140 | Shared object accessed |
| 5145 | Detailed SMB share access |
| 4768 | Kerberos ticket requested |

---

# Timeline

| Time | Event |
|------|------|
| 17:00 | SMB access initiated from Win11 |
| 17:01 | DC01 receives authentication request |
| 17:01 | Windows security logs generated |
| 17:02 | Wazuh ingests telemetry |
| 17:02 | Security Onion observes SMB traffic |
| 17:03 | Analyst triage begins |
| 17:05 | Correlation investigation completed |

---

# Evidence Collection

---

## 1. SMB Access Execution

Command:

```powershell
net use \\dc01\c$
```

Optional:

```powershell
dir \\dc01\c$
```

Evidence:

```text
windows/win11client/screenshots/smb-admin-share.png
windows/win11client/screenshots/lateral-movement-command.png
```

Assessment:

Simulated authenticated remote access successfully executed.

---

## 2. Domain Controller Telemetry

DC01 recorded authentication and SMB access events.

Observed Event IDs:

```text
4624
5140
5145
```

Example:

```text
A network share object was accessed.
```

Key indicators:

| Field | Example |
|------|---------|
| Source IP | 192.168.117.100 |
| Share Name | \\*\C$ |
| Account | corp\user |
| Logon Type | 3 |

Evidence:

```text
windows/dc01/screenshots/dc01-smb-events.png
windows/dc01/screenshots/dc01-security-log-4624.png
```

Assessment:

Domain controller visibility successfully captured remote access activity.

---

## 3. Wazuh Detection

Wazuh collected and correlated Windows telemetry.

Dashboard searches:

```text
4624
5140
5145
```

Additional query:

```text
agent.name:dc01
```

Observed:

- SMB access activity
- authentication telemetry
- remote share access

Evidence:

```text
detections/wazuh/screenshots/wazuh-lateral-movement.png
detections/wazuh/screenshots/wazuh-dc01-telemetry.png
detections/wazuh/gifs/wazuh-lateral-movement.gif
```

Assessment:

SIEM visibility into lateral movement operational.

---

## 4. Security Onion Detection

Security Onion observed SMB traffic between internal hosts.

Queries:

```text
smb
```

and:

```text
source.ip:192.168.117.100
```

Observed:

- SMB sessions
- internal east-west traffic
- authentication exchanges

Evidence:

```text
screenshots/security-onion/lateral-movement-alerts.png
```

Assessment:

Network detection successfully captured lateral movement behavior.

---

## 5. Prometheus Metrics

Infrastructure metrics remained stable during simulation.

Query:

```text
up
```

Evidence:

```text
monitoring/prometheus/screenshots/prometheus-ui.png
```

Assessment:

No operational degradation observed.

---

## 6. Grafana Dashboards

Grafana visualized:

- DC01 uptime
- Win11 health
- infrastructure metrics
- operational state

Evidence:

```text
monitoring/grafana/screenshots/grafana-ui.png
```

Assessment:

Visualization improved analyst situational awareness.

---

## 7. Nagios Monitoring

Nagios confirmed:

- DC01 UP
- Win11Client UP
- Wazuh UP

Evidence:

```text
monitoring/nagios/screenshots/nagios-ui.png
```

Assessment:

Lateral movement simulation caused no service interruption.

---

# Correlation Analysis

Evidence chain:

```text
Win11 initiates SMB administrative access
               ↓
DC01 records authentication + share access
               ↓
Wazuh ingests Windows telemetry
               ↓
Security Onion detects SMB traffic
               ↓
Prometheus confirms infrastructure stability
               ↓
Grafana visualizes operational context
               ↓
Analyst reconstructs lateral movement timeline
```

Evidence:

```text
detections/correlation/screenshots/lateral-movement-correlation.png
detections/correlation/gifs/lateral-movement-correlation.gif
detections/correlation/screenshots/multi-tool-evidence.png
```

---

# Root Cause

Intentional internal lateral movement simulation.

No unauthorized compromise occurred.

Purpose:

SOC validation and analyst training.

---

# Impact Assessment

## Confidentiality

No breach.

---

## Integrity

No modification.

---

## Availability

No disruption.

---

## Detection Capability

Strong.

---

# Threat Analysis

Lateral movement is one of the most dangerous post-compromise attacker behaviors.

Common objectives include:

- domain dominance
- ransomware deployment
- credential harvesting
- privilege escalation
- persistence establishment

Visibility into east-west traffic is critical for enterprise SOC operations.

---

# Analyst Findings

Findings:

- SMB access telemetry successfully generated
- Active Directory visibility operational
- Wazuh SIEM ingestion functioning correctly
- Security Onion detected east-west traffic
- Windows event correlation successful
- analyst workflow validated

---

# Recommendations

Strengthen lateral movement defenses:

- restrict SMB administrative shares
- segment internal networks
- monitor privileged account usage
- alert on abnormal SMB behavior
- enforce least privilege
- deploy enhanced identity analytics

---

# Conclusion

The Enterprise SOC Lab successfully validated lateral movement monitoring workflows.

The environment demonstrated:

- enterprise SMB visibility
- Windows authentication telemetry
- SIEM correlation capability
- Active Directory monitoring
- network traffic analysis
- realistic SOC analyst investigation workflows

---

# Related Artifacts

Windows:

```text
windows/dc01/
windows/win11client/
```

Detection:

```text
detections/wazuh/
detections/correlation/
```

Monitoring:

```text
monitoring/nagios/
monitoring/prometheus/
monitoring/grafana/
```

Media:

```text
site/media/gifs/lateral-movement-demo.gif
```

---