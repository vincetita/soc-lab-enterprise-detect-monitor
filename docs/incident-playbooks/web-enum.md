# Incident Playbook — Web Enumeration

## Trigger

High-volume HTTP requests / directory probing.

## Validate

```bash
grep "192.168.117.129" /var/log/apache2/access.log
```

Check:

- Wazuh web events
- Security Onion HTTP traffic
- Prometheus network spike
- Grafana web spike
- Nagios HTTP status
