---
id: labels
title: Labels
sidebar_label: Labels
sidebar_position: 5
pagination_label: Labels
description: Overview of labels functionality in Nobl9
keywords:
  - labels
---

# Labels in Nobl9

This document presents an overview of labels in the Nobl9 platform and explains how to create and manage labels through the Nobl9 UI and `sloctl`.

Labels are key-value pairs that can be attached to SLOs, Services, and Alert Policies in the Nobl9 platform. Labels allow users to define attributes of resources and use them to filter and group SLOs across Services in the SLO Grid view and Reports. Each label must be unique for a given SLO, but many SLOs can carry the same label.

Labels can be attached to SLOs when creating or editing a Service in the SLO Wizard and to Alerts in the Alert Policy wizard. Users can select existing pre-defined labels or add new ones that are specific to their organization.

## Requirements for Labels

* Labels are plain text, but there are several requirements:

* Labels must be in the `key: value` format (`key=value` in `sloctl`).

* Each label can contain max. 63 characters.

* Labels are strings:

  * Only lowercase characters are allowed.

  * All characters must use UTF-8 encoding.

  * International (diacritic) characters are allowed.

* Each label must start with a letter.

* Each label must end with an alphanumeric character.

* Labels can contain underscores (`_`) and dashes (`-`) between the alphanumeric characters.

* There can be max. 20 Labels assigned to a resource.

## Most Common Use Cases of Labels

The following are the most common use cases for labels in the Nobl9 platform:

* Area labels: `area: latency`, `area: slowcheck`.

* Geo labels: `geo: apac`, `geo: amer`, `geo: eu`.

* Team labels: `team: green`, `team: sales`.

* Alert Policy Labels: `alert: low`, `alert: medium`, `alert: high`.

* SLO labels: `slo: ratio`, `slo: calendar`.

* Unit labels: `unit: seconds`, `unit: ms`, `unit: error per s`.

* Environment labels: `env: test`, `env: prod`, `env: staging`.

## Adding Labels

### Adding Labels to a New SLO

1. Go to **Service Level Objectives** in the main navigation pane.

2. Click the <img src="/img/plus_button.png" alt="plus button" width="20" height="20"/> button.

3. In the **SLO wizard > Add name, Alert policy and Labels** click on Labels:

4. Select a label from the dropdown menu, or

5. Click the <span style={{color: '#D92680'}}>**Save SLO**</span> button.

### Adding Label(s) to an Existing SLO

1. Go to **Service Level Objectives** in the main navigation pane.

2. On the relevant **SLO**, click the <img src="/img/plus_button.png" alt="plus button" width="20" height="20" /> button to edit.

3. In the **SLO wizard > Add name, Alert policy, and Labels** click the ‘Labels’:

    * Select a Label from the dropdown menu, or

    * Create a new Label by entering its name and clicking on the <img src="/img/plus_button.png" alt="plus button" width="20" height="20"/> button.

4. Click the <span style={{color: '#D92680'}}>**Save SLO**</span> button.

### Adding Label(s) to an Existing Service

1. Go to **Catalog > Services**.

2. Choose a relevant service from the Services list.

3. Click the <img src="/img/plus_button.png" alt="plus button" width="20" height="20"/> button.

4. Click the ‘Labels’ field and:

    1. Choose a label that will be attached to your Service or

    2. Create a new Label by entering its name and clicking on the

        button.

5. Click the <span style={{color: '#D92680'}}>**Save Service**</span> button.

:::note
You can choose up to 20 labels that will be attached to your Service.
:::

### Adding Labels to an Alert Policy

1. You can add labels to your Alert Policies:

2. Go to **Alerts**.

3. Click the <img src="/img/plus_button.png" alt="plus button" width="20" height="20"/> button.

4. In the **Alert Policy wizard > Add Alert Policy name, Severity, and Labels** click the ‘Labels’:

    * Select a Label from the dropdown menu, or

    * Create a new Label by entering its name and clicking on the <img src="/img/plus_button.png" alt="plus button" width="20" height="20"/> button.

5. Click the <span style={{color: '#D92680'}}>**Save Alert Policy**</span> button.

    :::tip
    When you add a label to an Alert Policy, it will be sent along with the Alert notification.
    :::

