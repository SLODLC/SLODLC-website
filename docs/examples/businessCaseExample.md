---
id: businesscaseExample
title: Business Case Example
sidebar_label: Business Case Example
sidebar_position: 10
description: Business Case Example
keywords:
  - resources
  - slo
  - slodlc
  - business case
  - worksheet
---

# EXAMPLE of SLODLC Business Case Worksheet

**SLODLC Adoption:** Project “SLOtisfactionary Chatbot”

**SLODLC Adoption Leader:** John Smith, Senior PM, jsmith@bestprepaidgsm.com

**Worksheet Owner:** Joe Doe, SRE, jdoe@bestprepaidgsm.com

**Document Status:** Example Draft

**Related Docs:** Getting Started with Nobl9


## Business Case Worksheet Scope



* Prepare Business Case
* Identify Stakeholders
* Define Desired Outcome
* Memo/Notes


## How to work with Business Case Worksheet



1. Please walk through each point in the table
    1. Each point consists of a question section and instructions section
    2. Provide clear, written answers
    3. Provide URLs/Links for external resources if any
    4. Explicitly refer to necessary attachments if any
2. Return this completed form, with any necessary attachments, to: …
3. If you have any questions about this form, please contact: …


# 1.Prepare Business Case


## 1.1.High-Level Vision

_Please describe below._

Our company "BestPrePaidGSM" operates an online comparison service, a website, with all market prepaid phone plans offered. The offering process is a conversation between the customer of the internet-store and a Chatbot. We use automated AI Chatbots to gather customers' needs, and then we propose the best fitted prepaid phone plan. We want to make our services exceptional; therefore, we want to understand customer intent accurately, automate repetitive queries seamlessly, and significantly improve first response times and offering times.

 


## 1.2.Achievable Goals

_Please describe below._



1. Goal: Improve reliability of Chatbot service processing customer queries
    1. Rationale: After 3 months after GoLive of our service, we struggle to provide a reliable Chatbot, handling multiple customer conversations
    2. Owner: Chatbot Team
2. Goal: Improve Chatbot offering times
    3. Rationale: We are experiencing occasional slow times (according to customer surveys - those are unsatisfactory) of offering preparation with a comparison of prepaid offers
    4. Owner: Chatbot Team
3. Goal: Build scaling capabilities enabling future service growth
    5. Rationale: We are planning to move to a cloud environment (migration) from our present on-premise, dedicated server solution
    6. Owner: Chatbot Team


## 1.3.Business Investment Costs vs. Return

_Please describe the budget baseline and cost vs. return assumptions below._

First-year costs and anticipated savings:



* 60k USD - external SLO/SRE consulting service (3 months)
* 10k USD - SLO platform
* 10k USD - dedicated reliability e-learning materials; development outsourced
* 50k USD savings - reduce employee turnover by 25% (savings in the cost of exiting employees, recruiting, hiring, and training)


## 1.4.Business Investment Review Plan

_Please describe below._

Costs and Benefits - will be controlled and reviewed monthly by the internal company PMO and Financial Controller assigned by CFO. We will conduct a post-investment committee review.


## 1.5.Consequences of Failure, Stopping

_Please describe below._

If the desired goals are not achieved, "BestPrePaidGSM" might suffer financial and image loss. Ongoing marketing campaign investment might not meet the financial targets because of inadequate technical service quality during the increasing usage load.


## 1.6.Constraints, Exclusions, Borders

_Please describe below._

As it is the first reliability-related project in our company, we will limit it only to the essential online chatbot service targeting general customer happiness/satisfaction levels. We expect this project to bring clear recommendations for future cloud migration and in case of service scaling.


## 1.7.Dependencies with other Organizational Programs/Projects

_Please describe below._

No complex dependencies were identified. The Project Manager will monitor this topic because the next similar project might be launched in the near future, and we might have a potential synergy effect.


## 1.8.Approach Path

_Please describe below will it be a SLO Adoption Pilot, Project or Program - governance for the selected path is described in SLO Adoption Framework._

Project “SLOtisfactionary Chatbot'' will be managed using traditional project management principles as innovation, complexity, risk, and scope are moderately low. We will use SLO Adoption Framework guidelines for project management with a mix of the company's best practices. We will use public tooling solutions like Trello and Google Docs for collaboration. SLODLC will be used as our SLO methodology; we will adapt this process during project time to craft our customized version that will fit our organization's culture.


