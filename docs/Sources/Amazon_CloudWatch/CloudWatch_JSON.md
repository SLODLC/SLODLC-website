---
id: amazon-cloudwatch-json
title: Amazon CloudWatch JSON Queries
sidebar_label: Amazon CloudWatch JSON Queries
sidebar_position: 2
toc_min_heading_level: 2
toc_max_heading_level: 5
description: Details about integration with CloudWatch
keywords:
  - CloudWatch
  - SLO
---
import ReactPlayer from 'react-player'

# CloudWatch JSON Queries

CloudWatch Metrics Insight JSON Queries are JSON arrays that consists of a non-empty list of JSON items, where each item in the array consists of a separate query.

Each Metrics Insight JSON Query must include:

* A unique `id`.

* An `expression` (which could be an `SQL` query or an operation on the auxiliary queries: refer to the examples below).

* Other parameters, such as a `period`.

Here’s an example of a Metrics Insight JSON Query:

```yaml
objectives:
  - countMetrics:
      good:
        cloudWatch:
          json: |
            [
                {
                    "Id": "e1",
                    "Expression": "SELECT AVG(CPUUtilization)FROM \"AWS/EC2\"",
                    "Period": 60
                }
            ]
          region: us-east-1
      incremental: false
      total:
        cloudWatch:
          json: |
            [
                {
                    "Id": "e2",
                    "Expression": "SELECT MAX(CPUUtilization)FROM \"AWS/EC2\"",
                    "Period": 60
                }
            ]
          region: us-east-1
```

### Combining Multiple Queries

JSON queries are a powerful tool that enables users to combine multiple time series, or even combine the results of the component queries.

The JSON query outlined in the below example consists of:

* An auxiliary query `"Id": "m1"` that queries for a one time series.

* An auxiliary query `"Id": "m2"` that queries for a different time series.

On top of that, the main query `"Id": "e1"` combines the results of the `m1` and `m2` queries. In the following example, the results of the query `m1` are a numerator, while the results of the query `m2` are a denominator, which is defined in the following query expression:

`"Expression": "m1 / m2"`

This means that number of correct HTTP requests from the query `m1` (`HTTPCode_Target_2XX_Count`)are divided by the number of total requests in the `m2` query (`RequestCount`). As a result, using such a query, we give input to our `e1` indicator as a ratio of good to total HTTP requests:

```yaml
    rawMetric:
      cloudWatch:
        json: |-
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
        region: eu-central-1
```

The only condition is for a single query in the array to have the `ReturnData` value set to `true`. `true` is the default value for the main query. See the section below for more details.

### Query Validation in the UI

The UI console that enables you to paste your JSON query has several validation rules:

* The value of Period must be `60`.

* The `ReturnData` must be `true` for at least one query in the array.

* The syntax of JSON query must be correct.

If these conditions are not met, the UI will return the following errors:

<ReactPlayer controls url='/video/CloudWatch_JSON.mp4' width="100%" />
