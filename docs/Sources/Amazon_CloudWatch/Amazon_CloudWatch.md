---
id: amazon-cloudwatch
title: Amazon CloudWatch
sidebar_label: Amazon CloudWatch
sidebar_position: 1
pagination_label: Amazon Cloudwatch
toc_min_heading_level: 2
toc_max_heading_level: 5
description: Details about integration with CloudWatch
keywords:
  - CloudWatch
  - SLO
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Amazon CloudWatch

Amazon CloudWatch is a monitoring and observability service and a repository that aggregates data from more than 70 AWS data sources. CloudWatch also allows users to publish custom metrics from their services. Creating SLOs using this data is a powerful tool to monitor large portfolios of products.

Nobl9 integration with CloudWatch supports CloudWatch Metrics Insights. Leveraging Metrics Insights, Nobl9 users can retrieve metrics even faster and gain added flexibility in querying raw service level indicator (SLI) data to use for their SLOs.

Using CloudWatch as a Source in Nobl9, users can configure their SLOs by leveraging data in CloudWatch-specific groupings – i.e., by region, namespaces, and dimensions.

## Scope of Support

The following CloudWatch metric features are **not supported**:

* High-resolution metrics (for details, see [Put Metric Data | Amazon CloudWatch Documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_PutMetricData.html))

* Metrics that use more than one Unit.

## Authentication

Applications that are integrated with AWS must sign their API requests with AWS Access Keys that are used to sign programmatic requests that users make to AWS. Access keys consist of:

* `AWS Access Key ID`

* `AWS Secret Access Key`

Both `AWS Access Key ID` and `AWS Secret Access Key` are created as a pair. Your Access Key ID and Secret Access Key are encrypted before being stored on the Nobl9 server. You will also need Cloudwatch GetMetricData API permissions to make programmatic requests to AWS API.

