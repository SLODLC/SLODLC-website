---
id: grafana-loki
title: Grafana Loki
sidebar_label: Grafana Loki
sidebar_position: 9
toc_min_heading_level: 2
toc_max_heading_level: 5
description: Details about integration with Grafana Loki
keywords:
  - Grafana Loki
  - SLO
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Grafana Loki

Grafana Loki (or Loki) is a horizontally-scalable, multi-tenant log aggregation system that is extremely easy to operate. Loki does not index the contents of the logs, but rather a set of labels for each log stream. Nobl9 users can leverage Loki to query and build metrics on top of their logs.

## Scope of Support

Currently, the Grafana Loki integration with Nobl9 does not support the Direct connection.

## Authentication

Loki does not provide an authentication layer.  Authentication is up to the customer.  Users are expected to run an authenticating reverse proxy in front of their services, such as NGINX using basic `auth` or an `OAuth2` proxy.

Nobl9 collects only the URL for the Loki integration definition and calls the `GET /loki/api/v1/query_range` URL. For details, refer to [HTTP API Grafana Loki | Grafana Loki Documentation](https://grafana.com/docs/loki/latest/api/#examples).

### Authenticating Grafana Loki Agent with the `basic_auth` Proxy

Since Loki does not provide an authentication layer, the authentication method is up to the users. Normally, Loki's users are expected to run an authenticating reverse proxy in front of their services, such as `NGINX` using `basic_auth` proxy.

If that's the method you use, the Nobl9 Agent version equal to or higher than 0.40.0, allows you to send an additional Authorization request header with the `basic_auth`.

Refer to the [section below](#deploying-grafana-loki-agent-with-basic_auth-method) for more details.

## Adding Grafana Loki as a Source in the UI

Follow the instructions below to add Grafana Loki as a Source, using Agent configuration.

1. Navigate to **Integrations > Sources**.

2. Click the <img src="/img/plus_button.png" alt="plus button" width="20" height="20"></img> button.

3. Click the Grafana Loki icon.

4. Choose **Agent**, then configure the source as described below.

### Grafana Loki Agent

#### Agent Configuration in the UI

Follow the instructions below to configure your Grafana Loki Agent:

1. Add the **URL** (mandatory).<br/>
    The `url` is an entry point to Grafana Loki. It depends on the configuration of your Loki instance, for more details, refer to the [Configuration | Grafana Loki Documentation](https://grafana.com/docs/loki/latest/configuration/) section of Grafana Loki technical documentation.

2. Select a **Project** (mandatory).<br/>
    Specifying a project is helpful when multiple users are spread across multiple teams or projects. When the Project field is left blank, a default value appears.

3. Enter a **Display name** (optional).<br/>
    You can enter a friendly name with spaces in this field.

4. Enter a **Name** (mandatory).<br/>
    The name is mandatory and can only contain lowercase, alphanumeric characters and dashes (for example, `my-project-name`). This field is populated automatically when you enter a display name, but you can edit the result.

5. Enter a **Description** (optional).<br/>
    Here you can add details such as who is responsible for the integration (team/owner) and the purpose of creating it.

6. Click the <span style={{color: '#D92680'}}>**Add Data Source**</span> button.

<!-- Currently, the Agent can't be applied via sloctl, scetion TBA in the futue. #### Agent Using CLI - YAML

The YAML for configuring your Grafana Loki Agent looks like this:

```yaml
apiVersion: n9/v1alpha
kind: Agent
metadata:
  name: grafana-loki-agent
  displayName: Grafana Loki Agent
  project: default
spec:
  description: Agent settings for Grafana Loki datasource
  sourceOf:
  - Metrics
  - Services
  grafanaLoki:
    url: http://loki.example.com
```

**Important notes:**

* `url` is an entry point to Grafana Loki. The `url` depends on the configuration of your Loki instance, for more details, refer to the [Configuration | Grafana Loki Documentation](https://grafana.com/docs/loki/latest/configuration/) section of Grafana Loki technical documentation. -->

#### Deploying Grafana Loki Agent

To start the Agent process you can either apply the YAML config file to a Kubernetes cluster or run a Docker container from the code snippet. Both the Kubernetes config and Docker snippet are available in Agent details in the Web UI. Be sure to swap in your credentials.

<Tabs>
<TabItem value="code" label="Kubernetes" default>

If you use Kubernetes, you can apply the following command to deploy the Agent. It will look something like this:

```yaml
# DISCLAIMER: This deployment description contains only the fields necessary for the purpose of this demo.
# It is not a ready-to-apply k8s deployment description, and the client_id and client_secret are only exemplary values.

apiVersion: v1
kind: Secret
metadata:
  name: nobl9-agent-nobl9-dev-grafana-loki-name
  namespace: default
type: Opaque
stringData:
  client_id: "unique_client_id"
  client_secret: "unique_client_secret"
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nobl9-agent-nobl9-dev-grafana-loki-lokiagent
  namespace: default
spec:
  replicas: 1
  selector:
    matchLabels:
      nobl9-agent-name: "lokiagent"
      nobl9-agent-project: "grafana-loki"
      nobl9-agent-organization: "nobl9-dev"
  template:
    metadata:
      labels:
        nobl9-agent-name: "lokiagent"
        nobl9-agent-project: "grafana-loki"
        nobl9-agent-organization: "nobl9-dev"
    spec:
      containers:
        - name: agent-container
          image: nobl9/agent:latest
          resources:
            requests:
              memory: "350Mi"
              cpu: "0.1"
          env:
            - name: N9_CLIENT_ID
              valueFrom:
                secretKeyRef:
                  key: client_id
                  name: nobl9-agent-nobl9-dev-grafana-loki-lokiagent
            - name: N9_CLIENT_SECRET
              valueFrom:
                secretKeyRef:
                  key: client_secret
                  name: nobl9-agent-nobl9-dev-grafana-loki-name
```

</TabItem>
<TabItem value="shell" label="Docker">

If you use Docker, you can run the Docker command to deploy the Agent. It will look something like this:

```shell
# DISCLAIMER: This Docker command contains only the fields necessary for the purpose of this demo.
# It is not a ready-to-apply command, and you will need to replace the placeholder values with your own values.

docker run -d --restart on-failure \
  --name nobl9-agent-nobl9-dev-grafana-loki-lokiagent \
  -e N9_CLIENT_ID="unique_client_id" \
  -e N9_CLIENT_SECRET="unique_client_secret" \
  nobl9/agent:latest
```

</TabItem>
</Tabs>

To verify that the Nobl9 agent has been successfully deployed, check the Connection Status field in the UI.

#### Deploying Grafana Loki Agent with `basic_auth` Method

To enable basic auth for an Agent it is needed to pass optional environmental variables to an Agent:

* `AUTH_METHOD: basic_auth` - is a fixed value but it must be passed to let know Agent that `basic_auth` will be used.
  * `USERNAME: REDACTED` - username for `basic_auth`.

  * `PASSWORD: REDACTED` - password for `basic_auth`.

<Tabs>
<TabItem value="yaml2" label="Kubernetes" default>

If you use Kubernetes, you can apply the following command to deploy the Agent using `basic_auth` method. It will look something like this:

```yaml
# DISCLAIMER: This deployment description contains only the fields necessary for the purpose of this demo.
# It is not a ready-to-apply k8s deployment description, and the client_id and client_secret are only exemplary values.

apiVersion: v1
kind: Secret
metadata:
  name: nobl9-agent-nobl9-dev-stable-grafana-loki
  namespace: default
type: Opaque
stringData:
  client_id: "REDACTED"
  client_secret: "REDACTED"
  basic_auth_username: "REDACTED"
  basic_auth_password: "REDACTED"
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nobl9-agent-nobl9-dev-stable-grafana-loki
  namespace: default
spec:
  replicas: 1
  selector:
    matchLabels:
      nobl9-agent-name: "grafana-loki"
      nobl9-agent-project: "grafana-loki"
      nobl9-agent-organization: "nobl9-dev-stable"
  template:
    metadata:
      labels:
        nobl9-agent-name: "grafana-loki"
        nobl9-agent-project: "grafana-loki"
        nobl9-agent-organization: "nobl9-dev-stable"
    spec:
      containers:
        - name: agent-container
          image: nobl9/agent:0.40.0
          resources:
            requests:
              memory: "350Mi"
              cpu: "0.1"
          env:
            - name: N9_CLIENT_ID
              valueFrom:
                secretKeyRef:
                  key: client_id
                  name: nobl9-agent-nobl9-dev-stable-grafana-loki
            - name: N9_CLIENT_SECRET
              valueFrom:
                secretKeyRef:
                  key: client_secret
                  name: nobl9-agent-nobl9-dev-stable-grafana-loki
            - name: AUTH_METHOD
              value: "basic_auth"
            - name: USERNAME
              valueFrom:
                secretKeyRef:
                  key: basic_auth_username
                  name: nobl9-agent-nobl9-dev-grafana-loki-with-basic-auth
            - name: PASSWORD
              valueFrom:
                secretKeyRef:
                  key: basic_auth_password
                  name: nobl9-agent-nobl9-dev-grafana-loki-with-basic-auth
```

</TabItem>
<TabItem value="docker2" label="Docker" default>

If you use Docker, you can run the Docker command to deploy the Agent with the `basic_auth` method. It will look something like this:

```shell
# DISCLAIMER: This Docker command contains only the fields necessary for the purpose of this demo.
# It is not a ready-to-apply command, and you will need to replace the placeholder values with your own values.

docker run -d --restart on-failure \
  --name nobl9-agent-nobl9-dev-stable-grafana-loki-grafana-loki \
  -e N9_CLIENT_SECRET="REDACTED" \
  -e N9_CLIENT_ID="REDACTED" \
  -e AUTH_METHOD="basic_auth" \
  -e USERNAME="REDACTED" \
  -e PASSWORD="REDACTED" \
  nobl9/agent:0.40.0
```

</TabItem>
</Tabs>

## Creating SLOs with Grafana Loki

The section below outlines how to create your SLOs in the Nobl9 web app (UI) and by applying YAML files through `sloctl`.

### Creating SLOs in the UI

Follow the instructions below to create your SLOs with Grafana Loki in the UI:

1. Navigate to **Service Level Objectives**.

2. Click the <img src="/img/plus_button.png" alt="plus button" width="20" height="20"></img> button.

3. In step 1 of the SLO wizard, select the **Service** the SLO will be associated with.

4. In step 2, select Grafana Loki as the **Data Source** for your SLO, then specify the **Metric**. You can choose either a **Threshold Metric**, where a single time series is evaluated against a threshold or a **Ratio Metric**, which allows you to enter two time series to compare (for example, a count of good requests and total requests).
    Enter a **Query**, or **Good Query** and **Total Query** for the metric you selected.
    Refer to the [Query Examples](#query-examples) section below for more details.

5. In step 3, define a **Time Window** for the SLO.

6. In step 4, specify the **Error Budget Calculation Method** and your **Objective(s)**.

7. In step 5, add a **Name**, **Description**, and other details about your SLO. You can also select **Alert Policies** and **Labels** on this screen.

8. When you’re done, click <span style={{color: '#D92680'}}>**Create SLO**</span>.

### YAML examples

<Tabs>
<TabItem value="code" label="rawMetric" default>

Here’s an exmpample of Grafana Loki using a `rawMetric` (**Threshold metric**):

```yaml
apiVersion: n9/v1alpha
kind: SLO
metadata:
  name: n9-kafka-main-cluster-alerts-error-budgets-out-lag-threshold
  project: grafana-loki
spec:
  description: Example of Loki Metric query
  service: grafana-loki-service
  indicator:
    metricSource:
      name: grafana-loki
    rawMetric:
      grafanaLoki:
        logql: sum(sum_over_time({topic="error-budgets-out", consumergroup="alerts", cluster="main"} |= "kafka_consumergroup_lag" | logfmt | line_format "{{.kafka_consumergroup_lag}}" | unwrap kafka_consumergroup_lag [1m]))
  timeWindows:
    - unit: Day
      count: 1
      isRolling: true
  budgetingMethod: Occurrences
  objectives:
    - displayName: Good
      op: lte
      value: 5
      target: 0.50
    - displayName: Moderate
      op: lte
      value: 10
      target: 0.75
```

</TabItem>
<TabItem value="example" label="countMetric">

Here’s an example of Grafana Loki as a `countMetric` (**Ratio metric**):

```yaml
apiVersion: n9/v1alpha
kind: SLO
metadata:
  displayName: intake-response-duration
  name: response-duration
  project: grafana-loki
spec:
  alertPolicies: []
  budgetingMethod: Occurrences
  description: ""
  indicator:
    metricSource:
      kind: Agent
      name: grafana-loki
      project: grafana-loki
    rawMetric:
      grafanaLoki:
        logql: avg(avg_over_time({app="nobl9", component="intake"} |= "duration" |= "main.nobl9.dev" | json | line_format "{{.log}}" | json | http_useragent != "ELB-HealthChecker/2.0" | unwrap duration [1m]))
  objectives:
    - displayName: Perfect
      op: lte
      target: 0.95
      value: 59000000
  service: grafana-loki-service
  timeWindows:
    - count: 1
      isRolling: true
      unit: Hour
---
apiVersion: n9/v1alpha
kind: SLO
metadata:
  displayName: intake-correct-responses-ratio
  name: intake-correct-responses-ratio
  project: grafana-loki
spec:
  alertPolicies: []
  budgetingMethod: Occurrences
  description: ""
  indicator:
    metricSource:
      kind: Agent
      name: grafana-loki
      project: grafana-loki
  objectives:
    - countMetrics:
        good:
          grafanaLoki:
            logql: count(count_over_time(({app="nobl9", component="intake"} | json | line_format "{{.log}}" | json | http_useragent != "ELB-HealthChecker/2.0" | http_status_code >= 200 and http_status_code < 300)[1m]))
        incremental: false
        total:
          grafanaLoki:
            logql: count(count_over_time(({app="nobl9", component="intake"} | json | line_format "{{.log}}" | json | http_useragent != "ELB-HealthChecker/2.0" | http_status_code > 0)[1m]))
      displayName: Perfect
      target: 0.99
      value: 1
  service: grafana-loki-service
  timeWindows:
    - count: 1
      isRolling: true
      unit: Hour
---
apiVersion: n9/v1alpha
kind: SLO
metadata:
  displayName: ingest-correct-responses-ratio
  name: ingest-correct-responses-ratio
  project: grafana-loki
spec:
  alertPolicies: []
  budgetingMethod: Occurrences
  description: ""
  indicator:
    metricSource:
      kind: Agent
      name: grafana-loki
      project: grafana-loki
  objectives:
    - countMetrics:
        good:
          grafanaLoki:
            logql: count(count_over_time(({app="nobl9", component="ingest", container="ingest-container"} | json | line_format "{{.log}}" | json | http_useragent != "ELB-HealthChecker/2.0" | http_status_code >= 200 and http_status_code < 300)[1m]))
        incremental: false
        total:
          grafanaLoki:
            logql: count(count_over_time(({app="nobl9", component="ingest", container="ingest-container"} | json | line_format "{{.log}}" | json | http_useragent != "ELB-HealthChecker/2.0" | http_status_code > 0)[1m]))
      displayName: Stable
      target: 0.99
      value: 1
  service: grafana-loki-service
  timeWindows:
    - count: 1
      isRolling: false
      unit: Day
      calendar:
        startTime: 2021-09-20 12:30:00 # date with time in 24h format
        timeZone: America/New_York
```

</TabItem>
</Tabs>

Metrics for Grafana Loki have 1 mandatory field:

* `logql` is a query written in the PromQL (Prometheus Query Language). For more details, refer to [Introduction to PromQL | Grafana Documentation](https://grafana.com/blog/2020/02/04/introduction-to-promql-the-prometheus-query-language/). You can see working examples of Grafana Loki queries in the [Query Examples](#query-examples) section below.

## Querying the Grafana Loki Server

Nobl9 calls Loki API every minute to retrieve the log data from the previous minute. Nobl9 will aggregate the total number of points to 4 per minute.

:::caution
Users should refrain from adding duration and Nobl9 will append `[1m]` to the query.
:::

## Query Examples

* Ratio metric for Grafana Loki:<br/>
    Good Query:<br/>
    `count(count_over_time(({app="nobl9", component="ingest", container="ingest container"} | json | line_format "{{.log}}" | json | http_useragent != "ELB-HealthChecker/2.0" | http_status_code >= 200 and http_status_code < 300)[1m]))`<br/>
    Total Query:<br/>
    `count(count_over_time(({app="nobl9", component="ingest", container="ingest-container"} | json | line_format "{{.log}}" | json | http_useragent != "ELB-HealthChecker/2.0" | http_status_code > 0)[1m]))`

## Useful Links

[Grafana HTTP API | Grafana Loki Documentation](https://grafana.com/docs/loki/latest/api/#examples)

[Introduction to PromQL | Grafana Documentation](https://grafana.com/blog/2020/02/04/introduction-to-promql-the-prometheus-query-language/)
