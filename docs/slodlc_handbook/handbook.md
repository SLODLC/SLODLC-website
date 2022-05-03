---
id: getting-started
title: SLO Development Lifecycle
slug: /
sidebar_label: SLO Development Lifecycle
sidebar_position: 1
description: Overview of the SLO Development Lifecycle
keywords:
  - resources
  - slo
  - slodlc
---
# SERVICE LEVEL OBJECTIVES DEVELOPMENT LIFE CYCLE

## HANDBOOK

# Introduction

Just like the Software Development Life Cycle enables repeatable, reliable processes for creating good software, the **Service Level Objective Development Life Cycle** (SLODLC) is a repeatable methodology for defining reliability and performance goals for software services across an enterprise. This handbook walks through the SLODLC with detailed explanations, how-to's, and resources to make it easy for you to adopt the SLODLC, creating a shared context for your business/technology decision-making in a repeatable and scalable way.

You might think that the adoption of SLO concepts is a risky and bumpy road, however, this handbook and methodology will clarify what to do, reduce adoption risks, and help you discover a practical and realistic path forward in your adoption journey (more on adoption topic in SLO Adoption Framework document).

# How to use this document

This document covers the essential aspects of the SLODLC:

* SLO Development Life Cycle - the methodology and how to apply it
* SLO Knowledge - knowledge artifacts and knowledge management
* Templates - ready to use templates you can use in real-world situations
* Pointers to additional resources

Read through the document, familiarize yourself with definitions and practices, then copy the templates and customize them for your own use.

Dedicated templates underpin the SLODLC Handbook. You will find that almost all chapters refer to them. Moreover, along with templates, we provide an extra set of examples. Templates were built with tight alignment with SLODLC process, so all steps are reflected to help you navigate during SLO adoption. Keep in mind those simple rules:

* Use one Discovery, Design, Implement Worksheet per one Service
* Use one SLI/SLO Specification Template per one SLI with related SLOs
* Combine all documents into one SLO Repository

All SLODLC templates and example ones can be found here: [link]

# Contributors

* SLOconf Slack "go-with-the-slo" workgroup

# An introduction to Service Level Objectives (SLOs)

For a better understanding of Service Level Objectives (SLO’s), we need to define the common terms that set out the fundamentals.. You are probably familiar with general reliability importance and knowledge, and understand how reliability is essential for modern business based on technology enablers, so let’s take each of the basic terms in turn.

**Site Reliability Engineering** is a set of reliability principles and practices applied in IT development and operations (a mindset). Think about SRE also like "Smart Resource Engineering": a data-informed approach to delivering what customers want, within the bounds of the imperfections they’re willing to accept. From an organizational and staffing perspective, an SRE is an employee with responsibility for **internal reliability**; meanwhile, a **customer-oriented** reliability engineer would be called a **CRE**. An interesting example of SRE practices might be Chaos Testing. An approach to simulate failure that involves testing scenarios based on various failure events using reliability metrics as predictive indicators.

The **User Journey** is an entire customer/user experience related to activities leading to achieving a particular goal; you may have several services underpinning the Journey. **For example**, a user wants to buy an online newspaper subscription - that's their journey, services related might be account creation service, basket service, payment service.

A **Service** is a dedicated functionality of a dedicated technical component providing a single role within a platform. Referring to the above User Journey example - we can identify three different services, all of which are provided by different technical solutions in a modern microservice architecture.

A **Service Level Agreement (SLA)** is a formal, lawful contract that the service provider declares service reliability under the rigor of penalties - lawful consequences. **For example: **I guarantee that this website will be available 1426 minutes a day (99% uptime).

A **Service Level Indicator** **(SLI)** is an indicator of a direct measurement of a service's behavior defined by a formula and implemented as a data query. It is possible to collect two types of SLI metrics. Threshold Metrics - single time series evaluated against a threshold or Ratio Metrics, two-time series to compare; we compare the first query (numerator) vs. the second total query (denominator). **For example:** Website availability formula - the number of minutes up / total minutes in a day.

The **Service Level Objective** **(SLO)** is a target (one level higher than the SLI’s) applied to the SLI and considered in the specified time window. The SLO Time Window might be rolling (recent time series in defined length - most of the time number of days) or calendar-aligned (metrics measured on calendar-aligned basis, year, months or days). Our **Error Budget** is 100% of a given metric, minus the defined SLO % Objective level - it shows how long the service will be reliable and not fall under to meet legal consequences. Two Error Budgeting Methods exist - Occurrences (good attempts count against all attempts) and Time Slices (good minutes achieved compared to the total minutes in the time window). SLOs should be higher than SLAs - if you miss your SLO, you will not be subject to the penalty associated with breaching your SLA. **Simple example:** Website availability at 99.9% (one "9" above SLA) is 1438.5 minutes a day; Error Budget (1440 - 1438.5) is 1.5 minutes a day of downtime.

As a **Composite SLO**, we understand three types of SLOs:
1. SLO crafted with:
    1. several SLIs from the same data source,
    2. or several SLIs from different data sources each.
2. SLO crafted with several SLOs to create a new Composite Error Budget calculation aggregating each error budget of all the SLOs.
3. SLO with a combination of variants 1 and 2; For example, a very complex SLO build with 3 different SLOs from different services, each build with different composite SLI configurations of both availability and latency thresholds (even from other data sources) to get an end-to-end view of overall reliability performance.

<span style="text-decoration:underline;">From the **SLODLC Handbook** perspective, this topic will not be deeply elaborated on because it is very SLO platform implementation-oriented, not platform-agnostic as SLODLC wants to be.</span>

**DevOps** - employees who are responsible for the development of technical solutions, their maintenance, and operation. They use Agile mindset, methods and techniques with the help of dedicated frameworks and tools for software and infrastructure.

**Observability** - a capability of understanding IT systems measurements and their state using online monitoring, logs, and telemetry.

**Toil** - in the DevOps world, this is distracting, repetitive, and troublesome manual work that can be automated (scripted, for instance) to give DevOps more time for innovation and focus on essential activities.

**Recommended SLO resources:**

