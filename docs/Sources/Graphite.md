---
id: graphite
title: Graphite
sidebar_label: Graphite
sidebar_position: 10
toc_min_heading_level: 2
toc_max_heading_level: 5
description: Details about integration with Graphite
keywords:
  - Graphite
  - SLO
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Graphite

Graphite is a monitoring tool used to track the performance of websites, applications, business services, and networked servers.

## Scope of Support

Currently, Nobl9 integration with Graphite does not support the Direct connection.

## Authentication

Graphite does not directly support authentication for connections to its HTTP API. Organizations can set it in their infrastructure. Nobl9 connects to Graphite through the Render URL API. To connect Nobl9 Agent to Graphite, you will need to specify your Render URL API endpoint that allows you to generate graphs and retrieve raw data from Graphite. For more details, see [The Render URL API | Graphite Documentation](https://graphite.readthedocs.io/en/latest/render_api.html).

### Optional Bearer Token

If `GRAPHITE_AUTH_BEARER_TOKEN` variable is set during agent startup, its value will be added as an Authorization header to every HTTP request.

### Optional HTTP Basic Authentication Credentials

This plugin allows credentials passed as environment variables during agent startup. The keys are `GRAPHITE_BASIC_AUTH_USERNAME` and `GRAPHITE_BASIC_AUTH_PASSWORD`.

## Adding Graphite as a Source

Follow the instructions below to add Graphite as a Source, using Agent configuration.

1. Navigate to **Integrations > Sources**.

2. Click the <img src="/img/plus_button.png" alt="plus button" width="20" height="20"></img> button.

3. Click the Graphite icon.

4. Choose **Agent**, then configure the source as described below.

### Graphite Agent

#### Agent Configuration in the UI

Follow the instructions below to configure your Graphite Agent:

1. Enter the **Render URL API** to connect to your data source.

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

The YAML for configuring to Graphite Agent looks like this:

```yaml
apiVersion: n9/v1alpha
kind: Agent
metadata:
  name: string
  displayName: string # optional
  project: default
spec:
  description: string # optional
  sourceOf:
  - Metrics
  - Services
  graphite:
    url:
```

**Important notes:**

Only one type of source configuration is allowed for Graphite’s Agent:

* `url`: string render API URL endpoint of Graphite's instance. For more details, refer to the [Authentication](#) section above. -->

#### Deploying Graphite Agent

To start the Agent process you can either apply the YAML config file to a Kubernetes cluster or run a Docker container from the code snippet. Both the Kubernetes config and Docker snippets are available in Agent details in the Web UI.

<Tabs>
<TabItem value="code" label="Kubernetes" default>

If you use Kubernetes, you can apply the following command to deploy the Agent. It will look something like this:

```yaml
# DISCLAIMER: This deployment description contains only the fields necessary for the purpose of this demo.
# It is not a ready-to-apply k8s deployment description, and the client_id and client_secret are only exemplary values.

apiVersion: v1
kind: Secret
metadata:
  name: nobl9-agent-graphite-secret
  namespace: default
type: Opaque
stringData:
  client_id: "unique_client_id"
  client_secret: "unique_client_secret"
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nobl9-agent-graphite-deployment
  namespace: default
spec:
  replicas: 1
  selector:
    matchLabels:
      nobl9-agent-name: "graphite-name"
      nobl9-agent-project: "graphite"
      nobl9-agent-organization: "organization"
  template:
    metadata:
      labels:
        nobl9-agent-name: "graphite-name"
        nobl9-agent-project: "graphite"
        nobl9-agent-organization: "organization"
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
                  name: nobl9-agent-graphite-secret
            - name: N9_CLIENT_SECRET
              valueFrom:
                secretKeyRef:
                  key: client_secret
                  name: nobl9-agent-graphite-secret
```

</TabItem>
<TabItem value="shell" label="Docker">

If you use Docker, you can run the Docker command to deploy the Agent. It will look something like this:

```shell
# DISCLAIMER: This docker command description is containing only the necessary fields for the purpose of this demo.
# It is not a ready-to-apply docker command.

docker run -d --restart on-failure \
  --name nobl9-agent-graphite-container \
  -e N9_CLIENT_ID="unique_client_id" \
  -e N9_CLIENT_SECRET="unique_client_secret" \
  nobl9/agent:latest
```

</TabItem>
</Tabs>

## Creating SLOs with Graphite

The section below outlines how to create your SLOs in the Nobl9 web app (UI) and by applying YAML files through `sloctl`.

### Creating SLOs in the UI

Follow the instructions below to create your SLOs with Graphite in the UI:

1. Navigate to **Service Level Objectives**.

2. Click the <img src="/img/plus_button.png" alt="plus button" width="20" height="20"></img> button.

3. In step 2, select Graphite as the **Data Source** for your SLO, then specify the **Metric**. You can choose either a **Threshold Metric**, where a single time series is evaluated against a threshold, or a **Ratio Metric**, which allows you to enter two time series to compare (for example, a count of good requests and total requests). Enter a **Query** or **Good Query**, and **Total Query** for the metric you selected. The following are query examples:

    * Threshold metric for Graphite:<br/>
        Query: `carbon.agents.9b365cce.cpuUsage`

    * Ratio metric for Graphite:<br/>
        Good Query: `stats_counts.response.200`<br/>
        Total Query: `astats_counts.response.all`<br/>

4. In step 3, define a **Time Window** for the SLO.

5. In step 4, specify the **Error Budget Calculation Method** and your **Objective(s)**.

6. In step 5, add a **Name**, **Description**, and other details about your SLO. You can also select **Alert Policies** and **Labels** on this screen.

7. When you’re done, click <span style={{color: '#D92680'}}>**Create SLO**</span>.

### Graphite SLOs - YAML examples

<Tabs>
<TabItem value="code" label="rawMetric" default>

Here’s an example of Graphite using a `rawMetric` (**Threshold metric**):

```yaml
apiVersion: n9/v1alpha
kind: SLO
metadata:
  name: graphite-slo-1
  project: graphite
spec:
  service: web-service
  indicator:
    metricSource:
      name: graphite-agent
    rawMetric:
      graphite:
        metricPath: carbon.agents.9b365cce.cpuUsage
  timeWindows:
    - unit: Day
      count: 7
      isRolling: true
  budgetingMethod: Occurrences
  objectives:
    - displayName: Good
      op: lte
      value: 100
      target: 0.9
```

</TabItem>
<TabItem value="example" label="countMetric">

Here’s an example of Graphite using a `countMetric` (**Ratio metric**):

```yaml
apiVersion: n9/v1alpha
kind: SLO
metadata:
  name: graphite-slo-2
  project: default
spec:
  service: web-service
  indicator:
    metricSource:
      name: graphite-agent
  timeWIndows:
    - unit: Day
      count: 7
      calendar:
        startTime: 2020-03-09 00:00:00
        timeZone: Europe/Warsaw
  budgetingMethod: Occurrences
  objectives:
    - displayName: Good
      target: 0.95
      countMetrics:
        incremental: false
        good:
          graphite:
            metricPath: stats_counts.response.200
        total:
          graphite:
            metricPath: stats_counts.response.all
```

</TabItem>
</Tabs>

Metric specification for Graphite has only one mandatory field:

* `metricPath` - it is a string field that specifies Graphite’s metric path, such as `servers.cpu.total`

Visit the following [link](https://graphite.readthedocs.io/en/latest/render_api.html#paths-and-wildcards) to understand Paths and Wildcards.

:::caution
The Graphite documentation suggests using `*`, `[`,`]`, `{`, or `}`, but Nobl9 does not support this functionality. When you use `*`, `[`,`]`, `{`, or `}`, a validation error occurs.
:::

## Querying the Graphite Server

Metrics are retrieved using the `from` and `until` parameters once per minute. The API returns a half-open interval `(from, until]`, which includes the end date but not the start date.

## Useful Links

* [Paths and Wildcards | Graphite Documentation](https://graphite.readthedocs.io/en/latest/render_api.html#paths-and-wildcards).
* [The Render URL API | Graphite Documentation](https://graphite.readthedocs.io/en/latest/render_api.html).