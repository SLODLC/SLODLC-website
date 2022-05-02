---
id: servicenow
title: ServiceNow
sidebar_label: ServiceNow
sidebar_position: 7
pagination_label: ServiceNow
description: How do I configure a ServiceNow alert
keywords:
  - servicenow
  - alert
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# ServiceNow

The ServiceNow Alert Method automatically opens an issue in your ServiceNow workflow to notify you whenever an incident is triggered.

## Authentication

### ServiceNow Credentials

Configuring the ServiceNow Alert Method requires the following:

1. Your ServiceNow username.

2. Your ServiceNow password.

3. Your ServiceNow InstanceID.
    An InstanceID is a globally unique ID across all ServiceNow instances. Check the `<instanceURL>/stats.do` page for any instance to view its ID.

### Setting up ACLs

To allow ServiceNow alerts to integrate with Nobl9, you need to set up an Access Control List (ACL) for your ServiceNow users.

Fllow the instructions below to set up your Service Now users:

1. Go to **System Security > Access Controll (ACL)** and create new Access Control.

2. In the drop-down menus select the following values:
   * **Type**: record
   * **Operation**: create
   * **Name**: Event [ecc_event]

    <img src="/img/SNow_step1.png" title="Fig. 1: Service Now Access Control"></img>

3. In the **Requires role** section, choose **Assign new/existing role**.
   * In the example below, we created a new role: `api_event_create`:

    <img src="/img/SNow_step2.png" title="Fig. 2: Creating new role"></img>

4. Click Save (Update).

5. Go to **User Administration > Users** and, by editing the user's profile, assign the relevant role to that user:

    <img src="/img/SNow_step3.png" title="Fig. 3: Assigninng the role"></img>

For more details on ACLs, see [ServiceNow documentation](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/contextual-security/task/t_CreateAnACLRule.html#t_CreateAnACLRule).

## Configuring the ServiceNow Alert Method

You can configure your ServiceNow Alert Method directly in the Nobl9 UI, or by applying a YAML file in `sloctl`.

### Nobl9 UI

To set up the Alert Method in the Nobl9 UI, follow these steps:

1. Go to **Integrations > Alert Methods**.

2. Click the <img src="/img/plus_button.png" alt="plus button" width="20" height="20"></img> button.

3. Select **ServiceNow**.

4. Enter your ServiceNow **Username** (mandatory).

5. Enter your ServiceNow **Password** (mandatory).

6. Enter an **InstanceID** (mandatory).

7. Select a **Project** (mandatory).<br/>
    Specifying a Project is helpful when multiple users are spread across different teams or projects. When the Project field is left blank, a default value appears.

8. Enter a **Display name** (optional).<br/>
    You can enter a friendly name with spaces in this field.

9. Enter a **Name** (mandatory).<br/>
    The name is mandatory and can only contain lowercase, alphanumeric characters and dashes (for example, `my-alertmethod-name`). This field is populated automatically when you enter a display name, but you can edit the result.

10. Enter a **Description** (optional).<br/>
    Here you can add details such as who is responsible for the integration (team/owner) and the purpose of creating it.

11. Click the <span style={{color: '#D92680'}}>**Add Alert Method**</span> button.

### YAML Configuration

<Tabs>
<TabItem value="code" label="YAML" default>

Here’s a general specification for adding a ServiceNow Alert Method through YAML:

```yaml
apiVersion: n9/v1alpha
kind: AlertMethod
metadata:
  name: # string
  displayName: # string
spec:
  description: # string
  servicenow:
    username: # string, mandatory
    password: # string, mandatory
    instanceid: # string, mandatory
```

</TabItem>
<TabItem value="shell" label="Example">

Here's an example of ServiceNow configuration through YAML:

```yaml
apiVersion: n9/v1alpha
kind: AlertMethod
metadata:
  name: servicenow-notification
  displayName: ServiceNow notification
spec:
  description: Sends HTTP request to ServiceNow https://dev99209.service-now.com/api/now/table/ecc_event
  servicenow:
    username: nobl9user
    password: My9%pass # secret field
    instanceid: dev99209
```

</TabItem>
</Tabs>

## Testing the ServiceNow Alert Method in the UI

Users can test their Alert Methods for all notification services supported by the Nobl9 platform through the UI.

To verify that your ServiceNow Alert Method is set up correctly at the time that you configure it:

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
