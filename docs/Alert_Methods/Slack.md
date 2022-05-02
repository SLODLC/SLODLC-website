---
id: slack
title: Slack
sidebar_label: Slack
sidebar_position: 7
pagination_label: Slack
description: How do I configure a Slack alert
keywords:
  - slack
  - alert
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Slack

The Slack Alert Method allows sending a predefined notification through Slack to notify Nobl9 users whenever an incident is triggered.

## Authentication

To set up the Slack integration, you’ll need to provide an Incoming Webhook URL. This allows Slack to send an automated notification to a channel of your choice. For details on where to find your Incoming Webhook URL, see the [Slack documentation](https://slack.com/help/articles/115005265063-Incoming-webhooks-for-Slack%22).

If you need any further help, contact your Slack administrator.

## Configuring the Slack Alert Method

You can configure your Slack Alert Method directly in the Nobl9 UI, or by applying a YAML file in `sloctl`.

### Nobl9 UI

To set up the Alert Method in the Nobl9 UI, follow these steps:

1. Go to **Integrations > Alert Methods**.

2. Click the <img src="/img/plus_button.png" alt="plus button" width="20" height="20"></img> button.

3. Select **Slack**.

4. Enter the **URL**.<br/>
    This is your Incoming Webhook URL. It must start with `https://hooks.slack.com/`.

5. Select a **Project** (mandatory).<br/>
    Specifying a Project is helpful when multiple users are spread across different teams or projects. When the Project field is left blank, a default value appears.

6. Enter a **Display name** (optional).<br/>
    You can enter a friendly name with spaces in this field.

7. Enter a **Name** (mandatory).<br/>
    The name is mandatory and can only contain lowercase, alphanumeric characters and dashes (for example, `my-alertmethod-name`). This field is populated automatically when you enter a display name, but you can edit the result.

8. Enter a **Description** (optional).
    Here you can add details such as who is responsible for the integration (team/owner) and the purpose of creating it.

7. Click the <span style={{color: '#D92680'}}>**Add Alert Method**</span> button.


### YAML Configuration

<Tabs>
<TabItem value="code" label="YAML" default>

Here’s a general specification for adding a Slack Alert Method through YAML:

```yaml
apiVersion: n9/v1alpha
kind: AlertMethod
metadata:
  name: # string
  displayName: # string
spec:
  description: # string
  slack:
    url: # string, must start with https://hooks.slack.com/
```

</TabItem>
<TabItem value="shell" label="Example">

Here’s an example of Slack configuration through YAML:

```yaml
apiVersion: n9/v1alpha
kind: AlertMethod
metadata:
  name: slack-notification
  displayName: slack notification
spec:
  description: Sends notification to a Slack channel
  slack:
    url: <https://hooks.slack.com/services/1234567890/abcdef>
```

</TabItem>
</Tabs>

## Testing the Slack Alert Method in the UI

Users can test their Alert Methods for all notification services supported by the Nobl9 platform through the UI.

To verify that your Slack Alert Method is set up correctly at the time that you configure it:

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
