# Nagios Troubleshooting

## Validate Configuration

```bash
/usr/local/nagios/bin/nagios -v /usr/local/nagios/etc/nagios.cfg
```

## Restart Services

```bash
sudo systemctl restart nagios
sudo systemctl restart apache2
```

## Common Problems

| Issue | Cause | Fix |
|---|---|---|
| Web UI unavailable | Apache stopped | restart apache2 |
| Host down | IP mismatch | verify Host-Only IP |
| Service unknown | wrong cfg | validate Nagios config |
