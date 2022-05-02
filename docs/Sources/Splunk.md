---
id: splunk
title: Splunk
sidebar_label: Splunk
sidebar_position: 18
toc_min_heading_level: 2
toc_max_heading_level: 5
description: Details about integration with Splunk
keywords:
  - Splunk
  - SLO
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Splunk

Splunk provides software for searching, monitoring, and analyzing machine-generated data via a Web-style interface. Splunk integration with Nobl9 allows users to enter their metrics using the Splunk Processing Language (SPL).

## Scope of Support

Nobl9 does not support a self-signed Splunk Enterprise. The Nobl9 agent requires that if Splunk Enterprise is configured to use TLS then it must successfully pass certificate validation which self-signed certificates do not.

## Authentication

Splunk configuration for the Agent only accepts a single parameter: `url`. The `url` has to point to the base API URL of the Splunk Search app. It will usually have a form of

`{SPLUNK_BASE_URL}:{PORT_NUMBER}/services`

* `SPLUNK_BASE_URL` - for Splunk Enterprise, the base URL is configured during the deployment of Splunk software.

* `PORT_NUMBER` - Assuming the API is using the default port is `8089`. It is recommended that you contact your Splunk Admin to get your API Token and to verify the correct URL to connect.

When deploying the Agent for Splunk, you can use one of the following authentication methods:
* `SAML`: provide `SPLUNK_APP_TOKEN` as environment variables for authentication with the Splunk Search App REST API.
* `basic`: to use basic type, the Agent requires `SPLUNK_USER` and `SPLUNK_PASSWORD` passed as an environment variables during agent startup.

For more details, see:

