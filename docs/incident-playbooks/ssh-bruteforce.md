# Incident Playbook — SSH Brute Force

## Trigger

Multiple failed SSH logons.

## Triage

```bash
grep "Failed password" /var/log/auth.log
```

## Validate

- Wazuh brute-force alert
- Security Onion SSH traffic
- Prometheus CPU/network spike
- Grafana dashboard
- Nagios host still up

## Containment

```bash
sudo ufw deny from 192.168.117.129
```

## Hardening

```text
PermitRootLogin no
MaxAuthTries 3
```
