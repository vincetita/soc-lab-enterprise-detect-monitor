# Grafana Dashboards

## Role

Grafana is the visualization layer. It sits above Prometheus and provides dashboards for SOC observability.

## Access

```text
http://192.168.117.30:3000
```

Default login:

```text
admin / admin
```

## Logical Architecture

```text
Linux / Windows Exporters → Prometheus → Grafana Dashboards
```

## Recommended Dashboards

| Dashboard | Purpose |
|---|---|
| SOC Overview | full lab status |
| Linux Performance | Ubuntu metrics |
| Windows Security | Win11/DC01 metrics |
| System Health | executive view |

## Key Queries

CPU:

```promql
100 - (avg by(instance) (irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)
```

Network:

```promql
rate(node_network_receive_bytes_total[5m])
```

Windows CPU:

```promql
100 - (avg by(instance) (rate(windows_cpu_time_total{mode="idle"}[5m])) * 100)
```

## Evidence

```text
monitoring/grafana/screenshots/grafana-dashboard.png
monitoring/grafana/screenshots/grafana-soc-overview.png
monitoring/grafana/screenshots/grafana-windows-metrics.png
monitoring/grafana/gifs/grafana-dashboard.gif
monitoring/grafana/gifs/grafana-live-metrics.gif
```
