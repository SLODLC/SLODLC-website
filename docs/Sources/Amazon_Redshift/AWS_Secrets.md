---
id: aws-secrets-manager
title: Setting up AWS Secrets Manager
sidebar_label: Setting up AWS Secrets Manager
sidebar_position: 2
description: How to set up your AWS Secrets Manager?
keywords:
  - ARN
  - AWS Secret
---

# Setting up AWS Secrets Manager

This short guide will help you with setting up AWS Secrets Manager on your macOS or Linux machine.

## Instructions

Make sure that before following the steps below you have access to AWS.

### Creating your AWS Access Key

1. Go to [AWS Console](https://console.aws.amazon.com).

2. Under “Access keys for CLI, SDK & API access” click the “Create access key” button and save the csv file.

### Installing `brew`

Now, you can install `brew`:

1. Go to [brew](https://brew.sh/).

2. Copy the below install command:<br/>

   ```shell
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

3. Wait until the installation process is finished.

4. Follow the instruction displayed in the “next steps” to add Homebrew to your local path.

### Installing and Configuring AWS

1. Run the following command:

    ```shell
    brew install awscli
    ```

2. Run the following command:

    ```shell
    aws configure
    ```

3. Using the csv file that you have saved fill in the following:

   * AWS Access Key ID [None]: *your access key ID*

   * AWS Secret Access Key [None]: *your Secret Access Key*

   * Default region name [None] = `eu-central-1`

   * Default output format [None] = `json`

4. Run the below command to finish the installation process:

    ```shell
    brew install jq
    ```