### Adding Label(s) to an Existing Alert Policy

1. Navigate to **Alerts** in the main navigation pane.

2. Choose a relevant Alert Policy from the list.

3. Click the <img src="/img/plus_button.png" alt="plus button" width="20" height="20"/> button.

4. In the **Add Alert Policy name, Severity, and Labels**Click the ‘Labels’ field and:

    * Select a Label from the dropdown menu, or

    * Create a new Label by entering its name and clicking on the <img src="/img/plus_button.png" alt="plus button" width="20" height="20"/> button.

5. Click the <span style={{color: '#D92680'}}>**Save Alert Policy**</span> button.

## Removing Label(s) from a Service

1. Go to **Catalog > Services**.

2. Choose a relevant service from the Services list.

3. In the ‘Labels’ column, click the + next to the Label that you wish to remove:

`[](/images/label.png)`

## Filtering by Labels - Overview

Nobl9 allows you to filter by multiple labels:

* If you enter/select multiple labels with the same key - you will be able to see resources that contain one of the labels with the same key.

* If you enter/select multiple labels with different keys - you will be able to see resources that contain all the labels with different keys.

For example:

|              SLO    |    Label 1|     Label 2  |
|---------------------|----------|---------------|
|SLO A has the labels | `geo: eu` | `team: green` |
|SLO B has the labels | `geo: apac` | `team: green`|
|SLO C has the labels  | `geo: eu` | `team: red` |
|SLO D has the labels | `geo: apac` | `team: red`|

* User filters by:

    `geo: eu` `geo: apac` `team: green`

* Applying filters displays:

    `SLO A` `SLO B`

### Filtering SLOs by Labels in the UI

Labels allow you to easily filter through the SLOs. To filter your SLOs:

1. Go to **Service Level Objectives** in the main navigation pane.

2. Click the arrow button in the SLO search box on the left-hand side of the screen.
    Enter the relevant **Project**.

3. In the **Labels** field select the relevant labels that you want to filter through.

4. The results will be displayed on the grid view.

:::note
You can share the results of your filtering directly with anyone from your team by copying a deep link from your browser address bar.
:::

:::tip
You can easily review the applied filters by hovering over the FILTER icon. To remove any of the filters, click the ‘x’ icon next to the relevant filter. Once you remove a filter, the change is applied in the link as well.
:::

### Filtering Reports by Labels in the UI

Nobl9 allows you to filter your reports by labels. To do that:

1. Go to **Reports** in the main navigation pane.
    Enter **Project**, **Service**, and **Service Level Objective** in the relevant fields.

2. Click the **Labels** field and:

    * Choose a label that will be attached to your Service or

    * Create a new Label by entering its name and clicking on the <img src="/img/plus_button.png" alt="plus button" width="20" height="20"/> button.

3. Click the <span style={{color: '#D92680'}}>**Apply**</span> button..

4. You will be able to see your filtered report result on the grid view.

:::tip
You can share the results of your report filtering directly with anyone from your team by copying the deep link from your browser address bar.
:::

### Retrieving Labelled Resources in `sloctl`

Retrieving SLO or Service config also returns all the labels that are set on the objects and allows filtering them.

There are two versions of syntax accepted by `sloctl` while filtering by labels:

* Labels can be separated by a comma without spaces, for example:

    `sloctl get slo -A -l key1=value1,key2=value2,key3=value3`

* Labels can be separated by a `-l` with spaces in between, for example:

    `sloctl get slo -A -l team=green -l team=orange -l key=value`

**Assumptions for Label Commands in** `sloctl`:

* If you retrieve resources for two or more labels that have the same `key`, they are connected by an OR logical operator, for example:

    `sloctl get slo -A -l team=green -l team=red`
    `sloctl` *retrieves all resources that have* `team=green` or `team=red` attached to them.

* If you retrieve resources for two or more labels that have different `keys`, they are connected by an AND logical operator, for example:

    `sloctl get slo -A -l team=green -l geo=eu`
    `sloctl` *retrieves all resources that have both* `team=green` and `geo=eu` labels attached to them.
