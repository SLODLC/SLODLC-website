---
id: sliSloSpecTemplate
title: SLI SLO Specification Template
sidebar_label: "SLI/SLO Specification Template"
sidebar_position: 35
description: "SLI/SLO Specification Template"
keywords:
  - resources
  - slo
  - slodlc
  - sli
  - specification
  - template
---

# SLI/SLO Specification Template

**Service Name:** 

**The Team/Collaborators:**

**SLO Adoption/Team Leader:**

**SLI/SLO Owner:**

**SLI/SLO Approvers:**

**Document Status:**

**Related Docs:**

**SLI Original Proposal Date:**

**SLI Last Updated/Optimization Date:**

**SLI Approval Date:**

**SLI Next Revisit Date:**


# SLI Specification Section


## SLI Name

_Unique name of your SLI - short name describing what this data query does. Good practice - you may want to name your SLI with use of the common SLI categories: Availability, Latency, Quality, Coverage, Correctness, Freshness, Throughput, Storage Throughput, Storage Latency, Storage Durability; this will help also with building of SLI/SLO Repository._

...


## SLI Calculation

_SLI calculation formula - threshold or ratio type._

...


## SLI Query - OPTIONAL

_SLI data query code (codes for ratio) if you already can write them; a sudo code of a query at this time is just fine._

...


## SLI Data Source

_SLI data source description._

...


## SLI Deployment

_The way we are implementing query - SLI; where and how - in a platform with a user interface. For SLI as a code (copy YAML code here if it exists)._

...


## SLO Specification Section

**Time Window**

_(Rolling or Calendar-aligned)_

...

**Error Budgeting Method**

_(Occurrences or Time slices)_

...

**Values - Achievable**

_(Customer Experience Name, Threshold/Ratio, Value)_



1. Objective 1
    1. Name: ...
    2. Target %: ...
    3. Target Value (number): ...
2. ...

**Values - Aspirational**

_(Customer Experience Name, Threshold/Ratio, Value)_



1. Objective 1
    1. Name: ...
    2. Target %: ...
    3. Target Value (number): ...
2. ...

**Error Budget Policy**

_(Triggers, Escalation Thresholds, Alerting)_

...


## SLO Name

_Unique name of your SLO; use your SLI Name and extend it._

...


## Assign Alert Policy

_Select desired Alert Policy created in the SLO platform._

...


## SLO Labels

_Defined labels for SLO._

...


## SLO Link

_Add a link/URL to this document/repository to your SLO platform._


## SLO Revisit Schedule

_Recurring date; an interval when to revisit SLO._



1. Planned Date: ...
    1. Actual Date: ...
2. Planned Date: ...
    2. Actual Date: ...
3. Planned Date: ...
    3. Actual Date: ...
