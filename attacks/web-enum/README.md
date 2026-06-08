# Attack Module 3 — Web Enumeration

## Objective

Simulate Gobuster directory enumeration against Ubuntu Apache.

## Command

```bash
gobuster dir -u http://192.168.117.30 -w /usr/share/wordlists/dirb/common.txt -s 200,301,302,403
```

Save:

```bash
gobuster dir -u http://192.168.117.30 -w /usr/share/wordlists/dirb/common.txt > attacks/web-enum/logs/gobuster.log
```

## Log Evidence

```bash
sudo tail -f /var/log/apache2/access.log
grep "192.168.117.129" /var/log/apache2/access.log
```

## Evidence

```text
attacks/web-enum/screenshots/gobuster-results.png
attacks/web-enum/logs/gobuster.log
gifs/simulations/end-to-end-web-enum.gif
```
