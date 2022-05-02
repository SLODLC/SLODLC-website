---
id: email-alert
title: Email Alert
sidebar_label: Email Alert
sidebar_position: 2
pagination_label: Email Alert
description: Email Alert Method
keywords:
  - email
  - alert
---

The Email Alert Method enables sending automated and customized alert messages to up to 30 different inboxes per alert to notify Nobl9 users whenever an incident is triggered.

## Configuring the Email Alert Method

You can configure your Email Alert Method directly in the Nobl9 UI, or by applying a YAML file in `sloctl`.

### Nobl9 UI

To set up the Alert Method in the Nobl9 UI, follow these steps:

1. Go to **Integrations > Alert Methods**.

2. Click the <img src="/img/plus_button.png" alt="plus button" width="20" height="20"></img> button.

3. Select **Email**.

4. Select a **Project** (mandatory).<br/>
    Specifying a Project is helpful when multiple users are spread across different teams or projects. When the Project field is left blank, a default value appears.

5. Enter a **Display name** (optional).<br/>
    You can enter a friendly name with spaces in this field.

6. Enter a **Name** (mandatory).<br/>
    The name is mandatory and can only contain lowercase, alphanumeric characters and dashes (for example, `my-alertmethod-name`). This field is populated automatically when you enter a display name, but you can edit the result.

7. Enter a **Description** (optional).<br/>
    Here you can add details such as who is responsible for the integration (team/owner) and the purpose of creating it.

**Now, you can compose your email alert:**

1. Enter the address(es) of the desired recipient(s) of the email alert. You can add email addresses in three categories: To (for direct recipients), CC (carbon copy), or BCC (blind carbon copy).

    1. You must provide at least one recipient in any one of these categories.

    2. The maximum number of recipients for each category (To, CC, BCC) is 10.

    3. You can paste a list of recipients. Email addresses must be separated with whitespace, commas (`,`), or semicolons (`;`). For example:

        ```java
        email1@example.com email2@example.com
        email1@example.com,email2@example.com
        email1@example.com;email2@example.com
        email1@example.com ; email2@example.com,email3@example.com email4@example.com
        ```

2. By default, the **Subject** shows `Your SLO $slo_name needs attention!`.
    You can add Noble9 variables (Project Name, Service Name, SLO Name, Alert Policy Name, Severity, etc.) to your alert **Subject**. To add variables, click the **Insert** button.

    :::note
    The character limit in this field is 90.
    :::

3. The **Message** field is the body of your email alert. Nobl9 provides the following template that you can customize using plain text:

    ```yaml
    $alert_policy_name has triggered with the following
    conditions: $alert_policy_conditions[]
    Time: $timestamp
    Severity: $severity
    Project: $project_name
    Service: $service_name
    Organization: $organization
    ```

  As in the **Subject** field, you can add Nobl9 variables (e.g., Project Name, Service Name, SLO Name, Alert Policy Name, Severity, etc.) to your alert message. To add variables to your message body, click the **Insert** button.

  :::note
  The character limit in this field is 2,000.
  :::

4. Finally, click the <span style={{color: '#D92680'}}>**Add Alert Method**</span> button.

### YAML Configuration

Here’s a general specification for adding an Email Alert Method through YAML:

```yaml
apiVersion: n9/v1alpha
kind: AlertMethod
metadata:
  name: string
  displayName: # string, optional
spec:
  description: # string, optional
  email:
    to:
      - # string - email address validation is performed, max. number of recipients is 10
    cc:
      - # string - email address validation is performed, max. number of recipients is 10
    bcc:
      - # string - email address validation is performed, max. number of recipients is 10
    subject: # string - arrays ($alert_policy_conditions[]) are not supported in this field
    body: # string - all variables ($variableName) are supported in this field
```

The YAML for the Email integration supports custom notification message templates. You can customize the template with variables in the following format: `$variable_name`. For example:

```yaml
apiVersion: n9/v1alpha
kind: AlertMethod
metadata:
  name: email-notification
  displayName: Email notification
spec:
  description: Sends email notification to selected recipients
  email:
    to:
      - alerts-tests@example.com
    cc:
      - alerts-tests+cc@example.com
    bcc:
      - alerts-tests+bcc@example.com
    subject: Your SLO $slo_name needs attention! $slo_labels_text
    body: |+
      $alert_policy_name has triggered with the following conditions:
      $alert_policy_conditions[]
      Time: $timestamp
      Severity: $severity
      Project: $project_name
      Service: $service_name
      Organization: organization
      Labels:
       SLO: $slo_labels_text
       Service: $service_labels_text
       Alert Policy: $alert_policy_labels_text
```

Here’s a list of all supported variables:

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

:::note
* `slo_labels_text`, `service_labels_text`, and `alert_policy_labels_text` are comma-separated key:value pairs. For example:

  * `slo:ratio, slo:calendar`

  * `project:myproject`

  * `alert:low, alert:high`
:::

## Testing the Email Alert Method in the UI

Users can test their Alert Methods for all notification services supported by the Nobl9 platform through the UI.

To verify that your Email Alert Method is set up correctly at the time that you configure it:

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
