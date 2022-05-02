---
id: glossary
title: Glossary
sidebar_label: Glossary
sidebar_position: 12
toc_min_heading_level: 2
toc_max_heading_level: 5
description: A glossary of Nobl9 terms
keywords:
  - glossary
---
# Glossary

Nobl9 is designed as an easy-to-use tool for anyone without any developer or SRE experience. While that's the case, we fully acknowledge that SLOs can be complicated. Below, you'll find a list of terms commonly used in Nobl9 to help you find an easy way through our platform.

## Terms

### <kbd>**A**</kbd>

#### Agent

The Nobl9 Agent is a lightweight application that executes the queries defined for Nobl9 SLOs. With Nobl9, users can run the Agent to retrieve SLI metrics from their data sources and send the data back to the Nobl9 backend. Queries are written in the language supported by the data source in question and executed via native APIs. The Agent can be deployed in a Kubernetes cluster or as a Docker container.

With an Agent configuration Nobl9 does not make direct calls to your environment. You pass your credentials when launching the Agent, and those credentials are not stored in the Nobl9 backend. Moreover, the Nobl9 Agent can be used to collect and return data if your company's firewall blocks outbound connections.

#### Alert Method

When an alert is triggered, Nobl9 enables you to send a notification to an external tool, a REST endpoint (Web Service), or an email. Alert methods can be associated with all available [alert integrations](/Alert_Methods/Alert_methods.md).

#### Alert Policy

Alert Policy is a set of conditions you want to track or monitor. The conditions for an Alert Policy define what is monitored and when to activate an alert: when the performance of your service is declining, Nobl9 will send a notification to a predefined channel.

#### Annotations

The SLO Annotations enable Nobl9 users to add notes to their metrics which can be displayed in charts, annotation lists, and reports.

### <kbd>**B**</kbd>

#### Budgeting Method

Budgeting method defines whether occurences or timeslices should be counted when calculating `good/total` ratio.


### <kbd>**C**</kbd>

#### Calendar-aligned Time Windows

Calendar-aligned time windows are bound to exact moments on a calendar. For example, you might calculate your error budget starting at the beginning of each week, a calendar month, quarter, or even a year.

These windows enable an easier time reporting on the health of your service. When you tie your error budget to something like a calendar month, people will know exactly when the error budget returns in full. At the same time, they can downplay the impact of failures of your service: if your service was down for an entire day towards the end of the month, your users will remember about it a few days later, once a new calendar window starts.

For this reason, the calendar-aligned time windows are best suited for SLOs that are intended to map to business metrics that are measured on a calendar-aligned basis.

#### Cooldown

The cooldown period is an interval measured from the last timestamp when all Alert Policy conditions were satisfied. When cooldown conditions are satisfied (i.e. no Alert events are triggered during its defined duration), an Alert event is resolved.

### <kbd>**D**</kbd>

#### Data Export

Data Export is a premium Nobl9 feature that allows users to export their SLO data to *.csv* files or directly to a Snowflake warehouse. The data that the users can export is the raw time-series budget burndown for all services in an account. The data is exported to an S3 bucket as a destination once per day.

#### Direct Data Source Integration

Nobl9 users can choose between a Direct or Agent configuration when connecting to a data source. A Direct configuration requires users to enter their authentication credentials (API key, token, etc.). These values are encrypted and safely stored in Nobl9. Direct configuration gathers metrics data directly from the external source based on provided credentials. The customer does not need to install anything on their server.

### <kbd>**E**</kbd>

#### Error Budget

An error budget is the allowable portion of requests that can fail over a period of time, without incurring an SLO violation. Thus, an error budget is a method of measuring how your SLI has performed against your SLO over a period of time. An Error budget serves as a signal of when you need to take corrective action. The Error budget relies on the targets set up in SLOs.

From *Implementing Service Level Objectives* by Alex Hidalgo:

<blockquote>"An error budget is a way of measuring how your SLI has performed against your SLO over a period of time. It defines how unreliable your service is permitted to be within that period and serves as a signal of when you need to take corrective action."</blockquote>

#### Error Budget Burndown

The Error budget burn rate measures how fast the error budget is being consumed. The numbers in the error budget burn rate must match the numbers in the error budget.

### <kbd>**H**</kbd>

#### Health Status

The Service Health Dashboard displays services in terms of their health. The following are the definitions of displayed statuses:

* **Healthy**: All SLOs in this Service have more than 20% of the error budget still available.
* **At risk**: All SLOs in this Service still have a remaining error budget, and at least one SLO for this Service has less than 20% of the error budget left.
* **Exhausted**: At least one of the SLOs in this Service has burnt its error budget in the current time window, and at least one SLO for this Service has less than 20% of the error budget left.
* **No Data**: There is no data available for the Service’s SLOs, or the error budget hasn’t been calculated yet.

### <kbd>**I**</kbd>

#### Indicator

Indicator is a metric for which an SLO is defined.

### <kbd>**L**</kbd>

#### Labels

[Labels](/Features/Labels.md) are key-value pairs that can be attached to SLOs, Services, and Alert Policies in the Nobl9 platform. Labels allow users to define attributes of resources and use them to filter and group SLOs across Services in the SLO Grid view and Reports. Each label must be unique for a given SLO, but many SLOs can carry the same label.

### <kbd>**M**</kbd>

#### Metric

A metric is a formula that uses measurements to determine how well the system performs in a specific situation. SLI Metrics in Nobl9 is any two-dimensional sets of data, where changes of a certain value are distributed over time.

