# Enterprise SOC Lab Portfolio

## Overview

This repository contains a complete enterprise-style Security Operations Center (SOC) lab built for practical blue-team training, detection engineering, threat hunting, monitoring, and incident response.

The lab combines:

- Windows Server 2025 Domain Controller (DC01)
- Windows 11 domain-joined endpoint
- Ubuntu monitored Linux node
- Kali Linux attacker VM
- Wazuh SIEM
- Security Onion network detection and threat hunting
- Nagios availability monitoring
- Prometheus metrics collection
- Grafana dashboards and visual observability

## Core Systems

| System | Role | IP |
|---|---|---|
| Security Onion | NDR / IDS / Hunt | 192.168.117.10 |
| Ubuntu Monitoring Node | Linux monitored node, Nagios, Prometheus, Grafana | 192.168.117.30 |
| Wazuh | SIEM / endpoint telemetry | 192.168.117.50 |
| Kali | attacker | 192.168.117.129 |
| DC01 | Windows Server 2025 AD DS / DNS / Kerberos | 192.168.117.130 |
| Win11Client | domain endpoint | 192.168.117.100 |
| Win11 NAT | internet/update NIC | 192.168.20.133 |

## What This Project Demonstrates

- SOC monitoring
- detection engineering
- custom Wazuh rules
- Sigma detection logic
- Windows Event ID analysis
- Active Directory monitoring
- Kerberos visibility
- lateral movement detection
- network threat hunting
- Prometheus/Grafana observability
- Nagios availability checks
- incident response documentation

## Main Attack Scenarios

| Scenario | Tools | MITRE |
|---|---|---|
| SSH brute force | Hydra, Wazuh, Security Onion | T1110 |
| Network reconnaissance | Nmap, Security Onion, Wazuh | T1046 |
| Web enumeration | Gobuster, Apache logs, Wazuh | T1595 / T1083 |
| Windows authentication abuse | Hydra RDP, Event ID 4625, Wazuh | T1110 |
| Kerberos + lateral movement | klist, WinRM, SMB, DC01 logs | T1558 / T1021 |

## Portfolio Website

Open locally:

```bash
cd site
python -m http.server 8000
```

Then browse:

```text
http://localhost:8000
```

## Elevator Pitch

I designed and implemented a full enterprise SOC lab simulating real-world attack scenarios across Windows Server 2025 Active Directory, Windows 11, Linux infrastructure, Wazuh SIEM, Security Onion NDR, Prometheus, Grafana, and Nagios. I engineered custom detections, simulated brute force, reconnaissance, Kerberos and lateral movement workflows, and built incident investigation and correlation pipelines.
