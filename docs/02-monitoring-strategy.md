# Monitoring Strategy

## Layers

| Layer | Tool |
|---|---|
| Network | Security Onion |
| Endpoint/SIEM | Wazuh |
| Availability | Nagios |
| Metrics | Prometheus |
| Visualization | Grafana |

## Strategy

Use multiple sources to validate the same incident. A single alert is not enough. Confirm with logs, network, metrics, dashboard, and service status.
