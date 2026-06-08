# Incident 04 — Windows Authentication Abuse Detection

**Incident ID:** SOC-IR-004  
**Classification:** Authentication Abuse / Failed Logon Activity  
**Severity:** High  
**MITRE ATT&CK:** T1110 — Brute Force  
**Analyst:** Vincent Takwi  
**Lab Environment:** Enterprise SOC Lab  
**Date:** [Insert Date]

---

# Executive Summary

A controlled Windows authentication abuse simulation was performed against the domain-connected Windows 11 workstation (**Win11Client - 192.168.117.100**) within the Enterprise SOC Lab.

The exercise simulated repeated failed authentication attempts to validate:

- Windows event telemetry
- Active Directory visibility
- Wazuh SIEM detections
- Security Onion network observations
- cross-platform investigation workflows
- enterprise log correlation

The attack activity successfully generated Windows Security Event ID 4625 events and corresponding SIEM detections.

The environment demonstrated effective enterprise-grade authentication monitoring visibility.

---

# Incident Scope

## Attacker

| Asset | Value |
|------|------|
| Hostname | Kali |
| IP Address | 192.168.117.129 |
| Role | Red Team Simulation Node |

---

## Target

| Asset | Value |
|------|------|
| Hostname | Win11Client |
| IP Address | 192.168.117.100 |
| Domain | corp.local |
| Role | Domain Workstation |

---

## Supporting Infrastructure

| Asset | Function |
|------|----------|
| DC01 | Domain Controller |
| Wazuh | SIEM |
| Security Onion | NDR |
| Grafana | Visualization |
| Prometheus | Metrics |
| Nagios | Availability |

---

# Attack Objective

Validate enterprise visibility into:

- failed Windows authentication
- suspicious logon behavior
- domain telemetry
- authentication event collection
- lateral movement precursors
- attacker attribution

---

# Attack Preparation

Windows authentication abuse commonly precedes:

- credential stuffing
- brute-force attacks
- privilege escalation
- lateral movement
- persistence attempts

This simulation reproduces realistic authentication attack behavior.

---

# Attack Execution

## Failed Windows Logons

On Win11Client:

```powershell
runas /user:corp\fakeuser cmd
```

Incorrect credentials were intentionally entered multiple times.

Additional simulation:

```powershell
runas /user:corp\administrator cmd
```

Invalid passwords repeatedly submitted.

---

# Expected Windows Events

Expected Security Event IDs:

| Event ID | Description |
|---------|-------------|
| 4625 | Failed logon |
| 4624 | Successful logon (if applicable) |
| 4648 | Explicit credential use |
| 4768 | Kerberos authentication request |

---

# Timeline

| Time | Event |
|------|------|
| 19:00 | Failed authentication attempts initiated |
| 19:01 | Win11 generates Event ID 4625 |
| 19:02 | Wazuh collects telemetry |
| 19:02 | Security Onion observes network activity |
| 19:03 | Analyst triage begins |
| 19:05 | Cross-tool investigation completed |

---

# Evidence Collection

---

## 1. Windows Security Events

Event Viewer path:

```text
Windows Logs → Security
```

Observed:

```text
Event ID: 4625
An account failed to log on.
```

Relevant fields:

| Field | Value |
|------|------|
| Account Name | fakeuser |
| Source IP | 192.168.117.129 |
| Logon Type | 3 |
| Failure Reason | Unknown username or bad password |

Evidence:

```text
detections/wazuh/screenshots/wazuh-windows-events.png
detections/wazuh/screenshots/wazuh-windows-bruteforce.png
```

Assessment:

Windows telemetry successfully recorded authentication abuse attempts.

---

## 2. Wazuh Detection

Wazuh collected and correlated Windows authentication telemetry.

Dashboard search:

```text
4625
```

Additional search:

```text
agent.name:win11client
```

Observed:

- repeated failed logons
- authentication anomalies
- Windows security telemetry

