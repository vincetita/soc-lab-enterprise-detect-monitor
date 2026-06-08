# Incident 05 — Kerberos Authentication Monitoring

**Incident ID:** SOC-IR-005  
**Classification:** Kerberos Authentication Activity Monitoring  
**Severity:** High  
**MITRE ATT&CK:** T1558 — Steal or Forge Kerberos Tickets  
**Analyst:** Vincent Takwi  
**Lab Environment:** Enterprise SOC Lab  
**Date:** [Insert Date]

---

# Executive Summary

A controlled Kerberos authentication simulation was executed within the Enterprise SOC Lab to validate Active Directory authentication visibility, Windows event telemetry, SIEM ingestion, network monitoring, and cross-platform detection workflows.

The simulation involved forcing Kerberos ticket renewal and domain resource access between the Windows 11 domain workstation (**Win11Client - 192.168.117.100**) and the Domain Controller (**DC01 - 192.168.117.130**).

The exercise successfully generated Kerberos authentication events including Event ID 4768 and corresponding telemetry across:

- Windows Security Logs
- Wazuh SIEM
- Security Onion NDR
- Active Directory infrastructure
- Prometheus metrics
- Grafana dashboards

This validates enterprise identity monitoring and Kerberos authentication visibility.

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

## Authentication Target

| Asset | Value |
|------|------|
| Hostname | DC01 |
| IP Address | 192.168.117.130 |
| Service | Active Directory Domain Services |
| Protocol | Kerberos |

---

## Monitoring Platforms

| Platform | Role |
|---------|------|
| Wazuh | SIEM |
| Security Onion | Network Detection |
| DC01 | Domain Authentication |
| Prometheus | Metrics |
| Grafana | Visualization |
| Nagios | Availability |

---

# Attack Objective

Validate SOC visibility into:

- Kerberos authentication requests
- ticket granting behavior
- Active Directory telemetry
- Windows authentication events
- domain communication monitoring
- identity-related detection workflows

---

# Kerberos Overview

Kerberos is the primary authentication protocol used in Active Directory environments.

Attackers frequently abuse Kerberos during:

- credential theft
- pass-the-ticket attacks
- Golden Ticket attacks
- Silver Ticket attacks
- lateral movement
- privilege escalation

Monitoring Kerberos authentication is critical for enterprise detection engineering.

---

# Simulation Execution

## Step 1 — Purge Existing Kerberos Tickets

Executed on Win11Client.

Command:

```powershell
klist purge
```

Purpose:

- remove cached Kerberos tickets
- force new authentication request generation

---

## Step 2 — Trigger Domain Authentication

Command:

```powershell
dir \\dc01\c$
```

Purpose:

- force Kerberos ticket request
- generate authentication telemetry
- create domain access activity

---

# Expected Events

## Windows Security Events

| Event ID | Description |
|---------|-------------|
| 4768 | Kerberos Authentication Ticket Requested |
| 4769 | Kerberos Service Ticket Requested |
| 4624 | Successful Logon |
| 4648 | Explicit Credential Use |

---

# Timeline

| Time | Event |
|------|------|
| 18:00 | Existing Kerberos tickets purged |
| 18:01 | Win11 requests new Kerberos ticket |
| 18:01 | DC01 processes authentication |
| 18:02 | Wazuh ingests Kerberos telemetry |
| 18:02 | Security Onion observes Kerberos traffic |
| 18:03 | Analyst investigation begins |
| 18:05 | Cross-platform correlation completed |

---

# Evidence Collection

---

## 1. Win11 Kerberos Activity

Commands executed:

```powershell
klist purge
dir \\dc01\c$
```

Evidence:

```text
windows/win11client/screenshots/klist-purge.png
windows/win11client/screenshots/domain-resource-access.png
```

Assessment:

Authentication successfully triggered.

---

## 2. Domain Controller Security Logs

DC01 recorded Kerberos ticket activity.

Observed Event ID:

```text
4768
```

Description:

```text
A Kerberos authentication ticket (TGT) was requested.
```

Key fields:

