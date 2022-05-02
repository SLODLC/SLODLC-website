---
id: thousandeyes
title: ThousandEyes
sidebar_label: ThousandEyes
sidebar_position: 19
toc_min_heading_level: 2
toc_max_heading_level: 5
description: Details about integration with ThousandEyes
keywords:
  - ThousandEyes
  - SLO
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# ThousandEyes

ThousandEyes monitors the performance of both local and wide-area networks. ThousandEyes combines Internet and WAN visibility, browser synthetics, end-user monitoring, and Internet Insights to deliver a holistic view of your hybrid digital ecosystem – across cloud, SaaS, and the Internet. It's a SaaS-based tool that helps troubleshoot application delivery and maps Internet performance.

## Scope of Support

Currently, Nobl9 integration with ThousandEyes supports 5 different metrics that are focused on latency:

* *Network Latency* - is the interval time (***in milliseconds***) from sending a network packet to when the test-assigned agent receives the response.

* *Network Loss* - is the total loss of the network packet (***in percents***).

* *Page Load* - is the interval of time (***in milliseconds***) from the load event to the point when the website is loaded.

* *DOM Load Time* - is the interval of time (***in milliseconds***) required for the browser to build the website’s Document Object Model (DOM)

* *HTTP Server Response* - is the interval between the beginning of the request and the web server successfully sending the first byte of the response to the client.

**Each measurement is obtained per ThousandEyes test interval.**

