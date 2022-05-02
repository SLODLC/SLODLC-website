---
id: opentsdb
title: OpenTSDB
sidebar_label: OpenTSDB
sidebar_position: 14
toc_min_heading_level: 2
toc_max_heading_level: 5
description: Details about integration with OpenTSDB
keywords:
  - OpenTSDB
  - SLO
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# OpenTSDB

OpenTSDB is a distributed, scalable Time Series Database (TSDB). OpenTSDB allows store, index, and serve metrics collected from computer systems at a large scale, and make this data easily accessible and graphable.

## Scope of Support

Currently, Nobl9 does not support the Direct configuration for the OpenTSDB integration.

## Authentication

Nobl9 integration with OpenTSDB does not support an authentication and access control system.  The API calls are open to the public.

If you would like to limit access to OpenTSDB, you will need to use network ACLs or firewalls.  OpenTSDB is meant to be run behind a user’s private environment and is not public-facing.

## Adding OpenTSDB as a Source

Follow the instructions below to add NewRelic as a Source, using Agent.

1. Navigate to **Integrations > Sources**.

2. Click the <img src="/img/plus_button.png" alt="plus button" width="20" height="20"></img> button.

3. Click the OpenTSDB icon.

4. Choose **Agent**, then configure the source as described below.

### OpenTSDB Agent

#### Agent Configuration in the UI

Follow the instructions below to configure your OpenTSDB Agent:

1. Enter a **URL** to connect to your data source.

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

The YAML for configuring your OpenTSDB Agent looks like this:

```yaml
apiVersion: n9/v1alpha
kind: Agent
metadata:
  name: opentsdb
  displayName: OpenTSDB Agent
  project: opentsdb
spec:
  sourceOf:
    - Metrics
    - Services
  opentsdb: null
  url: 'http://localhost:4242'
``` -->

#### Deploying OpenTSDB Agent

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
  name: nobl9-agent-nobl9-dev-opentsdb-opentsdb-test
  namespace: default
type: Opaque
stringData:
  client_id: "unique_client_id"
  client_secret: "unique_client_secret"
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nobl9-agent-nobl9-dev-opentsdb-opentsdb-test
  namespace: default
spec:
  replicas: 1
  selector:
    matchLabels:
      nobl9-agent-name: opentsdb-test
      nobl9-agent-project: opentsdb
      nobl9-agent-organization: nobl9-dev
  template:
    metadata:
      labels:
        nobl9-agent-name: opentsdb-test
        nobl9-agent-project: opentsdb
        nobl9-agent-organization: nobl9-dev
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
                  name: nobl9-agent-nobl9-dev-opentsdb-opentsdb-test
            - name: N9_CLIENT_SECRET
              valueFrom:
                secretKeyRef:
                  key: client_secret
                  name: nobl9-agent-nobl9-dev-opentsdb-opentsdb-test
```

If you use Docker, you can run the Docker command to deploy the agent. It will look something like this:

</TabItem>
<TabItem value="shell" label="Docker">

If you use Docker, you can run the Docker command to deploy the Agent. It will look something like this:

```shell
# DISCLAIMER: This Docker command contains only the fields necessary for the purpose of this demo.
# It is not a ready-to-apply command, and you will need to replace the placeholder values with your own values.

docker run -d --restart on-failure \
  --name nobl9-agent-nobl9-dev-opentsdb-opentsdb-test \
  -e N9_CLIENT_ID="unique_client_id" \
  -e N9_CLIENT_SECRET="unique_client_secret" \
  nobl9/agent:latest
```

</TabItem>
</Tabs>

## Creating SLOs with OpenTSDB

The section below outlines how to create your SLOs in the Nobl9 web app (UI) and by applying YAML files through `sloctl`.

### Creating SLOs in the UI

Follow the instructions below to create your SLOs with OpenTSDB in the UI:

1. Navigate to **Service Level Objectives**.

2. Click the <img src="/img/plus_button.png" alt="plus button" width="20" height="20"></img> button.

3. In step 1 of the SLO wizard, select the **Service** the SLO will be associated with.

4. In step 2, select OpenTSDB as the **Data Source** for your SLO, then specify the **Metric**. You can choose either a **Threshold Metric**, where a single time series is evaluated against a threshold, or a **Ratio Metric**, which allows you to enter two time series to compare (for example, a count of good requests and total requests).

    * **Threshold metric** for OpenTSDB:<br/>
        **Query**: `m=none:{{.N9RESOLUTION}}-avg-zero:transaction.duration{host=host.01}`

    * **Ratio metric** for OpenTSDB:<br/>
        **Good Query**: `m=none:{{.N9RESOLUTION}}-count-zero:cpu{cpu.usage=core.1}}}-count-zero:http.code{code=2xx}`<br/>
        **Total Query**: `m=none:{{.N9RESOLUTION}}-count-zero:http.code{type=http.status_code}`

5. In step 3, define a **Time Window** for the SLO.

6. In step 4, specify the **Error Budget Calculation Method** and your **Objective(s)**.

7. In step 5, add a **Name**, **Description**, and other details about your SLO. You can also select **Alert Policies** and **Labels** on this screen.

8. When you’re done, click <span style={{color: '#D92680'}}>**Create SLO**</span>.

### Creating SLOs with OpenTSDB - YAML examples

<Tabs>
<TabItem value="code" label="rawMetric" default>

Here’s an example of OpenTSDB using `rawMetric` (**Threshold metric**):

```yaml
apiVersion: n9/v1alpha
kind: SLO
metadata:
  name: opentsdb-slo-raw
  displayName: OpenTSDB Raw
  project: opentsdb