| Field | Example |
|------|---------|
| Account Name | corp\user |
| Client Address | 192.168.117.100 |
| Service Name | krbtgt |
| Ticket Encryption | AES256 |

Evidence:

```text
detections/wazuh/screenshots/wazuh-kerberos-alerts.png
windows/dc01/screenshots/dc01-security-log-4768.png
```

Assessment:

Active Directory telemetry successfully captured authentication behavior.

---

## 3. Wazuh Detection

Wazuh ingested Windows authentication telemetry.

Dashboard queries:

```text
4768
```

and:

```text
agent.name:dc01
```

Observed:

- Kerberos ticket requests
- authentication activity
- Windows security telemetry

Evidence:

```text
detections/wazuh/screenshots/wazuh-kerberos-alerts.png
detections/wazuh/screenshots/wazuh-dc01-telemetry.png
```

Assessment:

SIEM ingestion functioning correctly.

---

## 4. Security Onion Detection

Security Onion observed Kerberos network communication.

Queries:

```text
kerberos
```

and:

```text
source.ip:192.168.117.100
```

Observed:

- Kerberos traffic
- authentication exchanges
- domain communication

Evidence:

```text
screenshots/security-onion/kerberos-traffic.png
```

Assessment:

Network detection validated identity communication visibility.

---

## 5. Prometheus Metrics

Infrastructure metrics remained stable.

Query:

```text
up
```

Evidence:

```text
monitoring/prometheus/screenshots/prometheus-ui.png
```

Assessment:

Authentication simulation caused no operational degradation.

---

## 6. Grafana Dashboards

Grafana visualized:

- domain controller uptime
- Windows host availability
- infrastructure health
- authentication environment stability

Evidence:

```text
monitoring/grafana/screenshots/grafana-ui.png
```

Assessment:

Observability stack functioning correctly.

---

## 7. Nagios Availability Monitoring

Nagios confirmed:

- DC01 UP
- Win11Client UP
- Wazuh UP

Evidence:

```text
monitoring/nagios/screenshots/nagios-ui.png
```

Assessment:

Identity infrastructure remained healthy.

---

# Correlation Analysis

Evidence chain:

```text
Win11 purges Kerberos tickets
            ↓
Win11 requests new authentication ticket
            ↓
DC01 generates Event ID 4768
            ↓
Wazuh ingests authentication telemetry
            ↓
Security Onion observes Kerberos traffic
            ↓
Prometheus confirms infrastructure stability
            ↓
Grafana visualizes operational health
            ↓
Analyst reconstructs authentication timeline
```

Evidence:

```text
detections/correlation/screenshots/kerberos-correlation.png
detections/correlation/gifs/kerberos-correlation.gif
detections/correlation/screenshots/multi-tool-evidence.png
```

---

# Root Cause

Intentional internal Kerberos authentication simulation.

No unauthorized access occurred.

Purpose:

Identity monitoring validation.

---

# Impact Assessment

## Confidentiality

No compromise.

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

Kerberos abuse is frequently associated with:

- Golden Ticket attacks
- Silver Ticket attacks
- credential theft
- pass-the-ticket attacks
- lateral movement
- Active Directory compromise

Visibility into Kerberos telemetry is critical for enterprise SOC operations.

---

# Analyst Findings

Findings:

- Kerberos authentication events successfully generated
- Active Directory visibility operational
- Wazuh ingestion functioning correctly
- Security Onion observed identity traffic
- domain authentication telemetry validated
- cross-platform correlation successful

---

# Recommendations

Strengthen identity security posture:

- monitor anomalous Kerberos activity
- baseline authentication behavior
- alert on unusual ticket requests
- monitor privileged accounts
- implement AD hardening
- deploy enhanced identity analytics

---

# Conclusion

The Enterprise SOC Lab successfully validated Kerberos authentication monitoring workflows.

The environment demonstrated:

- Active Directory telemetry visibility
- enterprise authentication monitoring
- SIEM correlation capability
- network identity traffic detection
- observability integration
- realistic identity-focused SOC investigation workflows

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
site/media/gifs/kerberos-demo.gif
```

---