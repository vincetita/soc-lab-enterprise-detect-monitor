# Case Study — Enterprise SOC Architecture & Threat Visibility

**Case Study ID:** SOC-CS-004  
**Category:** SOC Architecture / Threat Visibility Engineering  
**Focus:** Enterprise Detection Architecture Design  
**Analyst / Engineer:** Vincent Takwi  
**Environment:** Enterprise SOC Lab  

---

# Executive Summary

This case study documents the design and implementation of a layered enterprise-style Security Operations Center (SOC) architecture built to simulate realistic blue-team monitoring, detection engineering, threat hunting, and observability workflows.

The lab environment integrates:

- Wazuh SIEM
- Security Onion NDR
- Windows Server 2025 Active Directory
- Windows 11 Enterprise Client
- Ubuntu Monitoring Infrastructure
- Kali Linux Attack Platform
- Nagios
- Prometheus
- Grafana

The project was designed to replicate modern enterprise detection architecture using:

- endpoint telemetry
- network visibility
- Active Directory monitoring
- observability engineering
- attack simulation
- cross-tool evidence correlation

The environment demonstrates practical SOC operational workflows aligned with real-world blue-team practices.

---

# Architecture Objectives

Primary goals:

- simulate enterprise SOC operations
- build layered detection visibility
- monitor Windows + Linux infrastructure
- validate Active Directory monitoring
- integrate SIEM + NDR telemetry
- support realistic attack simulation
- enable analyst investigation workflows
- improve observability and resilience

---

# High-Level Architecture

## Core Detection Stack

| Platform | Function |
|---------|----------|
| Wazuh | SIEM / Endpoint Detection |
| Security Onion | Network Detection & Threat Hunting |
| Nagios | Availability Monitoring |
| Prometheus | Metrics Collection |
| Grafana | Visualization & Dashboards |

---

## Enterprise Infrastructure

| Platform | Function |
|---------|----------|
| Windows Server 2025 | Active Directory Domain Services |
| Windows 11 | Enterprise Endpoint |
| Ubuntu Node | Monitoring Infrastructure |
| Kali Linux | Red Team Attack Simulation |

---

# Network Design

## Internal SOC Network

| Host | IP Address | Role |
|------|-------------|------|
| Security Onion | 192.168.117.10 | NDR |
| Ubuntu Node | 192.168.117.30 | Monitoring Stack |
| Wazuh Manager | 192.168.117.50 | SIEM |
| Win11Client | 192.168.117.100 | Endpoint |
| Kali Linux | 192.168.117.129 | Attacker |
| DC01 | 192.168.117.130 | Domain Controller |

---

# Virtualization Platform

The environment runs inside VMware Workstation on Windows 11 host infrastructure.

## VM Roles

| VM | Purpose |
|----|---------|
| Security Onion | Network detection platform |
| Wazuh | SIEM platform |
| Ubuntu | Monitoring + Web + Metrics |
| DC01 | Active Directory |
| Win11Client | Enterprise workstation |
| Kali Linux | Attack simulation |

---

# Detection Architecture

The SOC architecture follows a layered visibility model.

---

# Endpoint Visibility

## Wazuh

Wazuh provides:

- Windows event collection
- Linux log monitoring
- authentication telemetry
- MITRE ATT&CK mapping
- custom detections
- centralized alerting

---

# Network Visibility

## Security Onion

Security Onion provides:

- Suricata IDS
- Zeek network analysis
- packet visibility
- network threat hunting
- reconnaissance detection
- SMB/Kerberos visibility

---

# Identity Visibility

## Active Directory Monitoring

DC01 provides:

- Kerberos telemetry
- authentication visibility
- Windows security logs
- domain authentication monitoring
- SMB access telemetry

Key events monitored:

| Event ID | Description |
|---------|-------------|
| 4624 | Successful Logon |
| 4625 | Failed Logon |
| 4768 | Kerberos Ticket Request |
| 5140 | SMB Share Access |
| 5145 | Detailed File Share Access |

---

# Observability Architecture

## Nagios

Purpose:

```text
Availability Monitoring
```

Monitored:

- host uptime
- service health
- HTTP
- SSH
- SIEM availability
- dashboard accessibility

---

## Prometheus

Purpose:

```text
Metrics Collection
```

Collected:

- CPU metrics
- memory usage
- disk utilization
- uptime statistics
- Windows exporter metrics
- Linux node metrics

---

## Grafana

Purpose:

```text
Visualization & Correlation
```

Provided:

- analyst dashboards
- operational visibility
- attack context
- infrastructure monitoring
- metric correlation