* [Nobl9 blog posts](https://www.nobl9.com/resources), a repository of top SLO industry articles just to name some interesting ones to begin
    * [An Easy Way to Explain SLOs and SLAs to Business Executives](https://www.nobl9.com/resources/an-easy-way-to-explain-slos-slas-to-biz-execs)
    * [How to Explain SRE to Your CEO](https://www.nobl9.com/resources/how-to-explain-sre-to-your-ceo)
    * [Do You Really Need Five Nines?](https://www.nobl9.com/resources/do-you-really-need-five-nines)
* [SLOconf](https://www.sloconf.com/) - annual SLO conference, a great place for beginners and advanced SLO practitioners 

**Recommended books about SLOs:**

* Implementing Service Level Objectives: A Practical Guide to SLIs, SLOs, and Error Budgets, by Alex Hidalgo, O'Reilly Media [[link](https://www.amazon.com/dp/1492076813/ref=cm_sw_em_r_mt_dp_VY7J5GR3W9T8KNFRW76T)]
* [https://sre.google/books/](https://sre.google/books/) (three different books about SRE; available online)

# SLO Development Life Cycle (SLODLC)

Why do we need a methodological approach (accelerators, enablers) to SLO adoption? Experience shows that the most challenging parts of SLO adoption are:

* incorporating SLOs as a part of organizational culture shaping decision making on all levels of the organization,
* leveraging SLOs above and beyond service reliability to drive balance between go-fast and go-safe, making tradeoffs easier and more transparent,
* fostering SLO mindset across the organization over time, propagation from Team to Team, from Department to Department.

This is why we decided to introduce the SLODLC; a repeatable methodology which will give you a guide to building the SLO capability in your organization or client’s organization. With the SLODLC you can launch projects that will help automate and improve reliability and observability for you or your clients. It can be easily extended and built into your practices and other consulting activities.

Software development follows a natural lifecycle, usually referred to as an SDLC. We created the SLODLC to follow a similar concept but applied it to the lifecycle of SLOs instead of software development. This should be familiar to most software development practitioners and give a good framework for how to use SLOs in the organization.

We want the SLODLC to be a living project, evolving over time and incorporating the best industry ideas and new approaches to SLO adoption - it’s a mission called continuous improvement. The SLODLC should be treated as a starting point, and we encourage you to experiment with this methodology - innovate, and extend it, feeding your ideas back into the community. DLC can also stand for Downloadable Content, and we want to share examples and templates that can be used to speed up the adoption of SLOs. As with the SLODLC itself, we invite you to use them freely, adapt to your needs, and share your changes with the SLODLC community.


![alt_text](img/slodlc_overview.png "image_tooltip")

## Phase 0: Initiate

In order to support an organization in adopting SLO’s, we need to understand why the organization wants to take these steps and what outcomes are desired from this change. Perhaps the organization has suffered a number of incidents or outages which are frustrating customers and hurting its reputation, employees are burning out from an overload of operational toil, or the organization needs to speed up feature delivery but can’t move beyond maintenance mode. Understanding WHY the organization is adopting SLOs will set the course for the adoption journey.

In this phase, we will formalize the scope, goals, and roles within the SLODLC to ensure the successful execution of the overall methodology. To accomplish this, we will **Prepare a Business Case **that lays out the expected investment of resources,  **Identify Stakeholders** and **Define the Desired Outcomes**.

### Prepare Business Case

The first step is to create a short and compelling summary of why you are embarking on this journey. This document should be business and outcome-focused and clearly articulate the required resources, schedule, roles, investments, and desired outcomes for the project. You will be updating this document as you progress through the SLODLC to ensure that all stakeholders are aware of progress and changes in direction as the scope is refined. Ideally, you will have several stakeholders review and approve the document at the outset of the project, and more will join the charge later.

**SLODLC Business Case Worksheet **can be found here: [link]

### Identify Stakeholders

There are 3 primary personas (stakeholder groups) to any SLO: the User, the Business, and the Team. Your SLO adoption journey will need to have people representing each of these stakeholders to ensure a clear balance between their competing but complementary needs. For example, the User may desire fast and perfect software but will be satisfied with something slightly less than perfect. On the other hand, the Business knows that delivering overprovisioned software is expensive and will want to ensure efficient delivery and lower costs. The Team wants to satisfy both users and the business while also maintaining their sanity – they want to work on meaningful tasks, new product innovation, and not repetitive toil that cuts into their personal time.

#### The User

Every Stakeholder interacting with a product or service is a User. The User might be a real-life person like a Customer, but also, it might be an interface or another service. Users might be internal stakeholders from your organization (engineers, sales representatives, or even customer support), and they might also be external, as mentioned earlier - your Customers, partners in business, vendors. To capture WHO, use User Stories and Customer Journeys - those valuable assets (explained later in this document in Discovery Phase) provide clear information on what is most important to users, what makes them happy, and how they can become successful. You need to quantify those “happy User moments” and turn them into SLOs.

#### The Business

Stakeholders responsible for the organization's business functions on all levels and domains are called the Business. They can be leaders, function and operational managers, product owners - all of them fulfilling different duties along the hierarchical ladder. According to the strategy, goals, and vision, they drive the organization forward.

#### The Team

Generally speaking, all Stakeholders working together to satisfy users and grow the business are the Team. You can find them contributing with their dedication and hard work to service or product operation across the organization, starting with technical people, engineers of different specialties responsible for development and operations, SREs (Site Reliability Engineers) accountable for the reliability, and others supporting roles like analysts and testers.

Document all Stakeholders in your **SLODLC Business Case Worksheet** 

### Define Desired Outcomes

Adopting SLOs should not be an end unto themselves; you are trying to solve a particular business/technology challenge that SLOs can help alleviate. Perhaps your goal is to reduce customer churn by providing better reliability, or you need to ramp up feature velocity. You are maybe reducing employee fatigue from on-call rotations. Working backward with the end in mind when setting out on a new journey is best.

You may also need to address technical debt, re-platform, and cut cloud computing costs. SLO adoption can support these goals, but prioritizing and articulating your reason will add context and increase the organizational will to execute this critical project. It is worth mentioning that during organizational scaling, technical debt might pile up without notice, and SLOs might highlight this issue - helping to address strategic refactoring initiatives.

There is a section in the Business Case template for Defining Desired Outcomes. Once you have your business case created, stakeholders identified, outcomes defined and thoroughly vetted, you can move on to the next phase of the SLODLC: Discover.

## Phase 1: Discover

Before you start building SLOs, we need to understand the system and collect information about what matters to your stakeholders. To do this, we will **Prioritize User Journeys **to focus our efforts, **Analyze Dependencies** to see how the chain of reliability fits together and **Observe System Behavior **to ground ourselves in the state of the current environment. This phase will provide context to the following phases of the SLODLC and give a clear direction and prioritization for these efforts.

The **SLODLC Discovery Worksheet** is available here: [link]

### Prioritize User Journeys

If everything is important, nothing is important. To create meaningful SLOs, we need to understand what matters to users. In particular, we want to measure behavior changes – like shopping cart abandonment or user complaints which indicate the reliability or latency of the system is below the expectations of customers in a given scenario.

User Journeys represent the User's entire experience while interacting with a particular product or service. In most cases, those organizational assets are well documented by different kinds of diagrams mapping interactions. As an alternative, or for better understanding to enrich the whole interaction big picture, it is good to investigate user stories, process flows, and use cases. Being fully aware of how Users interact is a good starting point for prioritization.

The next step is also based on prioritization, made during group workshops with key stakeholders. The potential list of products or services with eventual metrics should be prioritized to ensure the best outcomes related to the defined goals of SLO adoption. User expectations should be considered to carefully choose the target levels of reliability that each product or service needs. Incorporate business intelligence insights into prioritization to assess unique user needs. Find your own way with prioritization, don't copy what others suggest without criticism - each organization is unique. Critical infrastructure and user-facing products/services - those two areas are great to start with. Put those on top of your prioritized list even with several work ideas of targets.

Document prioritization in **SLODLC Discovery Worksheet**.

### Analyze Dependencies

To understand the reason for a system's behavior, we need to understand the dependencies that might influence the system and the expectations that are set on that service. The same situation is with User Journeys; those might have cross-impacted, and we need to understand those. Work with your User Journey priority list and conduct three essential iterations.

* **First iteration** focuses on architectural, technical dependencies and constraints; identify and note them.
* **Second iteration**, focus on cross User Journeys dependencies and constraints; identify and note them.
* **The last third interaction** relies on reprioritization - there is a high chance you will identify strong dependencies and constraints that will impact your initial prioritization.

Document prioritization in **SLODLC Discovery Worksheet**.

### Observe System Behavior

For successful SLO adoption, you must ensure that Monitoring and Observability systems are working and are in good condition (data sources used for SLI queries definition are reliable). Outages history analysis will be valuable to your prioritized User Journey list; it will show additional context from a pain point perspective. Do you know what are the recent outages and their business impact? This is a fundamental question leading to understanding system behavior.

Prepare a list of several outages with a business impact description; write solid case studies for selected outages - this is a perfect moment to think about the completeness of collecting data history of measurements. Ensure you have access to all essential data related and collected history - that means data sources are available to you, you understand data retention policies per data source, and you know what metrics are in place. This information can be captured in the SLODLC Discovery Worksheet and shared with stakeholders. It can also be referenced during the future phases.

Document your observations in **SLODLC Discovery Worksheet**.

## Phase 2: Design

During the Design phase, we concentrate on several dedicated activities related to SLO craftsmanship, starting with **Defining meaningful SLIs**, **Defining Achievable and Aspirational SLOs**, and **Error Budgets**. Consider those activities iterative as any design effort should be tested, verified, and validated according to Key Stakeholder feedback (iterate and improve). Use your SLODLC Discovery Worksheet as input for this phase.

Work backward - it's easy to use the wrong metric or focus on the bad workflow. Focus on customer/user needs instead of implementing new solutions right away. Working backward from the customer experience ensures your SLOs are aligned with your business, product, and service operators. Remember that perfect is the enemy of the good - so don't rush for perfection from the beginning of your Design Phase. Collective learning is the best way to learn from mistakes and failures. Start with small steps working with your first new SLIs and SLOs, grow SLO culture along with SLO adoption.

The Design Phase has two important dependencies. First, all deliverables will be implemented in the Implementation Phase, and during those activities, you might receive additional feedback, which will lead to another design iteration. Secondly, during the Design Phase, you will work with Periodic Reviews' organizational feedback - reviewing and modifying your SLO targets is normal and expected, so be prepared for it. Remember that The Design Phase is not a “one-off” process. As you implement the SLODLC, you will possibly revisit this phase multiple times as the deliverables are implemented and improved (read more in the Review Periodically chapter). SLODLC requires you to review your SLOs and SLIs at each step and act if changes need to be made, similar to [“Plan, Do, Study, Act” of the Deming Cycle](https://deming.org/explore/pdsa/).

The **SLODLC Design Worksheet** is available here: [link]

### Define Meaningful SLI

Define Meaningful SLI is an activity in which Key Stakeholders collaborate to define desirable, goal-oriented, and testable SLIs, but this requires additional context. Let's explain what meaningfulness is. Generally speaking, meaningfulness is important to stakeholders, particularly Business, Teams, and Users, directly impacting daily duties making work more efficient and less disruptive. Meaningful SLIs should be:

* user-centric - critical to user experience and happiness,
* challenging - missing targets trigger actions,
* simple - easily understandable,
* shared - bounding different groups of interest,
* specific - without ambiguity, self-explaining.

When we're measuring the performance of services, we want to focus on key indicators (Service Level Indicators) that will tell us the most about the user experience and where we are going to draw the line when we need to make potential tradeoffs. It would help if we aimed for SLIs that are helpful in aggregating vital bits of information, SLIs that can tell you about multiple subsystems through a single metric (for example, ratio indicators).

Remember about SLI ownership - all defined SLIs should have an Owner who is accountable for their life cycle and exploitation; in the future, additional SLO ownership might be added to their responsibility (more on ownership is explained in the **SLO Adoption Framework** document).

While defining SLIs and SLOs - 100% should never be a target, 100% is impossible to achieve in a cloud-based world where we are so often dependent on underlying services from third-party providers. A common-sense reliability estimate is that the more reliability we want, the more it costs. As a rule of thumb, each "9" of reliability (from 99.9% to 99.99% reliability) can cost ten times more.

<table>
  <tr>
   <td><strong>Uptime Percent</strong>
   </td>
   <td><strong>Downtime per Year</strong>
   </td>
   <td><strong>Downtime per Day</strong>
   </td>
  </tr>
  <tr>
   <td>90 %
   </td>
   <td>36.5 Days
   </td>
   <td>2.4 Hours
   </td>
  </tr>
  <tr>
   <td>99 %
   </td>
   <td>3.65 Days
   </td>
   <td>14 Minutes
   </td>
  </tr>
  <tr>
   <td>99.9 %
   </td>
   <td>8.76 Hours
   </td>
   <td>86 Seconds
   </td>
  </tr>
  <tr>
   <td>99.99 %
   </td>
   <td>56.2 Minutes
   </td>
   <td>8.6 Seconds
   </td>
  </tr>
  <tr>
   <td>99.999 %
   </td>
   <td>5.25 Minutes
   </td>
   <td>0.86 of a Second
   </td>
  </tr>
  <tr>
   <td>99.9999 %
   </td>
   <td>31.56 Seconds
   </td>
   <td>0.0086 of a Second
   </td>
  </tr>
</table>

<table>
  <tr>
   <td><strong>Ratio Metric</strong>
   </td>
   <td><strong>Number of Requests</strong>
   </td>
   <td><strong>Error Requests</strong>
   </td>
  </tr>
  <tr>
   <td>90 %
   </td>
   <td>1 000 000
   </td>
   <td>100 000
   </td>
  </tr>
  <tr>
   <td>99 %
   </td>
   <td>1 000 000
   </td>
   <td>10 000
   </td>
  </tr>
  <tr>
   <td>99.9 %
   </td>
   <td>1 000 000
   </td>
   <td>1000
   </td>
  </tr>
  <tr>
   <td>99.99 %
   </td>
   <td>1 000 000
   </td>
   <td>100
   </td>
  </tr>
  <tr>
   <td>99.999 %
   </td>
   <td>1 000 000
   </td>
   <td>10
   </td>
  </tr>
  <tr>
   <td>99.9999 %
   </td>
   <td>1 000 000
   </td>
   <td>1
   </td>
  </tr>
</table>

The four most essential metrics types of customer-facing systems described in SRE literature ([Site Reliability Engineering](https://sre.google/sre-book/monitoring-distributed-systems/)) are:

* Latency - time to service a single request with a clear boundary what time is “good” and what time is “bad”
* Traffic - requests per time unit, for instance, how many requests per minute the service can handle
* Errors - failed requests described as a ratio - failed requests to all requests (this could also be  looked at from a different perspective: Success - successful request described as a ratio - good requests to all requests)
* Saturation - how an element of service is utilized, this might be CPU utilization (for instance, high CPU utilization might trigger scaling activity by your Error Budget policy)

According to SRE Pioneers - Google, another good practice to start defining meaningful metrics is a method called “SLI Menu'' presented in the table below.

<table>
  <tr>
   <td><strong>Request/Response SLIs</strong>
   </td>
   <td><strong>Data Processing SLIs</strong>
   </td>
   <td><strong>Storage SLIs</strong>
   </td>
  </tr>
  <tr>
   <td>Availability
   </td>
   <td>Coverage
   </td>
   <td>Throughput
   </td>
  </tr>
  <tr>
   <td>Latency
   </td>
   <td>Correctness
   </td>
   <td>Latency
   </td>
  </tr>
  <tr>
   <td>Quality
   </td>
   <td>Freshness
   </td>
   <td>Durability
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>Throughput
   </td>
   <td>
   </td>
  </tr>
</table>

Document your SLIs in **SLODLC Design Worksheet**. Establish **SLI/SLO Repository**.

### Define Achievable  SLO

Achievable SLOs set targets at practicable and reasonable levels with full stakeholders' agreement and collaboration. Those SLOs are a good starting point for future benchmarks and references - and for setting Aspirational SLOs (explained in the next chapter). Keep in mind that aiming for too much of a good thing is not a good strategy. Fortunately, you have your Discovery Worksheet with a list of prioritized services. This will help you carefully choose the achievable SLO target levels for each service. 

What are the top 2-3 mission-critical User Journeys? You may opt for an SLO of four or five nines for these services. What services are clearly of lower priority? For example, if you are an e-commerce site, you may prioritize the checkout experience more than simply browsing your catalog, choosing an SLO of five nines for purchasing and four nines for browsing. Here, SLOs of three nines or four nines are likely sufficient. You may end up with a mix of SLO targets ranging from three to five nines.

You're keeping customers happy without wasting time and money trying to achieve a level of performance that doesn't deliver commensurate benefits. You've also determined the critical services worth extra investment for automation, redundancy, testing, and other reliability enhancements. That's a wiser approach than arbitrarily setting SLOs of five nines for everything.

During your SLO journey, SLO targets will evolve - SLOs will adapt to stakeholder feedback, so don't be surprised with the up and down fluctuation of your SLOs; in the end, those are not written in stone. The Meaningfulness principle applies here, too - keep your Achievable SLOs meaningful. The same goes for testing - each SLO must be testable.

This is the moment where a reliability roadmap comes in as an outcome of a risk assessment to figure out what's achievable, what's aspirational, what the mitigations could be. During risk assessment - you can define what (service) is critical for customer/user happiness in your organization. You can identify several of those with potential impact and plan mitigation responses (bubbling up quantifiable reliability improvements is a great way to get them funded). For comprehensive risk assessment, use the Risk Analysis Template made by Google; it is a free, public tool based on years-long SRE practices, which can be found here: [https://goo.gl/bnsPj7](https://goo.gl/bnsPj7). In the template, you can find all the necessary definitions and instructions. It is a great exercise material for training purposes or real-life risk assessments; you can address many critical questions such as:

* how risky points target availability/reliability,
* how will an outage of these customer journeys impact the business,
* can that impact be quantified,
* do you have relevant measurements in place for those.

We recommend this as a group workshop exercise with key stakeholders.

Document your Achievable SLOs in **SLODLC Design Worksheet**. Update **SLI/SLO Repository**.

### Define Aspirational SLO

Aspirational SLOs, on the other hand, represent your SLO ambitions to achieve a certain level of reliability, like putting the bar higher and higher above, driving effort, and reaching new organizational goals. In most cases, Aspirational SLOs are " higher" than Achievable SLOs and represent your aspirations toward the reliability of your future goals. This also helps with benchmarking, enabling you to understand how SLO adoption in your organization progresses over time. Once you've set the Achievable SLO and Aspirational SLO, you'll see a clear gap between today's risk profile and your desire to deliver a more reliable service. The Meaningfulness principle applies here, too - keep your Achievable SLOs meaningful. The same goes for testing - each SLO must be testable.

Before we finish defining SLOs, let's elaborate more on testing. It is recommended to test SLO early and often, regardless of which step of SLODLC you are at. Stakeholders should collaborate to test SLOs in real-life scenarios and the environment against expectations, formal assumptions, goals, and meaningfulness. Test SLO Time Window - with one that is more appropriate in a particular case - rolling or calendar-aligned. Test Budgeting Method - which one is better than the other - Occurrences or Time slices. Test thresholds vs. best practices and expectations. Test ratio - good/bad query vs. total query.

Document your Aspirational SLOs in **SLODLC Design Worksheet**. Update **SLI/SLO Repository**.

### Establish Error Budgets

We can describe Error Budgets as a conceptual model for understanding acceptable risk in your services. Because of diminishing returns of forced error rate reduction, you should not set your SLOs too high. All that is above the SLO threshold is called a “budget” because your organization can allocate or spend it and track its current balance. During this activity, stakeholders collaborate to find a sweet spot between states - happy and unhappy customers expressed by a budget that can be utilized before a happy customer becomes unhappy.

Error budgets only have value if stakeholders think of them seriously. That's why there should be a form of consequences. Therefore, an error budget policy is formulated. This policy states what a team must do when they deplete their error budget, how to handle ongoing budget utilization and correlated alerting, escalation thresholds with responding actions.

The general remedy is to focus on improving reliability if you are utilizing your error budget, although teams may have created more sophisticated policies with various thresholds and escalation rules. On the opposite, once a service consistently exceeds its SLO (and leaves Error Budget in the bank), the team can take on more change risk or possibly increase the SLO to tighten the tolerance for error. This approach allows the Team to self-police and derive their decisions around reliability.

An important operational function of Error Budget is the dynamic burn rate. It considers the following factors: current error rate, remaining error budget, and time until the error budget is refreshed. The goal of the burn rate calculation is to understand if the current burn rate will deplete and how fast. If we stay in this situation for long, we won’t have any error budget left. The Team should set up Error Budget triggers in the attached policies to alert them when this condition persists for more than a short period.

Document Error Budgets along with your SLOs in **SLODLC Design Worksheet**. Update **SLI/SLO Repository**.

## Phase 3: Implement

Now it’s time to implement your work; make all defined, meaningful SLIs and SLO live. Start with the implementation of SLIs in your monitoring solutions and update old ones if needed. Work with your Design Worksheet - it's all there. You should now **Collect SLIs** to get all the insight from working environments and systems to get them all together. The next step is to **Publish SLO Goals,** and make them visible on the SLO platforms and the whole organization. It’s **SLO Adoption Leader** and **SLO Owner's** responsibility to ensure successful SLO publishing (both roles are explained in the **SLO Adoption Framework** document). Use a defined communication strategy (explained in **SLO Adoption Framework**). **Enforce Error Budget Policy** - defined policies cover all information related to established Error Budgets, how to handle budget utilization and correlated alerting, escalation thresholds with responding actions. This is not to say there can't be exceptions to the rule - time to use them with consequences taken seriously.

Document Implementation phase in **SLODLC Implement Worksheet**.

### Collect SLI

Most of the modern big scale enterprises have not only one monitoring solution but several (large scale enterprises can have even up to 25 different monitoring solutions installed) to boost business awareness. Most of the time, they struggle because of information bias overload - where is one single point of truth? Where to find one big picture? This is a challenge but don't worry - Nobl9 is here to help; more on how can be found here [link].

Monitoring is about collecting metrics from a system to understand what’s going in it. The challenge of monitoring is separating the proper signal (the few, critical things that need attention) from the noise (the many false signals that are at best a distraction). This becomes even more difficult as your system scales. Observe defined and implemented as a query SLIs, what measures are collected, are those meaningful, will those help achieve goals, and can be tested. Ensure that the full history of metrics is collected from the beginning. Observability is similar to monitoring but slightly different. Observability measures how well we can understand the internal system state by solely looking at its outputs. In other words, it is how well we can deduce internal causes by observing external symptoms.

Document data sources and related information in **SLODLC Implement Worksheet**. Update **SLI/SLO Repository**.

### Publish SLO Goals

SLOs must be published. We have two different topics here to cover. The first one is the physical deployment of SLOs into monitoring platforms. You can do that either by adding them manually using a friendly user interface or by deploying SLOs as a code. The second one is the communication aspect. Communication of SLOs should be planned by defining responsibilities for roles, methods, and strategies - communication and engagement strategies. You can find more about this topic in the **SLO Adoption Framework** document as a very important aspect of the whole SLO adoption. SLOs deployment into monitoring platforms is platform-oriented, and this is fully explained in Nobl9 platform documentation, which can be found here [[link](https://docs.nobl9.com/)].

"SLOS-as-code" is a method of defining and setting up SLOs using [CLI](https://en.wikipedia.org/wiki/Command-line_interface) (Command Line Interface) instead of a user-friendly web interface in a [YAML](https://en.wikipedia.org/wiki/YAML) or [JSON](https://en.wikipedia.org/wiki/JSON) format (both are programing language independent data formats). Nobl9 provides a dedicated CLI tool, **sloctl** for creating or updating multiple SLOs simultaneously. You can use **sloctl** to integrate Nobl9 in CI/CD pipelines. More about **sloctl** can be found in the  [sloctl User Guide](https://docs.nobl9.com/sloctl-user-guide/).

Document how you will publish each SLOs in **SLODLC Implement Worksheet**. Update **SLI/SLO Repository**.

### Enforce Error Budget Policy

Error budgets are what change metrics into action, but only if they are collectively understood and have consequences for them to be taken seriously. General understanding of policy enforcement should be guaranteed by appointed roles (**SLO Owners** and **SLO Process Owner**;** **roles explained in the **SLO Adoption Framework** document). Policies should be published in the workplace and reviewed during periodic SLO reviews. You might reconsider providing training for stakeholders, especially supervisors and managers, to apply Error Budget policies and how to onboard new hires.

SLO culture with Error Budgets changes the conversation to balance the tradeoff. While the policy might sound like bureaucracy, it is the opposite of politics that decides investment decisions based on the influence of particular stakeholders. The most challenging situation comes when a team is forced into a reliability-work-only state by depleting their error budget. Still, a senior stakeholder wants to overturn the policy in favor of a feature release - this is OK, as long as management understands the implications.

Plan how to enforce policy usage in **SLODLC Implement Worksheet**. Update **SLI/SLO Repository**.

## Phase 4: Operate

Operate Phase in SLODLC represents the ordinary, day-to-day business-as-usual SLO exploitation across the organization. This is when your working SLOs trigger events and you have to **Respond to Error Budget Events & Alerts**. Teams are establishing countermeasures for data bias and degradation to **Ensure SLI Data Cleanliness**. During this stage, you should have already well-established habits of periodic reviews - weekly or monthly according to the necessity and context of your business - those routine activities lead to **Adjust the Targets**. While running SLIs and SLOs, your monitoring systems are collecting a lot of metric data that might be used as an intelligence input - **Gain SLO Insights** as often as possible.

The **SLODLC Review Check Report** is available here: [link]

### Respond to Error Budget Events & Alerts

All potential Error Budget Events should be identified and defined during the Design Phase, noted accordingly in Error Budget Policies. Responses should result in deliberate action - escalation thresholds (priorities) are a great way to automate responses without wasting time. For instance:

<table>
  <tr>
   <td><strong>Threshold</strong>
   </td>
   <td><strong>Error Budget</strong>
   </td>
   <td><strong>Action</strong>
   </td>
  </tr>
  <tr>
   <td>1
   </td>
   <td>1-day Error Budget is exhausted
   </td>
   <td>Automated alerts notify SRE of an at-risk SLO
   </td>
  </tr>
  <tr>
   <td>2
   </td>
   <td>7-day Error Budget is exhausted
   </td>
   <td>SREs conclude they need help to defend SLO and escalate to devs
   </td>
  </tr>
  <tr>
   <td>3
   </td>
   <td>30-day Error Budget is exhausted
   </td>
   <td>The root cause has not been found; SRE block releases and asks for dev support
   </td>
  </tr>
  <tr>
   <td>4
   </td>
   <td>90-day Error Budget is exhausted
   </td>
   <td>The root cause has not been found; SRE escalates the executive leadership
   </td>
  </tr>
</table>

Alerting is based on monitoring triggers; automated alerts, defined in Error Budget policies. When a particular service has elevated error and alert that puts an SLO at risk (for example,, approaches a critical threshold), stakeholders can be informed by the selected alert method. Alert policies can be defined separately from Error Budgets policies, but each Error Budget policy should have an adequate alert policy. Different alert and event policies might use different communication channels to alert in notification engines or tools (for example, Jira, PagerDuty, Slack). Alerts improve awareness of your system and enable you to do better-contributing factor analysis when something goes wrong - as an input to the Incident Management Process that is in place, or input to postmortems.

Be careful - alerts may interrupt with unnecessary noise in the organization, leading to distraction and more errors. Smart SLO and Error Budgets design and implementation will shift this process from noisy alerting to incident prevention.

### Ensure SLI Data Cleanliness

Data quality is essential. You should think about SLI data (query data) as a critical asset that maintains reliability. No matter what information you use and from what data source, even the most trusted one. Data Cleanliness can be achieved by a consistent, correct, and usable data collection process. Clean data has many advantages - it removes significant errors and inconsistencies and makes workflow more efficient as you can quickly get what you need from the correct available data. Fewer mistakes mean happier customers/users and less frustrated employees. Monitor for data errors and check the correctness of the data, standardize your data collection and data cleaning process, remove duplicated data, review your data manually from time to time (examining statistical samples for instance). Beware - most data cleaning can be done with dedicated tools, but some data cleaning requires manual work, which might need an extra organizational workforce; this task might be overwhelming.

### Adjust the Targets

Daily work with SLOs will generate feedback. We have a feedback loop from Operate Phase to Design and Implement Phases (both in iterative relation). You'll get operational feedback that will impact SLO in various ways - this is okay, which means SLOs are doing their job. One common pitfall is to set aspirational SLOs rather than achievable SLOs. For example, if you've never measured before, you may aspire to have three or four nines for a particular SLO. Then, when you see the real-life data, you may find that only two-and-half or three nines are achievable in the current state. Adjust the target! Now you have SLO that every stakeholder provided feedback on; SLO that has been adjusted, and proven correct with actual data. This is also the time to check if all SLI and SLO preliminary assumptions are still valid. Work with your live SLIs to check for anomalies or repeatable spikes. Investigate those; it might lead you to discover some new constraints or dependencies - it is a quite popular event that a newly-introduced SLI will expose valuable information that was not even considered while defining that SLI. This is a way to continuous SLO improvement. Learn and adapt - iterate and improve.

### Gain SLO Insights

SLO Insights will help you make data-driven decisions. SLO insights refer to the deep understanding and knowledge from analyzing information from SLO data. It helps the organization make better decisions rather than relying on instinct. Insights are gained by analyzing data to understand the context of a particular SLO and to pull conclusions. Conclusions lead to actions you can apply instantly. Finding SLO insights is not difficult when you know where to look. Start with data visualization, display information in a data visualization platforms, identify patterns in data sets, focus on samples, don't get fooled by averages and totals - look beyond.

Reports and dashboards are common ways to present data - insights provided by SLOs might enrich business intelligence and organizational wisdom on many levels - operational, economic, and leadership, to name a few. Remember to add appropriate activities to the SLO process to gather insights and review them. You can define and describe your SLO process by using SLODLC Process Template. More on the process topic in SLO Process Chapter.

## Review Periodically

Reviews make Design and Operate phases interact iteratively. This activity should be your long-lasting habit. Reviews are about stakeholders collaborating in an iterative way to refine established SLOs; all input is welcome - related to SLIs, SLOs, Error  Budgets, happiness, and overall SLO process. SLOs are not a project, not a system - SLOs are constantly evolving entities - evolving with your services and customer/user happiness. You may believe that you have the best SLO ever, but valuable feedback might refine it during the following periodic SLO review (for example, are SLI/SLO initial assumptions still valid).

Reviews should be conducted at a weekly or monthly interval. You may experiment with this cadency at the beginning of SLO adoption and find the best way for your organization. During Reviews, use SLODLC Review Check Report; this template will provide a useful set of checkpoints ensuring the completeness of your review meeting.

One of the most intriguing SLO challenges you may find at the beginning of your SLO adoption is how your service scaling may affect your SLOs. At first sight, this topic might look a bit overwhelming. One might think: "Ohh, we need a dedicated SLO Scaling Policy!". It’s not true - we have a better solution. First, we must understand that with the beauty of math, with 99.5% objective SLO, it will still be 99.5% if you're talking about 100 requests or 10000 requests regarding your scaled-up service. Second, you want to re-address and iterate on your objectives as time passes - regarding scaling events. Your service, during its life cycle, might experience different utilization changes like an increase (more requests, more failed requests, slower responses), decrease (less and less requests, less traffic in general), or functional (functionality changes). So, with SLOs, don't assume service scaling as something unique that might impact your SLOs. Moving towards a solution -a process approach to guide organizations to create better SLOs. **The SLODLC with built-in feedback loops and periodic reviews comes with help.** Of course, scaling should trigger a reflection on SLOs. Your organization will eventually experience such changes - plan ahead and add explicit scaling to your SLODLC documentation as a driver for future SLO adaptation.

The **SLODLC Review Check Report** is available here: [link]

## Align with Service & Software and Business Development Life Cycles

SLO adoption and later, **SLO Process** (explained in the **SLO Adoption Framework** document)  - those are not operating in an empty space. They operate in parallel with other processes, especially with close relation to the Service & Software Development Life Cycles. Service Development Life Cycle is an ongoing parallel process - SLODLC is strictly related to products and services (and related User Journeys), so it's wise to be familiar with those services, their life cycles, and most important - interact with involved stakeholders. Knowing when a particular service will retire will also signal the end of some SLOs on your radar, letting the SRE workforce be assigned to the new place. On the other hand, the Software Development Life Cycle will be impacted by SLODLC significantly. SLODLC is forcing a reliability focus from the beginning of the SDLC; forcing reliability into Architecture, Design, Test-Driven Development, Test Automation, Development - shifting reliability towards the "left"; towards the early stages of the Software Development Life Cycle.

From the business alignment perspective - monitor closely for emerging new business ideas. In most cases, the ideas will be related to new product development. Some new concepts or ideas might be already during prototyping, or maybe someone is developing new marketing strategies - look for those, stay alert. Listen to business stakeholders when discussing customer feedback and new ideas screening to fulfill market needs. Don't wait till the commercialization stage - start with SLOs as early as possible because the first impression and time to market momentum might be lost. A good practice is to be familiar with the business work pipeline - watch product backlogs and be up to date with incoming planned Scrum Sprints. Most importantly, make SLOs visible to businesses, attract business to the topic, and show them the potential benefits of using SLOs. 

## Listen and Engage Users and Stakeholders

SLO adoption is about people - feedback is crucial when change is about culture and mindset shift. Listening to Users and listening to Stakeholders build general awareness of the customer/user base, and their happiness; be open to feedback during the whole SLODLC. Keep your key Stakeholders close - the Users, the Business, the Team. Let them speak, let them be heard. Remember about their roles and responsibilities and what they may bring to the table. SLO adoption on an organizational level will also impact different groups of interest, with various incentives (additional motivation drivers to drive intended behavior). The key is to understand those groups, understand their incentives, and address them accordingly; **SLO Adoption Leader** should analyze what incentives are for cultural and mindset shift, general SLO interest, and continuous SLO improvement (role and activities explained in the **SLO Adoption Framework** document).

Different groups of interest should know how each other positions the SLO adoption and what each group can gain from it. That's why it's important to work simultaneously with all of those groups, letting them learn from each other. Working together may identify new cross-organizational benefits or synergies; one group's SLO might benefit another group; groups might discover new, unexpected dependencies and constraints, they might learn what can each group miss by ignoring the SLOs of others.

Securing transparency and clear communication will attract followers (bigger and bigger buy-in). Understand what people's concerns are and address them. Build engagement by allowing full participation of all stakeholders interested in SLOs. Invite them to periodic review meetings and establish a communication channel; let them join SLO formal or informal communities if any are established at a given time. While listening and engaging, focus on good relations and flawless interactions; ensure clear communication, without double standards and ambiguity; build trust and honesty, ask questions and provide feedback.

## Share Learnings from SLO Journey to Align Practices and Standards

Let's start with the organization's learning culture - one of the most important values ​​is supporting employees and encouraging them to acquire knowledge and experience - so crucial with SLO adoption as it might be a new concept for some. This culture requires no fear of asking stupid questions - in our case, about SLOs and general reliability. Understanding and willingness to provide advice in any challenging situation is an excellent element for building trust and good communication. The willingness to learn is not entirely enough to create the right way to share SLO learnings; it's also essential to develop a sense of urgency, for example, by explicit demonstration of potentially lost SLO benefits.

Incorporate your SLO practices into a standardized way of work to guide others interested in SLO adoption. Your hands-on experience may be a solid foundation for the internal standardized SLO process; conduct dedicated retrospective meetings or write down SLO lessons learned - whatever you think will be beneficial to manage your SLO knowledge well.

Celebrate SLO success cases and spread the word about them! Publish your related work frequently. Exchange, share all relevant SLO information, and share valuable resources with the whole organization, internal and external communities. Don't build SLOs, and don't work with them in isolation.

# SLO Knowledge

Despite which adoption path you will use and start with (paths are explained in the **SLO Adoption Framework** document), SLO knowledge management will be a part of your whole SLO adoption process. For best outcomes, you have to be familiar with the basic idea of the knowledge management process. Focus on four universal process steps: 

* capture all SLO knowledge artifacts, 
* define how you want to organize those artifacts and how to store them, 
* limit access, distribution, and publishing rules make practical use of knowledge and encourage stakeholders to learn and share the SLO experience.

The table of SLO knowledge artifacts is mapped to the **SLO Maturity Model** (explained in the **SLO Adoption Framework** document). It means that you should have solidly established artifacts on each maturity level as in the following table: 

<table>
  <tr>
   <td><strong>SLO Maturity Level</strong>
   </td>
   <td><strong>Knowledge Artifacts</strong>
   </td>
  </tr>
  <tr>
   <td><strong>Maturity Level 1 \
Monitor and React</strong>
   </td>
   <td>
<ul>

<li>SLI/SLO Documentation - comprehensive SLO documentation repository, documents, and links; a combination of SLODLC templates

<li>SLI/SLO Repository - one place for all SLIs and SLOs defined and implemented connected to SLO metadata like feedback, satisfaction surveys, visualized history data, and all related information; a combination of SLODLC templates

<li>SLO Use Cases repository - a collection of all SLOs defined in the organization with case description for general understanding of all stakeholders

<li>SLI/SLO Templates - ready to use templates
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Maturity Level 2 \
SLO Concepts</strong>
   </td>
   <td>
<ul>

<li>Library of resources - organizational SLO/SRE library with various resources related and available to employees; for example digital collection of books and other materials

<li>Case Studies repository - as an extension for SLO Use Cases repository with industry examples and references

<li>Dashboards - combine your organization SLOs into present dashboards and/or make new dedicated; make them accessible and visible

<li>Discussion board/forum - in most cases - an online place for SLO internal discussions

<li>FAQs - all frequently asked questions related to SLOs in one place

<li>Meetups - different meetings in the different formulas, those might be internal or external, one time meetings or recurring SLO community meetings

<li>SLO Reports - dedicated repository of pre-prepared ones or dedicated solution for reports ad hoc generation
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Maturity Level 3 \
Full SLO Adoption</strong>
   </td>
   <td>
<ul>

<li>Blog posts - internal - organization portal and/or external on the website or in social media

<li>Conferences - your SLO practitioners might attend as speakers or you can establish a closed internal conference for your organization

<li>Newsletters - every successful organizational change needs outbound communication; newsletters might be used in various conditions and situations

<li>Postmortems/Runbooks SLO References - those artifacts are vital for successful Incident and Problem Management enriching postmortems and runbooks for extra SLO insights

<li>Social media - your organization might be an active social media participant and share knowledge freely, it's a good idea to select one social media platform and manage outbound social media communication in SLO topic to exchange experience

<li>Benchmark repository - all information related to SLO experience in the industries

<li>Big scale reviews - from time to time, put SLOs in the center of a town hall or other big organization gathering

<li>Established SLO Process repository with tools for continuous improvements, historical and statistical data, recommendations for improvement
</li>
</ul>
   </td>
  </tr>
</table>

You may wish to establish the **SLO Training Programs** or more advanced **Workshops** or **Bootcamps**. Doing so builds strong motivation for the target audience to learn the topic by highlighting SLO benefits, opportunities, and success stories. During any training program, monitor participant feedback, what are the reactions, and what is the general interest. Conduct a survey after the training. Evaluate the whole program according to the gathered feedback. There are several practices for developing a successful SLO training program we can share, as Nobl9 has a long history of SLO Bootcamps. Let's start with a qualified, professional SLO trainer, a role responsible for training program execution outcomes - an **SLO Champion** (also known as Advocate or Coach). For this role, you may train an internal trainer or hire an industry consultant with training experience.

SLO trainers should assess organizational training needs in SLO topics taking SLO adoption goals and vision under consideration. What's more, SLO trainers may be also interviewing different organization function units which can be an input for the training syllabus. **SLO Champions** are the leaders and Subject Matter Experts co-responsible for smooth and successful SLO adoption. Depending on organizational and adoption context, they might be internal, organization employees (someone with SLO experience and knowledge) or external industry experts hired to help with SLO adoption.

SLO training programs might need dedicated customization based on assessment results, for instance, training structure, scope, and the proportion of lectures to practical exercises may change according to needs or audience. Training programs should be planned with training metrics in advance; the trainer should track different factors like the number of participants, the ratio to the whole population to be trained, general feedback, and changes made according to feedback. The key to success is to get organizational leaders' buy-in, and involve them in the learning process to drive the importance. Having a functional Manager with their team during a Bootcamp is a recommended practice.

**Coaching** is another excellent way to develop SLO competencies. Coaching requires the participation of an **SLO Champion** (someone with experience and expertise in the SLO/SRE area) who will help individuals or groups achieve development goals. Coaching might be a vendor-based service; a good starting point when an organization is at the beginning of the SLO journey.

**Mentoring Program** - requires the participation of an **SLO Champion** in the role of **Mentor** (someone with experience and expertise in the SLO/SRE area) who will teach **Mentees** (someone new to the SLO concepts). It is recommended to build an internal Mentoring Program based on internal employee's activities and relations where those with SLO experience will teach new employees. For example, one team member teaches other team members new to SLOs. You can achieve great results with Mentoring because it's based on internal organization fundamentals and trust.

**Train the Trainers** - in this model **SLO Champions** teaches new adepts and enriches the process by simultaneously letting adepts teach others. The internal organization certification process is something to reconsider to distinguish employee's achievements.

**SLO Communities of Practice** are organized groups with a shared interest in the SLO area. Participants collaborate to learn, teach, and exchange knowledge and experience. This is another level of professional networking; participation is motivated by volunteering, by the will to share with the community. Communities of Practice might be role oriented - connecting employees with the same role to help them grow within the role; cross-organizational - connecting employees from different units and with different roles, collectively solving complex organizational problems. As an **SLO Adoption Leader**, establishing the first Community of Practice should be your vital goal. Grow it and foster it as the SLO adoption progresses along the path (explained in the **SLO Adoption Framework** document).

# Final Thoughts

The Good SLO, the Bad SLO, and the Ugly SLO - yes, you can find all of those SLOs all-around your organization. Let's start with the Good SLO - the Team fully understands its importance and can react swiftly to Error Budget changes, accelerate development, experiment, and fail in a friendly, safe environment. SLO feedback is used to improve and grow, and root causes of incidents and problems are identified and addressed quicker. The Good SLO is a meaningful SLO - customer/user happiness is at the center of attention.

What then about the Bad SLO? Imagine a situation when something went wrong, SLI definition went wrong (wrong query), a data source is not working properly, feeding SLI with random data, and then the wrong SLO with Error Budgets... so many places where something might go wrong. That will lead to bad decisions and destroy all your efforts. During SLO adoption, keep attention to every particular step, don't avoid recommended activities. Of course, we encourage you to experiment, do some things creatively, your way or another; you may even add more steps to ensure effectiveness, efficiency, and quality - but don't skip steps without any reflection about importance. So, the Bad SLO - is just bad and wrong.

The story of the Ugly SLO. This is something between the Good SLO and the Bad SLO. From one perspective, you did your best; you have done all right, according to the SLODLC. But in the end, something is just wrong. Double-checking formal definitions will only convince you - yes, I did all correct. Ask yourself a question then - do you have organizational buy-in? Are all your close collaborators engaged? Did you work with other stakeholders, or did you just work alone? Is your SLO meaningful? Do people care about it? Is it only meaningful to you? This is the Ugly SLO - done correctly by the book but missing the soft people side of SLO - stakeholder involvement and meaningfulness; it's ugly, no one wants to use it, it can be a part of SLO culture.

One more thing for the end - don't focus on default SLOs - look at your products and services, data, customer journeys, and dependencies. Find your way. Don't copy SLOs without reflection. Each organization is unique with its critical infrastructure and user-facing services. You might think - those two areas are the best to start with SLOs but this approach might encounter lots of internal resistance because of unknown risks and will move incredibly slow. Probably your organization has a lot of metrics and alerts already for those critical services. We encourage you to try services with a high false-positive rate of alerts. This is an excellent place to start - reducing false positives is exactly what SLOs help you to tune out. Run your new SLOs in parallel with the old ones and compare both. Tune your new ones according to comparison insight - you will experience a significant change in the reduction of false-positive alerts. This will be an excellent time to replace old SLOs with new ones.

This is the end of SLODLC - more about SLO adoptions in the **SLO Adoption Framework** document. We hope you enjoy the SLO ride with us! Make good use of all you learned from this handbook. We wish you all the best during your own SLO journey!

# Templates
1. SLODLC Business Case Worksheet
2. SLODLC Discovery Worksheet
3. SLODLC Design Worksheet
4. SLODLC Implement Worksheet
5. SLODLC Review Check Report
