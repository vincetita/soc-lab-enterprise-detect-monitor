# Incident 02 — Network Reconnaissance Detection

**Incident ID:** SOC-IR-002  
**Classification:** Reconnaissance / Discovery Activity  
**Severity:** Medium-High  
**MITRE ATT&CK:** T1046 — Network Service Discovery  
**Analyst:** Vincent Takwi  
**Lab Environment:** Enterprise SOC Lab  
**Date:** [Insert Date]

---

# Executive Summary

A controlled reconnaissance simulation was executed from the attacker host (**Kali Linux - 192.168.117.129**) against multiple enterprise SOC assets to validate network detection, host telemetry visibility, SIEM detection coverage, and cross-platform investigation workflows.

The attacker performed active network enumeration using Nmap to identify:

- exposed services
- host fingerprints
- open ports
- operating system characteristics
- reachable enterprise infrastructure

The reconnaissance activity was successfully observed across:

- Security Onion (network detection)
- Wazuh (endpoint telemetry)
- Windows logs
- Linux telemetry
- Prometheus infrastructure monitoring
- Grafana observability dashboards

This exercise validates early-stage attack detection before exploitation occurs.

---

# Incident Scope

## Attacker

| Asset | Value |
|------|------|
| Hostname | Kali |
| IP Address | 192.168.117.129 |
| Role | Red Team Simulation Node |

---

## Target Assets

| Host | IP | Role |
|------|----|------|
| Security Onion | 192.168.117.10 | NDR / SOC Platform |
| Ubuntu Node | 192.168.117.30 | Monitoring / Web / SSH |
| Wazuh Manager | 192.168.117.50 | SIEM |
| Win11 Client | 192.168.117.100 | Domain Workstation |
| DC01 | 192.168.117.130 | Domain Controller |

---

# Objective

Validate SOC capability to detect pre-attack discovery behavior.

Detection goals:

- identify hostile scanning activity
- map attacker IP
- observe targeted hosts
- confirm NDR detection
- validate SIEM visibility
- document analyst triage workflow

---

# Attack Preparation

Reconnaissance commonly precedes exploitation.

Adversaries use scanning to:

- locate exposed services
- fingerprint systems
- identify weak targets
- map network topology

This simulation reflects realistic pre-compromise attacker behavior.

---

# Attack Execution

## Nmap Service Discovery

Command executed:

```bash
nmap -sS -sV -O 192.168.117.10 192.168.117.30 192.168.117.50 192.168.117.100 192.168.117.130
```

Explanation:

| Flag | Purpose |
|------|---------|
| -sS | SYN scan |
| -sV | Service version detection |
| -O | OS fingerprinting |

---

# Expected Recon Findings

Examples:

```text
22/tcp open ssh
80/tcp open http
443/tcp open https
1514/tcp open wazuh
5601/tcp open dashboard
3389/tcp open ms-wbt-server
445/tcp open microsoft-ds
53/tcp open domain
88/tcp open kerberos
```

Evidence:

```text
attacks/recon/screenshots/nmap-recon-terminal.png
attacks/recon/logs/nmap-recon.txt
attacks/recon/gifs/recon-demo.gif
site/media/gifs/recon-demo.gif
```

---

# Timeline

| Time | Event |
|------|------|
| 21:00 | Kali initiates reconnaissance |
| 21:01 | Security Onion detects scan activity |
| 21:02 | Linux telemetry reflects connections |
| 21:03 | Windows hosts receive probes |
| 21:04 | Wazuh logs suspicious telemetry |
| 21:05 | Analyst triage begins |
| 21:07 | Cross-tool correlation completed |

---

# Evidence Collection

---

## 1. Attacker Evidence

Recon executed from Kali.

Command:

```bash
nmap -sS -sV -O 192.168.117.10 192.168.117.30 192.168.117.50 192.168.117.100 192.168.117.130
```

Evidence:

```text
attacks/recon/screenshots/nmap-recon-terminal.png
```

Assessment:

Confirms attacker execution source.

---

## 2. Security Onion Detection

Security Onion successfully detected network scanning behavior.

Analyst query:

```text
source.ip:192.168.117.129
```

Possible indicators:

- SYN scan bursts
- multiple host probing
- rapid port connection attempts

Evidence:

```text
screenshots/security-onion/recon-alerts.png
detections/security-onion/screenshots/recon-detection.png
```

