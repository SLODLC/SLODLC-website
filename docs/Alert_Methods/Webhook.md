---
id: webhook
title: Webhook
sidebar_label: Webhook
sidebar_position: 8
pagination_label: Webhook
description: How do I configure a Webhook alert
keywords:
  - webhook
  - alert
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Webhook

The Webhook Alert Method enables sending alerts through an **HTTP callback handler that is triggered by an event**. You can create webhooks and configure them to handle different incident notifications, using either custom or predefined notification templates.

## Configuring the Webhook Alert Method

You can configure your Webhook Alert Method directly in the Nobl9 UI, or by applying a YAML file in `sloctl`.

### Nobl9 UI

To set up the Alert Method in the Nobl9 UI, follow these steps:

1. Go to **Integrations > Alert Methods**.

2. Click the <img src="/img/plus_button.png" alt="plus button" width="20" height="20"></img> button.

3. Select **Discord**.

4. Enter the **URL** (mandatory).
    The URL must start with `https://`.

5. Select a **Project** (mandatory).<br/>
    Specifying a Project is helpful when multiple users are spread across different teams or projects. When the Project field is left blank, a default value appears.

6. Enter a **Display name** (optional).<br/>
    You can enter a friendly name with spaces in this field.

7. Enter a **Name** (mandatory).<br/>
    The name is mandatory and can only contain lowercase, alphanumeric characters and dashes (for example, `my-alertmethod-name`). This field is populated automatically when you enter a display name, but you can edit the result.

8. Enter a **Description** (optional).<br/>
    Here you can add details such as who is responsible for the integration (team/owner) and the purpose of creating it.

9. The **Notification Details** tab allows you to configure a standard **Nobl9** webhook or a **Custom** webhook:

    * A standard **Nobl9** webhook lets you choose fields from a checklist which are then sent with the default Nobl9 webhook message. You must select at least one field from the checklist.

    * A **Custom** webhook lets you create your own payload in JSON format. (This functionality is only valid with JSON.)

        * Each field name must be enclosed in double quotes (`"<field_name>"`).

        * Most fields are in string format.

        * If the field’s value is an array, you must use JSON syntax to define it. The array fields have a special format with square brackets (`[]`) after the variable name. For example `$alert_policy_conditions[]`.

10. Click the <span style={{color: '#D92680'}}>**Add Alert Method**</span> button.

### YAML Configuration

<Tabs>
<TabItem value="code" label="YAML" default>

Here’s a general specification for adding a Webhook Alert Method through YAML:

```yaml
apiVersion: n9/v1alpha
kind: AlertMethod
metadata:
  name: # string
  displayName: # string
  project: # string
spec:
  description: # string
  webhook:
    url: # string
```

</TabItem>
<TabItem value="shell" label="Example">

Here's an example of Webhook specification through YAML:

```yaml
apiVersion: n9/v1alpha
kind: AlertMethod
metadata:
  name: webhook-notification
  displayName: Webhook notification
  project: default
spec:
  description: Sends HTTP request to custom webhook
  webhook:
    url: <https://sample-end-point/notify>
```

</TabItem>
</Tabs>

### Creating Webhook Custom Templates Through YAML

The YAML for the Webhook integration supports custom notification message templates.
The template can be specified in two ways:

1. Only variables are specified, and the notification message is generated automatically.<br/>
    For example, the following YAML specification:

    ```yaml
    apiVersion: n9/v1alpha
    kind: AlertMethod
    ...
    spec:
      webhook:
        url: <https://hook.web>
        templateFields:
          - slo_name
          - slo_details_link
    ```

    might yield this notification message:

    ```yaml
    {
      "slo_name": "Test SLO",
      "slo_details_link": "<https://main.nobl9.dev/slo/details?project=proj1&name=test_slo">
    }
    ```

