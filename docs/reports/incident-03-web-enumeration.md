# Incident 03 — Web Enumeration Detection

**Incident ID:** SOC-IR-003  
**Classification:** Web Reconnaissance / Enumeration Activity  
**Severity:** Medium-High  
**MITRE ATT&CK:** T1595.003 — Active Scanning: Wordlist Scanning  
**Analyst:** Vincent Takwi  
**Lab Environment:** Enterprise SOC Lab  
**Date:** [Insert Date]

---

# Executive Summary

A controlled web enumeration simulation was executed from the attacker node (**Kali Linux - 192.168.117.129**) against the Ubuntu web server (**Ubuntu Node - 192.168.117.30**) hosting Apache HTTP services.

The attacker used Gobuster to enumerate accessible directories, hidden endpoints, and discover exposed web resources.

The activity was successfully observed across:

- Apache access logs
- Wazuh SIEM
- Security Onion NDR
- Prometheus metrics
- Grafana observability dashboards
- Nagios service monitoring

This exercise validates early-stage web reconnaissance detection and cross-tool investigation capability.

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
| Hostname | Ubuntu Node |
| IP Address | 192.168.117.30 |
| Service | Apache HTTP |
| Port | 80 |

---

## Monitoring Systems

| Platform | Function |
|---------|----------|
| Wazuh | SIEM / Host Detection |
| Security Onion | Network Detection |
| Apache Logs | Application Evidence |
| Nagios | Availability Monitoring |
| Prometheus | Metrics Collection |
| Grafana | Observability Visualization |

---

# Attack Objective

Validate SOC detection of:

- hostile web enumeration
- repeated HTTP probing
- suspicious directory discovery attempts
- attacker attribution
- cross-source evidence correlation

---

# Pre-Attack Verification

## Confirm HTTP Service

Kali:

```bash
nmap -p 80 192.168.117.30
```

Expected:

```text
PORT   STATE SERVICE
80/tcp open http
```

Evidence:

```text
attacks/web-enum/screenshots/apache-port80.png
```

---

## Verify Web Accessibility

Kali:

```bash
curl -I http://192.168.117.30
```

Expected:

```text
HTTP/1.1 200 OK
Server: Apache
```

Evidence:

```text
attacks/web-enum/screenshots/apache-status.png
```

Browser evidence:

```text
attacks/web-enum/screenshots/web-homepage.png
```

---

# Attack Execution

Gobuster used for directory enumeration.

Command:

```bash
gobuster dir -u http://192.168.117.30 -w /usr/share/wordlists/dirb/common.txt -t 20
```

Purpose:

- discover hidden directories
- identify exposed endpoints
- enumerate attack surface

---

# Expected Findings

Examples:

```text
/index.html
/icons/
/server-status
/cgi-bin/
```

Evidence:

```text
attacks/web-enum/screenshots/gobuster-results.png
attacks/web-enum/screenshots/web-enum-output.png
attacks/web-enum/logs/gobuster.log
attacks/web-enum/gifs/gobuster-enum.gif
site/media/gifs/web-enum-demo.gif
```

---

# Timeline

| Time | Event |
|------|------|
| 22:00 | HTTP service confirmed |
| 22:01 | Gobuster enumeration launched |
| 22:01 | Apache logs begin recording requests |
| 22:02 | Security Onion detects HTTP scan behavior |
| 22:03 | Wazuh observes suspicious web telemetry |
| 22:04 | Analyst triage begins |
| 22:06 | Correlation investigation completed |

---

# Evidence Collection

---

## 1. Attacker Evidence

Gobuster execution.

Command:

```bash
gobuster dir -u http://192.168.117.30 -w /usr/share/wordlists/dirb/common.txt -t 20
```

Evidence:

```text
attacks/web-enum/screenshots/gobuster-results.png
attacks/web-enum/screenshots/web-enum-output.png
```

Assessment:

Confirms active attacker-driven web enumeration.

---

## 2. Apache Application Logs

Ubuntu recorded inbound probing.

Command:

```bash
sudo tail -f /var/log/apache2/access.log
```

