---
id: template2
title: template2
sidebar_label: Template 2
sidebar_position: 22
description: Template 2
keywords:
  - resources
  - slo
  - slodlc
  - template 2
---
# SLODLC Discovery Worksheet

**Service Name:**

**SLODLC Adoption:**

**SLO Adoption Leader:**

**Worksheet Owner:**

**Document Status:**

**Related Docs:**


## Discovery Worksheet Scope



* Service
* Prioritize User Journeys & Expectations
* Analyze Dependencies
* Observe System Behavior
* Memo/Notes


## How to work with Discovery Worksheet



1. Please walk through each point in the table
    1. Each point consist of a question section and instructions section
    2. Provide clear, written answers
    3. Provide URLs/Links for external resources if any
    4. Explicitly refer to necessary attachments if any
2. Return this completed form, with any necessary attachments, to: …
3. If you have any questions about this form, please contact: …


# 1.Service


## 1.1.Service description

_Provide basic information about the service, its name, description - what is the service goal and scope; outline service boundaries, dependencies outside your control; the impact of unreliability, what performance characteristics are the most important, any existing expectations._

... 


## 1.2.Owner and Stakeholders

_Provide information about key stakeholders._



1. Service Owner: ... 
2. Service Stakeholders: ... 


## 1.3.Service Business Context

_Provide information about business context in the table below._



1. Question: Who cares about this service?
    1. Answer: ... 
2. Question: Why do they use it?
    2. Answer: ... 
3. Question: What happens if they can’t?
    3. Answer: ... 
4. Question: What alternatives do they have?
    4. Answer: ... 
5. Question: At what point will they leave or try again?
    5. Answer: ... 
6. Question: How does this service support our business goals?
    6. Answer: ... 
7. Question: What is the estimated volume of business transactions or user transactions on the service?
    7. Answer: ... 
8. Question: What $ amount does that represent and what % of the overall business is that?
    8. Answer: ... 


## 1.4.Service Expectations


### 1.4.1.Service Level Agreements with their levels

_Provide information/list about active SLAs and levels related with the service, rank them by criticality. Explain consequences of the SLAs._



1. ... 


### 1.4.2.Who defined reliability expectations, who is responsible for achieving them?

_Provide description per item from 1.4.1; name stakeholders - OPTIONAL._

... 


### 1.4.3.Unwritten/informal expectations towards services, and who stands behind those?

_Provide information - this might be a case of not having a sufficient number of targets defined where outages might result in measurable losses; what stakeholders are interested and why._

... 


## 1.5.Pain Points


### 1.5.1.What are the existing pain points of the services you are aware of?

_Check if any of the most common pain points do exist; add extra identified pain points. Most common pain points: Business-oriented insights, Customers happiness (churn), Customers happiness (other), Employees happiness (attrition), Employees happiness (burnout), Failures with innovation ideas, Feature vs. reliability decision making, Go-fast vs. go-safe, Over alerting (too busy responding to incidents), Service scaling, Technical debt removal._



1. ... 


### 1.5.2.Elaborate on Pain Points

_For those pain points that are identified above (in 1.5.1) - prepare an overview description below._



1. ... 


# 2.Prioritize User Journeys & Expectations


## 2.1.Define The Users of the service

_Provide information; a list of Users of the service, every stakeholder interacting (internal, external) or other interacting services. Instead of listing particular Users, you may consider groups of users and their classification; name those groups._



1. Internal (company employees)
    1. ... 
2. External (customers/external service users)
    2. ... 


## 2.2.Users Journeys

_Provide description or a diagram of The User Journey with their boundaries - for all listed Users in 2.1; you might use your architectural diagrams or other dedicated documentation. As an alternative, use user cases/stories, process flows_.

... 


## 2.3.User Expectations per Journey

_Provide additional information about clear User Expectations related to defined User Journeys (in 2.2); what will make The User happy during their Journey and where are the boundaries? You may find many different expectations for one Journey or even for one interaction._



1. ... 


## 2.4.Prioritize


### 2.4.1.Prioritize Expectations

_Using list from 2.3 prioritize all User Expectations top-down, from most important to less important, according to impact on User happiness and your business. Important - prioritization is about having clear ranking with one attribute per rank - this is a common misconception - making for instance, 2 attributes same important._



1. ... 


# 3.Analyze Dependencies


## 3.1.Architectural dependencies and constraints - Adjust Priorities

_Using your priority lists according to User Journeys and Expectations, look from the perspective of your IT Systems Architecture (databases, networking, container orchestration, virtualization) and Services Architecture (coexisting services, microservices, APIs ), look for dependencies and constraints that might impact priorities. Reprioritize - apply changes if needed. Hard Dependencies are all those dependencies which directly impact reliability expectations; Soft Dependencies or dependencies which are important but without direct impact on reliability expectations._

... 


## 3.2.Dependencies and Constraints - Adjust Priorities

_Using your priority lists according to User Journeys and Expectations look from the perspective of all User Journeys, crossing each other - having cross impact. Reprioritize - apply changes if needed._

... 


## 3.3.Process Governance - OPTIONAL


### 3.3.1.Service Agreements Management Process

_Describe the Service Agreement Process and how you manage reliability targets, especially, how you create, update and manage decisions off your reliability metrics - OPTIONAL._

... 


### 3.3.2.Incidents and Problems Management Process

_Describe the process on how you declare and manage Incidents and Problems until service restoration - OPTIONAL._

... 


# 4.Observe System Behavior


## 4.1.List ten outages with business impact description

_Provide examples in a list of five high business impacting outages or degradation of the User Journeys._



1. ... 


## 4.2.Cases studies of outages with business impact description

_Provide details for the top-five from above list (4.1)._



1. ... 


## 4.3.Data


### 4.3.1.Data sources

_Please provide a list of your Observability System (Data Source), metrics for each of the services.Describe briefly data sources used for your present SLIs defined for the service across user journeys._



1. ... 


### 4.3.2.Retention policies

_Describe data retention policies explaining what data is stored, where data is stored, how long data is stored (raw data and downsampled data) per item from your list in 4.1.1._



1. ... 


### 4.3.3.SLIs

_Provide SLIs with methods of calculation for your service - if there are any already in place. Provide information about SLIs Labeling methods and standards - if there are any defined in your organization._



1. ... 


## 4.4.Alerting


### 4.4.1.Alerting tools

_Check if you are using any of the listed alerting tools. Most common ones: Discord, Email, Jira, MSTeams, Opsgenie, PagerDuty, ServiceNow, Slack, Webhook. Add others if needed. Describe briefly alerting tools used for your present SLIs defined for the service across user journeys._



1. ... 


### 4.4.2.Alerting policies with escalation patterns

_Provide examples of existing alerting policies for the service; describe practices related with triaging incidents._



1. ... 


# 5.Memo/Notes

**Meeting**

_Provide information about Discovery Workshop - date/place._

First Discovery session meeting, drafting Discovery Worksheet 4/24/2022

**Attendees**

_Provide information about Discovery Workshop - who/contacts._

John Smith, Joe Doe, Ellis Carr, Chatbot Team

**Agenda**

_Provide information about topics discussed._



* Round table discussion
* Preliminary document drafting

**Action Items**

_Provide information about any particular to do’s._



* John Smith, Senior PM - till the end of the month, finalize Discovery Worksheet with internal Stakeholders, get approval from the whole Chatbot Team

**Decisions**

_Provide information about any particular important decisions made._



* All attendees agree and commit to the defined project goals.

**Notes**

_Place for any relevant notes to be captured._



* This document and all others will be available to the whole company as we want to make SLO adoption visible.
