# Incident Playbook — Recon Detection

## Trigger

Nmap or scan pattern detected.

## Validate

- Security Onion port scan alert
- Wazuh recon alert
- Prometheus traffic spike
- Grafana dashboard movement
- Nagios host availability

## Containment

```bash
sudo ufw deny from 192.168.117.129
```
