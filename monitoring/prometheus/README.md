# Prometheus Monitoring

## Role

Prometheus collects metrics from Linux and Windows systems.

## Access

```text
http://192.168.117.30:9090
```

Targets:

```text
http://192.168.117.30:9090/targets
```

## Queries

System up:

```promql
up
```

Linux CPU:

```promql
100 - (avg by(instance) (irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)
```

Linux network:

```promql
rate(node_network_receive_bytes_total[5m])
```

Windows CPU:

```promql
100 - (avg by(instance) (rate(windows_cpu_time_total{mode="idle"}[5m])) * 100)
```

## Evidence

```text
monitoring/prometheus/screenshots/prometheus-targets.png
monitoring/prometheus/screenshots/prometheus-graphs.png
monitoring/prometheus/screenshots/prometheus-win11-metrics.png
monitoring/prometheus/screenshots/prometheus-dc01-metrics.png
monitoring/prometheus/gifs/prometheus-dashboard.gif
```
