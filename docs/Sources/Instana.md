---
id: instana
title: Instana
sidebar_label: Instana
sidebar_position: 11
toc_min_heading_level: 2
toc_max_heading_level: 5
description: Details about integration with Instana
keywords:
  - Instana
  - SLO
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Instana

Instana is an observability platform that delivers automated Application Monitoring (APM) used for website, infrastructure, and application monitoring.

## Scope of support

Currently, Nobl9 integration with Instana does not support monitoring website metrics.

## Authentication

Instana uses an API token for authorization. When deploying the Nobl9 Agent or Direct connection for Instana, you need to create an API token.

You can get the API token for your Instana in two ways:

- **By using the following dashboard path**:

  `https://${BASE_URL}/#/config/team/accessControl/apiTokens`

- **Under the following path in Instana UI**:

  **Settings** > **Team Settings** > **Access Control** > **API Tokens** > **Add API Token**

You can generate an initial API token via the Instana user interface. 

You can generate any additional API tokens via the API itself. For more information, refer to the [Web REST API | IBM Documentation](https://www.ibm.com/docs/en/obi/current?topic=apis-web-rest-api) and [Instana API | Instana Documentation](https://instana.github.io/openapi/#section/Authentication).

:::warning
Do not add any additional permissions to the API Token.
:::

## Adding Instana as a Data Source in the UI

Follow the instructions below to add Instana as a Source, using Agent or Direct connection.

1. Navigate to **Integrations > Sources**.

2. Click the <img src="/img/plus_button.png" alt="plus button" width="20" height="20"></img> button.

3. Click the **Instana** icon.

4. Choose **Direct** or **Agent**, then configure the source as described below.


### Instana Direct

#### Direct Configuration in the UI

Direct connection to Instana requires users to enter API token which Nobl9 stores safely. 

1. Add the **URL** to connect to your data source.<br/>
    Provide the base URL that points to the Instana instance, for example:
      - for SaaS, `https://instance-example.instana.io`
      - for self-hosted solutions, `http://instana-service:9000`

2. Enter your Instana's **API Token**. (mandatory).<br/>
    To use Instana’s Web REST API, you need to create an API token. For more details, refer to the [Authentication](#authentication) section above.

3. Select a **Project** (mandatory).<br/>
    Specifying the Project is helpful when multiple users are spread across multiple teams or projects. When the Project field is left blank, a default value appears.

4. Enter a **Display name** (optional).<br/>
    You can enter a friendly name with spaces in this field.

5. Enter a **Name** (mandatory). <br/>
    The name is mandatory and can only contain lowercase, alphanumeric characters and dashes (for example, <code>my-project-name</code>). This field is populated automatically when you enter a display name, but you can edit the result.

6. Enter a **Description** (optional).<br/>
    Here you can add details such as who is responsible for the integration (team/owner) and the purpose of creating it.

7. Click the <span style={{color: '#D92680'}}>**Add Data Source**</span> button.


<!-- Currently, the Direct can't be applied via sloctl, section TBA in the future. #### Direct Using CLI - YAML

The YAML for setting up a direct connection to Instana looks like this:

```yaml
apiVersion: n9/v1alpha
kind: Direct
metadata:
  name: instana-direct
  displayName: Instana Direct
  project: default
spec:
  description: Direct settings for Instana datasource
  sourceOf:
  - Metrics
  - Services
  instana:
    accessToken: TOKENEXAMPLE
    url: https://instance-example.instana.io
```

 -->

 ### Instana Agent

 #### Agent Configuration in the UI

Follow the instructions below to create your Instana agent connection. Refer to the [section above](#direct-configuration-in-the-ui) for the descriptions of the fields.

1. Add the **URL** to connect to your data source (mandatory).

2. Select a **Project** (mandatory).

3. Enter a **Display name** (optional).

4. Enter a **Name** (mandatory).

5. Enter a **Description** (optional).

6. Click the <span style={{color: '#D92680'}}>**Add Data Source**</span> button.

<!-- Currently, the Agent can't be applied via sloctl, section TBA in the future. #### Agent Using CLI - YAML
```yaml
apiVersion: n9/v1alpha
kind: Agent
metadata:
  name: instana-agent
  displayName: Instana Agent
  project: default
spec:
  description: Agent settings for instana datasource
  sourceOf:
  - Metrics
  - Services
  instana:
    url: https://instance-example.instana.io
```
-->

#### Deploying Instana Agent

To start the Agent process you can either apply the YAML config file to a Kubernetes cluster or run a Docker container from the code snippet. Both the Kubernetes config and Docker snippet are available in Agent details in the Web UI. Be sure to swap in your credentials (e.g., replace <code><INSTANA_API_TOKEN></code> with your organization token).

<Tabs>
<TabItem value="code" label="Kubernetes" default>

If you use Kubernetes, you can apply the following command to deploy the Agent. It will look something like this:

```yaml
# DISCLAIMER: This deployment description contains only the fields necessary for the purpose of this demo.
# It is not a ready-to-apply k8s deployment description, and the client_id and client_secret are only exemplary values.

apiVersion: v1
kind: Secret
metadata:
  name: nobl9-agent-dev-instana-myagent
  namespace: default
type: Opaque
stringData:
  client_id: "Redeemed"
  client_secret: "Redeemed"
  instana_api_token: "<INSTANA_API_TOKEN>"
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nobl9-agent-dev-instana-myagent
  namespace: default
spec:
  replicas: 1
  selector:
    matchLabels:
      nobl9-agent-name: "instana-agent"
      nobl9-agent-project: "instana-project"
      nobl9-agent-organization: "my-org"
  template:
    metadata:
      labels:
        nobl9-agent-name: "instana-agent"
        nobl9-agent-project: "instana-project"
        nobl9-agent-organization: "my-org"
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
                  name: nobl9-agent-dev-instana-myagent
            - name: N9_CLIENT_SECRET
              valueFrom:
                secretKeyRef:
                  key: client_secret
                  name: nobl9-agent-dev-instana-myagent
            - name: AUTH_METHOD
              value: api_token
            - name: API_TOKEN
              valueFrom:
                secretKeyRef:
                  key: instana_api_token
                  name: nobl9-agent-dev-instana-myagent
```
</TabItem>
<TabItem value="shell" label="Docker">

If you use Docker, you can run the Docker command to deploy the Agent. It will look something like this:

```shell
# DISCLAIMER: This Docker command contains only the fields necessary for the purpose of this demo.
# It is not a ready-to-apply command, and you will need to replace the placeholder values with your own values.

docker run -d --restart on-failure \
  --name nobl9-agent-dev-instana-myagent \
  -e N9_CLIENT_ID="unique_client_id" \
  -e N9_CLIENT_SECRET="client_secret" \
  -e AUTH_METHOD="api_token" \
  -e API_TOKEN="INSTANA_API_TOKEN" \
  nobl9/agent: latest
```

</TabItem>
</Tabs>

<br/>

## Creating SLOs with Instana

Instana allows you to create SLOs for:

 - **Threshold Metric** to monitor:

    - Infrastructure metrics that retrieve the metrics for infrastructure components

    - Application metrics that retrieve the metrics for defined applications, discovered services, and endpoints

- **Ratio Metric** to monitor:

    - Infrastructure metrics

See the instructions in the following sections for more details.

### Creating SLO in the UI

<Tabs>
<TabItem value="slo-threshold-Infrastructure" label="Threshold – Infrastructure" default>

Follow the instructions below to create Instana <b>Threshold metric</b> using <b>Infrastructure</b> type:
<ol>
  <p><li>Navigate to <b>Service Level Objectives</b>.</li></p>
  <p><li>Click the <img src="/img/plus_button.png" alt="plus button" width="20" height="20"></img> button.</li></p>
  <p><li>In step 1 of the SLO wizard, select the <b>Service</b> the SLO will be associated with.</li></p>
  <p><li>In step 2, select <b>Instana</b> as the <b>Data Source</b> for your SLO, then specify the <b>Metric</b>.</li></p>
  <p><li>Select <b>Threshold metric</b> > <b>Infrastructure</b>.</li></p>
  <p><li>Enter the <b>Plugin ID</b>, meaning the ID of the plugin available in your monitored system.</li>
      For more information, refer to the <a href="#instana-metrics">Instana Metrics | Nobl9 Documentation</a>.</p>
  <p><li>Enter the <b>Metric ID</b>, meaning the ID of the metric you want to retrieve.</li>
      For more information, refer to the <a href="#instana-metrics">Instana Metrics | Nobl9 Documentation</a>.</p>
  <p><li>From the <b>Metric Retrieval Method</b> picklist, select a method to obtain the specific metrics with:</li></p>
      <p><b>Query</b> using <a href="https://www.ibm.com/docs/en/obi/current?topic=instana-filtering-dynamic-focus">Dynamic Focus </a> search and filter function:
        <ul>
        <li>To provide the query, go to <b>Infrastructure</b> > <b>Map</b>. Build the query in the input field, for example, <code>entity.selfType:zookeeper AND entity.label:replica.1</code>.</li>
        </ul></p>
      <p><b>Snapshot ID</b> using a unique identifier the metrics are assigned to:
        <ul>
        <li>You can get the Snapshot ID from the URL in Instana’s UI by looking for the <code>snapshotId=[SNAPSHOT_ID]</code> parameter, for example, <code>GbMUvWHy12TTRsIm3Lko4LDAklw</code>.</li>
        </ul></p>
       <p>For more information, refer to the <a href="#instana-metrics">Instana Metrics | Nobl9 Documentation</a>.</p>
  <p><li>Enter the <b>Query</b> or the <b>Snapshot ID</b>.</li></p>
  <p><li>In step 3, define a <b>Time Window</b> for the SLO.</li></p>
  <p><li>In step 4, specify the <b>Error Budget Calculation Method</b>  and your <b>Objective(s)</b> .</li></p>
  <p><li>In step 5, add a <b>Name</b>, <b>Description</b>, and other details about your SLO. You can also select <b>Alert Policies</b> and <b>Labels</b> on this screen.</li></p>
  <p><li>When you’ve finished, click <span style={{color: '#D92680'}}><b>Create SLO</b></span>.</li></p>
</ol>

</TabItem>
<TabItem value="slo-threshold-application" label="Threshold – Application">

Follow the instructions below to create Instana <b>Threshold metric</b> using <b>Application</b> type:
<ol>
  <p><li>Navigate to <b>Service Level Objectives</b>.</li></p>
  <p><li>Click the <img src="/img/plus_button.png" alt="plus button" width="20" height="20"></img> button.</li></p>
  <p><li>In step 1 of the SLO wizard, select the <b>Service</b> the SLO will be associated with.</li></p>
  <p><li>In step 2, select <b>Instana</b> as the <b>Data Source</b> for your SLO, then specify the <b>Metric</b>.</li></p>
  <p><li>Select <b>Threshold metric</b> > <b>Application</b>.</li></p>
  <p><li>Select the <b>Metric ID</b> you want to use from the following list:</li></p>
      <ul><p>
      <li>Calls - to monitor the number of received calls</li>
      <li>Erroneous Calls - to monitor the number of erroneous calls</li>
      <li>Erroneous Calls Rate - to monitor the error rate of received calls</li>
      <li>Latency - to monitor the latency of received calls in milliseconds</li>
      </p></ul>
  <p><li>Select the <b>Aggregation</b> from the following list of supported metrics with their aggregations:</li></p>
      <ul><p>
      <li>Calls: sum</li>
      <li>Erroneous Calls: sum</li>
      <li>Erroneous Calls Rate: mean</li>
      <li>Latency: sum, mean, max, min, p25, p50, p75, p90, p95, p98, p99</li>
      </p></ul>
      <p>Note that the value in the <b>Aggregation</b> field is selected by default for <b>Calls</b>, <b>Erroneous Calls</b>, and <b>Erroneous Calls Rate</b> Metric ID values.</p>
  <p><li>Enter the <b>API Query</b>. There are two ways in which you can create and copy the API Query from Instana UI:</li></p>
      <p><b>Method 1</b>:<br/>
      Go to <b>Applications</b> > select Application > <b>Services</b> > select a Service > <b>Endpoints</b> > select an Endpoint > click the <b>Analyze Calls</b> button</p>
        <p>
        <ul>
        <li>In the <b>Filter</b> field, you can already see a partially defined query.</li>
        <li>Any additional manual selections will be included in the API query.</li>
        <li>Decide which of the hidden calls you’d like to include. They are not included in the API query and need to be passed to Nobl9 manually.</li>
        <li>Copy the API query. Make sure you have the toggle <b>Include filter sidebar items</b> on, otherwise, the additional manual selections won’t be included in the API query.</li>
        <li>Select the <b>Group</b>, meaning the single entity you want to be observed. You can group by the most specific parameter in the created filter. You can always view the resulting groups below the charts on the <b>Analytics</b> view.</li>
        </ul></p>
        <p><b>Method 2</b>:<br/>
        Go to <b>Analytics</b>, specify the query, and follow the instructions above. <br/>
        For more information, refer to the <a href="https://instana.github.io/openapi/#tag/Application-Analyze"target="blank"> Application Analyze | Instana Documentation</a>.</p>
  <p><li>Enter the <b>Tag</b>, <b>Tag Entity</b>, and <b>Tag Second Level Key</b> (if applicable). To do so, look for <code>groupBy=(...)</code> section in the URL in Instana UI.</li></p>
      <p>Note that field names vary between Instana API and Nobl9 API:</p>
      <table>
        <thead>
           <tr>
            <th><b>Field name in Instana</b></th>
            <th><b>Field name in Nobl9</b></th>
            </tr>
        </thead>
          <tbody>
            <tr>
              <td><code>groupbyTag</code></td>
              <td><code>tag</code></td>
            </tr>
            <tr>
              <td><code>groupbyTagEntity</code></td>
              <td><code>tagEntity</code></td>
            </tr>
            <tr>
              <td><code>groupbyTagSecondLevelKey</code></td>
              <td><code>tagSecondLevelKey</code></td>
            </tr>
          </tbody>
      </table>
  <p><li>Check the appropriate <b>Include Hidden Calls</b> checkbox if you want to include the hidden calls.</li></p>
  <p><li>In step 3, define a <b>Time Window</b> for the SLO.</li></p>
  <p><li>In step 4, specify the <b>Error Budget Calculation Method</b> and your <b>Objective(s)</b>.</li></p>
  <p><li>In step 5, add a <b>Name</b>, <b>Description</b>, and other details about your SLO. You can also select <b>Alert Policies</b> and <b>Labels</b> on this screen.</li></p>
  <p><li>When you’ve finished, click <span style={{color: '#D92680'}}><b>Create SLO</b></span>.</li></p>
</ol>

</TabItem>
<TabItem value="slo-ratio-infrastructure" label="Ratio – Infrastructure">

Follow the instructions below to create Instana <b>Ratio metric</b> using <b>Infrastructure</b> type:
<ol>
  <p><li>Navigate to <b>Service Level Objectives</b>.</li></p>
  <p><li>Click the <img src="/img/plus_button.png" alt="plus button" width="20" height="20"></img> button.</li></p>
  <p><li>In step 1 of the SLO wizard, select the <b>Service</b> the SLO will be associated with.</li></p>
  <p><li>In step 2, select <b>Instana</b> as the <b>Data Source</b> for your SLO, then specify the <b>Metric</b>.</li></p>
  <p><li>Select <b>Ratio metric</b> > <b>Infrastructure</b>.</li></p>
  <p><li>Enter the <b>Plugin ID</b> for Good and Total Metric, meaning the ID of the plugin available in your monitored system.</li>
    For more information, refer to the <a href="#instana-metrics">Instana Metrics | Nobl9 Documentation</a>.</p>
  <p><li>Enter the <b>Metric ID</b> for Good and Total Metric, meaning the ID of the metric you want to retrieve.</li>
      For more information, refer to the <a href="#instana-metrics">Instana Metrics | Nobl9 Documentation</a>.</p>
  <p><li>From the <b>Metric Retrieval Method</b> picklist, select a method to obtain the specific metrics with:</li></p>
      <ul>
      <p><li><b>Query</b> using <a href="https://www.ibm.com/docs/en/obi/current?topic=instana-filtering-dynamic-focus">Dynamic Focus </a> search and filter function</li></p>
      <p><li><b>Snapshot ID</b> using a unique identifier the metrics are assigned to</li></p>
      </ul>
      <p>For more information, refer to the <a href="#instana-metrics">Instana Metrics | Nobl9 Documentation</a>.</p>
  <p><li>Enter the <b>Query</b> or the <b>Snapshot ID</b> for the Good and Total Metric:</li></p>
        <ul>
        <p><li>To provide the query, go to <b>Infrastructure</b> > <b>Map</b>. Build the query in the input field, for example, <code>entity.selfType:zookeeper AND entity.label:replica.1</code>.</li></p>
        <p><li>You can get the Snapshot ID from the URL in Instana’s UI by looking for the <code>snapshotId=[SNAPSHOT_ID]</code> parameter, for example, <code>GbMUvWHy12TTRsIm3Lko4LDAklw</code>.</li></p>
        </ul>
        <p><b>Note</b>: Ratio metric allows you to combine different Metric Retrieval Methods. For example, you can use Query method for the Good Metric, and Snapshot ID method for the Total Metric. </p>
  <p><li>In step 3, define a <b>Time Window</b> for the SLO.</li></p>
  <p><li>In step 4, specify the <b>Error Budget Calculation Method</b> and your <b>Objective(s)</b>.</li></p>
  <p><li>In step 5, add a <b>Name</b>, <b>Description</b>, and other details about your SLO. You can also select <b>Alert Policies</b> and <b>Labels</b> on this screen.</li></p>
  <p><li>When you’ve finished, click <span style={{color: '#D92680'}}><b>Create SLO</b></span>.</li></p>
</ol>
</TabItem>
</Tabs>

<br/>

### Instana Metrics


`pluginId`

Plugins are entities for which metrics are collected. You cannot get the `pluginId` from the Instana UI. To do so, use the following API request:

```
curl --request GET \
       --url https://${BASE_URL}/api/infrastructure-monitoring/catalog/plugins \
       --header "authorization: apiToken ${API_TOKEN}"
```

This request returns a list of elements. For example, imagine you have the Zookeeper plugin available only for Kafka, meaning the request will return only a single element. The `plugin` is the `pluginId` value while `label` is used in the Instana UI as a display name:

```
[
    {
      "plugin": "zooKeeper",
      "label": "ZooKeeper"
    }
  ]
```
As such, you can find the `label` name on the specific entity dashboard.
<br/>

`metricId`

`metricId` is the ID of the metric you want to retrieve. You can get the `metricId` by using the following API request:

```
curl --request GET \
       --url https://${BASE_URL}/api/infrastructure-monitoring/catalog/metrics/${PLUGIN_ID} \
       --header "authorization: apiToken ${API_TOKEN}"
```

:::note
`PLUGIN_ID` must be the ID of the plugin you want to retrieve the `metricId` for.
:::

This request returns a list of all available metric entities for this specific plugin, for example:

```
[
    {
      "formatter": "UNDEFINED",
      "label": "ZooKeepers Max request latency",
      "description": "Max request latency",
      "metricId": "max_request_latency",
      "pluginId": "zooKeeper",
      "custom": false
    }
  ]
```

:::note
Currently, Nobl9 supports only a single metric.
:::

<br/>

`query`

**Query** metric is using Dynamic Focus search and filter function.

**Dynamic Focus Query** uses Lucene query syntax. This query must be constructed in the Instana UI and copied unchanged. For more information, refer to the [Dynamic Focus Query | Instana Documentation](https://www.ibm.com/docs/en/obi/current?topic=instana-filtering-dynamic-focus).

To provide the query, go to **Infrastructure > Map**. Build the query in the input field, for example, `entity.selfType:zookeeper AND entity.label:replica.1`.

:::note
Instana does not allow infrastructure metrics aggregation. As such, you have to make sure your query is specific and includes, for example, the name of the cluster, zone, or node.
:::

<br/>

`snapshotId`

Snapshot ID represents static information about an entity as it was at a specific point in time. For more information, refer to the [Search Snapshots | Instana API Docs](https://instana.github.io/openapi/#operation/getMonitoringState).

You can get the Snapshot ID from the URL in Instana UI by looking for the `snapshotId=${SNAPSHOT_ID}` parameter. For example:

for this URL: `https://${BASE_URL}/#/physical/dashboard?timeline.ws=1728000000&timeline.to=1642719600000&timeline.fm=1642719600000&timeline.ar=false&snapshotId=GbMUvQHy12TTRsIm3Lko4LDAklw`

the snapshotId is `GbMUvQHy12TTRsIm3Lko4LDAklw`.

:::note
Currently, Nobl9 supports only a single snapshotId.
:::

:::warning
Changing the metadata may result in changing the Snapshot. As such, when the Snapshot ID changes, Nobl9 cannot get the metrics.
:::


### SLOs using Instana - YAML samples

Generic schema with a description of objects and field validations:

```yaml
apiVersion: n9/v1alpha
kind: SLO
metadata:
  name: string
  displayName: string # optional
  project: string
spec:
  description: string # optional
  service: [service name] # name of the service you defined in the same project as SLO
  indicator:
    metricSource:
      name: [datasource name] # name of the datasource you defined
      project: [project name] # optional if not defined, project is the same as an SLO.
    rawMetric:
      # exactly one of possible source types which depends on selected metricSource for SLO
      instana: # application XOR infrastructure
        metricType: oneOf{"application", "infrastructure"} # mandatory
        infrastructure:
          metricRetrievalMethod: oneOf{"query", "snapshot"} # mandatory
          query: "string" # XOR with snapshotId
          snapshotId: "string" # XOR with query
          metricId: "string" # mandatory
          pluginId: "string" # mandatory
        application:
          metricId: # mandatory, oneOf{"calls", "erroneousCalls", "errors", "latency"}
          aggregation: "" # mandatory, value depends on the metricId type. See notes below
          groupBy: # mandatory
            tag: "" # mandatory
            tagEntity: "" # mandatory, oneOf{"DESTINATION", "SOURCE", "NOT_APPLICABLE"}
            tagSecondLevelKey: "" # mandatory
          apiQuery: "{}" # mandatory, API query user passes in a JSON format. Must be a valid JSON
          includeInternal: false # optional, default value is false
          includeSynthetic: false # optional, default value is false
```

**Notes:**

- `aggregation` - Depends on the value specified for `metricId`:

    - For `calls` and `erroneousCalls`: use `sum`.

    - For `errors`: use `mean`.

    - For `latency`: use one of the values `sum`, `mean`, `min`, `max`, `p25`, `p50`, `p75`, `p90`, `p95`, `p98`, `p99`.

<br/>

#### rawMetric YAML examples

<Tabs>
<TabItem value="yaml" label="rawMetric Application Query" default>

Here’s an example of Instana using <code>rawMetric</code> (Threshold Metric) with <code>metricType=”application”</code>, Query method:

```yaml
apiVersion: n9/v1alpha
kind: SLO
metadata:
  name: opentsdb-datanode-latency-95th-application-query
  project: instana
spec:
  service: instana-service
  indicator:
    metricSource:
      name: instana
      project: instana
    rawMetric:
      instana:
        metricType: "application"
        application:
          metricId: "latency"
          aggregation: "p95"
          groupBy:
            tag: "endpoint.name"
            tagEntity: "DESTINATION"
            tagSecondLevelKey: ""
          includeInternal: false
          includeSynthetic: false
          apiQuery: "{}"
  timeWindows:
    - unit: Week
      count: 1
      calendar:
        startTime: 2020-01-21 12:30:00 # date with time in 24h format
        timeZone: America/New_York # name as in IANA Time Zone Database
  budgetingMethod: Occurrences
  objectives:
    - displayName: Healthy
      value: 10
      op: lte
      target: 0.99
    - displayName: Slower
      value: 30
      op: lte
      target: 0.95
    - displayName: Critical
      value: 100
      op: lte
      target: 0.95
```

</TabItem>
<TabItem value="rawMetric" label="rawMetric Infrastructure Query">

Here’s an example of Instana using <code>rawMetric</code> (Threshold Metric) with <code>metricType=”infrastructure”</code>, Query method:

```yaml
apiVersion: n9/v1alpha
kind: SLO
metadata:
  name: zookeeper-outstanding-requests-replica-1-infrastructure-query
  project: instana
spec:
  description: The number of queued requests in the server. This goes up when the server receives more requests than it can process.
  service: instana-service
  indicator:
    metricSource:
      name: instana
      project: instana
    rawMetric:
      instana:
        metricType: "infrastructure"
        infrastructure:
          metricRetrievalMethod: "query"
          metricId: "metricId"
          pluginId: "pluginId"
          query: "entity.service.name:zookeeper entity.label:replica.1"
  timeWindows:
    - unit: Week
      count: 1
      calendar:
        startTime: 2020-01-21 12:30:00 # date with time in 24h format
        timeZone: America/New_York # name as in IANA Time Zone Database
  budgetingMethod: Occurrences
  objectives:
    - displayName: Acceptable
      value: 10
      op: lte
      target: 0.9
```

</TabItem>
<TabItem value="rawmetric1" label="rawMetric Infrastructure Snapshot">

Here’s an example of Instana using <code>rawMetric</code> (Threshold Metric) with <code>metricType=”infrastructure”</code>, Snapshot method:

```yaml
apiVersion: n9/v1alpha
kind: SLO
metadata:
  name: nodes-availability-infrastructure-snapshot
  project: instana
spec:
  service: instana-service
  indicator:
    metricSource:
      name: instana
      project: instana
    rawMetric:
      instana:
        metricType: "infrastructure"
        infrastructure:
          metricRetrievalMethod: "snapshot"
          metricId: "metricId"
          pluginId: "pluginId"
          snapshotId: "snapshotId"
  timeWindows:
    - unit: Week
      count: 1
      calendar:
        startTime: 2020-01-21 12:30:00 # date with time in 24h format
        timeZone: America/New_York # name as in IANA Time Zone Database
  budgetingMethod: Occurrences
  objectives:
    - displayName: Healthy
      value: 1
      op: lt
      target: 0.99
```
</TabItem>
</Tabs>

<br/>

#### countMetric YAML examples

<Tabs>
<TabItem value="countmetric2" label="countMetric Infrastructure">

Here’s an example of Instana using <code>countMetric</code> (Ratio Metric) with <code>metricType=”infrastructure”</code>:

```yaml
apiVersion: n9/v1alpha
kind: SLO
metadata:
  name: slo-with-instana-agent-count-metrics-with-infrastructure
  displayName: Slo with Instana agent count metrics with infrastructure
spec:
  description: Description
  service: webapp-service
  indicator:
    metricSource:
      name: instana
  timeWindows:
    - unit: Week
      count: 1
      calendar:
        startTime: 2020-01-21 12:30:00 # date with time in 24h format
        timeZone: America/New_York # name as in IANA Time Zone Database
  budgetingMethod: Occurrences
  objectives:
    - displayName: Good
      value: 7.5
      target: 0.9
      countMetrics:
        incremental: false
        good:
          instana:
            metricType: "infrastructure"
            infrastructure:
              metricRetrievalMethod: "query"
              query: "queryGood"
              metricId: "metricId"
              pluginId: "pluginId"
        total:
          instana:
            metricType: "infrastructure"
            infrastructure:
              metricRetrievalMethod: "snapshot"
              snapshotId: "snapshotId"
              metricId: "metricId"
              pluginId: "pluginId"
```
</TabItem>

<TabItem value="countmetric" label="countMetric Infrastructure Query">

Here’s an example of Instana using <code>countMetric</code> (Ratio Metric) with <code>metricType=”infrastructure”</code>, Query method:

```yaml
apiVersion: n9/v1alpha
kind: SLO
metadata:
  name: opentsdb-replicas-availability-infrastructure-query
  project: instana
spec:
  service: instana-service
  indicator:
    metricSource:
      name: instana
      project: instana
  timeWindows:
    - unit: Week
      count: 1
      calendar:
        startTime: 2020-01-21 12:30:00 # date with time in 24h format
        timeZone: America/New_York # name as in IANA Time Zone Database
  budgetingMethod: Occurrences
  objectives:
    - displayName: Acceptable
      value: 0.95
      target: 0.9
      countMetrics:
        incremental: false
        good:
          instana:
            metricType: "infrastructure"
            infrastructure:
              metricRetrievalMethod: "query"
              metricId: "metricId"
              pluginId: "pluginId"
              query: "queryGood"
        total:
          instana:
            metricType: "infrastructure"
            infrastructure:
              metricRetrievalMethod: "query"
              metricId: "metricId"
              pluginId: "pluginId"
              query: "queryGood"
```
</TabItem>
<TabItem value="countmetric1" label="countMetric Infrastructure Snapshot">

Here’s an example of Instana using <code>countMetric</code> (Ratio Metric) with <code>metricType=”infrastructure”</code>, Snapshot method:

```yaml
apiVersion: n9/v1alpha
kind: SLO
metadata:
  name: dev-tooling-all-replicas-availability-infrastructure-snapshot
  project: instana
spec:
  service: instana-service
  indicator:
    metricSource:
      name: instana
      project: instana
  timeWindows:
    - unit: Week
      count: 1
      calendar:
        startTime: 2020-01-21 12:30:00 # date with time in 24h format
        timeZone: America/New_York # name as in IANA Time Zone Database
  budgetingMethod: Occurrences
  objectives:
    - displayName: Acceptable
      value: 0.95
      target: 0.9
      countMetrics:
        incremental: false
        good:
          instana:
            metricType: "infrastructure"
            infrastructure:
              metricRetrievalMethod: "snapshot"
              metricId: "metricId"
              pluginId: "pluginId"
              snapshotId: "snapshotId"
        total:
          instana:
            metricType: "infrastructure"
            infrastructure:
              metricRetrievalMethod: "snapshot"
              metricId: "metricId"
              pluginId: "pluginId"
              snapshotId: "snapshotId"
```
</TabItem>
</Tabs>

### API Query Example

Here's an API Query example for the Application metric:

```yaml
{
  "type":"EXPRESSION",
  "logicalOperator":"AND",
  "elements": [
    {
        "type":"TAG_FILTER",
        "name":"call.inbound_of_application",
        "operator":"EQUALS",
        "entity":"NOT_APPLICABLE",
        "value":"All Services"
    },
    {
        "type":"TAG_FILTER",
        "name":"service.name",
        "operator":"EQUALS",
        "entity":"DESTINATION",
        "value":"datanode"
    },
    {
        "type":"TAG_FILTER",
        "name":"endpoint.name",
        "operator":"EQUALS",
        "entity":"DESTINATION",
        "value":"GET /"
    }
  ]
}
```

## Querying the Instana Server

Nobl9 queries the Instana Server on a per-minute basis. This allows Nobl9 to collect up to 1 data point per minute.

## Useful Links

[Agent REST API | Instana Documentation](https://instana.github.io/openapi/#section/Agent-REST-API)

[Web REST API | Instana Documentation](https://www.ibm.com/docs/en/obi/current?topic=apis-web-rest-api)

[Infrastructure Metrics | Instana Documentation](https://instana.github.io/openapi/#tag/Infrastructure-Metrics)

[Application Analyze | Instana Documentation](https://instana.github.io/openapi/#tag/Application-Analyze)

[Dynamic Focus Query | Instana Documentation](https://www.ibm.com/docs/en/obi/current?topic=instana-filtering-dynamic-focus)

[IBM Observability | Instana Documentation](https://www.ibm.com/docs/en/obi)