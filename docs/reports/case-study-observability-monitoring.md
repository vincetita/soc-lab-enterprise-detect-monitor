# Case Study — Observability & Infrastructure Monitoring in an Enterprise SOC Lab

**Case Study ID:** SOC-CS-003  
**Category:** Observability Engineering / Infrastructure Monitoring  
**Focus:** Nagios, Prometheus, Grafana Integration  
**Analyst / Engineer:** Vincent Takwi  
**Environment:** Enterprise SOC Lab  

---

# Executive Summary

This case study documents the implementation of a layered observability and infrastructure monitoring stack inside the Enterprise SOC Lab.

The project integrated:

- Nagios
- Prometheus
- Grafana
- Wazuh
- Security Onion
- Windows Server 2025
- Windows 11
- Ubuntu Linux
- Kali Linux

The objective was to provide:

- infrastructure health visibility
- host uptime monitoring
- service monitoring
- metrics collection
- operational dashboards
- analyst situational awareness during attack simulations

The observability stack complemented the SOC detection environment by ensuring infrastructure resilience and operational visibility during simulated attacks and detection engineering workflows.

---

# Environment Overview

## Infrastructure Components

| Platform | Function |
|---------|----------|
| Security Onion | Network Detection |
| Wazuh | SIEM |
| DC01 | Active Directory |
| Win11Client | Endpoint |
| Ubuntu Node | Monitoring Stack |
| Kali Linux | Attack Simulation |
| Nagios | Availability Monitoring |
| Prometheus | Metrics Collection |
| Grafana | Visualization |

---

# Monitoring Objectives

Primary goals:

- monitor infrastructure uptime
- validate SOC platform availability
- collect metrics during attacks
- visualize operational health
- support analyst investigations
- improve SOC situational awareness
- identify performance degradation

---

# Monitoring Architecture

## Nagios

Role:

```text
Availability Monitoring
```

Monitored:

- host uptime
- service status
- HTTP availability
- SSH availability
- Wazuh dashboard
- Security Onion access
- Grafana availability
- Prometheus health

---

## Prometheus

Role:

```text
Metrics Collection
```

Collected:

- CPU
- memory
- disk usage
- uptime
- Windows metrics
- Linux metrics
- service telemetry

---

## Grafana

Role:

```text
Visualization & Correlation
```

Visualized:

- infrastructure health
- operational metrics
- host performance
- analyst dashboards
- attack context

---

# Network Architecture

## Core Infrastructure

| Host | IP Address | Role |
|------|-------------|------|
| Security Onion | 192.168.117.10 | NDR |
| Ubuntu Node | 192.168.117.30 | Monitoring Stack |
| Wazuh | 192.168.117.50 | SIEM |
| Win11Client | 192.168.117.100 | Endpoint |
| Kali Linux | 192.168.117.129 | Attacker |
| DC01 | 192.168.117.130 | Domain Controller |

---

# Nagios Implementation

## Installation

Ubuntu Node:

```bash
sudo apt update
sudo apt install nagios4 -y
```

---

# Service Verification

Commands:

```bash
sudo systemctl status nagios
```

Expected:

```text
active (running)
```

---

# Web Interface

Access:

```text
http://192.168.117.30/nagios
```

---

# Monitored Services

| Service | Host |
|---------|------|
| HTTP | Ubuntu |
| SSH | Ubuntu |
| Wazuh Dashboard | Wazuh |
| Security Onion | SecOnion |
| Grafana | Ubuntu |
| Prometheus | Ubuntu |

---

# Evidence

```text
monitoring/nagios/screenshots/nagios-ui.png
monitoring/nagios/screenshots/nagios-hosts.png
monitoring/nagios/screenshots/nagios-services.png
monitoring/nagios/gifs/nagios-monitoring.gif
```

---

# Prometheus Implementation

## Installation

Ubuntu:

```bash
sudo apt install prometheus -y
```

---

# Service Validation

```bash
sudo systemctl status prometheus
```

Expected:

```text
active (running)
```

---

# Web Interface