Evidence:

```text
detections/wazuh/screenshots/wazuh-windows-events.png
detections/wazuh/screenshots/wazuh-custom-bruteforce.png
```

Assessment:

SIEM visibility successfully captured authentication abuse.

---

## 3. Security Onion Network Visibility

Security Onion observed related network authentication traffic.

Queries:

```text
source.ip:192.168.117.129
```

and:

```text
smb
kerberos
```

Evidence:

```text
screenshots/security-onion/windows-auth-alerts.png
```

Assessment:

Network monitoring provided supporting evidence.

---

## 4. Domain Controller Telemetry

DC01 recorded domain-related authentication activity.

Observed:

- failed logons
- authentication attempts
- Kerberos requests

Relevant logs:

```text
Security Logs
```

Evidence:

```text
detections/wazuh/screenshots/wazuh-dc01-telemetry.png
```

Assessment:

Domain infrastructure visibility confirmed enterprise authentication monitoring coverage.

---

## 5. Prometheus Metrics

Infrastructure remained healthy during simulation.

Query:

```text
up
```

Evidence:

```text
monitoring/prometheus/screenshots/prometheus-ui.png
```

Assessment:

No system degradation observed.

---

## 6. Grafana Dashboards

Grafana visualized host operational state.

Observed:

- CPU
- memory
- uptime
- host availability

Evidence:

```text
monitoring/grafana/screenshots/grafana-ui.png
```

Assessment:

Visualization improved investigation context.

---

## 7. Nagios Availability Monitoring

Nagios confirmed:

- DC01 UP
- Win11 UP
- Wazuh UP

Evidence:

```text
monitoring/nagios/screenshots/nagios-ui.png
```

Assessment:

Authentication abuse caused no service interruption.

---

# Correlation Analysis

Evidence chain:

```text
Authentication abuse initiated
           ↓
Windows Event ID 4625 generated
           ↓
DC01 records domain authentication telemetry
           ↓
Wazuh SIEM ingests endpoint logs
           ↓
Security Onion observes authentication traffic
           ↓
Prometheus confirms system stability
           ↓
Grafana visualizes infrastructure context
           ↓
Analyst reconstructs attack timeline
```

Evidence:

```text
detections/correlation/screenshots/windows-auth-correlation.png
detections/correlation/screenshots/multi-tool-evidence.png
detections/correlation/gifs/cross-tool-correlation.gif
```

---

# Root Cause

Intentional internal authentication abuse simulation.

No unauthorized compromise occurred.

Purpose:

Detection validation and analyst training.

---

# Impact Assessment

## Confidentiality

No breach.

---

## Integrity

No modification.

---

## Availability

No service interruption.

---

## Detection Capability

Strong.

---

# Threat Analysis

Authentication abuse is frequently associated with:

- brute-force attacks
- password spraying
- credential stuffing
- privilege escalation
- lateral movement preparation

Rapid visibility into failed logons is critical for enterprise defense.

---

# Analyst Findings

Findings:

- Windows telemetry successfully captured failed logons
- Event ID 4625 visibility operational
- Wazuh ingestion functioning correctly
- domain controller visibility confirmed
- Security Onion provided supporting network evidence
- cross-tool correlation successful

---

# Recommendations

Improve authentication security posture:

- implement MFA
- enforce account lockout policies
- restrict administrative exposure
- alert on excessive failed logons
- baseline authentication behavior
- enrich authentication alerts with threat intelligence

---

# Conclusion

The Enterprise SOC Lab successfully validated Windows authentication abuse monitoring workflows.

The environment demonstrated:

- enterprise authentication telemetry
- SIEM correlation capability
- Active Directory visibility
- Windows event monitoring
- network detection support
- analyst investigation workflow maturity

---

# Related Artifacts

Windows:

```text
windows/win11client/
windows/dc01/
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
site/media/gifs/windows-auth-demo.gif
```

---