spec:
  service: opentsdb-demo-service
  indicator:
    metricSource:
      name: opentsdb
    rawMetric:
      opentsdb: >-
        start="{{.BeginTime}}&end={{.EndTime}}&ms=true&m=none:{{.Resolution}}-avg-zero:transaction.duration{host=host.01}
  timeWindows:
    - unit: Day
      count: 1
      calendar:
        startTime: 2020-01-21T12:30:00.000Z
        timeZone: America/New_York
  budgetingMethod: Occurrences
  objectives:
    - displayName: Excellent
      value: 200
      target: 0.8
      op: lte
    - displayName: Good
      value: 250
      target: 0.9
      op: lte
    - displayName: Poor
      value: 300
      target: 0.99
  op: lte
```
</TabItem>
<TabItem value="example" label="countMetric">

Here’s an example of OpenTSDB using `countMetric` (**Ratio metric**):

```yaml
apiVersion: n9/v1alpha
kind: SLO
metadata:
  name: opentsdb-slo-ratio
  displayName: OpenTSDB Ratio
  project: opentsdb
spec:
  budgetingMethod: Occurrences
  indicator:
    metricSource:
      kind: Agent
      name: opentsdb
      project: opentsdb
  objectives:
    - countMetrics:
        good:
          opentsdb: >-
            start="{{.BeginTime}}&end={{.EndTime}}&ms=true&m=none:{{.Resolution}}-count-zero:http.code{code=2xx}
        incremental: false
        total:
          opentsdb: >-
            start="{{.BeginTime}}&end={{.EndTime}}&ms=true&m=none:{{.Resolution}}-count-zero:http.code{type=http.status_code}
      displayName: Enough
      target: 0.5
      value: 1
  service: opentsdb-demo-service
  timeWindows:
    - count: 1
      isRolling: true
      unit: Hour
```

</TabItem>
</Tabs>

### OpenTSDB Queries

* Nobl9 agent must have control over queried time range. The query must filter out documents in a specific time range:

`start={{.BeginTime}}&end={{.EndTime}}}&m=none:{{.ResolutionTime}}-p75:test.to.test{tag.name_1=tag.tag_1}` parameters in:

* The following area the default placeholders. They will be populated on plugin side, these values are constant and should be provided as is. (Curly braces are around each of these values):

  * .BeginTime

  * .EndTime

  * .Resolution

* `p75` is the aggregation function that will be used (e.g. count, 99th percentile)

* `test.to.test` is the target metric name

* `{tag.name_1=tag.tag_1}` is an optional key-value set parameter for additional filtering (e.g. host=cluster01)

* The following are the mandatory placeholders replaced by Nobl9 agent with the correct time values.

  * `{{.BeginTime}}`

  * `{{.EndTime}}`

  * `{{.Resolution}}`

Nobl9 also supports a list of TSUIDs that share a common metric instead of a query. For more details, refer to [TSUIDs and UIDs](http://opentsdb.net/docs/build/html/user_guide/uids.html) in the OpenTSDB documentation.

An OpenTSDB query requires at least one sub query, a means of selecting which time series should be

## Querying the OpenTSDB Server

Nobl9 queries OpenTSDB API once per minute and requests a resolution of 4, thus giving 4 data points per minute. The start and end times, along with the specified query and resolution value are passed into the API call.

## Useful Links

* [TSUIDs and UIDs | OpenTSDB 2.4 Documentation](http://opentsdb.net/docs/build/html/user_guide/uids.html)

* [Aggregation | OpenTSDB 2.4 Documentation](http://opentsdb.net/docs/build/html/user_guide/query/aggregators.html)

* [API query | OpenTSDB 2.4 Documentation](http://opentsdb.net/docs/build/html/api_http/query/index.html)

* [Downsampling | OpenTSDB 2.4 Documentation](http://opentsdb.net/docs/build/html/user_guide/query/downsampling.html)

* [Query filters | OpenTSDB 2.4 Documentation](http://opentsdb.net/docs/build/html/user_guide/query/filters.html)
