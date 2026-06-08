# System Relationships

## Purpose

This file explains how the SOC systems interact and how evidence moves through the lab.

## High-Level Relationship

```text
Kali → Targets → Logs/Traffic/Metrics → Wazuh/Security Onion/Prometheus/Nagios → Grafana/Correlation
```

## Identity Layer

DC01 provides:

- AD DS
- DNS
- Kerberos
- authentication
- domain policy

Win11Client consumes:

- domain login
- DNS
- Kerberos tickets
- GPO
- Windows Event telemetry

## Detection Layer

Wazuh collects:

- Ubuntu auth logs
- Apache logs
- Windows Event Logs
- Sysmon logs
- DC01 authentication events

Security Onion collects:

- Nmap scan evidence
- SSH traffic
- HTTP enumeration
- RDP traffic
- SMB traffic
- Kerberos traffic
- WinRM traffic

## Metrics and Visualization

Prometheus scrapes:

- Linux node exporter
- Windows exporter
- Prometheus self-metrics

Grafana visualizes:

- CPU usage
- memory usage
- network throughput
- Windows metrics
- Linux metrics
- SOC overview dashboards

Nagios validates:

- host up/down
- service status
- HTTP/SSH availability

## Example: SSH Brute Force

1. Kali runs Hydra.
2. Ubuntu logs failed SSH attempts.
3. Wazuh raises brute-force alert.
4. Security Onion shows SSH connection bursts.
5. Prometheus records CPU/network activity.
6. Grafana displays the spike.
7. Nagios confirms Ubuntu is still up.

## Example: Kerberos + Lateral Movement

1. Win11Client purges and requests new Kerberos tickets.
2. DC01 logs Event IDs 4768 and 4769.
3. WinRM remote command creates lateral movement evidence.
4. Wazuh collects Windows events.
5. Security Onion shows Kerberos/WinRM/SMB traffic.
6. Grafana visualizes Windows metrics.
