---
id: bigquery
title: BigQuery
sidebar_label: BigQuery
sidebar_position: 5
toc_min_heading_level: 2
toc_max_heading_level: 5
description: Details about integration with BigQuery
keywords:
  - BigQuery
  - SLO
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# BigQuery

Google BigQuery is a serverless data warehouse that enables scalable analysis over petabytes of data. It is a Platform as a Service that supports querying using ANSI SQL. BigQuery integration with Nobl9 enables users to turn their big data into valuable business insights.

## Authentication

Big Query authentication requires the user’s credentials to be entered in Nobl9. Users can retrieve their authentication credentials from the Google Cloud Platform as the `Service account key file`. For all necessary details on how to get the `Service account key file`, refer to the [Getting Started with Authentication | BigQuery Documentation](https://cloud.google.com/docs/authentication/getting-started) document.

For the Direct connection, the contents of the downloaded `Service account key file` can be pasted into Nobl9 UI. This will enable direct integration with the Big Query APIs to retrieve the data leveraging the SaaS to SaaS infrastructure in Nobl9.

Agent connection requires that the user has a set of BigQuery permissions. The minimal set of permissions required for the BigQuery agent connection is:

```shell
bigquery.datasets.get
bigquery.jobs.create
bigquery.jobs.list
bigquery.models.getData
bigquery.models.getMetadata
bigquery.tables.getData
```

## Adding BigQuery as a Source in the UI

Follow the instructions below to add BigQuery as a Source, using Agent or Direct connection.

1. Navigate to **Integrations > Sources**.

2. Click the <img src="/img/plus_button.png" alt="plus button" width="20" height="20"></img> button.

3. Click the BigQuery icon.

4. Choose **Direct** or **Agent**, then configure the source as described below.

### Direct Configuration for BigQuery

Direct configuration for BigQuery requires users to enter their credentials which Nobl9 will store safely.

1. Select a **Project** (mandatory).<br/>
    Specifying a Project is helpful when multiple users are spread across multiple teams or projects. When the Project field is left blank, a default value appears.

2. Enter a **Display name** (optional).<br/>
    You can enter a friendly name with spaces in this field.

3. Enter a **Name** (mandatory).<br/>
    The name is mandatory and can only contain lowercase, alphanumeric characters and dashes (for example, `my-project-name`). This field is populated automatically when you enter a display name, but you can edit the result.

4. Enter a **Description** (optional).<br/>
    Here you can add details such as who is responsible for the integration (team/owner) and the purpose of creating it.

5. Click the <span style={{color: '#D92680'}}>**Add Data Source**</span> button.

### BigQuery Agent

#### Agent Configuration in the UI

Follow the instructions below to create your BigQuery Agent:

1. Enter a **Project** (mandatory).

2. Enter a **Display name** (optional).

3. Enter a **Name** (mandatory).

4. Enter a **Description** (optional).

5. Click the <span style={{color: '#D92680'}}>**Add Data Source**</span> button.

<!-- Currently, the Agent can't be applied via sloctl, scetion TBA in the futue. #### Agent Using CLI - YAML

The YAML for configuring BigQuery Agent looks like this

```yaml
apiVersion: n9/v1alpha
kind: Agent
metadata:
  name: bigquery
  displayName: BigQuery Agent
  project: default
spec:
  description: BigQuery description
  sourceOf:
    - Metrics
  bigQuery: {}
```

**Important notes:**

Before using the BigQuery Agent you will need to know your `projectID` and `location`.

* The `projectID` is a unique identifier of Google Cloud Project. The `projectID` must be a unique string of 6-30 lowercase letters, digits, or hyphens.

* The `location` is the BigQuery dataset from where the data is read. -->

#### Deploying BigQuery Agent

To start the Agent process you can either apply the YAML config file to a Kubernetes cluster or run a Docker container from the code snippet. Both the Kubernetes config and Docker snippet are available in Agent details in the Web UI. Be sure to swap in your credentials (e.g., replace the `<CREDENTIALS>` comment with the contents of your credentials.json file encoded with base64).

<Tabs>
<TabItem value="code" label="Kubernetes" default>

If you use Kubernetes, you can apply the following command to deploy the Agent. It will look something like this:

```yaml
# DISCLAIMER: This deployment description contains only the fields necessary for the purpose of this demo.
# It is not a ready-to-apply k8s deployment description, and the client_id and client_secret are only exemplary values.

apiVersion: v1
kind: Secret
metadata:
  name: nobl9-agent-nobl9-dev-bigquery-agent
  namespace: default
type: Opaque
stringData:
  client_id: "unique_client_id"
  client_secret: "unique_client_secret"
data:
  credentials.json: |-
#  <CREDENTIALS>
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nobl9-agent-nobl9-dogfood-test-mybq
  namespace: default
spec:
  replicas: 1
  selector:
    matchLabels:
      nobl9-agent-name: mybq
      nobl9-agent-project: test
  template:
    metadata:
      labels:
        nobl9-agent-name: mybq
        nobl9-agent-project: test
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
                  name: nobl9-agent-nobl9-dogfood-test-mybq
            - name: N9_CLIENT_SECRET
              valueFrom:
                secretKeyRef:
                  key: client_secret
                  name: nobl9-agent-nobl9-dogfood-test-mybq

            - name: N9_GCP_CREDENTIALS_PATH
              value: "/var/gcp/credentials.json"
            # N9_ALLOWED_URLS is an optional safety parameter that limits the URLs that an Agent is able to query
            # for metrics. URLs defined in the Nobl9 app are prefix-compared against the N9_ALLOWED_URLS list of
            # comma separated URLs.
            # - name: N9_ALLOWED_URLS
            #   value: "http://172.16.0.2/api/v1/query,http://172.16.0.3"
          volumeMounts:
          - name: gcp-credentials
            mountPath: "/var/gcp"
            readOnly: true
      volumes:
      - name: gcp-credentials
        secret:
          secretName: nobl9-agent-nobl9-dogfood-test-mybq
```

</TabItem>
<TabItem value="shell" label="Docker">

If you use Docker, you can run the Docker command to deploy the agent. It will look something like this (be sure to swap `<PATH_TO_LOCAL_CREDENTIALS_FILE>` with the path to your local credentials.json file):

```shell
# DISCLAIMER: This Docker command contains only the fields necessary for the purpose of this demo.
# It is not a ready-to-apply command, and you will need to replace the placeholder values with your own values.

docker run -d --restart on-failure --name nobl9-agent-nobl9-dogfood-test-mybq \
  -e N9_CLIENT_ID="unique_client_id" \
  -e N9_CLIENT_SECRET="unique_client_secret" \
  -e N9_GCP_CREDENTIALS_PATH=/var/gcp/credentials.json \
  -v <PATH_TO_LOCAL_CREDENTIALS_FILE>:/var/gcp/credentials.json \
  nobl9/agent:latest
```

</TabItem>
</Tabs>

## Creating SLOs with BigQuery

The section below outlines how to create your SLOs in the Nobl9 web app (UI) and by applying YAML files through `sloctl`.

### Creating SLOs in the UI

Follow the instructions below to create your SLOs with BigQuery in the UI:

1. Navigate to **Service Level Objectives**.

2. Click the <img src="/img/plus_button.png" alt="plus button" width="20" height="20"></img> button.

3. Select a **Data Source** from the drop-down list.

4. Enter a **Project ID**.<br/>
    The **Project ID** is a unique identifier of the Google Cloud Project. For more details, refer to [Creating and Managing Projects | BigQuery Documentation](https://cloud.google.com/resource-manager/docs/creating-managing-projects).
    The **Project ID** must be a unique string of 6-30 lowercase letters, digits, or hyphens.
    Example: `bigquery://project`

5. Enter a **Location** of the BigQuery dataset from where the data is read.<br/>
    [See Supported Locations | BigQuery Documentation](https://cloud.google.com/bigquery/docs/locations)

6. Select a type of **Metric**, and enter a **Query**.<br/>

7. Enter an **SQL query** or **SQL query for the good counter**, and an **SQL query for the total counter** for the metric you selected.

    * Threshold metric for BigQuery:<br/>
        ``SELECT response_time AS n9value, created AS n9date FROM `bdwtest-256112.metrics.http_response` WHERE created BETWEEN DATETIME(@n9date_from) AND DATETIME(@n9date_to)``

    * Ratio Metric for BigQuery:<br/>
        Good query: `` SELECT response_time AS n9value, created AS n9date FROM `test-123.metrics.http_response` ``<br/>
        Total Query: `` SELECT response_time AS n9value, created AS n9date FROM `test-123.metrics.http_response` ``

8. In step 3, define a **Time Window** for the SLO.

9. In step 4, specify the **Error Budget Calculation Method** and your **Objective(s)**.

10. In step 5, add a **Name**, **Description**, and other details about your SLO. You can also select **Alert Policies** and **Labels** on this screen.

11. When you’re done, click <span style={{color: '#D92680'}}>**Create SLO**</span>.

### Query Samples

<Tabs>
<TabItem value="sql" label="Threshold Metric" default>

Threshold Metric sample:

```sql
SELECT
  response_time AS n9value,
  created AS n9date
FROM `bdwtest-256112.metrics.http_response`
WHERE created
  BETWEEN DATETIME(@n9date_from)
  AND DATETIME(@n9date_to)
```

</TabItem>
<TabItem value="Ratio Metric" label="Ratio Metric">

Ratio Metric example:

```sql
SELECT
    1 AS n9value,
    created AS n9date
FROM `bdwtest-256112.metrics.http_response`
WHERE created
    http_code = 200
    AND BETWEEN DATETIME(@n9date_from)
    AND DATETIME(@n9date_to)
```

</TabItem>
</Tabs>

The **n9value** must be an alias for a numeric field, while the **n9date** represents a date in DATETIME format. Conditions are required. For example, a `WHERE` or `HAVING` clause narrows the query to a `DATETIME(@n9date_from)` and `DATETIME(@n9date_to)` timeframe. A validation checks if the columns or aliases are present in the queries.

Sample query results:

```sql
n9value | n9date
256     | 2021-06-15T01:00:47.754070
259     | 2021-06-14T16:35:36.754070
250     | 2021-06-14T17:27:15.754070
```

### BigQuery YAML Examples (SLO)

<Tabs>
<TabItem value="yaml" label="rawMetric" default>

Here’s an example of BiqQuery using `rawMetric` (**Threshold metric**):

```yaml
apiVersion: n9/v1alpha
kind: SLO
metadata:
  name: slo-with-bigquery-agent-raw-metrics
  displayName: Slo with BigQuery agent raw metrics
  project: bigquery
spec:
  description: Description
  service: bigquery
  indicator:
    metricSource:
      name: bigquery
    rawMetric:
      bigQuery:
        projectId: "bdwtest-256112"
        location: "EU"
        query: "SELECT response_time AS n9value, created AS n9date FROM `bdwtest-256112.metrics.http_response` WHERE created BETWEEN DATETIME(@n9date_from) AND DATETIME(@n9date_to)"
  timeWindows:
    - unit: Week
      count: 1
      calendar:
        startTime: 2020-01-21 12:30:00 # date with time in 24h format
        timeZone: America/New_York # name as in IANA Time Zone Database
  budgetingMethod: Occurrences
  objectives:
    - displayName: Fatal
      op: lte
      value: 6.50
      target: 0.6
    - displayName: Poor
      op: lte
      value: 6.00
      target: 0.6
    - displayName: Good
      op: lte
      value: 5.55
      target: 0.7
    - displayName: Perfect
      op: lte
      value: 5.00
      target: 0.8
    - displayName: TooPerfect
      op: lte
      value: 4
      target: 0.8
```

</TabItem>
<TabItem value="countmetric" label="countMetric">

Here’s an example of BiqQuery using `countMetric` (**Ratio metric**):

```yaml
apiVersion: n9/v1alpha
kind: SLO
metadata:
  name: slo-with-bigquery-agent-count-metrics
  displayName: Slo with bigquery agent count metrics
  project: bigquery
spec:
  description: Description
  service: bigquery
  indicator:
    metricSource:
      name: bigquery
  timeWindows:
    - unit: Week
      count: 1
      calendar:
        startTime: 2020-01-21 12:30:00 # date with time in 24h format
        timeZone: America/New_York # name as in IANA Time Zone Database
  budgetingMethod: Occurrences
  objectives:
    - displayName: Good
      target: 0.95
      countMetrics:
        incremental: false
        good:
          bigQuery:
            projectId: "bdwtest-256112"
            location: "EU"
            query: "SELECT http_code AS n9value, created AS n9date FROM `bdwtest-256112.metrics.http_response` WHERE http_code = 200 AND created BETWEEN DATETIME(@n9date_from) AND DATETIME(@n9date_to)"
        total:
          bigQuery:
            projectId: "bdwtest-256112"
            location: "EU"
            query: "SELECT http_code AS n9value, created AS n9date FROM `bdwtest-256112.metrics.http_response` WHERE created BETWEEN DATETIME(@n9date_from) AND DATETIME(@n9date_to)"
```

</TabItem>
</Tabs>

**Important notes:**

The BigQuery SLO requires the following fields:

* The `location` is the BigQuery dataset from where the data is read.

* The `projectID` is a unique identifier of Google Cloud Project. The `projectID` must be a unique string of 6-30 lowercase letters, digits, or hyphens.

* The `query`.

## Useful Links

* [Getting Started | BigQuery Documentation](https://cloud.google.com/docs/authentication/getting-started)

* [Queries | BigQuery Documentation](https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query)

* [Creating and Managing Projects | BigQuery Documentation](https://cloud.google.com/resource-manager/docs/creating-managing-projects)
