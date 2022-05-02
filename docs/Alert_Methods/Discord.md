---
id: discord
title: Discord
sidebar_label: Discord
sidebar_position: 1
description: Discord Alert Method
keywords:
  - alert
  - discord
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Discord

The Discord Alert Method enables sending alerts through Discord to notify Nobl9 users whenever an incident is triggered.

## Authentication

To set up the Discord integration, you’ll need to provide a Discord Webhook URL. This allows you to send an automated notification to a channel of your choice. For details, see [Discord documentation](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks).

## Configuring the Discord Alert Method

You can configure your Discord Alert Method directly in the Nobl9 UI, or by applying a YAML file in `sloctl`.

### Nobl9 UI

To set up the Alert Method in the Nobl9 UI, follow these steps:

1. Go to **Integrations > Alert Methods**.

2. Click the <img src="/img/plus_button.png" alt="plus button" width="20" height="20"></img> button.

3. Select **Discord**.

4. Enter the **URL** (mandatory).<br/>
    The URL must start with `https://`.

5. Select a **Project** (mandatory).<br/>
    Specifying a Project is helpful when multiple users are spread across different teams or projects. When the Project field is left blank, a default value appears.

6. Enter a **Display name** (optional).<br/>
    You can enter a friendly name with spaces in this field.

7. Enter a **Name** (mandatory).<br/>
    The name is mandatory and can only contain lowercase, alphanumeric characters and dashes (for example, `my-alertmethod-name`). This field is populated automatically when you enter a display name, but you can edit the result.

8. Enter a **Description** (optional).<br/>
    Here you can add details such as who is responsible for the integration (team/owner) and the purpose of creating it.

9. Click the <span style={{color: '#D92680'}}>**Add Alert Method**</span> button.

### YAML Configuration

<Tabs>
<TabItem value="code" label="YAML" default>

Here’s a general specification for adding a Discord Alert Method through YAML:

```yaml
apiVersion: n9/v1alpha
kind: AlertMethod
metadata:
  name: string # Name of the Integration
  displayName: string # optional
  project: default
spec:
  description: string # optional
  discord:
    url: # URL to Discord webhook
```

</TabItem>
<TabItem value="shell" label="Example">

Here's an example of Discord configuration through YAML:

```yaml
apiVersion: n9/v1alpha
kind: AlertMethod
metadata:
  name: discord-notification
  displayName: Discord notification
spec:
  description: Sends message to Discord channel through webhook
  discord:
    # Nobl9 general Discord channel
    url: <https://discord.com/api/webhooks/809803263775211571/D4-5q51DehrBpOAFND6naV8MgCQwmu1vpAwXrO8vPVflFt1bo6J0wMXzvFAttb_2CRjv>
```

</TabItem>
</Tabs>

## Testing the Discord Alert Method in the UI

Users can test their Alert Methods for all notification services supported by the Nobl9 platform through the UI.

To verify that your Discord Alert Method is set up correctly at the time that you configure it:

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