### <kbd>**O**</kbd>

#### Objective

Objectives are the thresholds for your SLOs. Nobl9 users can use objectives to define the tolerance levels for their metrics.

#### Occurrences

One of the error budgeting methods available at Nobl9. The Occurrences budgeting method is well suited to measure a recent user experience. With the Occurrences method, we count good attempts against the count of all attempts. Note that since total attempts are fewer during low-traffic periods, it automatically adjusts to lower traffic volumes. Also see [Time Slices](#time-slices).

#### Organization-level Roles

Organization-level roles enable access across the Nobl9 platform. Depending on the desired access rights, users can be assigned the Organization Admin, User, or Viewer role:

* **Organization Admins** have full read and write access to all areas in the Nobl9 platform. They are responsible for setting up single sign-on (SSO) and user management.

* **Organization Users**:By default, anyone who signs in to the Nobl9 platform is an Organization User. Organization Users can be granted access to one or more projects by being assigned the role of Project Owner, Editor, Viewer, or Integrations User.

* **Organization Viewers**: An Organization Viewer has read-only access to all resources in the Nobl9 platform.

### <kbd>**P**</kbd>

#### Project

Projects are the primary logical grouping of resources across the Nobl9 platform. All Nobl9 resources, such as data sources, SLOs, and alerts, are created within a project. Access controls at the project level enable users to control who can see and change these resources.

The resources that can be grouped under a project include:

* Services

* SLOs

* Data sources

* Alert policies

* Alert methods

#### Project-level Roles

Project roles enable users to access a project and its underlying resources, such as services or SLOs. Project-level roles include:

* **Project Owners** who have read and write access to the project(s) they own.
* **Project Editors** who are the primary user of the Noble9 platform.
* **Project Viewers** who are the primary consumer of data in the Noble9 platform.
* **Project Integrations Users** who can use a data source or an alert method in a given project, but cannot create, edit, or delete project resources.

### <kbd>**R**</kbd>

#### Ratio Metric

A ratio Metric is an SLI metric composed of two time series that allows you to determine the percentage of "good" events by dividing it by the total number of events.

Let's use a website as an illustration for the ratio metric. Let's assume that you own a website with roughly 30,000 visitors every day. 29,991 of these visits result in the website loading within 0.5 seconds. Knowing this, you can get your ratio metric is by dividing the number of good requests by total requests and multiplying it by 100%:

<img src="/img/ratio_fraction.png" className="center"></img>

#### RBAC

Role-Based Access Control (RBAC) is used in Nobl9 to enable granular user permissions and access to resources in the Nobl9 platform.

#### Role Binding

`RoleBinding` is a YAML object related to the Role-Based Access Control in Nobl9. A single `RoleBinding` object allows defining the relation between exactly one user and exactly one role.

#### Rolling Time Windows

The rolling time window moves as time progresses. For instance, if you have a 30-day window and a 10-second resolution, your error budget will be updated every 10 seconds as time moves forward. This allows for bad event observations to fall off and no longer be involved in your computations as they expire beyond that 30-day window.

### <kbd>**S**</kbd>

#### Service

A Service in the Nobl9 platform is something that can be tested for reliability. In Nobl9, Services are organized under Projects. A Service in Nobl9 can represent a logical service endpoint like an internal or external API, a database, or anything else you care about setting an SLO for, such as a user journey.

#### Service Level Indicator (SLI)

Service Level Indicator is a metric used to determine if a service achieves the Service Level Objective. This could, for example, be the number of successful requests against the service over a given time period when performing performance monitoring.

#### Service Level Objective (SLO)

Service Level Objective is an actual target value (or range of values) for the availability of the service (that is measured by a Service Level Indicator). SLOs allow you to define the reliability of your products and services in terms of customer expectations. Nobl9 users can create SLOs for user journeys, internal services, or even infrastructure.

#### SLO Configuration

SLO configuration is a set of definitions of objects such as `data source`, `slo` set with time window, `slo` with thresholds, `indactor` with queries that are defined by a user typically as a set of yaml objects.

#### Severity

The Severity of an alert policy indicates the level of impact of a triggered alert event. Nobl9 users can define the severity levels as follows:

* High – A critical incident with a very high impact.
* Medium  – A major incident with a significant impact.
* Low – A minor incident with low impact.

#### sloctl

`sloctl` is a command-line interface (CLI) for Nobl9. `sloctl` CLI can be used for creating or updating multiple SLOs and Objectives at once as part of CI/CD.

### <kbd>**T**</kbd>

#### Threshold

Threshold value on the same scale as a [raw indicator](#indicator) for which error budget is calculated based on the defined threshold target or good/total ratio.

#### Threshold Target

Lowest acceptable `good/total` ratio in a given time window for which an `objective` is considered as "met."
* For the 100ms threshold of latency objective, if the target is set to 0.9, then for the occurrences method, we could interpret it as: "response time of 90% requests to be below 100ms in a given time window."
* For the timeslices method, it could be interpreted as: "response time to be below 100ms 90% of the time in a given time window."

#### Threshold Value

Value against which a [raw indicator](#indicator) is compared to determine if a specific value is "good" or "bad."

#### Time-slices

One of the error budgeting methods available at Nobl9. In the Time Slices method, what is counted (i.e. the objective that is measured) is how many good minutes were achieved, compared to the total number of minutes in the window.
