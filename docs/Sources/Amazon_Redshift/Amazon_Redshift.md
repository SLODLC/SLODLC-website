---
id: amazon-redshift
title: Amazon Redshift
sidebar_label: Amazon Redshift
sidebar_position: 1
toc_min_heading_level: 2
toc_max_heading_level: 5
description: Details about integration with Amazon Redshift
keywords:
  - Redshift
  - SLO
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Amazon Redshift

Amazon Redshift is a managed scalable database warehouse where Nobl9 users can store their metrics information.  Nobl9 allows retrieving metrics data from Redshift, enabling customers to use standard SQL statements that require two specific return values - a value and a timestamp.

## Authentication

Nobl9 supports authenticating with Amazon Redshift’s Data API using the [AWS Secrets Manager](/Sources/Amazon_Redshift/AWS_Secrets.md). To connect to Redshit through Direct and Agent configuration, you will need to create a secret and ensure the secret is tagged with the `RedshiftDataFullAccess` permission.

:::tip
When running the Agent you will also be asked to provide the ARN for the secret.
:::

For more information on Redshift secrets, refer to [Using the Amazon Redshift Data API | Amazon Redshift Documentation](https://docs.aws.amazon.com/redshift/latest/mgmt/data-api.html).

### Authentication - Scope of Support

* Nobl9 does not support SQL connections.
* Nobl9 does not support temporary credentials.
* For authenticating with the Data API, Nobl9 only supports authentication via [AWS Secrets Manager](/Sources/Amazon_Redshift/AWS_Secrets.md) stored secret.

## Adding Amazon Redshift as a Data Source in the UI

To add Pingdom as a data source in Nobl9 using the Agent or Direct connection method, follow these steps:

1. Navigate to **Integrations > Sources**.

2. Click the <img src="/img/plus_button.png" alt="plus button" width="20" height="20"></img> button.

3. Select the Amazon Redshift icon.

4. Choose a configuration method (**Direct** or **Agent**), then configure the source as described below.

### Direct Configuration in the UI

Direct connection to Amazon Redshift requires users to enter their credentials which Nobl9 will store safely. (The steps below should be modified accordingly).

1. Enter your **AWS Secret ARN** (mandatory).<br/>
    The secret must be tagged with `RedshiftDataFullAccess` permission. For more information, see [Data API | Amazon Redshift Documentation](https://docs.aws.amazon.com/redshift/latest/mgmt/data-api.html)

2. Add **AWS Access Key ID** and **AWS Secret Access Key** (mandatory).<br/>
  The Access Keys are user security credentials that are used to make programmatic calls to Amazon Web Services. Both AWS Access Key ID and AWS Secret Access Key are created as a pair. Your AWS Access Key ID and AWS Secret Access Key are encrypted before being stored on the Nobl9 server. You will also need Redshift `AmazonRedshiftDataFullAccess` API permissions.

3. Select a **Project** (mandatory).<br/>
  Using the Project is helpful when multiple users are spread across multiple teams or projects. When the Project field is left blank, a default value appears.

4. Enter a **Display name** (optional).<br/>
    You can enter a friendly name with spaces in this field.

5. Enter a **Name** (mandatory).<br/>
   The name is mandatory and can only contain lowercase, alphanumeric characters and dashes (for example, `my-project-name`). This field is populated automatically when you enter a display name, but you can edit the result.

6. Enter a **Description** (optional).<br/>
  Here you can add details such as who is responsible for the integration (team/owner) and the purpose of creating it.

7. Click the <span style={{color: '#D92680'}}>**Add Data Source**</span> button.

### Amazon Redshift Agent

#### Agent Configuration in the UI

Follow the instructions below to create your Amazon Redshift Agent (refer to the section above for the description of the fields).

1. Select a **Project** (mandatory).

2. Enter a **Display name** (optional).

3. Enter a **Name** (mandatory).

4. Enter a **Description** (optional).

5. Click the <span style={{color: '#D92680'}}>**Add Data Source**</span> button.

<!-- Currently, the Agent can't be applied via sloctl, scetion TBA in the futue. #### Agent Using CLI - YAML

The YAML for setting up an agent connection to Amazon Redshift looks like this:

```yaml
apiVersion: n9/v1alpha
kind: Agent
metadata:
  name: redshift-agent
  displayName: Redshift Agent
  project: default
spec:
  description: Agent settings for redshift datasource
  sourceOf:
  - Metrics
  - Services
 redshift: {}
 ``` -->

#### Deploying your Amazon Redshift Agent

To start the Agent process you can either apply the YAML config file to a Kubernetes cluster or run a Docker container from the code snippet. Both the Kubernetes config and Docker snippet are available in Agent details in the Web UI. Be sure to swap in your credentials (e.g., replace `<AWS_SECRET_ARN>`, `<AWS_ACCESS_KEY_ID>`, and `<AWS_SECRET_ACCESS_KEY>` with your organization key).

<Tabs>
<TabItem value="code" label="Kubernetes" default>

If you use Kubernetes, you can apply the following command to deploy the Agent. It will look something like this:

```yaml
# DISCLAIMER: This deployment description contains only the fields necessary for the purpose of this demo.
# It is not a ready-to-apply k8s deployment description, and the client_id and client_secret are only exemplary values.

apiVersion: v1
kind: Secret
metadata:
  name: nobl9-agent-nobl9-dev-default-my-amazon-redshift
  namespace: default
type: Opaque
stringData:
  aws_access_key_id: <AWS_ACCESS_KEY_ID>
  aws_secret_access_key: <AWS_SECRET_ACCESS_KEY>
  aws_secret_arn: <AWS_SECRET_ARN>
  client_id: client_id
  client_secret: client_secret
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nobl9-agent-nobl9-dev-default-my-amazon-redshift
  namespace: default
spec:
  replicas: 1
  selector:
    matchLabels:
      nobl9-agent-name: my-amazon-redshift
      nobl9-agent-project: default
      nobl9-agent-organization: nobl9-dev
  template:
    metadata:
      labels:
        nobl9-agent-name: my-amazon-redshift
        nobl9-agent-project: default
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
                  name: nobl9-agent-nobl9-dev-default-my-amazon-redshift
            - name: AWS_ACCESS_KEY_ID
              valueFrom:
                secretKeyRef:
                  key: aws_access_key_id
                  name: nobl9-agent-nobl9-dev-default-my-amazon-redshift
            - name: AWS_SECRET_ACCESS_KEY
              valueFrom:
                secretKeyRef:
                  key: aws_secret_access_key
                  name: nobl9-agent-nobl9-dev-default-my-amazon-redshift
            - name: AWS_SECRET_ARN
              valueFrom:
                secretKeyRef:
                  key: aws_secret_arn
                  name: nobl9-agent-nobl9-dev-default-my-amazon-redshift
            - name: N9_INTAKE_URL
              value: "https://dev-demo-3.nobl9.dev/api/input"
            - name: N9_CLIENT_SECRET
              valueFrom:
                secretKeyRef:
                  key: client_secret
                  name: nobl9-agent-nobl9-dev-default-my-amazon-redshift
```

</TabItem>
<TabItem value="shell" label="Docker">

If you use Docker, you can run the Docker command to deploy the Agent. It will look something like this:

```shell
# DISCLAIMER: This Docker command contains only the fields necessary for the purpose of this demo.
# It is not a ready-to-apply command, and you will need to replace the placeholder values with your own values.

docker run -d --restart on-failure \
  --name nobl9-agent-nobl9-dev-default-my-amazon-redshift \
  -e N9_CLIENT_SECRET="client_secret" \
  -e N9_CLIENT_ID="client_id" \
  -e AWS_ACCESS_KEY_ID="<AWS_ACCESS_KEY_ID>" \
  -e AWS_SECRET_ACCESS_KEY="<AWS_SECRET_ACCESS_KEY>" \
  -e AWS_SECRET_ARN="<AWS_SECRET_ARN>" \
  nobl9/agent:latest
```

</TabItem>
</Tabs>

## Creating SLOs with Amazon Redshift

### Creating SLOs in the UI

Follow the instructions below to create your SLOs with Amazon Redshift in the UI:

1. Navigate to **Service Level Objectives**.

2. Click the <img src="/img/plus_button.png" alt="plus button" width="20" height="20"></img> button.

3. In step 1 of the SLO wizard, select the **Service** the SLO will be associated with.

4. In step 2, select Redshift as the **Data Source** for your SLO.

    1. Enter a **Region** (mandatory).<br/>
        Use one of the regional endpoints that are listed [here](https://docs.aws.amazon.com/general/latest/gr/rande.html#regional-endpoints).

    2. Enter a **Cluster ID** (mandatory).<br/>
        It is an identifier of your Amazon Redshift cluster that is a part of your Redshift secret. For more details on Redshift, secrets go [here](https://docs.aws.amazon.com/redshift/latest/mgmt/data-api.html). For example `redshift-cluster-1`.

    3. Enter a **Database name** (mandatory).<br/>
        It is the name of your Amazon Redshift database. For example `dev`.

    4. Select a metric type. You can choose between two types of metrics:

        1. A **Threshold Metric** is a single time series evaluated against a threshold.

        2. A **Ratio Metric** allows you to enter two-time series to compare (for example, a count of good requests and total requests).

    5. Enter a **Query** or **Good query** and **Total query**:

        1. Query example for the **Threshold metric (Raw metric)**:<br/>
            Query: `SELECT value as n9_value, timestamp as n9_time FROM httpstatuscodes WHERE timestamp BETWEEN :n9date_from AND :n9date_to`

        2. Query example for the **Ratio metric (Count metric)**:<br/>
            Good query:`SELECT value as n9value, timestamp as n9date FROM httpstatuscodes WHERE timestamp BETWEEN :n9date_from AND :n9date_to`<br/>
            Total query: `SELECT value as n9value, timestamp as n9date FROM sinusoid WHERE timestamp BETWEEN :n9date_from AND :n9date_to`

5. In step 3, define a **Time Window** for the SLO.

6. In step 4, specify the **Error Budget Calculation Method** and your **Objective(s)**.

7. In step 5, add a **Name**, **Description**, and other details about your SLO. You can also select **Alert Policies** and **Labels** on this screen.

8. When you’re done, click <span style={{color: '#D92680'}}>**Create SLO**</span>.

### SLOs using Amazon Redshift - YAML examples

<Tabs>
<TabItem value="code" label="rawMetric" default>

Here’s an example of Amazon Redshift using a `rawMetric` (**Threshold Metric**)

```yaml
apiVersion: n9/v1alpha
kind: SLO
metadata:
  name: redshift-raw
  displayName: Redshift Raw SLO
  project: redshift
spec:
  description: Redshift SLO Description
  service: redshift
  indicator:
    metricSource:
      name: redshift
      project: redshift
    rawMetric:
      redshift:
       region: eu-central-1
       clusterId: n9-dev-tooling-redshift
       databaseName: dev
       query: SELECT value as n9value, timestamp as n9date FROM sinusoid WHERE
            timestamp BETWEEN :n9date_from AND :n9date_to
  budgetingMethod: Occurrences
  objectives:
  - target: 0.8
    value: 0.8
    op: lte
    displayName: average
  - target: 0.9
    value: 0.9
    op: lte
    displayName: so-so
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

Here’s an example of Amazon Redshift using `countMetric` (**Ratio Metric**):

```yaml
apiVersion: n9/v1alpha
kind: SLO
metadata:
  name: redshift-count
  displayName: Redshift Count SLO
  project: redshift
spec:
  description: Redshift Count Description
  service: redshift
  indicator:
    metricSource:
      name: redshift
      project: redshift
  budgetingMethod: Occurrences
  timeWindows:
    - unit: Day
      count: 7
      isRolling: true
  objectives:
  - countMetrics:
      incremental: false
      good:
        redshift:
          clusterId: n9-dev-tooling-redshift
          databaseName: dev
          query: SELECT value as n9value, timestamp as n9date FROM httpstatuscodes
            WHERE value = '200' AND timestamp BETWEEN :n9date_from AND :n9date_to
          region: eu-central-1
      total:
        redshift:
          clusterId: n9-dev-tooling-redshift
          databaseName: dev
          query: SELECT value as n9value, timestamp as n9date FROM httpstatuscodes
            WHERE timestamp BETWEEN :n9date_from AND :n9date_to
          region: eu-central-1
    displayName: ""
    target: 0.99
    value: 1
```

</TabItem>
</Tabs>

**The Amazon Redshift SLO requires the following fields:**

* `region`

* `clusterID`

* `databaseName`

* Refer to [Creating SLOs in the UI](#creating-slos-in-the-ui) section for more details on these fields.

**n9date and n9value:**

Amazon Redshift SQL query needs to return two values - `n9date` and `n9value`:

* `n9date` is the timestamp for the data.

* `n9value` is a float containing the actual metric.

  Note that Amazon RedShift accepts these values in the following format:

  * `:n9date_from`

  * `:n9date_to`

  This allows users to enter virtually any query.

## Querying the Amazon Redshift Server

To call the AWS Redshift Data API, Nobl9 runs the `aws redshift-data execute-statement` command that is executed once per minute. Nobl9 queries for data from the previous minute.

## Useful Links

* [Data API | Amazon Redshift Documentation](https://docs.aws.amazon.com/redshift/latest/mgmt/data-api.html).

* [Regional Endpoints | Amazon Redshift Documentation](https://docs.aws.amazon.com/general/latest/gr/rande.html#regional-endpoints).

