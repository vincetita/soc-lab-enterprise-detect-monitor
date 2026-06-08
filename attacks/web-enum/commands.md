# Web Enumeration Commands

```bash
ping 192.168.117.30
curl -I http://192.168.117.30
nmap -p 80 192.168.117.30
gobuster dir -u http://192.168.117.30 -w /usr/share/wordlists/dirb/common.txt -o attacks/web-enum/logs/gobuster.log
```
