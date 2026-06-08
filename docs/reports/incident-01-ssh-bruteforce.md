# Incident 01 — SSH Brute Force Attack Detection

**Incident ID:** SOC-IR-001  
**Classification:** Brute Force Authentication Attack  
**Severity:** High  
**MITRE ATT&CK:** T1110 — Brute Force  
**Analyst:** Vincent Takwi  
**Lab Environment:** Enterprise SOC Lab  
**Date:** [Insert Date]

---

# Executive Summary

A controlled SSH brute-force attack was executed from the designated attacker host (**Kali Linux - 192.168.117.129**) against the Ubuntu monitoring server (**Ubuntu Node - 192.168.117.30**) to validate enterprise monitoring, detection engineering, and cross-tool correlation capabilities.

The attack simulated repeated password guessing attempts using Hydra against the SSH service exposed on port 22.

The activity was successfully detected across multiple defensive layers:

- Linux authentication logs
- Wazuh SIEM
- Security Onion NDR
- Nagios availability monitoring
- Prometheus metrics collection
- Grafana visualization dashboards

This exercise demonstrates practical blue-team incident detection, investigation, and evidence correlation.

---

# Incident Scope

## Source (Attacker)

| Asset | Value |
|------|------|
| Hostname | Kali |
| IP Address | 192.168.117.129 |
| Role | Attacker Simulation Node |

---

## Target

| Asset | Value |
|------|------|
| Hostname | Ubuntu Node |
| IP Address | 192.168.117.30 |
| Service | OpenSSH |
| Port | 22 |

---

## Monitoring Systems

| Platform | Role |
|---------|------|
| Wazuh | SIEM / Endpoint Detection |
| Security Onion | NDR / Network Detection |
| Nagios | Availability Monitoring |
| Prometheus | Metrics Collection |
| Grafana | Visualization / Correlation |

---

# Attack Objective

Validate the SOC’s ability to:

- detect brute-force behavior
- identify attacker source
- capture authentication failures
- correlate endpoint + network telemetry
- verify host availability during attack
- visualize infrastructure behavior

---

# Attack Execution

## Pre-Attack Verification

### SSH Service Discovery

Attacker verified target SSH exposure.

Command:

```bash
nmap -p 22 192.168.117.30
```

Result:

```text
PORT   STATE SERVICE
22/tcp open  ssh
```

Evidence:

```text
attacks/brute-force/screenshots/ssh-port-check.png
```

---

# Attack Execution

Hydra was used to simulate repeated SSH password guessing.

Command:

```bash
hydra -l vincetita -P ~/soc-lab/test-passwords.txt ssh://192.168.117.30 -V -t 4
```

Wordlist sample:

```text
password
admin
ubuntu
welcome
test123
Password123
```

Evidence:

```text
attacks/brute-force/screenshots/hydra-terminal.png
attacks/brute-force/logs/ssh-bruteforce.log
attacks/brute-force/gifs/hydra-ssh-bruteforce.gif
```

---

# Timeline

| Time | Event |
|------|------|
| 20:10 | SSH service confirmed reachable |
| 20:11 | Hydra brute-force attack launched |
| 20:11 | Ubuntu authentication failures logged |
| 20:12 | Security Onion detects suspicious SSH activity |
| 20:12 | Wazuh custom detection triggers |
| 20:13 | Analyst investigation begins |
| 20:15 | Correlation completed |

---

# Evidence Collection

---

## 1. Linux Authentication Logs

Ubuntu captured repeated failed logons.

Command:

```bash
sudo tail -f /var/log/auth.log
```

Observed:

```text
Failed password for vincetita from 192.168.117.129
Failed password for vincetita from 192.168.117.129
Failed password for vincetita from 192.168.117.129
```

Evidence:

```text
attacks/brute-force/screenshots/failed-logons.png
```

Assessment:

This confirms direct brute-force interaction against the target host.

---

## 2. Wazuh Detection

Custom Wazuh detection logic successfully identified the attack.

Custom Rule:

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

Evidence:

```text
detections/wazuh/screenshots/wazuh-bruteforce.png
detections/wazuh/screenshots/wazuh-event-details.png
detections/wazuh/gifs/wazuh-bruteforce-detection.gif
detections/wazuh/rules/custom_bruteforce_rule.xml
```

Assessment:

Endpoint telemetry correctly generated actionable detection alerts.

---

## 3. Security Onion Detection

Security Onion captured suspicious SSH network behavior.

Investigation query:

```text
source.ip:192.168.117.129
```

Evidence:

```text
screenshots/security-onion/ssh-bruteforce-alerts.png
```

Assessment:

Network detection independently validated hostile activity.

---

## 4. Nagios Availability Monitoring

Nagios confirmed infrastructure remained available during attack simulation.

Services monitored:

- Ubuntu SSH
- Wazuh
- DC01
- Win11

Evidence:

```text
monitoring/nagios/screenshots/nagios-ui.png
```

Assessment:

No availability degradation observed.

---

## 5. Prometheus Metrics

Prometheus metrics showed system behavior during attack.

Example query:

```text
up
```

Evidence:

```text
monitoring/prometheus/screenshots/prometheus-ui.png
```

Assessment:

Host metrics remained stable.

---

## 6. Grafana Visualization

Grafana dashboards provided analyst-friendly visibility.

Metrics observed:

- CPU
- Memory
- Host health
- uptime

Evidence:

```text
monitoring/grafana/screenshots/grafana-ui.png
```

Assessment:

Visualization improved investigation context.

---

# Correlation Analysis

Evidence correlation chain:

```text
Kali Hydra Attack
        ↓
Ubuntu auth.log failures
        ↓
Security Onion SSH traffic alerts
        ↓
Wazuh custom brute-force detection
        ↓
Nagios uptime confirmation
        ↓
Prometheus metrics visibility
        ↓
Grafana analyst dashboard correlation
```

Evidence:

```text
detections/correlation/screenshots/ssh-bruteforce-correlation.png
detections/correlation/screenshots/multi-tool-evidence.png
detections/correlation/gifs/cross-tool-correlation.gif
```

---

# Root Cause

This activity was a deliberate internal red-team simulation.

No real compromise occurred.

Purpose:

Detection validation.

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

## Detection Success

High confidence detection.

---

# Analyst Findings

Findings:

- SSH service exposed as expected
- authentication failures properly logged
- custom detection engineering worked
- independent NDR confirmation achieved
- observability stack remained operational
- analyst triage path validated

---

# Lessons Learned

Recommendations:

- implement SSH rate limiting
- enforce MFA for administrative access
- restrict SSH exposure
- expand brute-force correlation logic
- create automated containment playbooks
- integrate alert escalation workflows

---

# Conclusion

This exercise successfully validated enterprise-style brute-force detection and investigation workflows.

The SOC stack demonstrated:

- layered defense visibility
- endpoint telemetry coverage
- network detection
- custom detection engineering
- observability resilience
- analyst investigation capability

This reflects realistic SOC operational practice.

---

# Related Artifacts

Attack:

```text
attacks/brute-force/
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
site/media/gifs/bruteforce-demo.gif
```

---