```text
http://192.168.117.30:9090
```

---

# Metrics Queries

## Infrastructure Health

```text
up
```

---

## CPU Metrics

```text
node_cpu_seconds_total
```

---

## Memory Metrics

```text
node_memory_MemAvailable_bytes
```

---

# Windows Monitoring

Windows Exporter enabled telemetry collection from Win11Client.

Metrics included:

- CPU
- memory
- disk
- network
- uptime

---

# Evidence

```text
monitoring/prometheus/screenshots/prometheus-ui.png
monitoring/prometheus/screenshots/prometheus-targets.png
monitoring/prometheus/screenshots/windows-exporter.png
monitoring/prometheus/gifs/prometheus-monitoring.gif
```

---

# Grafana Implementation

## Installation

Ubuntu:

```bash
sudo apt install grafana -y
```

---

# Service Validation

```bash
sudo systemctl status grafana-server
```

Expected:

```text
active (running)
```

---

# Web Interface

```text
http://192.168.117.30:3000
```

---

# Dashboards

Configured dashboards:

- Infrastructure Overview
- Windows Metrics
- Linux Metrics
- SOC Platform Health
- Attack Visibility
- CPU Monitoring
- Memory Monitoring

---

# Evidence

```text
monitoring/grafana/screenshots/grafana-ui.png
monitoring/grafana/screenshots/grafana-dashboard.png
monitoring/grafana/screenshots/windows-dashboard.png
monitoring/grafana/gifs/grafana-monitoring.gif
```

---

# Observability During Attacks

The observability stack was intentionally validated during attack simulations.

---

# 1. SSH Brute Force Monitoring

Observed:

- SSH uptime
- authentication activity
- CPU utilization
- system stability

---

# 2. Reconnaissance Monitoring

Observed:

- scan-related network activity
- service availability
- host responsiveness

---

# 3. Web Enumeration Monitoring

Observed:

- Apache availability
- HTTP response behavior
- resource utilization

---

# 4. Kerberos Monitoring

Observed:

- DC01 operational health
- authentication infrastructure stability

---

# 5. Lateral Movement Monitoring

Observed:

- SMB traffic
- host stability
- Active Directory availability

---

# Correlation Workflow

The observability stack supported SOC operations using:

```text
Attack Activity
       ↓
Detection Alert
       ↓
Infrastructure Health Validation
       ↓
Metrics Correlation
       ↓
Visualization Dashboards
       ↓
Analyst Investigation
```

---

# Operational Benefits

The monitoring stack improved:

- analyst situational awareness
- infrastructure visibility
- operational resilience
- troubleshooting capability
- service uptime validation
- attack impact assessment

---

# Key Engineering Challenges

Challenges encountered:

- VM resource optimization
- storage management
- Windows exporter configuration
- Prometheus target discovery
- Grafana dashboard tuning
- alert timing alignment
- service dependency management

---

# Lessons Learned

Key findings:

- observability is essential for SOC operations
- availability monitoring complements security monitoring
- metrics improve analyst context
- dashboards accelerate investigations
- layered monitoring improves resilience
- attack simulation validates operational readiness

---

# Security & Operational Improvements

Implemented improvements:

- centralized visibility
- infrastructure monitoring
- service uptime validation
- dashboard correlation
- operational telemetry collection
- analyst-focused visualizations

---

# Conclusion

This case study demonstrates the successful integration of observability engineering into an enterprise-style SOC environment.

The project validated:

- infrastructure monitoring
- metrics collection
- visualization workflows
- operational resilience
- attack impact monitoring
- analyst situational awareness
- enterprise observability engineering practices

The monitoring stack significantly improved SOC operational maturity and investigative capability.

---

# Related Artifacts

Monitoring:

```text
monitoring/nagios/
monitoring/prometheus/
monitoring/grafana/
```

Detection:

```text
detections/wazuh/
detections/security-onion/
```

Reports:

```text
reports/
```

Media:

```text
site/media/gifs/full-lab-overview.gif
site/media/gifs/detection-engineering-demo.gif
```

---