# Attack Module 2 — Network Reconnaissance

## Objective

Simulate Nmap reconnaissance against Ubuntu, DC01, and Win11Client.

## Commands

```bash
nmap -sn 192.168.117.0/24
nmap -sV 192.168.117.130
sudo nmap -A 192.168.117.130
nmap --open 192.168.117.0/24
```

## Expected DC01 Ports

```text
53 DNS
88 Kerberos
135 MSRPC
389 LDAP
445 SMB
3389 RDP
```

## Evidence

```text
attacks/recon/logs/nmap-scan.log
attacks/recon/screenshots/nmap-results.png
attacks/recon/screenshots/discovered-services.png
gifs/simulations/end-to-end-recon.gif
```
