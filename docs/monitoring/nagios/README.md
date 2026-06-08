# Nagios Monitoring

## Role

Nagios is the availability layer of the SOC lab. It answers:

> Are my systems and services up?

## Access

```text
http://192.168.117.30/nagios
```

## Key Commands

```bash
sudo systemctl status nagios
sudo systemctl restart nagios
/usr/local/nagios/bin/nagios -v /usr/local/nagios/etc/nagios.cfg
```

Expected:

```text
active (running)
```

## Systems to Monitor

| Host | IP | Checks |
|---|---|---|
| Ubuntu | 192.168.117.30 | ping, SSH, HTTP |
| Wazuh | 192.168.117.50 | ping, HTTPS |
| Security Onion | 192.168.117.10 | ping, HTTPS |
| DC01 | 192.168.117.130 | ping |
| Win11Client | 192.168.117.100 | ping |
| Prometheus | 192.168.117.30:9090 | HTTP |
| Grafana | 192.168.117.30:3000 | HTTP |

## Evidence

Screenshots:

```text
monitoring/nagios/screenshots/nagios-dashboard.png
monitoring/nagios/screenshots/nagios-hosts.png
monitoring/nagios/screenshots/nagios-services.png
monitoring/nagios/screenshots/nagios-enterprise-hosts.png
```

GIF:

```text
monitoring/nagios/gifs/nagios-dashboard.gif
```
