---
id: amazon-prometheus-authentication
title: Amazon Prometheus Authentication
sidebar_label: Amazon Prometheus Authentication
sidebar_position: 2
toc_min_heading_level: 2
toc_max_heading_level: 5
description: What types of authentication Nobl9 supports for the Amazon Prometheus integration
keywords:
  - release
  - notes
---
# Amazon Managed Service for Prometheus Authentication

This document is a description of different ways users can authenticate metrics queries sent by the Nobl9 Agent to the Amazon Managed Service for Prometheus.

## Basic Concepts

The following is a high-level overview of the basic AWS IAM concepts:

* [IAM](https://aws.amazon.com/iam/) stands for AWS Identity and Access Management. It is a system that enables fine-grained permissions management in AWS.

* [ARN](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html) stands for Amazon Resource Name. It is a string with a specified format (`:` signs to separate Its different parts) that uniquely identifies a resource in AWS. For example:

    ```bash
    arn:aws:iam::123123123123:role/amp-query-role
    ```

* [IAM Policy](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html) is an object in AWS. When it is associated with an identity or resource, it defines its permissions. You can create your own policy or use AWS managed policies and describe them using JSON.

    The following is an example of the AWS managed policy that allows users to query Amazon Managed Service for Prometheus. The policy is called `AmazonPrometheusQueryAccess`:

    ```yaml
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Action": [
                    "aps:GetLabels",
                    "aps:GetMetricMetadata",
                    "aps:GetSeries",
                    "aps:QueryMetrics"
                ],
                "Effect": "Allow",
                "Resource": "*"
            }
        ]
    }
    ```

    The `aps:QueryMetrics` allows the Agent to query AWS for Metrics (where `aps` stands for Amazon Prometheus Service).

You can find a complete list of permissions along with associated actions [here](https://docs.aws.amazon.com/prometheus/latest/userguide/AMP-and-IAM.html#AMP-permissions).

* [IAM Identity](https://docs.aws.amazon.com/IAM/latest/UserGuide/id.html) can either be a `user`, `user group,` or `role`. You can attach `IAM Policies` to `IAM Identities` to define what a specific `identity` is permitted to do.

* [IAM User](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html) is an entity you can create. It represents a person or an application that interacts with AWS through permission policies. `IAM User` consists of a name and static credentials, which can be (most commonly):

  * `Password` is a standard static credential for a user.

  * `Access keys` are common for applications and consist of`Access key` and `Secret access key.`

* [IAM Role](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html) is similar to a `user` with several key differences:

  * It is not associated with one person/application. It can be assumed by any user or application that requires it.

  * It does not have static credentials. Instead, it provides you with temporary security credentials for your role session when you assume a role.

:::tip
A `role` can be assumed by another `role`. This is called role chaining.
:::

## Nobl9 Agent Signing Process

Nobl9 `Agent` uses Golang [AWS SDK (v1)](https://github.com/aws/aws-sdk-go), which provides a [Signature V4](https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html) signing process for signing requests to Amazon Managed Service for Prometheus.

### Authentication Paths

The paths listed below do not cover all the authentication paths an application may choose from when accessing Amazon Managed Service for Prometheus. The purpose of this document is to list the most common ways that the Nobl9 Agent supports.

The following diagram outlines all possible authentication paths for Amazon Prometheus and their copendencies click to enlarge:

<img src="/img/AmazonProm_authentication.svg" alt="AWS Authentication Paths Used by Nobl9 Agent" title="Fig. 1: AMS Prometheus Authentication"></img>

:::note
The primary environment we expect the `Agent` to run in is a k8s cluster.
:::

### Dedicated user with static credentials

In the scenario outlined below, we create a dedicated user and generate access keys for this user. You can do this through the `Security credentials` tab on the user view, where you can `Create access key`. We will be using the generated access keys to sign our request to query metrics.

:::tip
Once it is generated, store your secret key in a safe location as you will not be able to access it afterwards.
:::

When created, you must expose the `Access key` to the `Agent`. In the following example, we use the `env` variables configuration:

```bash
export AWS_ACCESS_KEY_ID="ASIA!XAE6VILQ54NYAOV"
export AWS_SECRET_ACCESS_KEY="Q16Vep/WU1JHCLo1oMIYOoGAB6j2MFtjZPqm0ac"
```

:::note
This is a preferred method of exposing the AWS security credentials to the Agent. For details on other possible ways, go to [this page](https://aws.github.io/aws-sdk-go-v2/docs/configuring-sdk/#specifying-credentials).
:::

If you are running the `Agent` on k8s cluster, add these `env` declarations to your `Agent` configuration:

```yaml
# DISCLAIMER! This Deployment description is only containing the necessary fields for the purpose of this demo.
# It is not a ready-to-deploy k8s resource description.
apiVersion: apps/v1
kind: Deployment
spec:
  template:
    spec:
      containers:
        - name: agent-container
          env:
            - name: AWS_ACCESS_KEY_ID
              valueFrom:
                secretKeyRef:
                  key: <KEY_NAME>
                  name: <SECRET_NAME>
            - name: AWS_SECRET_ACCESS_KEY
              valueFrom:
                secretKeyRef:
                  key: <KEY_NAME>
                  name: <SECRET_NAME>
```

The standard and secure way to provide secrets to the running container in k8s is through `Secret` resource. You can also provide these credentials directly in the `Deployment,` but we do not recommend this method.

If you already have these credentials deployed in a `Secret` in your cluster, replace the `KEY_NAME` and `SECRET_NAME` placeholders accordingly.

If you do not have such `Secret`, follow the below example that shows how to create it:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: nobl9-agent-user-amazon-credentials
  namespace: default
type: Opaque
stringData:
  aws_access_key_id: "ASIA!XAE6VILQ54NYAOV"
  aws_secret_access_key: "Q16Vep/WU1JHCLo1oMIYOoGAB6j2MFtjZPqm0ac"
```

:::note
`aws_access_key_id` and `aws_secret_access_key` contain exemplary values.
:::

Now, replace the placeholders from the above `YAML`:

```yaml
apiVersion: apps/v1
kind: Deployment
spec:
  template:
    spec:
      containers:
        - name: agent-container
          env:
            - name: AWS_ACCESS_KEY_ID
              valueFrom:
                secretKeyRef:
                  key: aws_access_key_id
                  name: nobl9-agent-user-amazon-credentials
            - name: AWS_SECRET_ACCESS_KEY
              valueFrom:
                secretKeyRef:
                  key: aws_secret_access_key
                  name: nobl9-agent-user-amazon-credentials
```

#### Defining User’s Permission

The Agent connection to AWS is fully configured once you deploy the `Agent` with the credentials exposed to the running container.

Make sure that the user you have generated the credentials for has the correct permissions to query metrics. To do that, click the `Add permissions` button in the `Permissions` section on the user view in the AWS console.

We recommend using a predefined permission policy `AmazonPrometheusQueryAccess`.

You can also define your own policy. To do that, Amazon Prometheus needs the `aps:QueryMetrics` permission. The below example shows a JSON configuration of the permission:

```yaml
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "aps:QueryMetrics"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
```

The configuration is complete once you have assigned the above permission to a user.

#### Defining Permissions for Shared Roles

If you do not want to grant the permission directly to a user, AWS allows you to create a shared role that this user can assume.

To assign permissions to a shared role, follow all the authentication path steps outlined above. Using a shared role method, you still need to provide the `Agent` with the users' credentials. However, instead of assigning permission directly to a user, you make it assume a shared role with the `sts:AssumeRole` permission.

To assign permissions to a shared role:

1. Grant the user with `sts:AssumeRole` that points to the role ARN you wish to assume. For example, you can do this through the following JSON configuration:

    ```yaml
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Sid": "VisualEditor0",
          "Effect": "Allow",
          "Action": "sts:AssumeRole",
          "Resource": "arn:aws:iam::123123123123:role/amp-query-role"
        }
      ]
    }
    ```

  :::note Assumptions
  The above example assumes that your role ARN is `arn:aws:iam::123123123123:role/amp-query-role` and it has the `sts:QueryMetrics` permission. You can add permission policies following the same steps that you assign them to an individual user.
  :::

2. Tell the role you want to assume to trust this user
   1. Use the `Trust relationships` tab on the `Role view` in your AWS Console.
   2. Click `Edit trust relationships`. Below is an example of JSON configuration:<br/>

  ```yaml
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Principal": {
          "AWS": "arn:aws:iam::123123123123:user/agent-user"
        },
        "Action": "sts:AssumeRole",
        "Condition": {}
      }
    ]
  }
  ```

  :::note Assumptions
  This example assumes that your user's ARN is `arn:aws:iam::123123123123:user/agent-user`.
  :::

3. Now, set the `env` variable `N9_PROMETHEUS_AWS_ROLE_ARN` for the `Agent`. Configure it in the Agent's `Deployment`:

  ```yaml
  # DISCLAIMER! This Deployment description is containing only the necessary fields for the purpose of this demo.
  # It is not a ready-to-deploy k8s resource description.
  apiVersion: apps/v1
  kind: Deployment
  spec:
    template:
      spec:
        containers:
          - name: agent-container
            env:
              - name: AWS_ACCESS_KEY_ID
                valueFrom:
                  secretKeyRef:
                    key: aws_access_key_id
                    name: nobl9-agent-user-amazon-credentials
              - name: AWS_SECRET_ACCESS_KEY
                valueFrom:
                  secretKeyRef:
                    key: aws_secret_access_key
                    name: nobl9-agent-user-amazon-credentials
              - name: N9_PROMETHEUS_AWS_ROLE_ARN
                value: arn:aws:iam::123123123123:role/amp-query-role
  ```

### Role-based Access

This method differs from a user-based authentication. In the role-based access method, you are not providing any static credentials to the `Agent`. The role credentials used to sign the request are supplied by the `ServiceAccount` that you attach to the `Pod` in the Kubernetes cluster.

:::note IAM roles for service accounts
For more details on IAM roles for service accounts, refer to the AWS guide available [here](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html)
:::

Before creating the `ServiceAccount` and configuring the `Trust relationship` for the role you want the `ServiceAccount` to provide, make sure an OIDC provider is running in your cluster. For more details, refer to [Create an IAM OIDC provider for your cluster](https://docs.aws.amazon.com/eks/latest/userguide/enable-iam-roles-for-service-accounts.html).

:::caution Roles for Amazon EC2
For the time being, Nobl9 does not support IAM roles for Amazon EC2.
:::

### Defining Permissions for a Role

If you want to bind a role to the `ServiceAccount`, the role has to have `aps:QueryMetrics` permission. Refer to the previous section on [Defining Permissions for a Role](https://nobl9.atlassian.net/wiki/spaces/NT/pages/2018967595/Authentication+for+Amazon+Prometheus#Defining-User%E2%80%99s-Permission).

:::note Important notes
* Refer to the above section on the Access keys for more details.

* To create a role that can be linked to the `ServiceAccount`, refer to [this guide](https://docs.aws.amazon.com/eks/latest/userguide/create-service-account-iam-policy-and-role.html#create-service-account-iam-role).
:::

1. Update the `Trust relationship` of the created role. Follow the below JSON declaration:

    ```yaml
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Principal": {
            "Federated": "arn:aws:iam::123123123123:oidc-provider/${OIDC_PROVIDER}"
          },
          "Action": "sts:AssumeRoleWithWebIdentity",
          "Condition": {
            "StringEquals": {
              "${OIDC_PROVIDER}:sub": "system:serviceaccount:default:amp-query-role"
            }
          }
        }
      ]
    }
    ```

2. Now, create a `ServiceAccount` for this role:

    ```yaml
    apiVersion: v1
    kind: ServiceAccount
    metadata:
      name: amp-query-role
      namespace: default
      annotations:
        eks.amazonaws.com/role-arn: arn:aws:iam::123123123123:role/amp-query-role
    ```

3. To complete the configuration, you need to tell the Agent's `Deployment` that you want this `ServiceAccount` to be attached to the pods that run under it. To do this, modify the `Deployment` as follows:

    ```yaml
    # DISCLAIMER! This Deployment description is containing only the necessary fields for the purpose of this demo.
    # It is not a ready-to-deploy k8s resource description.
    apiVersion: apps/v1
    kind: Deployment
    spec:
      template:
        spec:
          serviceAccount: amp-query-role
          serviceAccountName: amp-query-role
    ```

### Role Chaining

This case builds on top of the previous one and differs in a similar way in which the user with permission differs from the user with the assumed role.

Our role does not have the permissions defined itself but instead relies on a different role to provide it:

1. The JSON declarations for both roles will look the same as in the previous case, `Trust relationship` for `arn:aws:iam::123123123123:role/amp-query-role`:

    ```yaml
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Principal": {
            "AWS": "arn:aws:iam::123123123123:user/the-role-which-wants-to-assume"
          },
          "Action": "sts:AssumeRole",
          "Condition": {}
        }
      ]
    }
    ```

2. `Apply Permissions` for the `arn:aws:iam::123123123123:role/the-role-which-wants-to-assume`:

    ```yaml
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Sid": "VisualEditor0",
          "Effect": "Allow",
          "Action": "sts:AssumeRole",
          "Resource": "arn:aws:iam::123123123123:role/amp-query-role"
        }
      ]
    }
    ```

3. Create and configure `ServiceAccount` for the `the-role-which-wants-to-assume` just as in:

    ```yaml
    apiVersion: v1
    kind: ServiceAccount
    metadata:
      name: amp-query-role
      namespace: default
      annotations:
        eks.amazonaws.com/role-arn: arn:aws:iam::123123123123:role/amp-query-role
    ```

4. To finish the configuration, set `N9_PROMETHEUS_AWS_ROLE_ARN` in the Agent's environment:

    ```yaml
    # DISCLAIMER! This Deployment description is containing only the necessary fields for the purpose of this demo.
    # It is not a ready-to-deploy k8s resource description.
    apiVersion: apps/v1
    kind: Deployment
    spec:
      template:
        spec:
          serviceAccount: the-role-which-wants-to-assume
          serviceAccountName: the-role-which-wants-to-assume
          containers:
            - name: agent-container
              env:
                - name: N9_PROMETHEUS_AWS_ROLE_ARN
                  value: arn:aws:iam::123123123123:role/amp-query-roleAmazon Managed Service for Prometheus Use Case with Nobl9
    ```

## Useful Links

[Create an IAM OIDC Provider for Your Cluster](https://docs.aws.amazon.com/eks/latest/userguide/enable-iam-roles-for-service-accounts.html).

[Creating an IAM Role and Policy for Your Service Account](https://docs.aws.amazon.com/eks/latest/userguide/create-service-account-iam-policy-and-role.html)

[AWS Identity and Access Management (IAM)](https://aws.amazon.com/iam/)

[Amazon Resource Names (ARNs)](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html)
