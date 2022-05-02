---
id: jira
title: Jira
sidebar_label: Jira
sidebar_position: 3
pagination_label: Jira
description: How do I configure a Jira alert
keywords:
  - jira
  - alert
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Jira Alert Method automatically opens a Jira issue to notify you whenever an incident is triggered.

## Authentication

Setting up the Jira integration requires an API token. You can obtain this by logging into your Jira account and clicking on your profile. See the [Atlassian account documentation](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/) for more details.

## Configuring the Jira Alert Method

You can configure your Jira Alert Method directly in the Nobl9 UI, or by applying a YAML file in `sloctl`.

For this Alert Method to function correctly, the following prerequisites must be met:

* The user must have access and permission to create an issue in a project. Otherwise, the Nobl9 backend will receive an error from the Jira API, and the ticket will not be created.

* All fields designated as mandatory by Nobl9 project settings must be included in the Nobl9 Jira message, or ticket creation will fail. For example, you may need to include values for the _Due date_ or _Fix versions_ fields.

* By default, the Nobl9 Jira message contains the following fields:

  * Summary

  * Description

  * Issue Type (always set to `Bug`)

**Caution**: In order for a Jira alert to be sent, all of the above-mentioned fields need to exist in your Jira project. Otherwise, you will see the following error message:

### Nobl9 UI

To set up the Alert Method in the Nobl9 UI, follow these steps:

1. Go to **Integrations > Alert Methods**.

2. Click the <img src="/img/plus_button.png" alt="plus button" width="20" height="20"></img> button.

3. Select **Jira**.

4. Enter the **URL** (mandatory).
    The URL must start with `https://`.

5. Enter a **Username** (mandatory).

6. Enter an **API Token** (mandatory).

7. Enter a **Jira Project Key** (mandatory).

8. Select a **Project** (mandatory).<br/>
    Specifying a Project is helpful when multiple users are spread across different teams or projects. When the Project field is left blank, a default value appears.

9. Enter a **Display name** (optional).<br/>
    You can enter a friendly name with spaces in this field.

10. Enter a **Name** (mandatory).<br/>
    The name is mandatory and can only contain lowercase, alphanumeric characters and dashes (for example, `my-alertmethod-name`). This field is populated automatically when you enter a display name, but you can edit the result.

11. Enter a **Description** (optional).<br/>
    Here you can add details such as who is responsible for the integration (team/owner) and the purpose of creating it.

12. Click the <span style={{color: '#D92680'}}>**Add Alert Method**</span> button.

### YAML Configuration for Jira Alerts

<Tabs>
<TabItem value="code" label="YAML" default>

Here’s a general specification for adding a Jira Alert Method through YAML:

```yaml
apiVersion: n9/v1alpha
kind: AlertMethod
metadata:
  name: # string
  displayName: # string, optional
spec:
  jira:
    url: # string, requires https://
    username: # string
    apiToken: # string, kept secret
    projectKey: # string
```

</TabItem>
<TabItem value="yaml" label="Example">

Here's an example of Jira configuration through YAML:

```yaml
apiVersion: n9/v1alpha
kind: AlertMethod
metadata:
  name: jira-notification
spec:
  jira:
    url: <https://mycompany.atlassian.net/>
    username: jira-alerts@mycompany.com
    apiToken: "<secret key>"
    projectKey: "AT"
```

</TabItem>
</Tabs>

Here’s a description of the fields:

* `url` is the Jira instance URL. The `https://` prefix is required.

* `username` is the email address of the owner of your API token.

* `apiToken` is your API token, which you create by logging into your Jira account and clicking on your profile.
    **Note:** The `apiToken` is kept secret and is not returned with the `get` command in `sloctl`. When you create the Alert Method, the `apiToken` field is required; it’s optional when you’re updating the Alert Method. The updated Alert Method uses the behavior from the existing object.

* `projectKey` is the code of the Jira project: `AT` (alert test), `PM` (project management), etc.
## Testing the Jira Alert Method in the UI

Users can test their Alert Methods for all notification services supported by the Nobl9 platform through the UI.

To verify that your Jira Alert Method is set up correctly at the time that you configure it:

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
