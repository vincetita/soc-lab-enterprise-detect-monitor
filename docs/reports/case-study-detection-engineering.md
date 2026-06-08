# Case Study — Detection Engineering in an Enterprise SOC Lab

**Case Study ID:** SOC-CS-001  
**Category:** Detection Engineering  
**Focus:** Custom Wazuh Rules, Sigma Logic, ATT&CK Mapping  
**Analyst / Engineer:** Vincent Takwi  
**Environment:** Enterprise SOC Lab  

---

# Executive Summary

This case study documents the design, implementation, testing, and operational validation of custom detection engineering workflows within the Enterprise SOC Lab.

The environment integrates:

- Wazuh SIEM
- Security Onion
- Windows Server 2025 Active Directory
- Windows 11
- Ubuntu Linux
- Kali Linux
- Nagios
- Prometheus
- Grafana

The objective was to move beyond default alerts and engineer custom detections aligned with real-world attacker techniques using:

- Wazuh custom rules
- MITRE ATT&CK mapping
- Sigma-style logic
- event correlation
- endpoint telemetry
- network visibility

The project demonstrates practical blue-team engineering workflows used in modern SOC environments.

---

# SOC Architecture Context

## Core Systems

| Platform | Function |
|---------|----------|
| Wazuh | SIEM / Endpoint Detection |
| Security Onion | NDR / Threat Hunting |
| Windows Server 2025 | Active Directory |
| Win11Client | Enterprise Endpoint |
| Ubuntu Node | Linux Monitoring Node |
| Kali Linux | Attack Simulation |
| Nagios | Availability Monitoring |
| Prometheus | Metrics Collection |
| Grafana | Visualization |

---

# Detection Engineering Goals

Primary objectives:

- build custom detections
- validate endpoint telemetry
- map alerts to MITRE ATT&CK
- improve detection fidelity
- simulate realistic attacks
- correlate multi-source evidence
- validate SOC investigation workflows

---

# Detection Engineering Workflow

The workflow followed a realistic SOC lifecycle:

```text
Attack Simulation
        ↓
Telemetry Generation
        ↓
Rule Engineering
        ↓
Rule Validation
        ↓
Alert Triggering
        ↓
Correlation Analysis
        ↓
Incident Documentation
```

---

# Detection Use Cases Implemented

## 1. SSH Brute Force Detection

### MITRE Mapping

```text
T1110 — Brute Force
```

### Attack Simulation

Hydra brute-force attack from Kali against Ubuntu SSH service.

Command:

```bash
hydra -l vincetita -P ~/soc-lab/test-passwords.txt ssh://192.168.117.30 -V -t 4
```

---

## Custom Wazuh Rule

```xml
<rule id="100100" level="12">
  <if_group>authentication_failed</if_group>
  <match>Failed password</match>
  <description>Custom SOC Lab SSH Brute Force Detection</description>
  <mitre>
    <id>T1110</id>
  </mitre>
</rule>
```

---

## Validation

Command:

```bash
sudo /var/ossec/bin/wazuh-logtest
```

Test payload:

```text
May 24 20:30:00 ubuntu-node sshd[1234]: Failed password for vincetita from 192.168.117.129 port 52144 ssh2
```

Expected:

```text
Rule id: 100100
```

---

## Evidence

```text
detections/wazuh/screenshots/wazuh-bruteforce.png
detections/wazuh/screenshots/wazuh-custom-bruteforce.png
detections/wazuh/gifs/wazuh-bruteforce-detection.gif
detections/wazuh/rules/custom_bruteforce_rule.xml
```

---

# 2. Network Reconnaissance Detection

## MITRE Mapping

```text
T1046 — Network Service Discovery
```

---

## Attack Simulation

Nmap reconnaissance from Kali.

Command:

```bash
nmap -sS -sV -O 192.168.117.10 192.168.117.30 192.168.117.50 192.168.117.100 192.168.117.130
```

---

## Detection Rule

```xml
<rule id="100101" level="10">
  <match>nmap</match>
  <description>Custom SOC Lab Nmap Recon Detection</description>
  <mitre>
    <id>T1046</id>
  </mitre>
</rule>
```

---

## Evidence

```text
detections/wazuh/screenshots/wazuh-recon-detection.png
detections/wazuh/gifs/wazuh-recon-detection.gif
detections/wazuh/rules/recon_rule.xml
```

---

# 3. Windows Authentication Monitoring

