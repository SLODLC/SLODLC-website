---
id: ms-teams
title: MS Teams
sidebar_label: MS Teams
sidebar_position: 4
description: How do I configure an MS Teams alert
keywords:
  - ms teams
  - alert
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# MS Teams

The MS Teams Alert Method enables sending alerts through MS Teams to notify Nobl9 users whenever an incident is triggered.

## Authentication

To set up the MS Teams integration, you’ll need to provide an MS Teams Webhook URL. This allows you to send an automated notification to a channel of your choice. For details, see [MS Teams documentation](https://docs.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook).

## Configuring the MS Teams Alert Method

You can configure your MS Teams Alert Method directly in the Nobl9 UI, or by applying a YAML file in `sloctl`.

### Nobl9 UI

To set up the Alert Method in the Nobl9 UI, follow these steps:

1. Go to **Integrations > Alert Methods**.

2. Click the <img src="/img/plus_button.png" alt="plus button" width="20" height="20"></img> button.

3. Select **MS Teams**.

4. Enter the **URL** (mandatory).

5. Select a **Project** (mandatory).<br/>
    Specifying a Project is helpful when multiple users are spread across different teams or projects. When the Project field is left blank, a default value appears.

6. Enter a **Display name** (optional).<br/>
    You can enter a friendly name with spaces in this field.

7. Enter a **Name** (mandatory).<br/>
    The name is mandatory and can only contain lowercase, alphanumeric characters and dashes (for example, `my-alertmethod-name`). This field is populated automatically when you enter a display name, but you can edit the result.

8. Enter a **Description** (optional).<br/>
    Here you can add details such as who is responsible for the integration (team/owner) and the purpose of creating it.

9. Click the <span style={{color: '#D92680'}}>**Add Alert Method**</span> button.

### YAML Configuration for MS Teams Alerts

<Tabs>
<TabItem value="code" label="YAML" default>

Here’s a general specification for adding an MS Teams Alert Method through YAML:

```yaml
apiVersion: n9/v1alpha
kind: AlertMethod
metadata:
  name: # string
  displayName: # string
  project: # string
spec:
  description: # string
  msteams:
    url: # string, requires https://, secret field
```

</TabItem>
<TabItem value="shell" label="Example">

Here's an example of MS Teams configuration through YAML:

```yaml
apiVersion: n9/v1alpha
kind: AlertMethod
metadata:
  name: teams-notification
  displayName: MSTeams notification
  project: default
spec:
  description: Send message to MS Teams channel
  msteams:
    url: <https://webhook.office.com/webhookb2/12345>
```

</TabItem>
</Tabs>

The only field that is specific to MS Teams is `url`. This field is kept secret and will be replaced with the `[hidden]` string when returned from `sloctl`. The `https://` prefix is required.

## Testing the MS Teams Alert Method in the UI

Users can test their Alert Methods for all notification services supported by the Nobl9 platform through the UI.

To verify that your MS Teams Alert Method is set up correctly at the time that you configure it:

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