2. A full message template is specified, with variables in the form `$<variable_name>`.<br/>
    For example, you might have a YAML specification like the following:

    ```yaml
    apiVersion: n9/v1alpha
    kind: AlertMethod
    metadata:
      displayName: Webhook Custom
      name: webhook-custom
    spec:
      description: ""
      webhook:
        template: |-
          {
           "message": "Your SLO $slo_name needs attention!",
           "timestamp": "$timestamp",
           "severity": "$severity",
           "slo": "$slo_name",
           "project": "$project_name",
           "organization": "$organization",
           "alert_policy": "$alert_policy_name",
           "alerting_conditions": $alert_policy_conditions[],
           "service": "$service_name",
           "labels": {
            "slo": "$slo_labels_text",
            "service": "$service_labels_text",
            "alert_policy": "$alert_policy_labels_text"
           }
          }
        url: '[hidden]'
    ```

The following is a list of all supported variables:

| Variable name | Description |
|---|---|
| `alert_policy_conditions[]` | Conditions defined for the Alert Policy (in a JSON array). |
| `alert_policy_conditions_text` | Conditions defined for the Alert Policy (string format). |
| `alert_policy_description` | The descriptions of the Alert Policy. |
| `alert_policy_labels_text` | The labels attached to the Alert Policy. |
| `alert_policy_name` | The name of the Alert Policy to which the Alert Method is attached. |
| `experience_name` | The name of the experience set for this Alert Policy. |
| `iso_timestamp` | The timestamp in ISO format when the Alert was triggered. |
| `organization` | The name of the Nobl9 Organization to which the Alert Method is attached. |
| `project_name` | The name of the Project to which the Alert Method is attached. |
| `service_labels_text` | Labels attached to the Service to which the Alert Method is attached. |
| `service_name` | The name of the Service to which the Alert Method is attached. |
| `severity` | Severity attached to your Alert Policy (`high` | `medium` | `low`). |
| `slo_details_link` | A link to the Service Level Objective to which the Alert Method is attached. |
| `slo_labels_text` | Labels attached to the SLO to which the Alert Method is attached.. |
| `slo_name` | The name of the SLO to which the Alert Method is attached. |
| `timestamp` | The timestamp indicating when the Alert was triggered. |

:::note Important Notes
:::

* The Webhook integration definition ***requires one (and only one) of these entries***:

  * `spec.webhook.template`

  * `spec.webhook.templateFields`

* The difference between `alert_policy_conditions[]` and `alert_policy_conditions_text`
is that `alert_policy_conditions[]` creates a valid JSON array of conditions as strings,
whereas `alert_policy_conditions_text` creates a single string field. For example:

  ```json
  {
    "text": "Remaining error budget is 10%, Error budget would be exhausted in 15 minutes and this condition lasts for 1 hour",
    "array": [
      "Remaining error budget is 10%",
      "Error budget would be exhausted in 15 minutes and this condition lasts for 1 hour"
    ]
  }
  ```

* `slo_labels_text`, `service_labels_text`, and `alert_policy_labels_text` are comma-separated key:value pairs. For example:

  * `slo:ratio, slo:calendar`

  * `project:myproject`

  * `alert:low, alert:high`

## Testing the Webhook Alert Method in the UI

Users can test their Alert Methods for all notification services supported by the Nobl9 platform through the UI.

To verify that your Webhook Alert Method is set up correctly at the time that you configure it:

1. Go to **Integrations > Alert Methods**.

2. Follow the process outlined above to add the Alert Method in the Nobl9 UI: complete the steps in the **Create Alert Method** wizard, and click the <span style={{color: '#D92680'}}>**Add Alert Method**</span> button.

3. On the **Details** screen, click the **Test** button in the upper-right corner. If the configuration is correct, Nobl9 will display the following message next to the button:
    `Test completed successfully!`

:::note
If the configuration is incorrect, Nobl9 will provide an error message with relevant details. The content of the error differs depending on the Alert Method channel.
:::

You can also test an existing Alert Method. To do that:

1. Go to **Integrations > Alert Methods**.

2. Find the Alert Method you want to test in the list, and click it.

3. On the **Details** screen, click the **Test** button in the upper-right corner.
