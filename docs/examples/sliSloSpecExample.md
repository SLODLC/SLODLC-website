---
id: sliSloSpecExample
title: SLI SLO Specification Example
sidebar_label: "SLI/SLO Specification Example"
sidebar_position: 35
description: "SLI/SLO Specification Example"
keywords:
  - resources
  - slo
  - slodlc
  - sli
  - specification
  - template
---
# EXAMPLE of SLI/SLO Specification 

**Service Name:** Chatbot

**The Team/Collaborators:** Chatbot Team (Developers, DevOps)

**SLO Adoption/Team Leader:** John Smith, Senior PM, jsmith@bestprepaidgsm.com

**SLI/SLO Owner:** Joe Doe, SRE, jdoe@bestprepaidgsm.com

**SLI/SLO Approvers:** John Smith, Senior PM, jsmith@bestprepaidgsm.com

**Document Status:** Example Draft

**Related Docs:** EXAMPLE of 2. SLODLC Discovery Worksheet v2.3, EXAMPLE of 3. SLODLC Design Worksheet v2.2

**SLI Original Proposal Date:** 4/22/2022

**SLI Last Updated/Optimization Date:** 4/22/2022

**SLI Approval Date:** 4/22/2022

**SLI Next Revisit Date:** 5/22/2022


# SLI Specification Section


## SLI Name

_Unique name of your SLI - short name describing what this data query does. Good practice - you may want to name your SLI with use of the common SLI categories: Availability, Latency, Quality, Coverage, Correctness, Freshness, Throughput, Storage Throughput, Storage Latency, Storage Durability; this will help also with building of SLI/SLO Repository._

“Chatbot Latency”


## SLI Calculation

_SLI calculation formula - threshold or ratio type._

Chatbot Latency SLI: proportion of requests served successfully (in 200ms) measured at “Web Server” daily form "Controller App Server"


## SLI Query - OPTIONAL

_SLI data query code (codes for ratio) if you already can write them; a sudo code of a query at this time is just fine._

Good Query: SELECT GOOD HTTP GET Requests FROM "Controller App Server" &lt; 200ms

Total Query: SELECT ALL HTTP GET Requests "Controller App Server"


## SLI Data Source

_SLI data source description._

DataObserverOne solution that we use.


## SLI Deployment

_The way we are implementing query - SLI; where and how - in a platform with a user interface. For SLI as a code (copy YAML code here if it exists)._

We will implement the SLI query using our self service SLO platform.


## SLO Specification Section

**Time Window**

_(Rolling or Calendar-aligned)_

1 day, Rolling

**Error Budgeting Method**

_(Occurrences or Time slices)_

Occurrences

**Values - Achievable**

_(Customer Experience Name, Threshold/Ratio, Value)_



1. Objective 1
    1. Name: OK
    2. Target %: 99
    3. Target Value (number): 200
2. Objective 2
    4. Name: MIN
    5. Target %: 90
    6. Target Value (number): 150

**Values - Aspirational**

_(Customer Experience Name, Threshold/Ratio, Value)_



1. Objective 1
    1. Name: OK
    2. Target %: 99.5
    3. Target Value (number): 200
2. Objective 2
    4. Name: MIN
    5. Target %: 95
    6. Target Value (number): 150

**Error Budget Policy**

_(Triggers, Escalation Thresholds, Alerting)_

The remaining error budget is 75% or less then message Chatbot Team through Slack.

The remaining error budget is 50% or less then message Chatbot Team through pager, Slack and Email.


## SLO Name

_Unique name of your SLO; use your SLI Name and extend it._

“Chatbot Latency”


## Assign Alert Policy

_Select desired Alert Policy created in the SLO platform._

“Chatbot Alert Policy”


## SLO Labels

_Defined labels for SLO._

“Chatbot”, “Latency”


## SLO Link

_Add a link/URL to this document/repository to your SLO platform._


## SLO Revisit Schedule

_Recurring date; an interval when to revisit SLO._



1. Planned Date: 5/22/2022
    1. Actual Date: >...
2. Planned Date: 6/22/2022
    2. Actual Date: >...
3. Planned Date: 7/22/2022
    3. Actual Date: >...


This template is part of SLODLC https://slodlc.com/Release_Notes/License
