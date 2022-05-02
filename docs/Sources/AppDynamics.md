---
id: appdynamics
title: AppDynamics
sidebar_label: AppDynamics
sidebar_position: 4
toc_min_heading_level: 2
toc_max_heading_level: 5
description: Details about integration with AppDynamics
keywords:
  - AppDynamics
  - SLO
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# AppDynamics

AppDynamics is a performance management program for applications. It helps users to gain a comprehensive understanding of the impact of technical difficulties on business goals, allowing IT teams to prioritize their efforts in a way that improves ROI.

## Scope of Support

Currently, Nobl9 does not support metric paths that contain [Wild Cards | AppDynamics Documentation](https://docs.appdynamics.com/21.11/en/appdynamics-essentials/dashboards-and-reports/custom-dashboards/widgets/use-wildcards-in-metric-definitions).

## Prerequisites

1. The Nobl9 Agent has a firewall access to : `http://<controller_host>:<controller_port>/controller/rest/<REST_URI>`.

2. To connect to AppDynamics, your AppDynamics API client needs at least the `Dashboard Viewer` permissions.

### Authentication

Nobl9 Agent calls the [Metric and Snapshot API | AppDynamics Documentation](https://docs.appdynamics.com/21.11/en/extend-appdynamics/appdynamics-apis/metric-and-snapshot-api). The Agent and Direct configurations for AppDynamics require the following credentials:

* **Client ID**: The AppDynamics Client ID is built from your AppDynamics `apiClientName` and AppDynamics `accountName` link with the `@` sign. For example: `apiClientName@accountName`.<br />
  * To retrieve `apiClientName`, log in to your AppDynamics account, go to Administration (under cog icon) / API Clients (tab), select an API client and copy `Client Name`.<br />
  * To retrieve your `accountName`, log in to your AppDynamics account, go to the Licence (under cog icon) / Licence Summary / Account Details section and copy the `Name`.

* **Controller URL**: It is an entry point for Nobl9 to AppDynamics instance. Example: `http://yourcompany.saas.appdynamics.com`

* **Client Secret**: Follow the instructions in the [API Clients | AppDynamics Documentation](https://docs.appdynamics.com/21.11/en/extend-appdynamics/appdynamics-apis/api-clients) section of the AppDynamics documentation to create your Client Secret.

## Adding AppDynamics as a Source in the UI

Follow the instructions below to add AppDynamics as a Source, using Agent or Direct connection.

1. Navigate to **Integrations > Sources**.

2. Click the <img src="/img/plus_button.png" alt="plus button" width="20" height="20"></img> button.

3. Click the AppDynamics icon.

4. Choose **Direct** or **Agent**.

### Direct Configuration for AppDynamics

Direct connection to AppDynamics requires users to enter their credentials which Nobl9 will store safely.

1. Enter the **Controller URL** (required).

2. Enter your AppDynamics **ClientID** (required).

3. Enter your AppDynamics **Client Secret** (required).

4. Select a **Project** (mandatory).<br/>
    Specifying a Project is helpful when multiple users are spread across multiple teams or projects. When the Project field is left blank then object is assigned to project `default`.

5. Enter a **Display name** (optional).<br/>
    You can enter a friendly name with spaces in this field.

6. Enter a **Name** (mandatory).<br/>
    The name is mandatory and can only contain lowercase, alphanumeric characters and dashes (for example, `my-project-name`). This field is populated automatically when you enter a display name, but you can edit the result.

7. Enter a **Description** (optional).<br/>
    Here you can add details such as who is responsible for the integration (team/owner) and the purpose of creating it.

8. Click the <span style={{color: '#D92680'}}>**Add Data Source**</span> button.

### AppDynamics Agent

#### Agent Configuration in the UI

Follow the instructions below to create your AppDynamics agent connection:

1. Enter the **Controller URL** (required).

2. Enter a **Project** (required)

3. Enter a **Name** (required).

4. Enter a **Description** (optional).

5. Click the <span style={{color: '#D92680'}}>**Add Data Source**</span> button.

<!-- Currently, the Agent can't be applied via sloctl, scetion TBA in the futue. #### Agent Using CLI - YAML

The YAML for an agent connection to AppDynamics looks like this:

```yaml
apiVersion: n9/v1alpha
kind: Agent
metadata:
  name: appdynamics-agent
  displayName: AppDynamics Agent
  project: default
spec:
  description: Agent settings for appdynamics
  sourceOf:
  - Metrics
  - Services
  appDynamics:
    url: https://yourcompany.saas.appdynamics.com
```

**Important notes:**

* `url` is mandatory. It is a base URL to an AppDynamics Controller. For more details, refer to [AppDynamics Concepts | AppDynamics Documentation](https://docs.appdynamics.com/display/PRO21/AppDynamics+Concepts). -->

#### Deploying AppDynamics Agent

To start the Agent process you can either apply the YAML config file to a Kubernetes cluster or run a Docker container from the code snippet. Both the Kubernetes config and Docker snippet are available in Agent details in the Web UI. Be sure to swap in your credentials (e.g., replace `<APPD_CLIENT_ID>` and `<APPD_CLIENT_SECRET>` with your organization key).

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
  appd_client_id: "<APPD_CLIENT_ID>"
  appd_client_secret: "<APPD_CLIENT_SECRET>"
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
      nobl9-agent-name: "appdynamics-agent"
      nobl9-agent-project: "appdynamics-project"
      nobl9-agent-organization: "nobl9-dev"
  template:
    metadata:
      labels:
        nobl9-agent-name: "appdynamics-agent"
        nobl9-agent-project: "appdynamics-project"
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
            - name: APPD_CLIENT_ID
              valueFrom:
                secretKeyRef:
                  key: appd_client_id
                  name: nobl9-agent-nobl9-dev-default-name
            - name: APPD_CLIENT_SECRET
              valueFrom:
                secretKeyRef:
                  key: appd_client_secret
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
  -e APPD_CLIENT_ID="<APPD_CLIENT_ID>" \
  -e APPD_CLIENT_SECRET="<APPD_CLIENT_SECRET>" \
  nobl9/agent:latest
```

</TabItem>
</Tabs>

## Creating SLOs with AppDynamics

The section below outlines how to create your SLOs in the Nobl9 web app (UI) and by applying YAML files through `sloctl`.

### Creating SLOs in the UI

Follow the instructions below to create your SLOs with AppDynamics in the UI:

1. Select a data source for your SLO.

2. Enter the **Application Name**.

    * The **Application Name** refers to the one configured in the AppDynamics agent `APPDYNAMICS_AGENT_APPLICATION_NAME` environment variable.

3. In step 2, select AppDynamics as the **Data Source** for your SLO, then specify the **Metric**. You can choose either a **Threshold Metric**, where a single time series is evaluated against a threshold or a **Ratio Metric**, which allows you to enter two time series to compare (for example, a count of good requests and total requests).

    1. Enter a **Query**, or **Good Query** and **Total Query** for the metric you selected. The following are query examples:

    2. Threshold metric for AppDynamics:
        Query: `End User Experience|App|End User Response Time 95th percentile (ms)`

    3. Ratio metric for AppDynamics:
        Good Query: `End User Experience|App|Very Slow Requests`
        Total Query: `End User Experience|App|Normal Requests`

4. In step 3, define a **Time Window** for the SLO.

5. In step 4, specify the **Error Budget Calculation Method** and your **Objective(s)**.

6. In step 5, add a **Name**, **Description**, and other details about your SLO. You can also select **Alert Policies** and **Labels** on this screen.

7. When you’re done, click <span style={{color: '#D92680'}}>**Create SLO**</span>.

### AppDynamics SLOs - YAML examples

Here are examples of AppDynamics using a `rawMetric` (**Threshold Metric**) and a `countMetric` (**Ratio Metric**):

<Tabs>
<TabItem value="code" label="rawMetric" default>

Here’s an example of AppDynamics using a `rawMetric` (**Threshold Metric**)

```yaml
apiVersion: n9/v1alpha
kind: SLO
metadata:
  name: appdynamics-threshold
  displayName: AppDynamics Threshold
  project: appdynamics
spec:
  description: 95th percentile of End User Response 1 Week Calendar
  service: appdynamics-service
  indicator:
    metricSource:
      name: appdynamics-agent
    rawMetric:
      appDynamics:
        applicationName: "myApplication"
        metricPath: "End User Experience|App|End User Response Time 95th percentile (ms)"
  timeWindows:
    - unit: Day
      count: 7
      calendar:
        startTime: 2020-03-09 00:00:00
        timeZone: Europe/Warsaw
  budgetingMethod: Occurrences
  objectives:
    - displayName: Acceptable
      op: lte
      value: 10000
      target: 0.75
```

</TabItem>
<TabItem value="example" label="countMetric">

Here’s an example of AppDynamics using a `countMetric` (**Ratio Metric**):

```yaml
apiVersion: n9/v1alpha
kind: SLO
metadata:
  name: appdynamics-ratio
  displayName: AppDynamics Ratio
  project: appdynamics
spec:
  description: AppDynamics End User Response 1 Week Calendar
  service: appdynamics-service
  indicator:
    metricSource:
      name: appdynamics-agent
  timeWindows:
    - unit: Day
      count: 7
      calendar:
        startTime: 2020-03-09 00:00:00
        timeZone: Europe/Warsaw
  budgetingMethod: Occurrences
  objectives:
    - displayName: Slow Requests
      value: 10
      target: 0.50
      countMetrics:
        incremental: false
        good:
          appDynamics:
            applicationName: "myApplication"
            metricPath: "End User Experience|App|Slow Requests"
        total:
          appDynamics:
            applicationName: "myApplication"
            metricPath: "End User Experience|App|Normal Requests"
    - displayName: Very Slow Requests
      value: 50
      target: 0.91
      countMetrics:
        incremental: false
        good:
          appDynamics:
            applicationName: "myApplication"
            metricPath: "End User Experience|App|Very Slow Requests"
        total:
          appDynamics:
            applicationName: "myApplication"
            metricPath: "End User Experience|App|Normal Requests"
```

</TabItem>
</Tabs>

**Important notes:**

Metric specification from AppDynamics has 2 mandatory fields:

* `applicationName` – mandatory, _string_, Application name as configured in AppDynamics agent's `APPDYNAMICS_AGENT_APPLICATION_NAME` environment variable. For more details, refer to [Configuring Agents in Kubernetes | AppDynamics Documentation](https://docs.appdynamics.com/display/PRO21/Configuring+Agents+in+Kubernetes) in AppDynamics APM Platform Documentation.

    On top of the same validation rules for `appDynamics` sections as for the `rawMetric` (**Threshold Metric**), there is an additional requirement that all `applicationName` fields must have the same value within a single SLO.

* `metricPath` – mandatory, _string_, Full metric path that can be obtained from AppDynamics Controller UI (dashboard).

    `metricPath` must refer to a single time series.

    Example: `"End User Experience|App|End User Response Time 95th percentile (ms)"`

    The list of metrics Full Path and their Application Names can be copied directly from the AppDynamics dashboard.

## Querying the AppDynamics Server

The Nobl9 agent leverages the Time Range API parameters. It pulls data at a per-minute interval from the AppDeynamics server.

## Useful Links

* [Wildcards | AppDynamics Documentation](https://docs.appdynamics.com/display/PRO21/Use+Wildcards+in+Metric+Definitions)

* [Configuring Agents in Kubernetes | AppDynamics Documentation](https://docs.appdynamics.com/display/PRO21/Configuring+Agents+in+Kubernetes)

* [Configure Resource URL Segments | AppDynamics Documentation](https://docs.appdynamics.com/21.2/en/end-user-monitoring/browser-monitoring/browser-real-user-monitoring/configure-the-yamlscript-agent/configure-resource-url-segments)

* [AppDynamics Concepts | AppDynamics Documentation](https://docs.appdynamics.com/display/PRO21/AppDynamics+Concepts)

* [Metric and Snapshot API | AppDynamics Documentation](https://docs.appdynamics.com/21.11/en/extend-appdynamics/appdynamics-apis/metric-and-snapshot-api)