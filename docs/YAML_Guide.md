---
id: yaml-guide
title: YAML Guide
sidebar_label: YAML Guide
sidebar_position: 4
description: How to apply yaml via sloctl tool?
keywords:
- yaml
- SLO
---
# YAML Guide [SMALL CHANGE FOR TESTING PRODUCTION DEPLOYMENT FLOW - AHALES]

This document explains how Nobl9 configurations are represented in the `sloctl` API, and how you can express them in _.yaml_ format.

## Overall Schema

```yaml
apiVersion: n9/v1alpha
kind: Agent | Annotation | AlertMethod | AlertPolicy |  DataExport | Direct | Project | RoleBinding | Service | SLO |
metadata:
  name:  # string, mandatory
  displayName:  # string, optional
  project:  # string, optional
spec:
```

**Notes:**

* `name`: _string_ - required field, convention for naming object from [DNS RFC1123](https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names). `name` can:

  * Contain at most 63 characters.

  * Contain only lowercase alphanumeric characters or `-`.

  * Start with an alphanumeric character.

  * End with an alphanumeric character.

* `project`: _string_ - required field, convention for naming object from [DNS RFC1123](https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names). `project` can:

  * Contain at most 63 characters.

  * Contain only lowercase alphanumeric characters or `-`.

  * Start with an alphanumeric character.

  * End with an alphanumeric character.

* `displayName`: _string_ - optional field. `displayName` can contain at most 63 characters. No additional validation is performed.

Note that all names should be unique within a project. It is not possible to have two objects of the same kind with exactly the same name in a given project.

:::caution
If you are using a `sloctl` version older than 0.0.56, you will not be able to use `kind: Project` or `kind: RoleBinding`.
:::

## Overview of Available YAML Objects

The following sections describe the types of objects that are available in Nobl9 and how to configure them.

:::note
Specific attributes of the various YAML objects are described in detail in the Notes following the examples.
:::

<!-- Currently, Agent can't be applied via sloctl in a prod environment. This section is frozen.

### `Agent`

The Agent is a middleware between the Nobl9 app and an external data source. It gathers metrics data and sends it to Nobl9. Agents need to be installed on the customer's server. Refer to [Sources](/Sources/Sources.md) for details about configuring the agent for each data source via `sloctl`.

YAML:

```yaml
apiVersion: n9/v1alpha
kind: Agent
metadata:
  name:  # string
  displayName:  # string, optional
  project: # string, mandatory
spec:
  description:  # string, optional
  sourceOf:
  - Metrics
  - Services
# Only one type of source configuration is allowed for Agent
  dynatrace:
     url:  # interface URL to Dynatrace server
  # or
  elasticsearch:
     url:  # base URL to Elasticsearch server
  # or
  grafanaloki:
     url:  # base URL to Grafana Loki server
  # or
  graphite:
     url:  # render API URL endpoint of Graphite's instance
  # or
  prometheus:
     url:  # base URL to Prometheus server
  # or
  datadog:
     site: "eu|com"  # Datadog instance (eu or com)
  # or
  newRelic:
     accountId:  # New Relic account ID (integer)
  # or
  appDynamics:
     url:  # Base URL to AppDynamics Controller
  # or
  lightstep:
     organization:  # organization name
     project:  # project name
  # or
  splunk:
     url:  # base API URL of the Splunk Search app
  # or
  splunkObservability:
     url:  # base API URL of the Splunk Observability app
``` -->

### `AlertMethod`

When an alert is triggered, Nobl9 enables you to send a notification to an external tool or a REST endpoint (Web Service). Alert methods can be associated with all available integrations.

YAML:

```yaml
apiVersion: n9/v1alpha
kind: AlertMethod
metadata:
  name:  # string, mandatory
  displayName:  # string, optional
spec:
  description:  # string, optional
# Only one type of alert method configuration is allowed
  discord:
    # Secret field
    url: # URL to Discord webhook
  # or
  jira:
    url: string  # requires HTTPS
    username: string
    apiToken: string  # secret
    projectKey: string
  # or
  opsgenie:
    auth: GenieKey a5983bf6-e378-4c97-a6ab-8be3589e190f
    url: https://api.opsgenie.com
  # or
  pagerDuty:
    integrationKey:  # PagerDuty integration key
  # or
  servicenow:
    username: user
    password: pass
    instanceid: dev55555
  # or
  slack:
    url:  # URL to Slack webhook
  # or
  msteams:
    url: string  # requires HTTPS, secret field
  # or
  webhook:
    url: https://sample-end-point/notify
```