Observed:

```text
192.168.117.129 - - GET /icons/
192.168.117.129 - - GET /server-status
192.168.117.129 - - GET /index.html
```

Evidence:

```text
attacks/web-enum/screenshots/apache-access-log.png
attacks/web-enum/screenshots/apache-attacker-ip.png
```

Assessment:

Direct application-layer evidence confirming attack origin.

---

## 3. Security Onion Detection

Security Onion observed suspicious HTTP activity.

Analyst Hunt:

```text
source.ip:192.168.117.129
```

Additional queries:

```text
http
event.dataset:suricata.alert
```

Evidence:

```text
screenshots/security-onion/web-enum-alerts.png
```

Assessment:

Network visibility independently validated attack behavior.

---

## 4. Wazuh Detection

Wazuh captured suspicious web telemetry.

Search:

```text
192.168.117.129
```

Evidence:

```text
detections/wazuh/screenshots/wazuh-web-enum.png
detections/wazuh/gifs/wazuh-web-enum-detection.gif
```

Assessment:

SIEM endpoint telemetry aligned with observed application activity.

---

## 5. Nagios Monitoring

Service health remained stable.

Observed:

- Apache HTTP UP
- Ubuntu host UP
- Wazuh UP

Evidence:

```text
monitoring/nagios/screenshots/nagios-ui.png
```

Assessment:

Enumeration caused no availability impact.

---

## 6. Prometheus Metrics

Metrics validated system stability.

Example query:

```text
up
```

Evidence:

```text
monitoring/prometheus/screenshots/prometheus-ui.png
```

Assessment:

No abnormal resource exhaustion observed.

---

## 7. Grafana Observability

Dashboards provided investigation context.

Observed:

- HTTP host health
- CPU
- memory
- availability

Evidence:

```text
monitoring/grafana/screenshots/grafana-ui.png
```

Assessment:

Improved analyst operational awareness.

---

# Correlation Analysis

Evidence chain:

```text
Kali Gobuster Enumeration
         ↓
Apache access logs record requests
         ↓
Security Onion detects suspicious HTTP activity
         ↓
Wazuh SIEM observes endpoint telemetry
         ↓
Nagios confirms service availability
         ↓
Prometheus metrics remain stable
         ↓
Grafana visualizes infrastructure context
         ↓
Analyst completes incident reconstruction
```

Evidence:

```text
detections/correlation/screenshots/web-enum-correlation.png
detections/correlation/screenshots/multi-tool-evidence.png
detections/correlation/gifs/web-enum-correlation.gif
```

---

# Root Cause

Intentional internal web reconnaissance simulation.

No unauthorized exploitation occurred.

Purpose:

SOC validation.

---

# Impact Assessment

## Confidentiality

No data access.

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

Web enumeration is commonly performed before:

- web exploitation
- credential attacks
- directory traversal attempts
- vulnerability discovery
- application fingerprinting

Early visibility materially improves defensive readiness.

---

# Analyst Findings

Findings:

- attacker source clearly attributable
- Apache logs provided precise application evidence
- Security Onion independently validated network activity
- Wazuh correlated endpoint observations
- observability stack remained stable
- timeline reconstruction successful

---

# Recommendations

Improve security posture:

- restrict unnecessary endpoints
- disable server-status exposure
- deploy web application firewall
- alert on rapid HTTP enumeration patterns
- rate-limit suspicious clients
- automate web recon detection playbooks

---

# Conclusion

The SOC successfully detected hostile web reconnaissance behavior.

The environment demonstrated:

- application log visibility
- network detection
- SIEM telemetry
- observability integration
- cross-platform investigation workflow
- realistic blue-team methodology

---

# Related Artifacts

Attack:

```text
attacks/web-enum/
```

Detection:

```text
detections/wazuh/
detections/correlation/
screenshots/security-onion/
```

Monitoring:

```text
monitoring/nagios/
monitoring/prometheus/
monitoring/grafana/
```

Media:

```text
site/media/gifs/web-enum-demo.gif
```

---