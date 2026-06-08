# Case Study — Cross-Tool Correlation in an Enterprise SOC Lab

**Case Study ID:** SOC-CS-002  
**Category:** SOC Correlation Engineering  
**Focus:** Multi-Source Detection Correlation  
**Analyst / Engineer:** Vincent Takwi  
**Environment:** Enterprise SOC Lab  

---

# Executive Summary

This case study documents the implementation of cross-tool correlation workflows within the Enterprise SOC Lab to simulate realistic Security Operations Center (SOC) investigation methodology.

The environment integrates:

- Wazuh SIEM
- Security Onion NDR
- Windows Server 2025 Active Directory
- Windows 11 Enterprise Client
- Ubuntu Monitoring Node
- Kali Linux Attacker Platform
- Nagios
- Prometheus
- Grafana

The objective was to correlate telemetry across:

- endpoint logs
- network traffic
- Windows authentication events
- Linux logs
- infrastructure monitoring
- observability dashboards

The project demonstrates enterprise-style investigation workflows used by modern SOC analysts during threat hunting and incident response operations.

---

# Architecture Overview

## Enterprise SOC Components

| Platform | Function |
|---------|----------|
| Wazuh | SIEM / Endpoint Telemetry |
| Security Onion | Network Detection & Threat Hunting |
| Windows Server 2025 | Active Directory |
| Win11Client | Enterprise Workstation |
| Ubuntu Node | Linux Monitoring + Web + SSH |
| Kali Linux | Attack Simulation |
| Nagios | Availability Monitoring |
| Prometheus | Metrics Collection |
| Grafana | Visualization |

---

# Correlation Objectives

Primary goals:

- validate multi-source detection workflows
- reconstruct attacker activity timelines
- correlate endpoint + network evidence
- improve investigation confidence
- simulate real SOC analyst workflows
- align evidence to MITRE ATT&CK

---

# Correlation Methodology

The investigation workflow followed a layered detection model:

```text
Attack Execution
        ↓
Host Telemetry
        ↓
Network Detection
        ↓
SIEM Correlation
        ↓
Observability Validation
        ↓
Timeline Reconstruction
        ↓
Incident Reporting
```

---

# Simulated Attack Scenarios

The following attack scenarios were correlated across multiple tools.

---

# 1. SSH Brute Force Correlation

## MITRE Mapping

```text
T1110 — Brute Force
```

---

## Attack Simulation

Kali executed Hydra against Ubuntu SSH.

Command:

```bash
hydra -l vincetita -P ~/soc-lab/test-passwords.txt ssh://192.168.117.30 -V -t 4
```

---

## Correlated Evidence

### Kali Evidence

```text
attacks/brute-force/screenshots/hydra-terminal.png
```

---

### Ubuntu Evidence

```bash
sudo tail -f /var/log/auth.log
```

Observed:

```text
Failed password for vincetita from 192.168.117.129
```

Evidence:

```text
attacks/brute-force/screenshots/failed-logons.png
```

---

### Security Onion Evidence

Query:

```text
source.ip:192.168.117.129
```

Evidence:

```text
screenshots/security-onion/ssh-bruteforce-alerts.png
```

---

### Wazuh Evidence

Query:

```text
rule.id:100100
```

Evidence:

```text
detections/wazuh/screenshots/wazuh-bruteforce.png
```

---

## Correlation Result

```text
Kali Hydra
      ↓
Ubuntu auth.log
      ↓
Security Onion alert
      ↓
Wazuh custom rule
      ↓
Analyst investigation
```

Evidence:

```text
detections/correlation/screenshots/ssh-bruteforce-correlation.png
```

---

# 2. Reconnaissance Correlation

## MITRE Mapping

```text
T1046 — Network Service Discovery
```

---

## Attack Simulation

Command:

```bash
nmap -sS -sV -O 192.168.117.10 192.168.117.30 192.168.117.50 192.168.117.100 192.168.117.130
```

---

## Correlated Evidence

### Kali Recon

```text
attacks/recon/screenshots/nmap-recon-terminal.png
```

---

### Security Onion

Observed:

- SYN scans
- host probing
- service enumeration

Evidence:

```text
screenshots/security-onion/recon-alerts.png
```

---

### Wazuh

Observed:

- suspicious telemetry
- endpoint interaction
- custom recon alerts

Evidence:

```text
detections/wazuh/screenshots/wazuh-recon-detection.png
```

---

## Correlation Result

```text
Kali Nmap Scan
       ↓
Network Scan Detection
       ↓
Host Telemetry
       ↓
SIEM Correlation
       ↓
Threat Hunt
```

Evidence:

```text
detections/correlation/screenshots/recon-correlation.png
```

---

# 3. Web Enumeration Correlation

## MITRE Mapping

```text
T1595.003 — Active Scanning
```

---

## Attack Simulation

Command:

```bash
gobuster dir -u http://192.168.117.30 -w /usr/share/wordlists/dirb/common.txt -t 20
```

---

## Correlated Evidence

### Gobuster Output

```text
attacks/web-enum/screenshots/gobuster-results.png
```

---

### Apache Access Logs

```bash
sudo tail -f /var/log/apache2/access.log
```

Observed:

```text
GET /icons/
GET /server-status
```

Evidence:

```text
attacks/web-enum/screenshots/apache-access-log.png
```

---

### Security Onion

Observed:

- HTTP scan behavior
- repetitive requests
- suspicious probing

Evidence:

```text
screenshots/security-onion/web-enum-alerts.png
```

---

### Wazuh

Observed:

- Apache telemetry
- suspicious web requests

Evidence:

```text
detections/wazuh/screenshots/wazuh-web-enum.png
```

---

## Correlation Result

```text
Gobuster Enumeration
        ↓
Apache Access Logs
        ↓
Security Onion Detection
        ↓
Wazuh Correlation
        ↓
Analyst Investigation
```

Evidence:

```text
detections/correlation/screenshots/web-enum-correlation.png
```

---

# 4. Kerberos Authentication Correlation

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

## Correlated Evidence

### DC01

Observed Event:

```text
4768
```

---

### Wazuh

Observed:

- Kerberos ticket requests
- authentication telemetry

---

### Security Onion

Observed:

- Kerberos network traffic

---

## Correlation Result

```text
Kerberos Ticket Request
           ↓
DC01 Authentication Logs
           ↓
Wazuh SIEM Telemetry
           ↓
Security Onion Network Visibility
           ↓
Identity Investigation
```

Evidence:

```text
detections/correlation/screenshots/kerberos-correlation.png
```

---

# 5. Lateral Movement Correlation

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

## Correlated Evidence

### Windows Logs

Observed:

- 4624
- 5140
- 5145

---

### Security Onion

Observed:

- SMB traffic
- east-west movement

---

### Wazuh

Observed:

- remote share access
- authentication telemetry

---

## Correlation Result

```text
SMB Administrative Access
            ↓
Windows Security Events
            ↓
Wazuh SIEM Correlation
            ↓
Security Onion SMB Visibility
            ↓
Lateral Movement Investigation
```

Evidence:

```text
detections/correlation/screenshots/lateral-movement-correlation.png
```

---

# Observability Correlation

## Nagios

Validated:

- host uptime
- service health
- infrastructure availability

Evidence:

```text
monitoring/nagios/screenshots/nagios-ui.png
```

---

## Prometheus

Collected:

- CPU metrics
- memory usage
- service status
- uptime telemetry

Evidence:

```text
monitoring/prometheus/screenshots/prometheus-ui.png
```

---

## Grafana

Visualized:

- infrastructure health
- attack context
- operational stability
- metric correlation

Evidence:

```text
monitoring/grafana/screenshots/grafana-ui.png
```

---

# Timeline Reconstruction

Analysts reconstructed attack chains using:

- timestamps
- source IPs
- authentication events
- SIEM alerts
- network telemetry
- application logs

Example:

```text
Attack Launch
      ↓
Target Interaction
      ↓
Host Telemetry
      ↓
Network Detection
      ↓
SIEM Correlation
      ↓
Analyst Investigation
      ↓
Incident Documentation
```

Evidence:

```text
detections/correlation/screenshots/correlation-timeline.png
detections/correlation/gifs/cross-tool-correlation.gif
```

---

# Key Engineering Challenges

Challenges encountered:

- timestamp synchronization
- Windows/Linux log normalization
- telemetry alignment
- storage management
- VM performance optimization
- cross-platform investigation consistency

---

# Lessons Learned

Key findings:

- layered telemetry significantly improves detection confidence
- endpoint + network correlation reduces blind spots
- observability tooling improves analyst awareness
- Active Directory telemetry is critical
- custom detections improve SOC maturity
- realistic attack simulation validates defensive posture

---

# Security Improvements Implemented

Implemented enhancements:

- custom Wazuh rules
- recon detection logic
- Kerberos monitoring
- SMB movement visibility
- structured evidence collection
- MITRE ATT&CK alignment
- analyst investigation workflows

---

# Conclusion

This case study demonstrates realistic cross-tool SOC investigation workflows inside an enterprise-style detection environment.

The project successfully validated:

- SIEM correlation capability
- network detection visibility
- endpoint telemetry integration
- Active Directory monitoring
- observability integration
- incident reconstruction workflows
- analyst-driven threat investigation methodology

The Enterprise SOC Lab reflects practical blue-team operations and enterprise SOC engineering practices.

---

# Related Artifacts

Detection:

```text
detections/wazuh/
detections/correlation/
detections/security-onion/
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
site/media/gifs/full-lab-overview.gif
site/media/gifs/recon-demo.gif
site/media/gifs/bruteforce-demo.gif
```

---