Assessment:

NDR detection succeeded.

---

## 3. Wazuh Detection

Endpoint telemetry observed suspicious connection activity.

Search:

```text
192.168.117.129
```

Custom rule (optional):

```xml
<rule id="100101" level="10">
  <match>nmap</match>
  <description>Custom SOC Lab Nmap Recon Detection</description>
  <mitre>
    <id>T1046</id>
  </mitre>
</rule>
```

Evidence:

```text
detections/wazuh/screenshots/wazuh-recon-detection.png
detections/wazuh/gifs/wazuh-recon-detection.gif
detections/wazuh/rules/recon_rule.xml
```

Assessment:

SIEM telemetry confirmed reconnaissance visibility.

---

## 4. Windows Evidence

Windows hosts received network probing.

Potential telemetry:

- connection attempts
- firewall logs
- Windows Defender events
- event correlation

Evidence:

```text
detections/wazuh/screenshots/wazuh-windows-events.png
detections/wazuh/screenshots/wazuh-dc01-telemetry.png
```

Assessment:

Recon activity touched enterprise Windows assets.

---

## 5. Linux Evidence

Ubuntu network interaction observed.

Useful commands:

```bash
sudo ss -tunap
sudo journalctl -xe
sudo tail -f /var/log/auth.log
```

Evidence:

```text
attacks/recon/screenshots/linux-recon-telemetry.png
```

Assessment:

Host telemetry supports attack timeline.

---

## 6. Prometheus Metrics

Infrastructure remained healthy during reconnaissance.

Query:

```text
up
```

Evidence:

```text
monitoring/prometheus/screenshots/prometheus-ui.png
```

Assessment:

No resource exhaustion.

---

## 7. Grafana Visualization

Dashboards visualized:

- host uptime
- CPU
- network behavior
- infrastructure health

Evidence:

```text
monitoring/grafana/screenshots/grafana-ui.png
```

Assessment:

Improved analyst visibility.

---

## 8. Nagios Availability

Nagios verified services remained reachable.

Observed:

- DC01 UP
- Ubuntu UP
- Wazuh UP
- Win11 UP

Evidence:

```text
monitoring/nagios/screenshots/nagios-ui.png
```

Assessment:

Recon caused no service disruption.

---

# Correlation Analysis

Evidence chain:

```text
Kali Nmap Scan
      ↓
Security Onion detects SYN scan behavior
      ↓
Target Linux/Windows telemetry receives probes
      ↓
Wazuh logs suspicious activity
      ↓
Prometheus confirms system stability
      ↓
Grafana visualizes operational state
      ↓
Analyst investigation timeline completed
```

Evidence:

```text
detections/correlation/screenshots/multi-tool-evidence.png
detections/correlation/screenshots/correlation-timeline.png
detections/correlation/screenshots/recon-correlation.png
detections/correlation/gifs/cross-tool-correlation.gif
```

---

# Root Cause

Intentional internal attack simulation.

Purpose:

Reconnaissance detection validation.

No unauthorized compromise occurred.

---

# Impact Assessment

## Confidentiality

No breach.

---

## Integrity

No modification.

---

## Availability

No interruption.

---

## Detection Capability

Strong.

---

# Threat Analysis

Reconnaissance is a critical early warning signal.

Real adversaries often perform discovery before:

- brute force
- exploitation
- privilege escalation
- lateral movement
- credential attacks

Early detection materially improves defensive posture.

---

# Analyst Findings

Findings:

- Nmap activity clearly visible
- attacker source identified
- NDR detection effective
- SIEM telemetry supportive
- Windows + Linux evidence aligned
- observability stack remained healthy

---

# Recommendations

Improve detection posture:

- alert on aggressive port scanning
- threshold scan burst detection
- geolocation enrichment
- automated recon alert triage
- Sigma rule integration
- correlation playbook automation

---

# Conclusion

The SOC successfully detected reconnaissance behavior before exploitation.

This demonstrates:

- layered monitoring maturity
- practical SOC investigation workflow
- early threat detection capability
- multi-tool evidence correlation
- realistic enterprise analyst methodology

---

# Related Artifacts

Attack:

```text
attacks/recon/
```

Detection:

```text
detections/wazuh/
detections/security-onion/
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
site/media/gifs/recon-demo.gif
```

---