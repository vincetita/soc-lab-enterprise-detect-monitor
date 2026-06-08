# SOC Lab Overview

## Executive Summary

This SOC lab is a multi-VM enterprise-style cybersecurity environment built in VMware Workstation. It integrates endpoint security, network monitoring, availability monitoring, metrics, dashboards, Windows identity infrastructure, and controlled attack simulation.

The lab is designed to show more than tool installation. It demonstrates how attacks produce evidence across multiple layers and how a SOC analyst correlates those signals into a single incident story.

## Systems

| System | IP | Role |
|---|---|---|
| Security Onion | 192.168.117.10 | Network detection, Suricata, Zeek, PCAP, Hunt |
| Ubuntu | 192.168.117.30 | Linux monitored node, web/SSH target, monitoring services |
| Nagios | 192.168.117.30 | Availability monitoring |
| Prometheus | 192.168.117.30:9090 | Metrics collection |
| Grafana | 192.168.117.30:3000 | Dashboards and visualization |
| Wazuh | 192.168.117.50 | SIEM and endpoint telemetry |
| Kali | 192.168.117.129 | Attacker VM |
| DC01 | 192.168.117.130 | Windows Server 2025 AD DS, DNS, Kerberos |
| Win11Client | 192.168.117.100 | Domain-joined Windows endpoint |
| Win11 NAT | 192.168.20.133 | Internet/update interface |

## Monitoring Philosophy

| Layer | Tool | Question Answered |
|---|---|---|
| Network | Security Onion | What happened on the wire? |
| Endpoint / SIEM | Wazuh | What happened on the host? |
| Availability | Nagios | Is the service up? |
| Metrics | Prometheus | How is the system performing? |
| Visualization | Grafana | What does the trend/dashboard show? |

## Core Value

The strongest part of this lab is cross-tool correlation:

1. Kali triggers attack activity.
2. Ubuntu, Win11, or DC01 generates logs.
3. Wazuh detects endpoint events.
4. Security Onion shows network evidence.
5. Prometheus collects metrics.
6. Grafana visualizes impact.
7. Nagios validates availability.
8. Analyst builds an incident timeline.

## Key Portfolio Assets

- `gifs/simulations/full-lab-overview.gif`
- `gifs/simulations/end-to-end-bruteforce.gif`
- `gifs/simulations/end-to-end-recon.gif`
- `gifs/simulations/end-to-end-web-enum.gif`
- `gifs/simulations/end-to-end-windows-bruteforce.gif`
- `gifs/simulations/end-to-end-lateral-movement.gif`