:::note
For details about all ThousandEyes metric types, check [ThousandEyes Knowledge Base | ThousandEyes Documentation](https://success.thousandeyes.com/ViewArticle?articleIdParam=kA0E0000000CmmzKAC) and [ThousandEyes End-to-End Metrics | ThousandEyes Documentation](https://developer.thousandeyes.com/v6/test_data/#/end-to-end_metrics).
:::

The following table is an overview of the ThousandEyes metric and corresponding Nobl9 values:

| Metric | Nobl9 Value |
|---|---|
| Network Latency | `net-latency` |
| Network loss | `net-loss`|
| Page load | `web-page-load` |
| DOM load time | `web-dom-load` |
| HTTP Server Response | `http-response-time` |

## Authentication

Nobl9 requires `OAUTH_BEARER_TOKEN` to communicate with ThousandEyes.

To get the `OAUTH_BEARER_TOKEN`:

1. Log in to your ThousandEyes account.

2. Navigate to **Account Settings**.

3. Select **Users and Roles**.

4. Navigate to the bottom of the page and you will see **User API Tokens**.

5. Select **OAuth Bearer Token**.
    Currently, Nobl9 only supports `OAUTH_BEARER_TOKEN`.

## Adding ThousandEyes as a Source in the UI

Follow the instructions below to add ThousandEyes as a Source, using Agent or Direct configuration.

1. Navigate to **Integrations > Sources**.

2. Click the <img src="/img/plus_button.png" alt="plus button" width="20" height="20"></img> button.

3. Click the ThousandEyes icon.

4. Choose **Direct** or **Agent**, then configure the source as described below.

### Direct Configuration for ThousandEyes

Direct configuration for ThousandEyes requires users to enter their credentials (`OAuth Bearer Token`) which Nobl9 will store safely.

Follow the instructions below to configure Direct for ThousandEyes:

1. Go to **Integrations** and click the <img src="/img/plus_button.png" alt="plus button" width="20" height="20"></img> button.

2. Select **ThousandEyes > Direct**.

3. Enter your **OAuth Bearer Token**.

4. Select a **Project** (mandatory).<br/>
    Specifying a Project is helpful when multiple users are spread across multiple teams or projects. When the Project field is left blank, a default value appears.

5. Enter a **Display name** (optional).<br/>
    You can enter a friendly name with spaces in this field.

6. Enter a **Name** (mandatory).<br/>
    The name is mandatory and can only contain lowercase, alphanumeric characters and dashes (for example, `my-project-name`). This field is populated automatically when you enter a display name, but you can edit the result.

7. Enter a **Description** (optional).<br/>
    Here you can add details such as who is responsible for the integration (team/owner) and the purpose of creating it.

8. Click the <span style={{color: '#D92680'}}>**Add Data Source**</span> button.

### ThousandEyes Agent

#### Agent Configuration in the UI

Follow the instructions below to configure your ThousandEyes Agent:

1. Go to **Integrations** and click on the <img src="/img/plus_button.png" alt="plus button" width="20" height="20"></img> button.

2. Select **ThousandEyes > Agent.**

3. Select a **Project** (mandatory)

4. Enter a **Display Name**.

5. Enter a **Name** (mandatory).

6. Enter a **Description** (optional).

7. Click the <span style={{color: '#D92680'}}>**Add Data Source**</span> button.

<!-- Currently, the Agent can't be applied via sloctl, scetion TBA in the futue. #### Agent Using CLI - YAML

The YAML for configuring your ThousandEyes Agent looks like this:

```yaml
- apiVersion: n9/v1alpha
  kind: Agent
  metadata:
    name: thousandeyes
    displayName: ThousandEyes
    project: thousandeyes
  spec:
    sourceOf:
      - Metrics
      - Services
    thousandEyes: {}
``` -->

#### Deploying ThousandEyes Agent

To start the Agent process you can either apply the YAML config file to a Kubernetes cluster or run a Docker container from the code snippet. Both the Kubernetes config and Docker snippet are available in Agent details in the Web UI. Be sure to swap in your credentials (e.g., replace `<OAUTH_BEARER_TOKEN>` with your actual token).

<Tabs>
<TabItem value="code" label="Kubernetes" default>

If you use Kubernetes, you can apply the following command to deploy the Agent. It will look something like this:

```yaml
# DISCLAIMER: This deployment description contains only the fields necessary for the purpose of this demo.
# It is not a ready-to-apply k8s deployment description, and the client_id and client_secret are only exemplary values.

apiVersion: v1
kind: Secret
metadata:
  name: nobl9-agent-nobl9-dev-thousandeyes-secret
  namespace: default
type: Opaque
stringData:
  thousandeyes_oauth_bearer_token: "<THOUSANDEYES_OAUTH_BEARER_TOKEN>"
  client_id: "unique_client_id"
  client_secret: "unique_client_secret"
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nobl9-agent-nobl9-dev-thousandeyes-agent-deployment
  namespace: default
spec:
  replicas: 1
  selector:
    matchLabels:
      nobl9-agent-name: "my-unique-agent-name"
      nobl9-agent-project: "thousandeyes"
      nobl9-agent-organization: "nobl9-dev"
  template:
    metadata:
      labels:
        nobl9-agent-name: "my-unique-agent-name"
        nobl9-agent-project: "thousandeyes"
        nobl9-agent-organization: "nobl9-dev"
    spec:
      containers:
        - name: agent-container
          image: nobl9/agent:0.33.0
          resources:
            requests:
              memory: "350Mi"
              cpu: "0.1"
          env:
            - name: N9_CLIENT_ID
              valueFrom:
                secretKeyRef:
                  key: client_id
                  name: nobl9-agent-nobl9-dev-thousandeyes-secret
            - name: N9_CLIENT_SECRET
              valueFrom:
                secretKeyRef:
                  key: client_secret
                  name: nobl9-agent-nobl9-dev-thousandeyes-secret
            - name: THOUSANDEYES_OAUTH_BEARER_TOKEN
              valueFrom:
                secretKeyRef:
                  key: thousandeyes_oauth_bearer_token
                  name: nobl9-agent-nobl9-dev-thousandeyes-secret
```

</TabItem>
<TabItem value="shell" label="Docker">

If you use Docker, you can run the Docker command to deploy the Agent. It will look something like this:

```shell
docker run -d --restart on-failure \
  --name nobl9-agent-nobl9-dev-thousandeyes-agent \
  -e N9_CLIENT_ID="unique_client_id" \
  -e N9_CLIENT_SECRET="unique_client_secret" \
  -e THOUSANDEYES_OAUTH_BEARER_TOKEN="" \
  nobl9/agent:latest
```

</TabItem>
</Tabs>

To verify that the Nobl9 agent has been successfully deployed, check the Connection Status field in the UI.

## Creating SLOs with ThousandEyes

The section below outlines how to create your SLOs in the Nobl9 web app (UI) and by applying YAML files through `sloctl`.

### Creating SLOs in the UI

Follow the instructions below to create your SLOs with ThousandEyes in the UI:

1. Navigate to **Service Level Objectives**.

2. Click the <img src="/img/plus_button.png" alt="plus button" width="20" height="20"></img> button.

3. In step 1 of the SLO wizard, select the **Service** the SLO will be associated with.

4. In step 2, select ThousandEyes as the **Data Source** for your SLO, then specify the **Metric**. For ThousandEyes you can use only a **Threshold Metric**, where a single time series is evaluated against a threshold, The ThousandEyes metric specification has two fields: `testID` and `testType`.

    * Enter a `testID`. It is an ID of the test configured in ThousandEyes. It is a mandatory field, and it must be a positive number.

    * Choose a `testType`. It is an end-to-end metric ThousandEyes metric. It is a string field. You can choose between the following ThousandEyes end-to-end metrics supported by Nobl9 (Refer to the [Scope of Support](#) section for more details):

        * Network Latency

        * Network Loss

        * Page Load

        * DOM Load Time

        * HTTP Server Response

5. In step 3, define a **Time Window** for the SLO.

6. In step 4, specify the **Error Budget Calculation Method** and your **Objective(s)**.

7. In step 5, add a **Name**, **Description**, and other details about your SLO. You can also select **Alert Policies** and **Labels** on this screen.

8. When you’re done, click <span style={{color: '#D92680'}}>**Create SLO**</span>.

### SLO Using ThousandEyes - YAML examples

<Tabs>
<TabItem value="code" label="Web page load" default>

```yaml
- apiVersion: n9/v1alpha
  kind: SLO
  metadata:
    name: my-thousandeyes-web-page-load-time-rolling-occurrences
    project: thousandeyes
  spec:
    service: thousandeyes
    indicator:
      metricSource:
        name: thousandeyes
      rawMetric:
        thousandEyes:
          testID: 2280492
          testType: web-page-load
    timeWindows:
      - unit: Hour
        count: 1
        isRolling: true
    budgetingMethod: Occurrences
    objectives:
      - displayName: Good
        op: lte
        value: 75
        target: 0.90
```

</TabItem>
<TabItem value="example1" label="Response time">

```yaml
- apiVersion: n9/v1alpha
  kind: SLO
  metadata:
    name: my-thousandeyes-response-time-rolling-occurrences
    project: thousandeyes
  spec:
    service: thousandeyes
    indicator:
      metricSource:
        name: thousandeyes
      rawMetric:
        thousandEyes:
          testID: 2014018
          testType: http-response-time
    timeWindows:
      - unit: Hour
        count: 1
        isRolling: true
    budgetingMethod: Occurrences
    objectives:
      - displayName: Good
        op: lte
        value: 75
        target: 0.90
```

</TabItem>
<TabItem value="example2" label="Net latency">

```yaml
- apiVersion: n9/v1alpha
  kind: SLO
  metadata:
    name: my-thousandeyes-net-latency-calendar-occurrences
    project: thousandeyes
  spec:
    service: thousandeyes
    indicator:
      metricSource:
        name: thousandeyes
      rawMetric:
        thousandEyes:
          testID: 2014018
          testType: net-latency
    timeWindows:
      - unit: Day
        count: 1
        calendar:
          startTime: 2020-03-09 00:00:00
          timeZone: Europe/Warsaw
    budgetingMethod: Occurrences
    objectives:
      - displayName: Good
        op: lte
        value: 75
        target: 0.90
```

</TabItem>
<TabItem value="example3" label="DOM load">

```yaml
- apiVersion: n9/v1alpha
  kind: SLO
  metadata:
    name: my-thousandeyes-web-dom-load-rolling-timeslices
    project: thousandeyes
  spec:
    service: thousandeyes
    indicator:
      metricSource:
        name: thousandeyes
      rawMetric:
        thousandEyes:
          testID: 2280492
          testType: web-dom-load
    timeWindows:
      - unit: Day
        count: 7
        isRolling: true
    budgetingMethod: Timeslices
    objectives:
      - displayName: Good
        op: lte
        value: 40
        target: 0.50
        timeSliceTarget: 0.50
      - displayName: Moderate
        op: lte
        value: 45
        target: 0.75
        timeSliceTarget: 0.75
      - displayName: Annoying
        op: lte
        value: 50
        target: 0.95
        timeSliceTarget: 0.95
```

</TabItem>
<TabItem value="example4" label="Net latency (calendar)">

```yaml
- apiVersion: n9/v1alpha
  kind: SLO
  metadata:
    name: my-thousandeyes-net-latency-calendar-timeslices
    project: thousandeyes
  spec:
    service: thousandeyes
    indicator:
      metricSource:
        name: thousandeyes
      rawMetric:
        thousandEyes:
          testID: 2024796
          testType: net-latency
    timeWindows:
      - unit: Month
        count: 1
        calendar:
          startTime: 2020-03-09 00:00:00
          timeZone: Europe/Warsaw
    budgetingMethod: Timeslices
    objectives:
      - displayName: Good
        op: lte
        value: 40
        target: 0.50
        timeSliceTarget: 0.50
      - displayName: Moderate
        op: lte
        value: 45
        target: 0.75
        timeSliceTarget: 0.75
      - displayName: Annoying
        op: lte
        value: 50
        target: 0.95
        timeSliceTarget: 0.95
```

</TabItem>
<TabItem value="example5" label="Net loss (rolling)">

```yaml
- apiVersion: n9/v1alpha
  kind: SLO
  metadata:
    name: my-thousandeyes-net-loss-rolling-timeslices
    project: thousandeyes
  spec:
    service: thousandeyes
    indicator:
      metricSource:
        name: thousandeyes
      rawMetric:
        thousandEyes:
          testID: 2014018
          testType: net-loss
    timeWindows:
      - unit: Day
        count: 1
        isRolling: true
    budgetingMethod: Timeslices
    objectives:
      - displayName: Good
        op: lte
        value: 75
        target: 0.90
        timeSliceTarget: 0.9
```

</TabItem>
</Tabs>

**Important notes:**

The ThousandEyes metric specification expects two fields: `testID` and `testType`.

* `testID` is an ID of the test configured in ThousandEyes. It is a mandatory field, and it must be a positive number.

* `testType` is an end-to-end ThousandEyes metric. It is a string field. Enter one of the below ThousandEyes end-to-end metrics supported by Nobl9 (for more details, refer to the [Scope of Support](#scope-of-support) section above).

  * `net-latency`

  * `net-loss`

  * `web-page-load`

  * `web-dom-load`

  * `http-response-time`

When the `testType` field is missing in the ThousandEyes YAML configuration, `net-latency` value is assumed.

:::caution
The `testType` kind is not supported by the Agent version below 0.32.0 (it works as a `testID` point to the `net-latency` test type). If you want to apply `testType`, update the Agent to the version above 0.33.0.
:::

## Querying the ThousandEyes Server

Nobl9 queries the ThousandEyes instance once every minute. If the Agent doesn’t collect any data in a given minute, the next query will be extended to the past two minutes.

## Known Limitations

The ThousandEyes API throttles API requests using a 240 request-per-minute (per organization) limit.

## Useful Links

* [Test Data | ThousandEyes Documentation](https://developer.thousandeyes.com/v6/test_data/)

* [ThousandEyes Knowledge Base | ThousandEyes Documentation](https://success.thousandeyes.com/ViewArticle?articleIdParam=kA0E0000000CmmzKAC)

* [ThousandEyes End-to-End Metrics | ThousandEyes Documentation](https://developer.thousandeyes.com/v6/test_data/#/end-to-end_metrics).