### `AlertPolicy`

Alert policies define when to trigger an alert via the configured alert method. A Nobl9 `AlertPolicy` accepts up to 7 conditions. All the specified conditions need to be satisfied to trigger an alert.

YAML:

```yaml
apiVersion: n9/v1alpha
kind: AlertPolicy
metadata:
  name: # string
  displayName: # string, optional
  project: # string, optional - if not defined, Nobl9 returns a default value for this field
spec:
  description: # string, optional
  severity: Low | Medium | High
  cooldown: "5m" # valid string duration, accepted units: s, m, h
  conditions:
    - measurement: timeToBurnBudget | averageBurnRate | burnedBudget
      value: string or numeric
      op: lt | gt | lte | gte
      lastsFor: time duration  # default 0 (seconds | minutes | hours); example "5m"
# You can define up to 5 alert policies per SLO
  :
    - name: # string, name of the integration defined earlier
      project: # string, optional - if not defined, Nobl9 returns a default value for this field
```

**Notes:**

* `spec[ ].cooldown` - _string_, duration. The time measured since the last time point when all `conditions` were satisfied (for further details, go to [Alert Methods](/Alert_Methods/Alert_methods.md). Default value: `5m`. Accepted units: seconds | minutes | hours. Examples: `5m`, `1h`, `30s`.

  * If cooldown period is not defined, default value `5m` is used.

  * A minimum value is `5m` (there's no limit for maximum value).

  * The value needs to be valid time string duration, that can be expressed as `300s`, `5m`, `1h`. For more details, see [Parse Duration](https://pkg.go.dev/time#ParseDuration).

    :::caution
      Cooldown on `conditions` level is allowed but deprecated:

      * If you define `cooldown` on `conditions` level, the maximum value from all conditions is saved.

      * If you define `cooldown` on both `AlertPolicy` and `conditions` level, Nobl9 will return the following validation error:

     `Error: samples/sample-alert-policy.yaml:`<br/>
    `Key: 'AlertPolicy.spec.conditions[].coolDown' Error:Field validation for 'conditions[].coolDown' failed on the 'coolDownOnlyOnAlertPolicyOrConditionLevel' tag.`<br/>
    `Key: 'AlertPolicy.spec.coolDown' Error:Field validation for 'coolDown' failed on the 'coolDownOnlyOnAlertPolicyOrConditionLevel' tag.`
    :::

* `conditions[ ].measurement`: _string_ - required field. The options are:

  * `timeToBurnBudget` - When the budget will be exhausted. The expected value is a string
        in time duration format (seconds | minutes | hours); for example, `72h` (3 days).
        Example in human-readable format: _Error budget will be exhausted in 3 days._

  * `averageBurnRate` - How fast the error budget is burning. The expected value is a float; for example, `1.1`.
        Example in human-readable format: _Error budget burn rate is 110%._

  * `burnedBudget` - How much error budget is already burned. This is in contrast to the UI, where the error budget is expressed in terms of the amount remaining. The expected value is a float; for example, `0.97`.
        Example in human-readable format: _Error budget is above 97%._
        The same example in the UI is represented as the _Remaining error budget is 3%._

* `conditions[ ].lastsFor`: _string_ - optional field. Indicates how long a given condition needs to be valid to mark the condition as true. Default: `0` (seconds | minutes | hours). Examples: `5m`, `1h`, `30s`.

* `conditions[ ].op`: _string_ - required field. A mathematical inequality operator; possible values are:

  * `lte` - less than or equal (<=).

  * `gte` - greater than or equal (>=).

  * `lt` - less than (<).

  * `gt` - greater than (>).
        The operator is used to compare the given value with the state of measurement. The operator depends on the measurement type: for `timeToBurnBudget` `op=lt`, for `averageBurnRate` `op=gte`, and for `burnedBudget` `op=gte`.

Here’s a working example of an alert policy created in `sloctl`:

```yaml
apiVersion: n9/v1alpha
kind: AlertPolicy
metadata:
  name: trigger-alert-policy-bad-delayed-multi
  project: trigger-alert
spec:
  severity: Medium
  cooldown: "5m"
  conditions:
    - measurement: timeToBurnBudget
      value: "18h"
      op: lt
      lastsFor: "30m"
    - measurement: averageBurnRate
      value: 1.9
      op: gte
      lastsFor: "30m"
    - measurement: burnedBudget
      value: 0.01
      op: gte
      lastsFor: "30m"

```

### `Annotation`

The SLO Annotations service enables Nobl9 users to add notes to their metrics. For more dtails, refer to [SLO Annotations](/Features/SLO_Annotations/SLO_Annotations.md) in the Features section of Nobl9 documentation,

YAML:

```yaml
apiVersion: n9/v1alpha
kind: Annotation
metadata:
  name:  # unique name of the annotation
  project:  # the name of the project the annoation is attached to
spec:
  slo:  # annotation's objective
  description:  # string, mandatory
  startTime:  # defined start date-time point
  endTime:  # defined end date-time point
```

**Important Notes:**

* `metadata.name` - a unique annotation name, required for distinguishing project annotations.

* `spec.slo` - the name of the SLO the annotation applies to.

* `spec.description` - a string (plain text) describing the annotation. The maximum number of characters is 1000.

* `spec.startTime`, `spec.endTime` - these fields define the date-time point where the annotation will be placed in the graph. The values must be in the `YYYY-MM-DDTh:mm:ssZ` format that complies with [ISO8601](https://en.wikipedia.org/wiki/ISO_8601). If `startTime` == `endTime`, the annotation will be placed at a single time point.

### `DataExport`

Apply the following YAML to create the configuration to export your data from Nobl9.

:::note
`DataExport` is a premium feature. Contact your Nobl9 sales representative to enable it.
:::

YAML:

```yaml
apiVersion: n9/v1alpha
kind: DataExport
metadata:
  name: # string
  displayName: # string, optional
  project: # string, optional
spec:
  exportType: S3 | GCS
  spec:
    bucketName: # string
    roleArn: # string
```

**Notes:**

* `bucketName`: _string -_ required field. The name of the S3 or GCS bucket

* `roleArn`: _string_ - required for S3 and Snowflake export types. This is the Amazon Resource Name (ARN) of the role that the Nobl9 agent is assuming to upload files.

Here’s a working example of YAML for exporting your data through `sloctl`:

```yaml
apiVersion: n9/v1alpha
kind: DataExport
metadata:
  name: s3-data-export
  displayName: S3 data export
  project: default
spec:
  exportType: S3
  spec:
    bucketName: examplebucket
    roleArn: arn:aws:iam::123456789:role/example
```

<!-- ### `Direct`

Note: currently, users can't apply direct config through their YAML files. This section will remain hidden until further notice.

Direct configuration gathers metrics data directly from the external source based on provided credentials. The customer does not need to install anything on the server. Refer to [Sources](/Sources/Sources.md) for details about configuring this for each data source via `sloctl`.

YAML:

```yaml
apiVersion: n9/v1alpha
kind: Direct
metadata:
  name:  # string
  displayName:  # string, optional
  project: #string, mandatory
spec:
  description:  # string, optional
  sourceOf:
  - Metrics
  - Services
  # Only one type of source configuration is allowed for Direct
  appDynamics:
    url: "example-url"
    clientID: "example-client-id"
    clientSecret: someSecret # secret
  # or
  bigQuery:
    serviceAccountKey: |-
      # secret, embed here GCP credentials.json
  # or
  cloudWatch:
    accessKeyID: ""  # secret
    secretAccessKey: ""  # secret
  # or
  datadog:
    site: "eu|com"  # Datadog instance (eu or com)
    apiKey: string  # Datadog API key
    applicationKey:  # string, Datadog application key
  # or
  newRelic:
      accountId: string  # NewRelic account ID (int)
      insightsQueryKey: string  # NewRelic query key (string). You can set the agent using an environment variable.”
  # or
  pingdom:
    apiToken: ""  # secret
  # or
    splunk:
    accessToken: ""  # secret
    url: "example-url"
  # or
   thousandEyes:
    oauthBearerToken: example-bearer-token
``` -->

### `Objective`

Objectives are the thresholds for your SLOs. You can use objectives to define the tolerance levels for your metrics.

YAML:

```yaml
objectives:
  - displayName: # string, optional
    op: lte | gte | lt | gt  # an accepted comparative method for labeling the SLI
    value: numeric  # value used to compare metric values; all objectives of the SLO must have unique values
    target: numeric [0.0, 1.0)  # budget target for given objective of the SLO
    timeSliceTarget: numeric (0.0, 1.0]  # required only when budgetingMethod is set to Timeslices
    # countMetrics {good, total} should be defined only if rawMetric is not set
    # If rawMetric is defined on the SLO level, raw data received from metric source is compared with objective value
    # countMetrics good and total must contain the same source type configuration
        incremental: true | false
        good: # value for good occurrences
        total: # value for total occurrences
  - displayName: # string, optional
    value: # numeric
    target: # numeric
    op: lte | gte | lt | gt
    timeSliceTarget: # numeric
```

**Notes:**

* `value`: _numeric_ - required field. Used to compare values gathered from the metric source.

* `op`: _string_ - required field. A mathematical inequality operator; possible values for this field are:

  * `lte` - less than or equal (<=).

  * `gte` - greater than or equal (>=).

  * `lt` - less than (<).

  * `gt` - greater than (>).

* `target`: _numeric_ _[0.0, 1.0)_ - required field. The budget target for the given objective of the SLO.

* `timeSliceTarget`: _numeric (0.0, 1.0] -_ required only when `budgetingMethod` is set to `Timeslices`.

* `indicator.countMetrics`: _metric_ - represents the query used for gathering data from metric sources. `countMetrics` compares two time series, indicating the ratio of the count of good values to total values for the measured occurrences:

  * `good`: received data is used to compare objective (threshold) values to find good values.

  * `total`: received data is used to compare objective (threshold) values to find a total number of metrics.

:::note
If the `countMetrics` field is defined it is not possible to set `rawMetric` on the SLO level.
:::

Here’s a working YAML example of a `countMetric` SLO for Prometheus:

```yaml
apiVersion: n9/v1alpha
kind: SLO
metadata:
  name: webapp-frontend
  displayName: WebApp frontend service
  project: default
spec:
  description: SLO tracking the uptime for our frontend service
  service: webapp-service
  indicator:
    metricSource:
      name: prometheus-source
  timeWindows:
    - unit: Week
      count: 1
      calendar:
        startTime: 2020-01-21 12:30:00
        timeZone: America/New_York
      isRolling: false
  budgetingMethod: Occurrences
  objectives:
    - displayName: string
      op: lte
      value: 0.95
      target: 0.99
      countMetrics:
          incremental: true
          good:
              prometheus:
                  query: "sample query"
          total:
               prometheus:
                  query: "sample query"
  alertPolicies:
    - pagerduty-alert
```

### `Project`

Projects are the primary grouping of resources in Nobl9. For more details, refer to the Projects in the Nobl9 Platform section of the documentation.

YAML:

```yaml
apiVersion: n9/v1alpha
kind: Project
metadata:
  name: my-project  # mandatory
spec:
  description: ""  # optional
```

**Notes:**

* `name`: _string_ - mandatory field. Can contain only lowercase alphanumeric characters and `-`; for example, `my-project-name`.

* `description`: _string_ - optional description of the project, for example including details on the team or owner responsible for it or the purpose of creating the project.

### `RoleBinding`

A single `RoleBinding` object allows the definition of the relation between exactly one user and exactly one role. Refer to RoleBinding for more details about managing role bindings via `sloctl`.

YAML:

```yaml
apiVersion: n9/v1alpha
kind: RoleBinding
metadata:
  name:  # string, role name followed by username; for example, project-owner-adam
spec:
  projectRef:  # referenced project
  roleRef:  # referenced role
  user:  # Okta User ID
```

**Notes:**

* `projectRef` - optional field. The project in which we want the user to assume the specified role.

* `roleRef` - required field. The role that we want the user to assume.

* `user` - required field. This is an Okta User ID that can be retrieved from the Nobl9 UI (**Settings > Users**).

### `Service`

A service in Nobl9 is a high-level grouping of service level objectives (SLOs). A service can represent a logical service endpoint like an API, a database, an application, or anything else you care about setting an SLO for. Every SLO in Nobl9 is tied to a service, and service can have one or more SLOs.

YAML:

```yaml
apiVersion: n9/v1alpha
kind: Service
metadata:
  name: # string
  displayName: # string
  project: # string
spec:
  description: # string
  serviceType: # string
```

**Notes:**

There are two `spec` fields for `Service` (both optional):

* `description` - _string_, up to 1050 characters.

* `serviceType` - _string_, up to 1050 characters.

Here’s a working YAML example of a `Service`:

```yaml
apiVersion: n9/v1alpha
kind: Service
metadata:
  name: webapp-service
  displayName: WebApp Service
  project: default
spec:
  description: Service to connect to internal notification system
  serviceType: WebApp
```

### `SLO`

An SLO is a target value or range of values for a service that is measured by a service level indicator (SLI). SLOs allow you to define the reliability of your products and services in terms of customer expectations. You can create SLOs for user journeys, internal services, or even infrastructure.

YAML:

```yaml
apiVersion: n9/v1alpha
kind: SLO
metadata:
  name: string
  displayName: # string, optional
  project: # string
spec:
  description: # string, optional
  service:  # string, mandatory - name of the service you defined (must be in the same project as the SLO)
  indicator:
    metricSource:
      name: # string, mandatory - name of the data source
      project: # string, optional - if not defined, it is the same project as the SLO
      kind: # string, optional - defaults to "Agent" (possible values: Agent, Direct)
    rawMetric:
  timeWindows:
    # Exactly one of the following, depending on the type of time window:
    # rolling time window
    - unit: Day | Hour | Minute
      count: numeric
      isRolling: true
    # or
    # calendar-aligned time window
    - unit: Year | Quarter | Month | Week | Day
      count: numeric  # count of time units; for example, count: 7 and unit: Day means 7-day window
      calendar:
        startTime: 2020-01-21 12:30:00  # date with time in 24h format, format without time zone
        timeZone: America/New_York  # name as in IANA Time Zone Database
      isRolling: false  # false or not defined
  budgetingMethod: Occurrences | Timeslices
  objectives:  # see the "Objectives" section of this guide for details
  alertPolicies:
    - string  # The name of the alert policy associated with this SLO (must be from the same project as the SLO).
              # You can define 0 to 5 alert policies per SLO.
```

#### Notes

* `description`: _string_ - optional field, contains at most 1050 characters.

* `indicator.metricSource:` { `name` _string_, `project` _string_, `kind` _string_ } \- identifies the data source (`kind`: `Agent` or `Direct`) used to gather metrics data. `project` and `kind` are optional. If a `project` is specified it is possible to point to a data source from another project than the SLO’s.

* `indicator.rawMetric`: _metric_ - represents the query used for gathering data from metric sources. Raw data is used to compare objective (threshold) values. If `rawMetric` is defined it is not possible to set `countMetrics` on the objective level. Refer to [Sources](/Sources/Sources.md) for more details about metric specifications for different integrations.

* `timeWindows[ ]` - a list that accepts exactly one item, the rolling or calendar-aligned time window:

  * Rolling time window - minimum duration is 5 minutes, maximum 31 days
  ```yaml
  unit: Day | Hour | Minute
   count: numeric
  isRolling: true
  ```

  * Calendar-aligned time window - minimum duration is 1 day, maximum 366 days
  ```yaml
  unit: Year | Quarter | Month | Week | Day
  count: numeric
  calendar:
    startTime: 2020-01-21 12:30:00  # date with time in a 24h format
    timeZone: America/New_York  # name as in IANA Time Zone Database
    isRolling: false  # for calendar-aligned set to false or do not set
  ```

* `budgetingMethod`: _enum (_`Occurrences | Timeslices`_)_ - required field.

  * `Occurrences` method uses a ratio of counts of good events to total events.

  * `Timeslices` method uses a ratio of good time slices vs. total time slices in a budgeting period.

* `objectives[ ]`: _threshold_ - required field, described in the “Objective” section.

* `alertPolicies[ ]`: _alertPolicy_ - optional field. A list of names of alert policies that can trigger alerts for this SLO when all conditions are met (can contain 0 to 5 items). Alert policies must be created in the same project as the SLO (see “AlertPolicy” below).
