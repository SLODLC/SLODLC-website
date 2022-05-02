---
id: pagerduty
title: PagerDuty
sidebar_label: PagerDuty
sidebar_position: 6
description: How do I configure a PagerDuty alert
keywords:
  - pagerduty
  - alert
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# PagerDuty Alert

The PagerDuty Alert Method enables triggering alerts through PagerDuty to notify Nobl9 users whenever an incident is triggered.

## Authentication

PagerDuty requires specifying the Integration Key that allows it to send you an incident alert. For more details on how to obtain the Integration Key, go to [Services and Integrations | PagerDuty Documentation](https://support.pagerduty.com/docs/services-and-integrations).

## Configuring the PagerDuty Alert Method

You can configure your PagerDuty Alert Method directly in the Nobl9 UI, or by applying a YAML file in `sloctl`.

### Nobl9 UI

1. Go to **Integrations > Alert Methods**.

2. Click the <img src="/img/plus_button.png" alt="plus button" width="20" height="20"></img> button.

3. Select **PagerDuty**.

4. Enter the **Integration Key** (mandatory).

5. Select a **Project** (mandatory).<br/>
    Specifying the Project is helpful when multiple users are spread across multiple teams or projects. When the Project field is left blank, a default value appears.

6. Enter a **Display name** (optional).<br/>
    You can enter a friendly name with spaces in this field.

7. Enter a **Name** (mandatory).<br/>
    The name is mandatory and can only contain lowercase, alphanumeric characters and dashes (for example, `my-alertmethod-name`). This field is populated automatically when you enter a display name, but you can edit the result.

8. Enter a **Description** (optional).<br/>
    Here you can add details such as who is responsible for the integration (team/owner) and the purpose of creating it.

9. Configure Alert Resolution feature for PagerDuty:

     * For PagerDuty alerts, users can select the checkbox in the Alert Resolution section on PagerDuty Alert Method wizard.
     * With this feature enabled, Nobl9 will send a notification after the [Cooldown](/Alert_Methods/Alert_methods.md#cool-down-period) period is over.
     * Optionally, you can add a message that will be attached to your 'all clear' notification.<br/>

    :::caution
    This feature is only available for PagerDuty Alert Method
    :::

10. Click the <span style={{color: '#D92680'}}>**Add Alert Method**</span> button.

### YAML Configuration for PagerDuty Alerts

<Tabs>
<TabItem value="code" label="YAML" default>

Here’s a general specification for adding a Pagerduty Alert through YAML:

```yaml
apiVersion: n9/v1alpha
kind: AlertMethod
metadata:
  name: string # Name of the Integration
  displayName: string # optional
  project: default
spec:
  description: string #optional
  pagerduty:
    integrationKey: # pager duty integration key
```

</TabItem>
<TabItem value="shell" label="Example">

Here’s an example of Pagerduty configuration through YAML:

```yaml
apiVersion: n9/v1alpha
kind: AlertMethod
metadata:
  name: pagerduty-notification
  displayName: PagerDuty notification
  project: default
spec:
  description: Sends notification to PagerDuty endpoint
  pagerDuty:
    integrationKey: "12345678901234567890123456789012"
```

</TabItem>
</Tabs>

### Configuring `sendResolution` for PagerDuty - YAML

It is possible to configure the PagerDuty AlertMethod to send additional messages to PagerDuty to resolve the incident. This can be configured by adding an optional section `sendResolution` to your PagerDuty YAML configuration.

`sendResolution` feature for PagerDuty adheres to the following rules:

* If you added the section `sendResolution` in your YAML configuration, then notification is sent to resolve an incident in PagerDuty.

* By default `sendResolution` is `nil`. This means that the all-clear notification is not sent by default.

* `sendResolution[ ]:message` - *string*, optional.

  * If you provide value for this field, it is attached to the summary of incidients resolution.

  :::note
  Only PagerDuty supports sending all-clear to the external system. For other AlertMethod types, this section is ignored.
  :::

* Here's an example of the sendResolution YAML configuration for PagerDuty:

  ```yaml
  apiVersion: n9/v1alpha
  kind: AlertMethod
  metadata:
    name: pager-duty-notification-sending-resolution
    displayName: PagerDuty notification
  spec:
    description: Open new Incident with "Nobl9 Test" service
    pagerDuty:
      integrationKey: "[secret]"
      // highlight-start
      sendResolution:
        message: Alert is now resolved
      // highlight-end
  ```

### Sending Notification for a Resolved Alert to PagerDuty

If you configure the PagerDuty Alert Method to send all-clear, an additional message is sent to PagerDuty service to resolve the incident.

* PagerDuty UI:<br/>
  <img src="/img/PagerDuty_resolved1.png" title="Fig 2.: Resolved incident in PagerDuty"></img>

* PagerDuty events API:
  <img src="/img/PagerDuty_resolved2.png" title="Fig 3.: Resolved incident in PagerDuty"></img>

  :::note
  The all-clear message is sent for both Alert statuses: Canceled or Resolved.
  :::

## Testing the PagerDuty Alert Method in the UI

Users can test their Alert Methods for all notification services supported by the Nobl9 platform through the UI.

To verify that your PagerDuty Alert Method is set up correctly at the time that you configure it:

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