## 1.9.Initial Scope Requirements

_Please describe your baseline below. Describe requirements, for particular services in scope - prepare adequate SLODLC Discovery Worksheets and add links to the table._



1. Requirement or Service: Website front-end service
    1. Acceptance Criteria: New SLIs and SLOs contributing to goals achievement
    2. Owner: Chatbot Team
2. Requirement or Service: Chatbot back-end service
    3. Acceptance Criteria: New SLIs and SLOs contributing to goals achievement
    4. Owner: Chatbot Team
3. Requirement or Service: API calls
    5. Acceptance Criteria: New SLIs and SLOs contributing to goals achievement
    6. Owner: Chatbot Team


## 1.10.Milestones

_Please describe your schedule baseline below._



1. Milestone: Project Charter Sign Off
    1. Date mm/dd/yyyy: 5/1/2022
2. Milestone: Project Plan Review and Completion
    2. Date mm/dd/yyyy: 5/20/2022
3. Milestone: Project Kickoff
    3. Date mm/dd/yyyy: 5/27/2022
4. Milestone: Platform with SLIs/SLOs evaluation start
    4. Date mm/dd/yyyy: 6/1/2022
5. Milestone: Platform with SLIs/SLOs evaluation end
    5. Date mm/dd/yyyy: 6/30/2022
6. Milestone: Trainings materials delivered
    6. Date mm/dd/yyyy: 6/30/2022
7. Milestone: Operational GoLive
    7. Date mm/dd/yyyy: 7/3/2022
8. Milestone: Project Closure
    8. Date mm/dd/yyyy: 12/1/2022


## 1.11.Preliminary Risks / Opportunities

_Please describe below._



1. Risks: General knowledge and understanding level in a company is low, most of the employees are young (primarily graduates) without extensive service reliability experience; this might lead to a difficult learning curve and extra time to build SLO culture and internal community

    Response:

    1. Secure extra budget/reserve for additional external consultant work after SLO platform launch
    2. eLearning materials should be available anytime to all employees


# 2.Identify Stakeholders

_Please describe below._



1. Stakeholder: John Smith, Senior PM, jsmith@bestprepaidgsm.com
    1. Group/Persona: The Team
2. Stakeholder: Joe Doe, SRE, jdoe@bestprepaidgsm.com
    2. Group/Persona: The Team
3. Stakeholder: Chatbot Team (Developers, DevOps)
    3. Group/Persona: The Team
4. Stakeholder: Ellis Carr, Product Owner
    4. Group/Persona: The Business
5. Stakeholder: Daniel Burton, IT Director
    5. Group/Persona: The Business - Sponsor
6. Stakeholder: Secret Customer (external friendly tester)
    6. Group/Persona: The User


# 3.Define Desired Outcome

_Please describe below - define at least one goal per Key Stakeholder group (Users, Business, Team)._



1. Goal: Improve reliability of Chatbot service processing customer queries
    1. Outcome: SLIs/SLOs published in the platform, evaluated and tested
    2. Benefit: Increased Customer Happiness, more Customers
2. Goal: Improve Chatbot offering times
    3. Outcome: SLIs/SLOs published in the platform, evaluated and tested
    4. Benefit: Increased Customer Happiness, more Customers
3. Goal: Build scaling capabilities enabling future service growth
    5. Outcome: SLIs/SLOs published in the platform, evaluated and tested assessment document
    6. Benefit: Input for migration with volumetric, enabler for the migration project


# 4.Memo/Notes

**Meeting**

_Provide  information about the Workshop - date/place_



* First initial online meeting, drafting Business Case 4/24/2022

**Attendees**

_Provide  information about the Workshop - who/contacts_



* John Smith, Joe Doe, Ellis Carr

**Agenda**

_Provide information about topics discussed._



* Round table discussion
* Preliminary document drafting

**Action Items**

_Provide information about any particular to do’s._



* John Smith, Senior PM - till the end of the month, finalize Business Case Worksheet with internal Stakeholders, get approval from the Sponsor
* John Smith, Senior PM - prepare companies newsletter note to inform all employees about the project

**Decisions**

_Provide information about any particular important decisions made._



* All attendees agree and commit to the defined project goals.

**Notes**

_Place for any relevant notes to be captured._



* This document and all others will be available to the whole company as we want to make SLO adoption visible.