You can create your AWS Access Key ID and AWS Secret Access Key by using the [AWS Management Console](https://console.aws.amazon.com/console/home). For more details, go to [Getting Started with the AWS SDK for Go](https://docs.aws.amazon.com/sdk-for-go/v1/developer-guide/setting-up.html).

:::caution
If you're using AWS Free Tier, you won't be able to use the GetMetricData API to collect CloudWatch metrics.
:::

## Adding Amazon CloudWatch as a Data Source

Follow the instructions below to add CloudWatch as a Source, using Agent or Direct configuration.

1. Navigate to **Integrations > Sources**.

2. Click the <img src="/img/plus_button.png" alt="plus button" width="20" height="20"></img> button.

3. Click the Amazon CloudWatch icon.

4. Choose **Direct** or **Agent**, then configure the source as described below.

### Direct Configuration for CloudWatch

Direct configuration of CloudWatch requires users to enter their credentials which Nobl9 will store safely.

1. Add **Access Key ID** and **Secret Access Key**.<br/>
    For details, see the [Authentication](#authentication) section above.

2. Select a **Project** (mandatory).<br/>
    Specifying a Project is helpful when multiple users are spread across multiple teams or projects. When the Project field is left blank, a default value appears.

3. Enter a **Display name** (optional).<br/>
    You can enter a friendly name with spaces in this field.

4. Enter a **Name** (mandatory).<br/>
    The name is mandatory and can only contain lowercase, alphanumeric characters and dashes (for example, `my-project-name`). This field is populated automatically when you enter a display name, but you can edit the result.

5. Enter a **Description** (optional).<br/>
    Here you can add details such as who is responsible for the integration (team/owner) and the purpose of creating it.

6. Click the <span style={{color: '#D92680'}}>**Add Data Source**</span> button.

### CloudWatch Agent

#### Agent Configuration in the UI

Follow the instructions below to create your CloudWatch Agent:

1. Enter a **Project** (mandatory).

2. Enter a **Display name** (optional).

3. Enter a **Name** (mandatory).

4. Enter a **Description** (optional).

5. Click the <span style={{color: '#D92680'}}>**Add Data Source**</span> button.

<!-- Currently, the Agent can't be applied via sloctl, scetion TBA in the futue. #### Agent Using CLI - YAML

The YAML for an Agent configuration for CloudWatch looks like this:

```yaml
apiVersion: n9/v1alpha
kind: Agent
metadata:
  name: cloudwatch
  displayName: AWS CloudWatch
  project: cloudwatch
spec:
  description: Integration with CloudWatch
  sourceOf:
    - Metrics
  cloudWatch: {}
``` -->

#### Deploying CloudWatch Agent

To start the Agent process you can either apply the YAML config file to a Kubernetes cluster or run a Docker container from the code snippet. Both the Kubernetes config and Docker snippet are available in Agent details in the Web UI. Be sure to swap in your credentials Be sure to swap in your credentials (i.e. if you are using AWS Access Key ID and Secret Access Key, replace `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` in the following deployment descriptions.

:::caution
Ensure `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` variables are set appropriately if you are using Access/Secret Keys. If these variables are not set, a Default Credential Provider Chain will be used.
:::

<Tabs>
<TabItem value="code" label="Kubernetes" default>

If you use Kubernetes, you can apply the following command to deploy the Agent. It will look something like this:

```yaml
# DISCLAIMER: This deployment description contains only the fields necessary for the purpose of this demo.
# It is not a ready-to-apply k8s deployment description, and the client_id and client_secret are only exemplary values.

apiVersion: v1
kind: Secret
metadata:
  name: nobl9-agent-nobl9-dev-cloudwatch-cloudwatch
  namespace: default
type: Opaque
stringData:
  aws_access_key_id: <AWS_ACCESS_KEY_ID>
  aws_secret__access_key: <AWS_SECRET_ACCESS_KEY>
  client_id: "unique_user_id"
  client_secret: "unique_client_secret"
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nobl9-agent-nobl9-dev-cloudwatch-cloudwatch
  namespace: default
spec:
  replicas: 1
  selector:
    matchLabels:
      nobl9-agent-name: cloudwatch
      nobl9-agent-project: cloudwatch
      nobl9-agent-organization: nobl9-dev
  template:
    metadata:
      labels:
        nobl9-agent-name: cloudwatch
        nobl9-agent-project: cloudwatch
        nobl9-agent-organization: nobl9-dev
    spec:
      containers:
        - name: agent-container
          image: nobl9/agent:0.31.0
          resources:
            requests:
              memory: "350Mi"
              cpu: "0.1"
          env:
            - name: N9_CLIENT_ID
              valueFrom:
                secretKeyRef:
                  key: client_id
                  name: nobl9-agent-nobl9-dev-cloudwatch-cloudwatch
            - name: N9_CLIENT_SECRET
              valueFrom:
                secretKeyRef:
                  key: client_secret
                  name: nobl9-agent-nobl9-dev-cloudwatch-cloudwatch
            - name: AWS_ACCESS_KEY_ID
              valueFrom:
                secretKeyRef:
                  key: aws_access_key_id
                  name: nobl9-agent-nobl9-dev-cloudwatch-cloudwatch
            - name: AWS_SECRET_ACCESS_KEY
              valueFrom:
                secretKeyRef:
                  key: aws_secret_access_key
                  name: nobl9-agent-nobl9-dev-cloudwatch-cloudwatch
```

</TabItem>
<TabItem value="shell" label="Docker">

If you use Docker, you can run the Docker command to deploy the Agent. It will look something like this:

```shell
# DISCLAIMER: This docker command description is containing only the necessary fields for the purpose of this demo.
# It is not a ready-to-apply docker command.

docker run -d --restart on-failure \
--name nobl9-agent-nobl9-dev-cloudwatch-cloudwatch \
-e N9_CLIENT_ID="unique_client_id" \
-e N9_CLIENT_SECRET="unique_client_secret" \
-e AWS_ACCESS_KEY_ID="<AWS_ACCESS_KEY_ID>" \
-e AWS_SECRET_ACCESS_KEY="<AWS_SECRET_ACCESS_KEY>" \
nobl9/agent:0.31.0
```

</TabItem>
</Tabs>

## Creating SLOs with CloudWatch

### Creating CloudWatch SLOs in the UI

Using Amazon CloudWatch, users can create their SLOs by:

* Entering standard Threshold and Ratio metrics.

* Entering an SQL query.

* Entering multiple queries through JSON.

All three methods are available both in the UI and through applying YAML (see the Creating CloudWatch SLOs - YAML section).

1. Go to **Service Level Objectives** and click the <img src="/img/plus_button.png" alt="plus button" width="20" height="20"></img> button

2. In step 1 of the SLO wizard, select the **Service** the SLO will be associated with.

3. In step 2, select Amazon CloudWatch as the **Data Source** for your SLO, then specify the **Metric**. You can choose either a **Threshold Metric**, where a single time series is evaluated against a threshold, or a **Ratio Metric**, which allows you to enter two time series to compare (for example, a count of good requests and total requests).

    1. A **Threshold Metric** is a single time series evaluated against a threshold.

    2. A **Ratio Metric** allows you to enter two-time series to compare (for example, a count of good requests and total requests).

4. In step 3, define a **Time Window** for the SLO.

5. In step 4, specify the **Error Budget Calculation Method** and your **Objective(s)**.

6. In step 5, add a **Name**, **Description**, and other details about your SLO. You can also select **Alert Policies** and **Labels** on this screen.

7. When you’re done, click <span style={{color: '#D92680'}}>**Create SLO**</span>.

#### Entering CloudWatch Query - Standard Configuration

Both, Ratio and Threshold metrics for a standard CloudWatch metric use the same parameters.
In the case of the Ratio metric, define these parameters separately for Good Metric and Total metric:

1. Add a **Region**.
    It is a region code in AWS. Use one of the regional codes that are listed [here](https://docs.aws.amazon.com/general/latest/gr/rande.html#regional-endpoints).

2. Add a **Namespace** (mandatory, max. number of characters 255).
    A namespace can contain alphanumeric characters, period, a hyphen, underscore, forward slash, hash, or colon. A Namespace is a container for CloudWatch metrics. For further details, see [CloudWatch Concepts | Amazon CloudWatch Documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#Namespace).

3. Add a **Metric Name** (mandatory, max. number of characters 255).

4. Add **Statistic function**.
    Statistic functions are aggregations of metric data over specified periods. For example, you can use `Maximum`, `Minimum`, `Sum`, `Average`. To see all statistics are supported by CloudWatch for metrics, go to [Statistics Definition | Amazon CloudWatch Documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Statistics-definitions.html).

5. Add **Dimensions** (optional, list).
    A dimension is a name/value pair that is part of the identity of a metric. Users can assign a max. of 10 dimensions to a metric.

    1. Add a **Name** (mandatory, max. number of characters 255, don't trim whitespaces). The name of the dimension. Dimension names must contain only ASCII characters and must include at least one non-whitespace character.

    2. Add a **Value** required (max. number of characters 255). It is the value of the dimension. Dimension values must contain only ASCII characters and must include at least one non-whitespace character.

6. In step 3, define a **Time Window** for the SLO.

7. In step 4, specify the **Error Budget Calculation Method** and your **Objective(s)**.

8. In step 5, add a **Name**, **Description**, and other details about your SLO. You can also select **Alert Policies** and **Labels** on this screen.

9. When you’re done, click <span style={{color: '#D92680'}}>**Create SLO**</span>.

#### Entering CloudWatch SQL Query

1. Select ‘SQL’ in the feature toggle.

2. Select a **Region**.

3. Select a type of **Metric**, and enter a **Query**.
    Sample SQL queries for CloudWatch:

    * SQL Threshold metric for Cloudwatch:
        Query: `SELECT AVG(CPUUtilization) FROM "AWS/EC2"`

    * SQL Ratio metric for CloudWatch:
        Good Query: `SELECT AVG(CPUUtilization) FROM "AWS/EC2"`
        Total Query: `SELECT MAX(CPUUtilization) FROM "AWS/EC2"`

4. In step 3, define a **Time Window** for the SLO.

5. In step 4, specify the **Error Budget Calculation Method** and your **Objective(s)**.

6. In step 5, add a **Name**, **Description**, and other details about your SLO. You can also select **Alert Policies** and **Labels** on this screen.

7. When you’re done, click <span style={{color: '#D92680'}}>**Create SLO**</span>.

#### Entering CloudWatch multiple queries (JSON)

CloudWatch integration enables you to query multiple CloudWatch metrics and use math expressions to create new time series based on these metrics. You can do this by entering Multiple JSON Queries:

1. Choose ‘JSON’ in the feature toggle.

2. Choose a **Region**.

3. Select a type of **Metric**, and enter a **Query**.

4. Enter your JSON query.
    For samples of Multiple JSON Queries refer to the Amazon CloudWatch section in the [YAML Guide](YAML_Guide.md).
    For further details on CloudWatch metric math functions, go to [Using Metric Math | Amazon CloudWatch Documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/using-metric-math.html).

:::note
Your query must be a valid JSON query. It must contain arrays of metrics. Refer to the [CloudWatch Metrics Insights Queries | Amazon CloudWatch Documentation](https://nobl9.atlassian.net/l/c/NWPfJufu) section of Nobl9 documentation.
:::

### Creating CloudWatch SLOs - YAML

#### SLO using CloudWatch - Standard Configuartion

<Tabs>
<TabItem value="code" label="rawMetric" default>

Here’s an example of CloudWatch using a `rawMetric` (**Threshold Metric**):

```yaml
apiVersion: n9/v1alpha
kind: SLO
metadata:
  name: cloudwatch-rolling-occurrences-threshold
  project: cloudwatch
spec:
  budgetingMethod: Occurrences
  description: ""
  indicator:
    metricSource:
      name: cloudwatch
    rawMetric:
      cloudwatch:
        region: eu-central-1
        namespace: AWS/RDS
        metricName: ReadLatency
        stat: Average
        dimensions:
          - name: DBInstanceIdentifier
            value: <identifier_of_your_db_instance> # replace with value that corresponds to your DBInstanceIdentifier
  service:  cloudwatch-service
  objectives:
    - target: 0.8
      op: lte
      value: 0.0004
  timeWindows:
    - count: 1
      isRolling: true
      unit: Hour
---
apiVersion: n9/v1alpha
kind: SLO
metadata:
  name: cloudwatch-rolling-timeslices-threshold
  project: cloudwatch
spec:
  budgetingMethod: Timeslices
  description: ""
  indicator:
    metricSource:
      name: cloudwatch
    rawMetric:
      cloudwatch:
        region: eu-central-1
        namespace: AWS/RDS
        metricName: ReadLatency
        stat: Average
        dimensions:
          - name: DBInstanceIdentifier
            value: <identifier_of_your_db_instance> # replace with value that corresponds to your DBInstanceIdentifier
  service:  cloudwatch-service
  objectives:
    - target: 0.8
      op: lte
      value: 0.0004
      timeSliceTarget: 0.5
  timeWindows:
  - count: 1
    isRolling: true
    unit: Hour
```

</TabItem>
<TabItem value="example" label="countMetric">

Here’s an example of CloudWatch using a `countMetric` (**Ratio metric**):

```yaml
apiVersion: n9/v1alpha
kind: SLO
metadata:
  name: cloudwatch-calendar-occurrences-ratio
  project: cloudwatch
spec:
  budgetingMethod: Occurrences
  description: ""
  indicator:
    metricSource:
      name: cloudwatch
  service:  cloudwatch-service
  objectives:
  - target: 0.9
    countMetrics:
      good:
        cloudwatch:
          region: eu-central-1
          namespace: AWS/ApplicationELB
          metricName: HTTPCode_Target_2XX_Count
          stat: SampleCount
          dimensions:
            - name: LoadBalancer
              value: app/prod-default-appingress
      incremental: false
      total:
        cloudwatch:
          region: eu-central-1
          namespace: AWS/ApplicationELB
          metricName: RequestCount
          stat: SampleCount
          dimensions:
            - name: LoadBalancer
              value: app/prod-default-appingress
    displayName: ""
    value: 1
  timeWindows:
  - calendar:
      startTime: "2020-11-14 12:30:00"
      timeZone: Etc/UTC
    count: 1
    isRolling: false
    unit: Day
---
apiVersion: n9/v1alpha
kind: SLO
metadata:
  name: cloudwatch-rolling-occurrences-ratio
  project: cloudwatch
spec:
  budgetingMethod: Occurrences
  description: ""
  indicator:
    metricSource:
      name: cloudwatch
  service:  cloudwatch-service
  objectives:
  - target: 0.7
    countMetrics:
      good:
        cloudwatch:
          region: eu-central-1
          namespace: AWS/ApplicationELB
          metricName: HTTPCode_Target_2XX_Count
          stat: SampleCount
          dimensions:
            - name: LoadBalancer
              value: app/prod-default-appingress
      incremental: false
      total:
        cloudwatch:
          region: eu-central-1
          namespace: AWS/ApplicationELB
          metricName: RequestCount
          stat: SampleCount
          dimensions:
            - name: LoadBalancer
              value: app/prod-default-appingress
    displayName: ""
    value: 1
  timeWindows:
  - count: 1
    isRolling: true
    unit: Hour
---
apiVersion: n9/v1alpha
kind: SLO
metadata:
  name: cloudwatch-calendar-timeslices-ratio
  project: cloudwatch
spec:
  budgetingMethod: Timeslices
  description: ""
  indicator:
    metricSource:
      name: cloudwatch
  service:  cloudwatch-service
  objectives:
  - target: 0.5
    countMetrics:
      good:
        cloudwatch:
          region: eu-central-1
          namespace: AWS/ApplicationELB
          metricName: HTTPCode_Target_2XX_Count
          stat: SampleCount
          dimensions:
            - name: LoadBalancer
              value: app/main-default-appingress
      incremental: false
      total:
        cloudwatch:
          region: eu-central-1
          namespace: AWS/ApplicationELB
          metricName: RequestCount
          stat: SampleCount
          dimensions:
            - name: LoadBalancer
              value: app/main-default-appingress
    displayName: ""
    timeSliceTarget: 0.5
    value: 1
  timeWindows:
  - calendar:
      startTime: "2020-11-14 12:30:00"
      timeZone: Etc/UTC
    count: 1
    isRolling: false
    unit: Day
---
apiVersion: n9/v1alpha
kind: SLO
metadata:
  name: cloudwatch-rolling-timeslices-ratio
  project: cloudwatch
spec:
  budgetingMethod: Timeslices
  description: ""
  indicator:
    metricSource:
      name: cloudwatch
  service:  cloudwatch-service
  objectives:
  - target: 0.5
    countMetrics:
      good:
        cloudwatch:
          region: eu-central-1
          namespace: AWS/ApplicationELB
          metricName: HTTPCode_Target_2XX_Count
          stat: SampleCount
          dimensions:
            - name: LoadBalancer
              value: app/main-default-appingress
      incremental: false
      total:
        cloudwatch:
          region: eu-central-1
          namespace: AWS/ApplicationELB
          metricName: RequestCount
          stat: SampleCount
          dimensions:
            - name: LoadBalancer
              value: app/main-default-appingress
    timeSliceTarget: 0.5
    value: 1
  timeWindows:
  - count: 1
    isRolling: true
    unit: Hour
```

</TabItem>
</Tabs>

**Important Notes:**

Both, Ratio and Threshold metrics for CloudWatch use the same parameters (in the case of the Ratio metric, define these parameters separately for the Good Metric and Total metric).

* `region` is required. It is a region code in AWS. Use one of the regional codes listed [here](https://docs.aws.amazon.com/general/latest/gr/rande.html#regional-endpoints).

* `namespace` is required (string, max. number of characters 255). It can contain alphanumeric characters, period `.`, hyphen `-`, underscore `_`, forward slash `/`, hash `#`, or colon `:`. A `namespace` is a container for CloudWatch metrics. For further details, see [CloudWatch Concepts | Amazon CloudWatch Documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#Namespace). Example: `AWS/ApplicationELB`.

* `metricName` is required (string, max. number of characters 255).

* `stat` is required. stats are aggregations of metric data over specified periods of time. To see what statistics are supported by CloudWatch for metrics, go to [Statistics Definitions | Amazon CloudWatch Documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Statistics-definitions.html). Examples: `SampleCount, Average, p95, TC(0.005:0.030)`.

* `dimensions` field is optional (list). A dimension is a name/value pair that is part of the identity of a metric. Users can assign a max. of 10 dimensions to a metric.

  * `name` is required (string, max. number of characters 255). Dimension names must contain only ASCII characters and must include at least one non-whitespace character.

  * `value` is required (string, max. number of characters 255). Dimension values must contain only ASCII characters and must include at least one non-whitespace character.

#### SLO using CloudWatch SQL query

<Tabs>
<TabItem value="code" label="rawMetric" default>

Here’s an example of CloudWatch SQL query using `rawMetric` (Threshold metric**):

```yaml
apiVersion: n9/v1alpha
kind: SLO
metadata:
  name: cloudwatch-occurrences-threshold-sql
  project: cloudwatch
spec:
  budgetingMethod: Occurrences
  indicator:
    metricSource:
      name: cloudwatch
    rawMetric:
      cloudwatch:
        region: eu-central-1
        sql: 'SELECT AVG(CPUUtilization) FROM "AWS/EC2"'
  service: cloudwatch-service
  objectives:
    - target: 0.8
      op: lte
      value: 0.0004
  timeWindows:
    - calendar:
        startTime: "2021-10-01 12:30:00"
        timeZone: Etc/UTC
      count: 1
      isRolling: false
      unit: Day
```

</TabItem>
<TabItem value="example" label="countMetric">

Here’s an example of CloudWatch SQL query using `countMetric` (**Ratio metric**):

```yaml
apiVersion: n9/v1alpha
kind: SLO
metadata:
  name: cloudwatch-calendar-occurrences-ratio-sql
  project: cloudwatch
spec:
  budgetingMethod: Occurrences
  description: ""
  indicator:
    metricSource:
      name: cloudwatch
  service:  cloudwatch-service
  objectives:
  - target: 0.9
    countMetrics:
      good:
        cloudwatch:
          region: eu-central-1
          sql: 'SELECT AVG(CPUUtilization) FROM "AWS/EC2"'
      incremental: false
      total:
        cloudwatch:
          region: eu-central-1
          sql: 'SELECT MAX(CPUUtilization) FROM "AWS/EC2"'
    displayName: ""
    value: 1
  timeWindows:
  - calendar:
      startTime: "2020-11-14 12:30:00"
      timeZone: Etc/UTC
    count: 1
    isRolling: false
    unit: Day
```

</TabItem>
</Tabs>

**Important notes**:
When using SQL Query only these fields are required:

* `region` is mandatory. It is a regional code in AWS. Use one of the regional codes listed [here](https://docs.aws.amazon.com/general/latest/gr/rande.html#regional-endpoints).
    **Note**: CloudWatch SQL query is available in all AWS Regions, except China.

* `sql` is mandatory. It is an SQL query that enables you to compare, aggregate, and group your metrics by labels to gain real-time operational insights.

#### CloudWatch SLOs using multiple metrics (JSON)

CloudWatch integration enables you to query multiple CloudWatch [Metrics Insights](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/query_with_cloudwatch-metrics-insights.html) and use math expressions to create new time series based on these metrics. You can do this by entering Multiple JSON Queries.

<Tabs>
<TabItem value="code" label="rawMetric" default>

Here’s an example of CloudWatch JSON query using `rawMetric` (**Threshold metric)):

```yaml
apiVersion: n9/v1alpha
kind: SLO
metadata:
  name: cloudwatch-rolling-window-json
  project: cloudwatch
spec:
  budgetingMethod: Occurrences
  description: ""
  indicator:
    metricSource:
      name: cloudwatch
    rawMetric:
      cloudwatch:
        region: eu-central-1
        json: |
            [
                {
                    "Id": "e1",
                    "Expression": "m1 / m2",
                    "Period": 60
                },
                {
                    "Id": "m1",
                    "MetricStat": {
                        "Metric": {
                            "Namespace": "AWS/ApplicationELB",
                            "MetricName": "HTTPCode_Target_2XX_Count",
                            "Dimensions": [
                                {
                                    "Name": "LoadBalancer",
                                    "Value": "app/main-default-appingress-350b/904311bedb964754"
                                }
                            ]
                        },
                        "Period": 60,
                        "Stat": "SampleCount"
                    },
                    "ReturnData": false
                },
                {
                    "Id": "m2",
                    "MetricStat": {
                        "Metric": {
                            "Namespace": "AWS/ApplicationELB",
                            "MetricName": "RequestCount",
                            "Dimensions": [
                                {
                                    "Name": "LoadBalancer",
                                    "Value": "app/main-default-appingress-350b/904311bedb964754"
                                }
                            ]
                        },
                        "Period": 60,
                        "Stat": "SampleCount"
                    },
                    "ReturnData": false
                }
            ]
  service: cloudwatch-service
  objectives:
    - target: 0.8
      op: lte
      value: 0.9
  timeWindows:
   -  isRolling: true
      unit: Hour
      count: 1
```

</TabItem>
<TabItem value="example" label="countMetric">

Here’s an example of CloudWatch JSON query using `countMetric` (**Ratio metric**):


```yaml
apiVersion: n9/v1alpha
kind: SLO
metadata:
  name: cloudwatch-timeslices-json
  project: cloudwatch
spec:
  budgetingMethod: Timeslices
  description: ""
  indicator:
    metricSource:
      name: cloudwatch
  objectives:
  - countMetrics:
      good:
        cloudWatch:
          json: |
            [
              {
                "Id": "e1",
                "MetricStat": {
                  "Metric": {
                    "Namespace": "AWS/ApplicationELB",
                    "MetricName": "HTTPCode_Target_2XX_Count",
                    "Dimensions": [
                      {
                        "Name": "LoadBalancer",
                        "Value": "app/main-default-appingress-350b/123456789"
                      }
                    ]
                  },
                  "Period": 60,
                  "Stat": "SampleCount"
                }
              }
            ]
          region: eu-central-1
      incremental: false
      total:
        cloudWatch:
          json: |
            [
              {
                "Id": "e2",
                "MetricStat": {
                  "Metric": {
                    "Namespace": "AWS/ApplicationELB",
                    "MetricName": "RequestCount",
                    "Dimensions": [
                      {
                        "Name": "LoadBalancer",
                        "Value": "app/main-default-appingress-350b/123456789"
                      }
                    ]
                  },
                  "Period": 60,
                  "Stat": "SampleCount"
                }
              }
            ]
          region: eu-central-1
    displayName: ""
    target: 0.5
    timeSliceTarget: 0.5
    value: 1
  service: cloudwatch-service
  timeWindows:
  - count: 1
    isRolling: true
    period:
      begin: "2021-11-10T12:19:58Z"
      end: "2021-11-10T13:19:58Z"
    unit: Hour
```

</TabItem>
</Tabs>

_**Important Notes:**_

When using Multiple Queries (JSON) it is important to remember about:

* `region` field is mandatory. It is a regional code in AWS. Use one of the regional codes listed [here](https://docs.aws.amazon.com/general/latest/gr/rande.html#regional-endpoints).

* `json` field is mandatory. It is a JSON query that enables you to query multiple CloudWatch metrics and use math expressions to create new time series based on these metrics.

The following JSON validation applies:

* The JSON query must be valid.

* The JSON query should be an array of metrics.

* Only one `ReturnData` field can be set to true (when it is not set, by default it is true), and the rest of the `ReturnData` fields in other metrics has to be set explicitly to false.

* The `Period` field in `MetricStat` is required and it has to be equal to 60, if `MetricStat' does not exist`, the `Period` field should be set in the base object to 60.


For further details on CloudWatch metric math functions, go to [Using Metric Math | Amazon ClodWatch Documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/using-metric-math.html).


## Querying the CloudWatch Server

Once the SLO is set up, Nobl9 queries the CloudWatch server every 60 seconds.

## Known Limitations

CloudWatch SQL query is available in all AWS Regions, except China.

## Useful Links

* [Put Metric Data | Amazon ClodWatch Documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_PutMetricData.html)

* [Get Metric Data | Amazon ClodWatch Documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_GetMetricData.html)

* [Amazon CloudWatch Concepts | Amazon ClodWatch Documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#Namespace)

* [CloudWatch Statistics Definitions | Amazon ClodWatch Documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Statistics-definitions.html)

* [AWS Regional Endpoints | Amazon ClodWatch Documentation](https://docs.aws.amazon.com/general/latest/gr/rande.html#regional-endpoints)

* [CloudWatch Metrics Insights | Amazon ClodWatch Documentation](https://aws.amazon.com/blogs/mt/slos-made-easier-with-nobl9-and-cloudwatch-metrics-insights/)