## MITRE Mapping

```text
T1110 — Brute Force
```

---

## Simulation

Repeated failed Windows authentication attempts.

Command:

```powershell
runas /user:corp\fakeuser cmd
```

---

## Key Events

| Event ID | Meaning |
|---------|---------|
| 4625 | Failed Logon |
| 4624 | Successful Logon |
| 4648 | Explicit Credential Use |

---

## Evidence

```text
detections/wazuh/screenshots/wazuh-windows-events.png
detections/wazuh/screenshots/wazuh-windows-bruteforce.png
```

---

# 4. Kerberos Authentication Monitoring

## MITRE Mapping

```text
T1558 — Steal or Forge Kerberos Tickets
```

---

## Simulation

Commands:

```powershell
klist purge
dir \\dc01\c$
```

---

## Key Event

```text
4768
```

---

## Evidence

```text
detections/wazuh/screenshots/wazuh-kerberos-alerts.png
detections/wazuh/rules/kerberos_attack_rule.xml
```

---

# 5. Lateral Movement Detection

## MITRE Mapping

```text
T1021 — Remote Services
```

---

## Simulation

Command:

```powershell
net use \\dc01\c$
```

---

## Key Events

| Event ID | Meaning |
|---------|---------|
| 5140 | SMB Share Access |
| 5145 | Detailed File Share Access |
| 4624 | Successful Logon |

---

## Evidence

```text
detections/wazuh/screenshots/wazuh-lateral-movement.png
detections/wazuh/rules/windows_lateral_movement_rule.xml
```

---

# Sigma Detection Engineering

Sigma rules were also created to support portable SIEM logic.

Example:

```yaml
title: Nmap Port Scan Detected
id: 7f3a1a11-1111-4444-9999-123456789abc
status: experimental
logsource:
  category: network_connection
detection:
  selection:
    Image|contains: "nmap"
  condition: selection
level: high
tags:
  - attack.t1046
```

Evidence:

```text
detections/sigma/rules/
```

---

# Multi-Tool Correlation

Detection engineering was validated using:

| Layer | Platform |
|------|----------|
| Endpoint | Wazuh |
| Network | Security Onion |
| Availability | Nagios |
| Metrics | Prometheus |
| Visualization | Grafana |

---

# Correlation Workflow

```text
Attack Activity
       ↓
Host Telemetry
       ↓
Network Detection
       ↓
Custom SIEM Rule Trigger
       ↓
MITRE Classification
       ↓
Analyst Investigation
       ↓
Incident Documentation
```

---

# Observability Integration

The observability stack provided infrastructure awareness during attack simulations.

## Nagios

Validated:

- host uptime
- service health
- infrastructure availability

---

## Prometheus

Collected:

- CPU
- memory
- service metrics
- uptime statistics

---

## Grafana

Visualized:

- operational health
- metrics correlation
- attack context
- infrastructure behavior

---

# Engineering Challenges

Challenges encountered:

- Windows telemetry normalization
- Linux log parsing
- custom XML rule syntax validation
- attack simulation timing
- cross-tool timestamp alignment
- VM resource optimization
- storage management

---

# Lessons Learned

Key lessons:

- layered telemetry greatly improves confidence
- endpoint + network correlation is critical
- MITRE mapping improves analyst context
- custom detections significantly increase SOC maturity
- observability tooling improves investigations
- attack simulation is essential for validation

---

# Security Improvements Implemented

Implemented improvements:

- custom brute-force detections
- recon detection logic
- Kerberos monitoring
- SMB lateral movement visibility
- enhanced SIEM correlation
- structured evidence collection
- analyst-focused investigation workflows

---

# Conclusion

This case study demonstrates practical detection engineering methodologies inside a realistic enterprise SOC environment.

The project successfully validated:

- custom SIEM detections
- MITRE ATT&CK alignment
- cross-tool correlation
- Windows + Linux telemetry
- Active Directory monitoring
- attack simulation workflows
- analyst investigation processes

The lab reflects real-world SOC operational practices and blue-team engineering methodology.

---

# Related Artifacts

Detection:

```text
detections/wazuh/
detections/correlation/
detections/sigma/
```

Monitoring:

```text
monitoring/nagios/
monitoring/prometheus/
monitoring/grafana/
```

Reports:

```text
reports/
```

Media:

```text
site/media/gifs/detection-engineering-demo.gif
```

---