* [How to Obtain Value for SPLUNK_APP_TOKEN | Splunk Documentation](https://docs.splunk.com/Documentation/Splunk/8.1.3/Security/CreateAuthTokens)

:::tip
Alternatively, you can pass the token using a local config file with key `application_token` under the `n9splunk` section. You can give your username and password the same way, and the keys are `app_user` and `app_password`.
:::

## Adding Splunk as a Source in the UI

Follow the instructions below to add Splunk as a Source, using Agent or Direct.

1. Navigate to **Integrations > Sources**.

2. Click the <img src="/img/plus_button.png" alt="plus button" width="20" height="20"></img> button.

3. Click the Splunk icon.

4. Choose **Direct** or **Agent**, then configure the source as described below.

5. Click the <span style={{color: '#D92680'}}>**Add Data Source**</span> button.

### Direct Configuration for Splunk

Direct configuration for Splunk requires users to enter their credentials, which Nobl9 will store safely. Follow these steps to set up a direct configuration:

:::caution
To access your Splunk Cloud Platform deployment using the Splunk REST API, you must submit a case requesting access using the [Splunk Support Portal](https://splunkcommunities.force.com/customers/home/home.jsp) Splunk Support opens port `8089` for REST access. You can specify a range of IP addresses to control who can access the REST API.

You will need to allow the following IPs:

`18.159.114.21`
`18.158.132.186`
`3.64.154.26`
:::

1. Enter an **API Endpoint URL** to connect to your data source (mandatory).<br/>
    Refer to the [Authentication](#authentication) section above for more details.

2. Enter the **Access Token** generated from your Splunk instance (mandatory).<br/>
    Refer to the [Authentication](#authentication) section above for more details.

3. Select a **Project** (mandatory).<br/>
    Specifying a Project is helpful when multiple users are spread across multiple teams or projects. When the Project field is left blank, a default value appears.

4. Enter a **Display name** (optional).<br/>
    You can enter a friendly name with spaces in this field.

5. Enter a **Name** (mandatory).<br/>
    The name is mandatory and can only contain lowercase, alphanumeric characters and dashes (for example, `my-project-name`). This field is populated automatically when you enter a display name, but you can edit the result.

6. Enter a **Description** (optional).<br/>
    Here you can add details such as who is responsible for the integration (team/owner) and the purpose of creating it.

7. Click the <span style={{color: '#D92680'}}>**Add Data Source**</span> button.

### Splunk Agent

#### Agent Configuration in the UI

Follow the instructions below to configure your Splunk Agent:

1. Add the **URL** to connect to your data source.
    Example URL: `https://splunk.example.com:8089/services`. It is recommended that your contact your Splunk Admin to get your API Token and to verify the correct URL to connect.

2. Enter a **Project** (mandatory).

3. Enter a **Display name** (optional).

4. Enter a **Name** (mandatory).

5. Enter a **Description** (optional).

6. Click the <span style={{color: '#D92680'}}>**Add Data Source**</span> button.

<!-- Currently, the Agent can't be applied via sloctl, scetion TBA in the futue. #### Agent Using CLI - YAML

The YAML for setting up an agent connection to Splunk looks like this:

```yaml
apiVersion: n9/v1alpha
kind: Agent
metadata:
  name: splunk
  project: splunk
spec:
  sourceOf:
    - Metrics
    - Services
  splunk:
    url: https://splunk.example.com:8089/services
``` -->

#### Deploying Splunk Agent

To start the Agent process you can either apply the YAML config file to a Kubernetes cluster or run a Docker container from the code snippet. Both the Kubernetes config and Docker snippet are available in Agent details in the Web UI. Be sure to swap in your credentials (e.g., replace `<SPLUNK_APP_TOKEN>` with your organization key).

<Tabs>
<TabItem value="code" label="Kubernetes" default>

If you use Kubernetes, you can apply the following command to deploy the Agent. It will look something like this:

```yaml
# DISCLAIMER: This deployment description contains only the fields necessary for the purpose of this demo.
# It is not a ready-to-apply k8s deployment description, and the client_id and client_secret are only exemplary values.

apiVersion: v1
kind: Secret
metadata:
  name: nobl9-agent-nobl9-dev-default-splunkagent
  namespace: default
type: Opaque
stringData:
  splunk_app_token: "<SPLUNK_APP_TOKEN>"
  client_id: "unique_client_id"
  client_secret: "unique_client_secret"
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nobl9-agent-nobl9-dev-default-splunkagent
  namespace: default
spec:
  replicas: 1
  selector:
    matchLabels:
      nobl9-agent-name: "splunkagent"
      nobl9-agent-project: "default"
      nobl9-agent-organization: "nobl9-dev"
  template:
    metadata:
      labels:
        nobl9-agent-name: "splunkagent"
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
                  name: nobl9-agent-nobl9-dev-default-splunkagent
            - name: N9_CLIENT_SECRET
              valueFrom:
                secretKeyRef:
                  key: client_secret
                  name: nobl9-agent-nobl9-dev-default-splunkagent
            - name: SPLUNK_APP_TOKEN
              valueFrom:
                secretKeyRef:
                  key: splunk_app_token
                  name: nobl9-agent-nobl9-dev-default-splunkagent
            - name: SPLUNK_USER
              valueFrom:
                secretKeyRef:
                  key: splunk_user
                  name: nobl9-agent-nobl9-dev-default-splunkagent
            - name: SPLUNK_PASSWORD
              valueFrom:
                secretKeyRef:
                  key: splunk_password
                  name: nobl9-agent-nobl9-dev-default-splunkagent
```

</TabItem>
<TabItem value="shell" label="Docker">

If you use Docker, you can run the Docker command to deploy the Agent. It will look something like this:

```shell
# DISCLAIMER: This Docker command contains only the fields necessary for the purpose of this demo.
# It is not a ready-to-apply command, and you will need to replace the placeholder values with your own values.

docker run -d --restart on-failure \
  --name nobl9-agent-nobl9-dev-default-splunkagent \
  -e N9_CLIENT_ID="unique_client_id" \
  -e N9_CLIENT_SECRET="unique_client_secret" \
  -e SPLUNK_APP_TOKEN="<SPLUNK_APP_TOKEN>" \
  -e SPLUNK_USER="<SPLUNK_USERNAME>" \
  -e SPLUNK_PASSWORD="<SPLUNK_PASSWORD>" \
  nobl9/agent:latest
```
</TabItem>
</Tabs>

To verify that the Nobl9 agent has been successfully deployed, check the Connection Status field in the UI.

:::tip
Refer to the [Authentication](#authentication) section above for more details.
:::

## Creating SLOs with Splunk

The section below outlines how to create your SLOs in the Nobl9 web app (UI) and by applying YAML files through `sloctl`.

### Creating SLOs in the UI

1. Navigate to **Service Level Objectives**.

2. Click the <img src="/img/plus_button.png" alt="plus button" width="20" height="20"></img> button.

3. In step 1 of the SLO wizard, select the **Service** the SLO will be associated with.

4. In step 2, select Splunk as the **Data Source** for your SLO, then specify the **Metric**. You can choose either a **Threshold Metric**, where a single time series is evaluated against a threshold or a **Ratio Metric**, which allows you to enter two time series to compare (for example, a count of good requests and total requests).
    Enter a **Query**, **Good Query**, or **Total Query** for the metric you selected:

    * Every query must return `n9time` and `n9value` fields.

      * The `n9time` field must be a Unix timestamp, and `n9value` field must be a float value.

    * Nobl9 validates the query provided by the user against 2 rules:

        * The query contains the `n9time` value.

        * The query contains an `n9value` value.

    * Every time range of the dataset is segmented into 15-second chunks and aggregated. The aggregation is as follows:

        * ***Raw metric***: calculates the average.

        * ***Count metric incremental***: takes the max value.

        * ***Count metric non-incremental***: the sum of values.

5. In step 3, define a **Time Window** for the SLO.

6. In step 4, specify the **Error Budget Calculation Method** and your **Objective(s)**.

7. In step 5, add a **Name**, **Description**, and other details about your SLO. You can also select **Alert Policies** and **Labels** on this screen.

8. When you’re done, click <span style={{color: '#D92680'}}>**Create SLO**</span>.

### SLOs Using Splunk - YAML examples

<Tabs>
<TabItem value="code" label="rawMetric" default>

Here’s an example of Splunk using a `rawMetric` (**Threshold metric**):

```yaml
- apiVersion: n9/v1alpha
  kind: SLO
  metadata:
    name: splunk-raw-rolling
    project: splunk
  spec:
    service: splunk-service
    indicator:
      metricSource:
        name: splunk
      rawMetric:
        splunk:
          query: index=polakpotrafi-events source=udp:5072 sourcetype=syslog status<400 | bucket _time span=1m | stats avg(response_time) as n9value by _time | rename _time as n9time | fields n9time n9value
    timeWindows:
      - unit: Day
        count: 7
        isRolling: true
    budgetingMethod: Occurrences
    objectives:
      - displayName: Good
        op: lte
        value: 0.25
        target: 0.50
      - displayName: Moderate
        op: lte
        value: 0.5
        target: 0.75
      - displayName: Annoying
        op: lte
        value: 1.0
        target: 0.95
  ---
  - apiVersion: n9/v1alpha
  kind: SLO
  metadata:
    name: splunk-raw-calendar
    project: splunk
  spec:
    service: splunk-service
    indicator:
      metricSource:
        name: splunk
      rawMetric:
        splunk:
          query: index=polakpotrafi-events source=udp:5072 sourcetype=syslog status<400 | bucket _time span=1m | stats avg(response_time) as n9value by _time | rename _time as n9time | fields n9time n9value
    timeWindows:
      - unit: Day
        count: 7
        calendar:
          startTime: 2020-03-09 00:00:00
          timeZone: Europe/Warsaw
    budgetingMethod: Occurrences
    objectives:
      - displayName: Good
        op: lte
        value: 0.25
        target: 0.50
      - displayName: Moderate
        op: lte
        value: 0.5
        target: 0.75
      - displayName: Annoying
        op: lte
        value: 1.0
        target: 0.95
```

</TabItem>
<TabItem value="example" label="countMetric">

Here’s an example of Splunk using a `countMetric` (**Ratio metric**):

```yaml
- apiVersion: n9/v1alpha
  kind: SLO
  metadata:
    name: splunk-counts-rolling
    project: splunk
  spec:
    service: splunk-service
    indicator:
      metricSource:
        kind: Agent
        name: splunk
        project: splunk
    timeWindows:
      - unit: Hour
        count: 1
        isRolling: true
    budgetingMethod: Occurrences
    objectives:
      - displayName: Poor
        target: 0.50
        countMetrics:
          incremental: false
          good:
            splunk:
              query: index=polakpotrafi-events source=udp:5072 sourcetype=syslog status<400 | bucket _time span=1m | stats count as n9value by _time | rename _time as n9time | fields n9time n9value
          total:
            splunk:
              query: index=polakpotrafi-events source=udp:5072 sourcetype=syslog | bucket _time span=1m | stats count as n9value by _time | rename _time as n9time | fields n9time n9value

- apiVersion: n9/v1alpha
  kind: SLO
  metadata:
    name: splunk-counts-calendar
    project: splunk
  spec:
    service: splunk-service
    indicator:
      metricSource:
        kind: Agent
        name: splunk
        project: splunk
    timeWindows:
      - unit: Day
        count: 1
        calendar:
          startTime: 2021-04-09 00:00:00
          timeZone: Europe/Warsaw
    budgetingMethod: Occurrences
    objectives:
      - displayName: So so
        target: 0.80
        countMetrics:
          incremental: false
          good:
            splunk:
              query: index=polakpotrafi-events source=udp:5072 sourcetype=syslog status<400 | bucket _time span=1m | stats count as n9value by _time | rename _time as n9time | fields n9time n9value
          total:
            splunk:
              query: index=polakpotrafi-events source=udp:5072 sourcetype=syslog | bucket _time span=1m | stats count as n9value by _time | rename _time as n9time | fields n9time n9value
```

</TabItem>
</Tabs>

**Splunk queries require:**

* Defining an `index` attribute (`"index=index_name"`) to avoid long-running queries.

* A return value for `n9time` and `n9value`.<br/>
Use Splunk field extractions to return values using those exact names. The `n9time` is the actual time, and the `n9value` is the metric value. The `n9time` must be a Unix timestamp and the `n9value` must be a float value.

  * Example:
      `index=myserver-events source=udp:5072 sourcetype=syslog response_time>0 | rename _time as n9time, response_time as n9value | fields n9time n9value`

  Typically, you will rename `_time` to `n9time` and then rename the field containing the metric value (`response_time` in the previous example) to the `n9value`. The following is the appendage to your normal query that handles this.

    * `| rename _time as n9time, response_time as n9value | fields n9time n9value`

    * The Splunk query will be executed once every minute, returning the values found in the fields `n9time` and `n9value`. Ensure your hardware can support the query frequency.

## Querying Splunk Server

The Nobl9 agent leverages Splunk Enterprise API parameters. It pulls data at a per-minute interval from the Splunk server.

### API Rate Limits for the Nobl9 Agent

Splunk Enterprise API rate limits are configured by its administrators. Rate limits have to be high enough to accommodate searches from Nobl9 Agent. The Nobl9 agent makes one query per minute per unique `query`.

### Number of events returned from Splunk queries

Supported search SPL command searches within indexed events. The total number of events can be large, and a query without specific conditions, such as `search sourcetype=*`, returns all indexed events. A large number of data points sent to Nobl9 could disrupt the system’s performance. Therefore, **there is a hard limit of 4 events per minute**.

## Known Limitations

Queries limitations:

* Within search command [Time Range Modifiers | Splunk Documentation](https://docs.splunk.com/Documentation/Splunk/8.1.3/Search/Specifytimemodifiersinyoursearch) `earliest` and `latest` are not allowed.

## Useful Links

[REST Access | Splunk Documentation](https://docs.splunk.com/Documentation/SplunkCloud/8.2.2109/RESTREF/RESTaccess)

[Create Auth Tokens | Splunk Documentation](https://docs.splunk.com/Documentation/Splunk/8.1.3/Security/CreateAuthTokens)
