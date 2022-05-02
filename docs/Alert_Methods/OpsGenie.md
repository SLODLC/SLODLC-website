---
id: opsgenie
title: Opsgenie
sidebar_label: Opsgenie
sidebar_position: 5
pagination_label: Opsgenie
description: How do I configure an Opsgenie alert
keywords:
  - opsgenie
  - alert
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Opsgenie Alert

The OpsGenie Alert Method enables triggering alerts through Opsgenie to notify whenever an incident is triggered.

## Authentication

Two authentication methods are supported for Opsgenie API integration:

* **Basic** is a base64 hash created from the API Key, for example, `YTU5ODNiZjYtZTM3OC00Yzk3LWE2YWItOGJlMzU4OWUxOTBm`.

* **GenieKey** (default) only requires the API Key obtained directly from the Opsgenie panel, so it is easier to use.

The choice between the two authentication methods is offered for convenience, as some users may only have access to one of the methods.

**Retrieving Opsgenie API Key**

1. Navigate to **Settings > App Settings >> API Key Management**.

2. Click **Add New API Key**.

3. Enter a name for the API key and select the access rights to give to this API key.

4. Click **Add API Key** to save the new API key.

For more details refer to [API Key Management | opsgenie Documentation](https://support.atlassian.com/Opsgenie/docs/api-key-management/).

## Configuring the Opsgenie Alert Method

You can configure your Opsgenie Alert Method directly in the Nobl9 UI, or by applying a YAML file in `sloctl`.

### Nobl9 UI

1. Go to **Integrations > Alert Methods**.

2. Click the <img src="/img/plus_button.png" alt="plus button" width="20" height="20"></img> button.

3. Select **Opsgenie**.

4. Enter the **URL** starting with `https://` to configure Opsgenie (mandatory).

5. Choose the **Basic** or **GenieKey** type of **Authentication Method** from the drop-down list.<br/>
    The default value is **GenieKey**.

6. Enter the **API Key** (mandatory).<br/>
    Paste the API Key from Opsgenie.

7. Select a **Project** (mandatory).<br/>
    Using the Project is helpful when multiple users are spread across multiple teams or projects. When the Project field is left blank, a default value appears.

8. Enter a **Display name** (optional).<br/>
    You can enter a friendly name with spaces in this field.

9. Enter a **Name** (mandatory).<br/>
    The name is mandatory and can only contain lowercase, alphanumeric characters and dashes (for example, `my-alertmethod-name`). This field is populated automatically when you enter a display name, but you can edit the result.

10. Enter a **Description** (optional).<br/>
    Here you can add details such as who is responsible for the integration (team/owner) and the purpose of creating it.

11. Click the <span style={{color: '#D92680'}}>**Add Alert Method**</span> button.

### YAML Configuration for Opsgenie

<Tabs>
<TabItem value="code" label="YAML - GenieKey" default>

Here’s an example for adding an Opsgenie Alert through YAML (GenieKey):

```yaml
apiVersion: n9/v1alpha
kind: AlertMethod
metadata:
  name: opsgenie-notification-key
  displayName: Opsgenie notification with GenieKey
spec:
  description: Sends HTTP request to Opsgenie
  opsgenie:
    auth: GenieKey a5983bf6-e378-4c97-a6ab-8be3589e190f
    url: <https://api.opsgenie.com>
```

</TabItem>
<TabItem value="shell" label="YAML - Basic">

Here’s an example for adding an Opsgenie Alert through YAML (basic):

```yaml
apiVersion: n9/v1alpha
kind: AlertMethod
metadata:
  name: opsgenie-notification-basic
  displayName: Opsgenie notification with Basic
spec:
  description: Sends HTTP request to Opsgenie
  opsgenie:
    auth: Basic YTU5ODNiZjYtZTM3OC00Yzk3LWE2YWItOGJlMzU4OWUxOTBm
    url: <https://api.opsgenie.com>
```

</TabItem>
</Tabs>

## Testing the Opsgenie Alert Method in the UI

Users can test their Alert Methods for all notification services supported by the Nobl9 platform through the UI.

To verify that your Opsgenie Alert Method is set up correctly at the time that you configure it:

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