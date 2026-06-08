# Network Zones

## Purpose

This file explains the network segmentation used in the SOC lab.

## Zone 1: Host-Only SOC Network

Subnet:

```text
192.168.117.0/24
```

Purpose:

- internal lab communication
- attack simulation
- monitoring traffic
- Windows domain communication
- SIEM/agent traffic
- threat hunting evidence

Systems:

| IP | System |
|---|---|
| 192.168.117.10 | Security Onion |
| 192.168.117.30 | Ubuntu / Nagios / Prometheus / Grafana |
| 192.168.117.50 | Wazuh |
| 192.168.117.129 | Kali |
| 192.168.117.130 | DC01 |
| 192.168.117.100 | Win11Client |

## Zone 2: NAT Network

Subnet:

```text
192.168.20.0/24
```

Purpose:

- updates
- installer downloads
- internet access
- package installation

Observed Win11 NAT:

```text
192.168.20.133
```

## Traffic Model

| Source | Destination | Purpose |
|---|---|---|
| Kali | Ubuntu | SSH brute force, web enumeration |
| Kali | DC01 | recon, RDP scan, SMB scan |
| Kali | Win11Client | RDP scan/brute force |
| Win11Client | DC01 | authentication, DNS, Kerberos, GPO |
| Wazuh agents | Wazuh | log forwarding |
| Prometheus | exporters | metrics scraping |
| Nagios | hosts/services | availability checks |
| Security Onion | internal traffic | network detection |

## Screenshot Evidence

Save topology evidence:

```text
architecture/diagrams/vmware-lab-inventory.png
architecture/diagrams/network-connectivity.png
architecture/diagrams/soc-lab-network.png
```
