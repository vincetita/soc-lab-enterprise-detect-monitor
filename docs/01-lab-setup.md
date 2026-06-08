# Lab Setup

## Build Order

1. Ubuntu
2. Kali
3. Wazuh
4. Security Onion
5. Nagios
6. Prometheus
7. Grafana
8. DC01
9. Win11Client

## Network

Host-Only:

```text
192.168.117.0/24
```

NAT:

```text
192.168.20.0/24
```

## Verification

```bash
ping 192.168.117.10
ping 192.168.117.30
ping 192.168.117.50
ping 192.168.117.129
ping 192.168.117.130
ping 192.168.117.100
```
