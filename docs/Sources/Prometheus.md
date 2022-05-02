---
id: prometheus
title: Prometheus
sidebar_label: Prometheus
sidebar_position: 16
toc_min_heading_level: 2
toc_max_heading_level: 5
description: Details about integration with Prometheus
keywords:
  - OpenTSDB
  - SLO
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Prometheus

Prometheus is an open-source software application used for event monitoring and alerting. It records real-time metrics in a time series database built using an HTTP pull model, with flexible query language and real-time alerting.

## Scope of Support

Currently, Prometheus integration supports Agent configuration only.

## Authentication

Prometheus does not provide an authentication layer, the Nobl9 Agent only collects the URL for the Prometheus integration definition. Authentication is up to the user. Operators are expected to run an authenticating reverse proxy in front of their services, such as NGINX using basic auth or an OAuth2 proxy.

### Authenticating Prometheus Agent with the `basic_auth` Proxy

Since Prometheus does not provide an authentication layer, the authentication method is up to the users. Normally, Loki's users are expected to run an authenticating reverse proxy in front of their services, such as `NGINX` using `basic_auth` proxy.

If that's the method you use, the Nobl9 Agent version equal to or higher than 0.40.0, allows you to send an additional Authorization request header with the `basic_auth`.

Refer to the [section below](#deploying-prometheus-agent-with-basic_auth-method) for more details.

## Adding Prometheus as a Source in the UI

Follow the instructions below to add Prometheus as a Source, using Agent.

1. Navigate to **Integrations > Sources**.

2. Click the <img src="/img/plus_button.png" alt="plus button" width="20" height="20"></img> button.

3. Click the Prometheus icon.

4. Choose the **Agent**, then configure the source as described below.

### Prometheus Agent

#### Agent Configuration in the UI

Follow the instructions below to create your Prometheus Agent connection:

1. Add the **URL** to connect to your data source (mandatory).

2. Select a **Project** (mandatory).<br/>
    Specifying a Project is helpful when multiple users are spread across multiple teams or projects. When the Project field is left blank, a default value appears.

3. Enter a **Display name** (optional).<br/>
    You can enter a friendly name with spaces in this field.

4. Enter a **Name** (mandatory).<br/>
    The name is mandatory and can only contain lowercase, alphanumeric characters and dashes (for example, `my-project-name`). This field is populated automatically when you enter a display name, but you can edit the result.

5. Enter a **Description** (optional).<br/>
    Here you can add details such as who is responsible for the integration (team/owner) and the purpose of creating it.

6. Click the <span style={{color: '#D92680'}}>**Add Data Source**</span> button.

<!-- Currently, the Agent can't be applied via sloctl, scetion TBA in the futue. #### Agent Using CLI - YAML

The YAML for configuring your Prometheus Agent looks like this:

```yaml
apiVersion: n9/v1alpha
kind: Agent
metadata:
  name: prometheus-agent
  displayName: Prometheus Agent
  project: default
spec:
  description: Agent settings for Prometheus datasource
  sourceOf:
  - Metrics
  - Services
  prometheus:
    url: http://prometheus.example.com
```

**Important notes:**

Agent specification for Prometheus has one field:

* `spec.prometheus.url` – _string:_ base URL to Prometheus server. -->

**Prometheus** Agent makes requests to [Range Queries | Prometheus Documentation](https://prometheus.io/docs/prometheus/latest/querying/api/#range-queries) API endpoint in the form `/api/v1/query_range`. For example:

```yaml
GET /api/v1/query_range
POST /api/v1/query_range
```

Hence, do not include the above API path in the URL. Specify only the base URL for
the Prometheus server. For example, if your Prometheus server is available under `<http://prometheus.example.com>` and you access API via `<http://prometheus.example.com/api/v1>`, use only `<http://prometheus.example.com>`.

Other APIs or Web UIs have similar path endings, which should also be omitted, for example, the `/graph` part of the path.

The Prometheus integration does not integrate directly with data exposed from services in the [Prometheus Format | Prometheus Documentation](https://prometheus.io/docs/concepts/data_model/), usually under `/metrics` path. Do not set the URL to metrics exposed directly from such a service.

#### Deploying Prometheus Agent

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
  name: nobl9-agent-nobl9-dev-default-name
  namespace: default
type: Opaque
stringData:
  client_id: "unique_client_id"
  client_secret: "unique_client_secret"
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nobl9-agent-nobl9-dev-default-name
  namespace: default
spec:
  replicas: 1
  selector:
    matchLabels:
      nobl9-agent-name: "prometheus-agent"
      nobl9-agent-project: "default"
      nobl9-agent-organization: "nobl9-dev"
  template:
    metadata:
      labels:
        nobl9-agent-name: "prometheus-agent"
        nobl9-agent-project: "default"
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
                  name: nobl9-agent-nobl9-dev-default-name
            - name: N9_CLIENT_SECRET
              valueFrom:
                secretKeyRef:
                  key: client_secret
                  name: nobl9-agent-nobl9-dev-default-name
```

</TabItem>
<TabItem value="shell" label="Docker">

If you use Docker, you can run the Docker command to deploy the Agent. It will look something like this:

```shell
# DISCLAIMER: This Docker command contains only the fields necessary for the purpose of this demo.
# It is not a ready-to-apply command, and you will need to replace the placeholder values with your own values.

docker run -d --restart on-failure \
  --name nobl9-agent-nobl9-dev-default-name \
  -e N9_CLIENT_ID="unique_client_id" \
  -e N9_CLIENT_SECRET="unique_client_secret" \
  nobl9/agent:latest
```

</TabItem>
</Tabs>

#### Deploying Prometheus Agent with `basic_auth` Method

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
  name: nobl9-agent-nobl9-dev-stable-prometheus
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
  name: nobl9-agent-nobl9-dev-stable-prometheus
  namespace: default
spec:
  replicas: 1
  selector:
    matchLabels:
      nobl9-agent-name: "prometheus"
      nobl9-agent-project: "prometheus"
      nobl9-agent-organization: "nobl9-dev-stable"
  template:
    metadata:
      labels:
        nobl9-agent-name: "prometheus"
        nobl9-agent-project: "prometheus"
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
                  name: nobl9-agent-nobl9-dev-stable-prometheus
            - name: N9_CLIENT_SECRET
              valueFrom:
                secretKeyRef:
                  key: client_secret
                  name: nobl9-agent-nobl9-dev-stable-prometheus
            - name: AUTH_METHOD
              value: "basic_auth"
            - name: USERNAME
              valueFrom:
                secretKeyRef:
                  key: basic_auth_username
                  name: nobl9-agent-nobl9-dev-prometheus-with-basic-auth
            - name: PASSWORD
              valueFrom:
                secretKeyRef:
                  key: basic_auth_password
                  name: nobl9-agent-nobl9-dev-prometheus-with-basic-auth
```

</TabItem>
<TabItem value="docker2" label="Docker" default>

If you use Docker, you can run the Docker command to deploy the Agent with the `basic_auth` method. It will look something like this:

```shell
# DISCLAIMER: This Docker command contains only the fields necessary for the purpose of this demo.
# It is not a ready-to-apply command, and you will need to replace the placeholder values with your own values.

docker run -d --restart on-failure \
  --name nobl9-agent-nobl9-dev-stable-prometheus \
  -e N9_CLIENT_SECRET="REDACTED" \
  -e N9_CLIENT_ID="REDACTED" \
  -e AUTH_METHOD="basic_auth" \
  -e USERNAME="REDACTED" \
  -e PASSWORD="REDACTED" \
  nobl9/agent:0.40.0
```

</TabItem>
</Tabs>

## Creating SLOs with Prometheus

The section below outlines how to create your SLOs in the Nobl9 web app (UI) and by applying YAML files through `sloctl`.

### Creating SLOs in the UI

Follow the instructions below to create your SLOs with Prometheus in the UI:

1. Navigate to **Service Level Objectives**.

2. Click the <img src="/img/plus_button.png" alt="plus button" width="20" height="20"></img> button.

3. In step 1 of the SLO wizard, select the **Service** the SLO will be associated with.

4. In step 2, select Prometheus as the **Data Source** for your SLO, then specify the **Metric**. You can choose either a **Threshold Metric**, where a single time series is evaluated against a threshold or a **Ratio Metric**, which allows you to enter two time series to compare (for example, a count of good requests and total requests).

   1. Enter a **Query**, or **Good Query** and **Total Query** for the metric you selected. The following are query examples:

   * **Threshold metric** for Prometheus:<br/>
      Query: `myapp_server_requestMsec{host="*",job="nginx"}`

   * **Ratio metric** for Prometheus:<br/>
      Good Query: `sum(production_http_response_time_seconds_hist_bucket{method=~"GET|POST",status=~"2..|3..",le="1"})`<br/>
      Total Query: `sum(production_http_response_time_seconds_hist_bucket{method=~"GET|POST",le="+Inf"})`<br/>
5. In step 3, define a **Time Window** for the SLO.

6. In step 4, specify the **Error Budget Calculation Method** and your **Objective(s)**.

7. In step 5, add a **Name**, **Description**, and other details about your SLO. You can also select **Alert Policies** and **Labels** on this screen.

8. When you’re done, click <span style={{color: '#D92680'}}>**Create SLO**</span>.

### SLO Using Prometheus - YAML examples

<Tabs>
<TabItem value="code" label="rawMetric" default>

Here’s an example of Prometheus using a `rawMetric` (**Threshold metric**):

```yaml
apiVersion: n9/v1alpha
kind: SLO
metadata:
  displayName: My SLO
  name: my-slo
  project: my-project
spec:
  budgetingMethod: Occurrences
  description: ""
  indicator:
    metricSource:
      name: my-prometheus-source
    rawMetric:
       prometheus:
         promql: myapp_server_requestMsec{host="*",job="nginx"}
  service: my-service
  objectives:
  - target: 0.8
    op: lte
    displayName: average
    value: 200
  - target: 0.5
    op: lte
    displayName: so-so
    value: 150
  timeWindows:
    - calendar:
        startTime: "2020-11-14 11:00:00"
        timeZone: Etc/UTC
      count: 1
      isRolling: false
      unit: Day
```

</TabItem>
<TabItem value="example" label="countMetric">

Here’s an example of Prometheus using a `countMetric` (**Ratio metric**):

```yaml
apiVersion: n9/v1alpha
kind: SLO
metadata:
  displayName: prometheus-calendar-timeslices-ratio
  name: prometheus-calendar-timeslices-ratio
  project: prometheus
spec:
  budgetingMethod: Timeslices
  description: ""
  indicator:
    metricSource:
      name: prometheus
  service: prometheus-polakpotrafipl
  objectives:
    - target: 0.75
      countMetrics:
        good:
          prometheus:
            promql: sum(production_http_response_time_seconds_hist_bucket{method=~"GET|POST",status=~"2..|3..",le="1"})
        incremental: true
        total:
          prometheus:
            promql: sum(production_http_response_time_seconds_hist_bucket{method=~"GET|POST",le="+Inf"})
      displayName: available1
      timeSliceTarget: 0.75
      value: 1
  timeWindows:
   - calendar:
       startTime: "2020-11-14 11:00:00"
       timeZone: Etc/UTC
     count: 1
     isRolling: false
     unit: Day
```

</TabItem>
</Tabs>

Specification for metric from Prometheus always has one mandatory field:


* `promql` – a Prometheus query in the language called [PromQL | Prometheus Documentation](https://prometheus.io/docs/prometheus/latest/querying/basics/)
    (Prometheus Query Language) that lets the user select and aggregate time series data in real time.

## Useful Links

### Adding New Users Authentication to Prometheus Agent

For details, check the [Nobl9 Agent Guide](Nobl9_Agent.md#adding-new-users-authentication-to-prometheus-agent).

### Cortex Support with Nobl9 Prometheus Agent

[Cortex | Cortex Documentation](https://www.weave.works/oss/cortex/) is a database based on Prometheus with compatible API. Therefore, it is possible to use Cortex with the Nobl9 Prometheus Agent.

Cortex cluster setup is out of the scope of this document and is described in the [Cortex documentation](https://cortexmetrics.io/docs/). Cortex deployment can be simplified with the [official Helm chart](https://github.com/cortexproject/cortex-helm-chart).

As described in [Cortex Architecture | Cortex Documentatio](https://cortexmetrics.io/docs/architecture/), Prometheus API is exposed by the Nginx under default address `<http://cortex-nginx/prometheus`.> This address can be used as Prometheus URL in the Agent configuration panel. The default Prometheus endpoint can be changed according to the [API documentation | Cortex Documentation](https://cortexmetrics.io/docs/api/). In that case, the Agent needs to access the `/api/v1/query_range` endpoint.

### Thanos Support with Nobl9 Prometheus Agent

[Thanos](https://thanos.io/) is High Availability Prometheus setup and can be used with Nobl9 Prometheus Agent.

Thanos cluster setup is out of the scope of this document and is described in the [Thanos Components Documentation](https://thanos.io/tip/thanos/quick-tutorial.md/#components).

Thanos exposes Prometheus API using [Querier](https://thanos.io/tip/thanos/quick-tutorial.md/#querierquery). Querier address must be used as Prometheus URL in Nobl9 Agent configuration.

## Querying the Prometheus Server

The Nobl9 agent leverages the Prometheus API parameters. It pulls data at a per-minute interval from the Prometheus server.

## Useful Links

[HA Prometheus and Thanos](https://opencredo.com/blogs/ha-prometheus-the-thanos-evolution/)

[Cortex Documentation](https://cortexmetrics.io/docs/)

[Setting up a Prometheus SLO with NOBL9 (video)](https://www.youtube.com/watch?v=ugyw5yKrJwM)
