---
id: elasticsearch
title: Elasticsearch
sidebar_label: Elasticsearch
sidebar_position: 8
toc_min_heading_level: 2
toc_max_heading_level: 5
description: Details about integration with Elasticsearch
keywords:
  - Elasticsearch
  - SLO
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Elasticsearch

Elasticsearch is a distributed search and storage solution used for log analytics, full-text search, security intelligence, business analytics, and operational intelligence use cases. This integration supports histogram aggregate queries that return either a single value or a single pair stored in `n9-val` field, any filtering or matches can be applied as long as the output follows the mentioned format.

## Authentication

The Nobl9 Agent calls Elasticsearch [Get API | Elasticsearch Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-get.html) and you require a token to call it. The token can be obtained from the Kibana control panel. All of the required steps are documented by ElasticSearch and can be found [here](https://www.elastic.co/guide/en/kibana/master/api-keys.html).

### Custom Authorization Header

For the Agent version equal or greater than `0.37.0`, you can set `ELASTICSEARCH_CUSTOM_AUTHORIZATION_HEADER` environment variable to authenticate.

If you want to use the custom header for authentication instead of the `ELASTICSEARCH_TOKEN` in your Agent config, you must add the variable `ELASTICSEARCH_CUSTOM_AUTHORIZATION_HEADER`  with the appropriate value in the Kubernetes YAML or the Docker runtime. For more details, see the [Deploying Elasticsearch Agent](#deploying-elasticsearch-agent)


## Scope of Support

This integration supports the `7.9.1` version of Elasticsearch.

## Adding Elasticsearch as a Source in the UI

Follow the instructions below to add Elasticsearch as a Source, using Agent configuration.

1. Navigate to **Integrations > Sources**.

2. Click the <img src="/img/plus_button.png" alt="plus button" width="20" height="20"></img> button.

3. Click the Elasticsearch icon.

4. Choose **Agent**, then configure the source as described below.

### Elasticsearch Agent

#### Agent Configuration in the UI

Follow the instructions below to configure your Elasticsearch Agent:

1. Add the URL to connect to your data source.

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

The YAML for configuring Elasticsearch Agent looks like this:

```yaml
apiVersion: n9/v1alpha
kind: Agent
metadata:
  name: elasticSearch
  displayName: Elastic Search Agent
  project: elastic
spec:
  sourceOf:
    - Metrics
    - Services
  elasticsearch:
    url: <https://observability-deployment-946814.es.eu-central-1.aws.cloud.es.io:9243>
```

The `spec.elasticsearch.url` must point to the Elasticsearch app. -->

#### Deploying Elasticsearch Agent

To start the Agent process you can either apply the YAML config file to a Kubernetes cluster or run a Docker container from the code snippet. Both the Kubernetes config and Docker snippet are available in Agent details in the Web UI. Be sure to swap in your credentials (e.g., replace the `<ELASTICSEARCH_TOKEN>` with your organization key).

<Tabs>
<TabItem value="code" label="Kubernetes" default>

If you use Kubernetes, you can apply the following command to deploy the Agent. It will look something like this:

```yaml
# DISCLAIMER: This deployment description contains only the fields necessary for the purpose of this demo.
# It is not a ready-to-apply k8s deployment description, and the client_id and client_secret are only exemplary values.
apiVersion: v1
kind: Secret
metadata:
  name: nobl9-agent-nobl9-dev-elasticsearch-elastic-test
  namespace: default
type: Opaque
stringData:
  elasticsearch_token: <ELASTICSEARCH_TOKEN>
  client_id: "unique_client_id"
  client_secret: "unique_client_secret"
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nobl9-agent-nobl9-dev-elasticsearch-elastic-test
  namespace: default
spec:
  replicas: 1
  selector:
    matchLabels:
      nobl9-agent-name: elastic-test
      nobl9-agent-project: elasticsearch
      nobl9-agent-organization: nobl9-dev
  template:
    metadata:
      labels:
        nobl9-agent-name: elastic-test
        nobl9-agent-project: elasticsearch
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
                  name: nobl9-agent-nobl9-dev-elasticsearch-elastic-test
            - name: N9_CLIENT_SECRET
              valueFrom:
                secretKeyRef:
                  key: client_secret
                  name: nobl9-agent-nobl9-dev-elasticsearch-elastic-test
            - name: ELASTICSEARCH_TOKEN
              valueFrom:
                secretKeyRef:
                  key: elasticsearch_token
                  name: nobl9-agent-nobl9-dev-elasticsearch-elastic-test
```

</TabItem>
<TabItem value="k8s" label="Kubernetes - Auth Header" default>

Deploying your Agent in Kubernetes, you can use `ELASTICSEARCH_CUSTOM_AUTHORIZATION_HEADER` for authentication (for the Agent version equal or graeter 0.37.0):

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: nobl9-agent-nobl9-dev-elasticsearch-es-agent2
  namespace: default
type: Opaque
stringData:
  elasticsearch_custom_authorization_header: "Basic YWRtaW46YWRtaW4xMjM="
  client_id: "unique_client_id"
  client_secret: "unique_client_secret"
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nobl9-agent-nobl9-dev-elasticsearch-es-agent2
  namespace: default
spec:
  replicas: 1
  selector:
    matchLabels:
      nobl9-agent-name: es-agent2
      nobl9-agent-project: elasticsearch
      nobl9-agent-organization: nobl9-dev
  template:
    metadata:
      labels:
        nobl9-agent-name: es-agent2
        nobl9-agent-project: elasticsearch
        nobl9-agent-organization: nobl9-dev
    spec:
      containers:
        - name: agent-container
          image: nobl9/agent:latest-elasticsearch-custom-auth
          resources:
            requests:
              memory: "350Mi"
              cpu: "0.1"
          env:
            - name: N9_CLIENT_ID
              valueFrom:
                secretKeyRef:
                  key: client_id
                  name: nobl9-agent-nobl9-dev-elasticsearch-es-agent2
            - name: N9_CLIENT_SECRET
              valueFrom:
                secretKeyRef:
                  key: client_secret
                  name: nobl9-agent-nobl9-dev-elasticsearch-es-agent2
            - name: ELASTICSEARCH_CUSTOM_AUTHORIZATION_HEADER
              valueFrom:
                secretKeyRef:
                  key: elasticsearch_custom_authorization_header
                  name: nobl9-agent-nobl9-dev-elasticsearch-es-agent2
```

</TabItem>
<TabItem value="shell" label="Docker">

If you use Docker, you can run the Docker command to deploy the Agent. It will look something like this:

```yaml
# DISCLAIMER: This docker command description is containing only the necessary fields for the purpose of this demo.
# It is not a ready-to-apply docker command.

docker run -d --restart on-failure \
  --name nobl9-agent-nobl9-dev-elasticsearch-elastic-test \
  -e N9_CLIENT_ID="unique_client_id" \
  -e N9_CLIENT_SECRET="unique_client_secret" \
  -e ELASTICSEARCH_TOKEN="<ELASTICSEARCH_TOKEN>"\
  nobl9/agent:latest
```

</TabItem>
</Tabs>

To verify that the Nobl9 agent has been successfully deployed, check the Connection Status field in the UI.

## Creating SLOs with Elasticsearch

The section below outlines how to create your SLOs in the Nobl9 web app (UI) and by applying YAML files through `sloctl`.

### Creating SLOs in the UI

Follow the instructions below to create your SLOs with Elasticsearch in the UI:

1. Navigate to **Service Level Objectives**.

2. Click the <img src="/img/plus_button.png" alt="plus button" width="20" height="20"></img> button.

3. In step 1 of the SLO wizard, select the **Service** the SLO will be associated with.

4. In step 2, select Elasticsearch as the **Data Source** for your SLO, enter the [Index Name | Elasticsearch Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-create-index.html), and then specify the **Metric**. You can choose either a **Threshold Metric**, where a single time series is evaluated against a threshold or a **Ratio Metric**, which allows you to enter two time series to compare (for example, a count of good requests and total requests).

    For examples of queries, refer to the section below.

5. In step 3, define a **Time Window** for the SLO.

6. In step 4, specify the **Error Budget Calculation Method** and your **Objective(s)**.

7. In step 5, add a **Name**, **Description**, and other details about your SLO. You can also select **Alert Policies** and **Labels** on this screen.

8. When you’re done, click <span style={{color: '#D92680'}}>**Create SLO**</span>.

### YAML examples

<Tabs>
<TabItem value="code" label="rawMetric" default>

Here’s an example of Elasticsearch using a `rawMetric` (**Threshold metric**):

```yaml
apiVersion: n9/v1alpha
kind: SLO
metadata:
  name: elasticsearch-slo-raw
  displayName: Elastic Search Raw
  project: elastic
spec:
  service: elasticsearch-demo-service
  indicator:
    metricSource:
      name: elastic
    rawMetric:
      elasticsearch:
        query: |
          {
              "query": {
                  "bool": {
                      "must": [
                          {
                              "match": {
                                  "service.name": "weloveourpets_xyz"
                              }
                          }
                      ],
                      "filter": [
                          {
                              "range": {
                                  "@timestamp": {
                                      "gte": "{{.BeginTime}}",
                                      "lte": "{{.EndTime}}"
                                  }
                              }
                          }
                      ]
                  }
              },
              "size": 0,
              "aggs": {
                  "resolution": {
                      "date_histogram": {
                          "field": "@timestamp",
                          "fixed_interval": "{{.Resolution}}",
                          "min_doc_count": 0,
                          "extended_bounds": {
                              "min": "{{.BeginTime}}",
                              "max": "{{.EndTime}}"
                          }
                      },
                      "aggs": {
                          "n9-val": {
                              "avg": {
                                  "field": "transaction.duration.us"
                              }
                          }
                      }
                  }
              }
          }
        index: apm-7.13.3-transaction
  timeWindows:
    - unit: Day
      count: 1
      calendar:
        startTime: 2020-01-21 12:30:00
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

Here’s an example of Elasticsearch using a `countMetric` (**Ratio metric**):

```yaml
apiVersion: n9/v1alpha
kind: SLO
metadata:
  name: elasticsearch-slo-ratio
  displayName: Elastic Search Ratio
  project: elastic
spec:
  budgetingMethod: Occurrences
  indicator:
    metricSource:
      kind: Agent
      name: elastic
      project: elastic
  objectives:
    - countMetrics:
        good:
          elasticsearch:
            query: |
              {
                  "query": {
                      "bool": {
                          "must": [
                              {
                                  "match": {
                                      "service.name": "weloveourpets_xyz"
                                  }
                              }
                          ],
                          "filter": [
                              {
                                  "range": {
                                      "@timestamp": {
                                          "gte": "{{.BeginTime}}",
                                          "lte": "{{.EndTime}}"
                                      }
                                  }
                              },
                              {
                                  "match": {
                                      "transaction.result": "HTTP 2xx"
                                  }
                              }
                          ]
                      }
                  },
                  "size": 0,
                  "aggs": {
                      "resolution": {
                          "date_histogram": {
                              "field": "@timestamp",
                              "fixed_interval": "{{.Resolution}}",
                              "min_doc_count": 0,
                              "extended_bounds": {
                                  "min": "{{.BeginTime}}",
                                  "max": "{{.EndTime}}""
                              }
                          },
                          "aggs": {
                              "n9-val": {
                                  "value_count": {
                                      "field": "transaction.result"
                                  }
                              }
                          }
                      }
                  }
              }
            index: apm-7.13.3-transaction
        incremental: false
        total:
          elasticsearch:
            query: |
              {
                  "query": {
                      "bool": {
                          "must": [
                              {
                                  "match": {
                                      "service.name": "weloveourpets_xyz"
                                  }
                              }
                          ],
                          "filter": [
                              {
                                  "range": {
                                      "@timestamp": {
                                          "gte": "{{.BeginTime}}",
                                          "lte": "{{.EndTime}}"
                                      }
                                  }
                              }
                          ]
                      }
                  },
                  "size": 0,
                  "aggs": {
                      "resolution": {
                          "date_histogram": {
                              "field": "@timestamp",
                              "fixed_interval": "{{.Resolution}}"
                              "min_doc_count": 0,
                              "extended_bounds": {
                                  "min": "{{.BeginTime}}",
                                  "max": "{{.EndTime}}"
                              }
                          },
                          "aggs": {
                              "n9-val": {
                                  "value_count": {
                                      "field": "transaction.result"
                                  }
                              }
                          }
                      }
                  }
              }
            index: apm-7.13.3-transaction
      displayName: Enough
      target: 0.5
      value: 1
  service: dynatrace-demo-service
  timeWindows:
    - count: 1
      isRolling: true
      unit: Hour
```

</TabItem>
</Tabs>

### Scope of Support for Elasticsearch Queries

When data from Elastic APM is used, `@timestamp` is an example of a field that holds the timestamp of the document. Another field can be utilized according to the schema used.

The following are mandatory placeholders `{{.BeginTime}}`, `{{.EndTime}}` and are replaced by the Nobl9 agent with the correct time range values.

Use the following links in the Elasticsearch guides for context:

* [Boolean Query | Elasticsearch Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html)

* [Query and Filter Context | Elasticsearch Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-filter-context.html)

* [Filter Aggregation | Elasticsearch Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-filter-aggregation.html)

* [Range Query | Elasticsearch Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html)

The Nobl9 agent requires that the search result are a time series. The agent expects the `date_histogram` aggregation is named `resolution` will be used, and will be the source of the timestamps with child aggregation named `n9-val`, which is the source of the value(s).

```yaml
{
  "aggs": {
        "resolution": {
            "date_histogram": {
                "field": "@timestamp",
                "fixed_interval": "{{.Resolution}}",
                "min_doc_count": 0,
                "extended_bounds": {
                    "min": "{{.BeginTime}}",
                    "max": "{{.EndTime}}"
                }
            },
            "aggs": {
                "n9-val": {
                    "avg": {
                        "field": "transaction.duration.us"
                    }
                }
            }
        }
    }
}
```

1. [Date Histogram Aggregation | Elasticsearch Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-datehistogram-aggregation.html)

    * The recommendation is to use `fixed_interval` with `date_histogram` and pass `{{.Resolution}}` placeholder as the value. This will enable Nobl9 agent to control data resolution.

    * The query must not use a `fixed_interval` longer than 1 minute because queries are done every 1 minute for a 1-minute time range.

2. [Date Histogram Aggregation Fixed Intervals | Elasticsearch Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-datehistogram-aggregation.html#fixed_intervals)

    * The `"field": "@timestamp"` must match the field used in the filter query.

    * Using `extended_bounds` is recommended with the same placeholders `"{{.BeginTime}}"`, `"{{.Endime}}"` as a filter query.


3. [Metrics Aggregations | Elasticsearch Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics.html)

    * The `n9-val` must be a metric aggregation.

    * The `single value metric aggregation` value is used as the value of the time series.

    * The `multi-value metric aggregation` first returns a non-null value and is used as the value of the time series.
        In the following example, the `null` values are skipped.

        ```yaml
        "aggs": {
            "n9-val": {
                ...
            }
        }
        ```

4. The `elasticsearch.index` is the index name when the query completes.

## Querying the Elasticsearch Server

Nobl9 calls Elasticearch Get API every minute and retrieves the data points from the previous minute to the present time point. The number of data points is dependent on how much data the customer has stored.

## Useful Links

* [ElasticSearch Authentication | Elasticsearch Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/setting-up-authentication.html)

* [Elasticsearch Get API | Elasticsearch Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-get.html#docs-get)

* [Elasticsearch APM | Elasticsearch Documentation](https://www.elastic.co/guide/en/apm/get-started/current/index.html)

* [Boolean Query | Elasticsearch Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html)

* [Query and Filter Context | Elasticsearch Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-filter-context.html)

* [Filter Aggregation | Elasticsearch Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-filter-aggregation.html)

* [Range Query | Elasticsearch Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html)

* [Elasticsearch Index | Elasticsearch Documentation](https://www.elastic.co/blog/what-is-an-elasticsearch-index)