---

# Detection Engineering Layer

Custom detections were engineered for:

| Attack Type | MITRE Mapping |
|-------------|---------------|
| SSH Brute Force | T1110 |
| Nmap Recon | T1046 |
| Web Enumeration | T1595.003 |
| Kerberos Activity | T1558 |
| Lateral Movement | T1021 |

---

# Threat Visibility Workflow

The architecture was intentionally designed for cross-tool investigation workflows.

---

# Investigation Flow

```text
Attack Simulation
        ↓
Host Telemetry Generation
        ↓
Network Traffic Observation
        ↓
SIEM Alert Correlation
        ↓
Metrics & Availability Validation
        ↓
Visualization Dashboards
        ↓
Analyst Investigation
        ↓
Incident Reporting
```

---

# Attack Simulations Implemented

## 1. SSH Brute Force

Tool:

```bash
hydra
```

Target:

Ubuntu SSH service.

---

# 2. Network Reconnaissance

Tool:

```bash
nmap
```

Targets:

Multiple enterprise hosts.

---

# 3. Web Enumeration

Tool:

```bash
gobuster
```

Target:

Apache HTTP service.

---

# 4. Windows Authentication Abuse

Simulation:

Repeated failed logons.

---

# 5. Kerberos Authentication Monitoring

Commands:

```powershell
klist purge
dir \\dc01\c$
```

---

# 6. Lateral Movement Simulation

Command:

```powershell
net use \\dc01\c$
```

---

# Evidence Collection Strategy

Evidence was collected across:

- screenshots
- GIF demonstrations
- logs
- dashboards
- terminal output
- SIEM alerts
- network telemetry
- metrics dashboards

---

# Correlation Architecture

The SOC environment supports layered evidence reconstruction.

Example:

```text
Attack Activity
       ↓
Endpoint Telemetry
       ↓
Network Detection
       ↓
SIEM Correlation
       ↓
Metrics Validation
       ↓
Visualization Dashboards
       ↓
Analyst Investigation
```

---

# Folder Architecture

The project uses structured enterprise documentation.

## Core Structure

```text
soc-lab-enterprise/
├── architecture/
├── attacks/
├── detections/
├── monitoring/
├── reports/
├── windows/
├── scripts/
├── screenshots/
└── site/
```

---

# Operational Workflows

The architecture supports:

- threat hunting
- detection engineering
- incident response
- attack simulation
- evidence correlation
- observability analysis
- analyst investigation training

---

# Security Engineering Principles

The project follows:

- defense in depth
- layered monitoring
- telemetry correlation
- visibility redundancy
- ATT&CK alignment
- observability integration
- analyst-driven investigation workflows

---

# Key Engineering Challenges

Challenges encountered:

- VM resource optimization
- storage management
- Windows telemetry normalization
- Linux log integration
- SIEM rule tuning
- timestamp synchronization
- dashboard optimization
- cross-tool evidence alignment

---

# Lessons Learned

Key findings:

- layered telemetry dramatically improves detection confidence
- SIEM + NDR integration reduces blind spots
- observability significantly improves investigations
- Active Directory visibility is critical
- attack simulation validates defensive maturity
- structured evidence collection accelerates investigations

---

# Security Improvements Implemented

Implemented enhancements:

- custom Wazuh detections
- network reconnaissance monitoring
- Kerberos visibility
- SMB lateral movement monitoring
- observability dashboards
- infrastructure health validation
- analyst-focused investigation workflows

---

# Operational Benefits

The architecture improved:

- detection visibility
- investigation speed
- telemetry correlation
- analyst situational awareness
- operational resilience
- infrastructure monitoring
- incident reconstruction capability

---

# Conclusion

This Enterprise SOC Lab demonstrates a realistic layered security monitoring architecture aligned with modern blue-team operational practices.

The project successfully integrates:

- endpoint detection
- network visibility
- identity monitoring
- observability engineering
- attack simulation
- cross-tool correlation
- analyst investigation workflows

The environment reflects practical enterprise SOC engineering methodology and demonstrates strong capability in:

- detection engineering
- SOC operations
- SIEM integration
- Active Directory monitoring
- observability engineering
- blue-team analysis

---

# Related Artifacts

Architecture:

```text
architecture/
```

Detection:

```text
detections/
```

Monitoring:

```text
monitoring/
```

Reports:

```text
reports/
```

Media:

```text
site/media/gifs/full-lab-overview.gif
site/media/gifs/detection-engineering-demo.gif
site/media/gifs/recon-demo.gif
site/media/gifs/bruteforce-demo.gif
```

---