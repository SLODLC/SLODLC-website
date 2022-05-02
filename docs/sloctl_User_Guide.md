---
id: sloctl-user-guide
title: Sloctl User Guide
sidebar_label: Sloctl User Guide
sidebar_position: 3
pagination_label: Sloctl User Guide
description: How to use sloctl tool?
keywords:
- agent
- sloctl
- yaml
- CLI
- SLO
- commands
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# `sloctl` User Guide

`sloctl` is a command-line interface (CLI) for Nobl9. You can use the `sloctl` CLI for creating or updating multiple SLOs and Objectives at once as part of CI/CD.

The web user interface is available to give you an easy way to create and update SLOs and other resources, while `sloctl` aims to provide a systematic and/or automated approach to maintaining SLOs as code.

## Why Use `sloctl`?

* You can use `sloctl` to integrate Nobl9 in CI/CD pipelines. With `sloctl`, you can keep definitions of SLOs or other Nobl9 resources in the version control system. Any changes will be automatically applied to Nobl9.
* Currently, `sloctl` is the only method to browse fired alerts (apart from alert methods themselves). There is no UI to browse fired alerts in the Nobl9 UI.
* Several advanced configuration options are only available via yamls and `sloctl` (Keep in mind that the below list is not comprehensive):
  * For SLOs, when using ratio metrics, you can select `spec.objectives[].countMetrics.incremental` other than the default one for selected data sources.
  * For Alert Policies, you can use any number and combination of alerting conditions. Nobl9 Web UI limits that to a max. of one condition of a given type.

## Setting up `sloctl`

Use the following steps to install and configure Nobl9 command-line interface, sloctl.

## Binary Installation of `sloctl`

When installing files in protected folders, the operating system occasionally requires copy or file permissions. When this happens, give the installed files executable permissions (Linux and Mac) or confirm the file copy operation (Windows).

Use the following steps to download the Nobl9 CLI. The following are platform-specific instructions:

<Tabs groupId="operating-systems">
  <TabItem value="mac" label="MacOS">
  <b>Method 1: Using</b> <code>homebrew</code><br/>
  <p></p>
    <ol>
      <li>Download the appropriate binary executable zip file from <a target="_blank" href="https://github.com/nobl9/sloctl/releases">sloctl release pages</a>.</li>
      <li>For Mac OS, we recommend using <a target="_blank" href="https://brew.sh/"><code>homebrew</code></a>:</li>
        <p><code>brew tap nobl9/sloctl</code></p>
        <p><code>brew install sloctl</code></p>
    </ol>
  <b>Method 2: Manual installation</b>
  <p></p>
  <ol>
      <li>Download the appropriate binary executable zip file from <a target="_blank" href="https://github.com/nobl9/sloctl/releases">sloctl release pages</a>.</li>
        <ul>
            <li>After the the binary exectable zip file downloads from the <code>sloctl</code> binaries and config folder, you will need to place the file in the appropriate system path.</li>
            <li>The Mac operating system occasionally requires file permissions. When this happens, give the file executable permission.</li>
        </ul>
      <li>Double-click the executable zip file to extract it to your <b>Downloads</b> folder.</li>
      <li>Open <b>Terminal</b> and enter the following commands:</li>
        <p></p>
        <code>sudo mkdir -p /usr/local/bin</code><br></br>
        <code>sudo cp ~/Downloads/sloctl /usr/local/bin/</code><br></br>
        <code>sudo chmod a+rx /usr/local/bin/sloctl</code><br></br>
        <code>open /usr/local/bin</code><br></br>
        <p></p>
      <li>The last <code>open</code> command above will navigate to the <code>bin</code> folder in <b>Finder.</b></li>
      <li>Right-click <code>sloctl</code> in the <b>Finder</b> window and select <b>Open</b>.</li>
         <p></p>
         <b>Open</b> is not the default option when the security modal pops up. Selecting Open authorizes the <code>sloctl</code> binary on your Mac.
    </ol>
  </TabItem>
  <TabItem value="win" label="Windows">
  <ol>
    <li>Download binary executable zip file from the <a target="_blank" href="https://github.com/nobl9/sloctl/releases">sloctl releases page</a> and extract it. If you are not an admin, create a <code>nobl9</code> folder in your user directory.</li>
    <li>Create the directory <code>C:\Program Files\nobl9</code></li>
    <li>Copy the <code>sloctl.exe</code> file from the folder you unzipped to the <code>nobl9</code> folder you just created in your user directory.</li>
  </ol>
  <b>Add <code>.exe</code> Directory to the System Path Variable.</b>
  <p></p>
  <ol>
    <li>Navigate to <b>Control Panel > System and Security > System</b> and click <b>Advanced system settings</b>. </li>
    <li>Click the <b>Advanced</b> tab in the <b>System Properties</b> page, and click <b>Environment Variables</b>.</li>
    <li>Navigate to <b>User variables for username</b> section, and select <b>Path</b></li>
    <li>Navigate to <b>System Variables</b> and select <b>Path</b> (If you only have access to the user variables then make the update there.)</li>
    <li>Click <b>Edit</b>.</li>
    <li>Add the directory where you placed the file (<code>C:\Program Files\nobl9</code>).</li>
    <li>Click <b>OK</b></li>
  </ol>
  </TabItem>
  <TabItem value="Linux" label="Linux">
  <ol>
    <li>Download the appropriate binary executable zip file from <a target="_blank" href="https://github.com/nobl9/sloctl/releases">sloctl release pages</a>.</li>
    <li>Extract the binary file to: <code>/usr/local/bin</code>.</li>
    <li>The Linux operating system occasionally requires file permissions. When this happens, give the file executable permission.</li>
    <li>After the the binary exectable zip file downloads from the <code>sloctl</code> binaries and config folder, you will need to place the file in the appropriate system path.</li>
    <li>Extract the zip file containing <code>sloctl</code> using your file manager or <code>unzip sloctl-linux-*.zip</code>.</li>
    <li>Put <code>sloctl</code> in one of the locations that are in your <code>$PATH</code> - e.g. <code>/usr/local/bin/</code> or <code>~/.local/bin</code>. Open your <b>Terminal</b> and run:</li>
    <p></p>
    <code>sudo install -o root -g root -m 0755 ~/Downloads/sloctl /usr/local/bin/sloctl</code>
    <p></p>
    <li>Finally, type <code>sloctl</code> to run the program.</li>
  </ol>
  </TabItem>
</Tabs>

### Configuration

Follow these steps to configure your `sloctl` connection:

1. Create a **Client ID** and **Client Secret** pair for use in `sloctl`:

    * Navigate to **Settings > Access Keys** in the web UI.

    * Click **Create Access Key**.

2. Follow the instructions in the UI to configure `sloctl` to use the provided credentials. Use one of the available setup flows:

    * **Method 1:**<br/>
    Click **Download credentials file** in the web UI, and put the downloaded file in `~/.config/nobl9/config.toml` (Linux and macOS) or `%UserProfile%\.config\nobl9\config.toml` (Windows).

    * **Method 2:**<br/>
    Run `sloctl add-context`, name the context, and paste the **Client ID** and **Client Secret** from the web UI when prompted.

3. Test the configuration by entering `sloctl get slos` into the command line.

:::note
If there are no SLOs created in your account or in the selected project, you might see this message: `No resources found in default project`. This indicates that the configuration is correct; if it’s not, the command will return a 401 error.
:::

### Summary of `sloctl` Commands

The following are the available commands in `sloctl`. When entered on the command line they should all be preceded by `sloctl`; for example, `sloctl delete`.

| Command | Description |
|---|---|
| `add-context` | Add a new sloctl configuration context. |
| `apply` | Apply a resource definition in YAML or JSON format. |
| `completion` | Generate the autocompletion script for sloctl for the specified shell. |
| `delete` | Delete a resource definition (specified by name or definition file). |
| `get` | Display one or more resources. |
| `help` | Get help on any command. |
| `use-context` | Set the default context. |
| `version` | Print the sloctl version. |

### Common Objects

The following are the API objects that you can manipulate with `sloctl` using the different commands. For details about each object, see the [YAML Guide](YAML_Guide.md).

Object arguments follow the `[command]` argument in the `sloctl` command line:

`sloctl [command] [object]`

For example:

`sloctl get agents`

| Object | Description |
|---|---|
| `agents` | Provide a solution to metrics collection from external sources. In this solution, users deploy the agents. |
| `alertmethods` | Allow you to send alerts to specific notification engines or tools when an incident is triggered. |
| `alertpolicies` | Define a set of conditions that, when met, cause an alert to be a sent to a predefined list of integrations. |
| `alerts` | Allow notifications to be sent about SLOs when certain conditions are met. |
| `dataexports` | Define a configuration to export your data from Nobl9. |
| `directs` | Provide a SaaS solution to metrics collection from external sources. |
| `projects` | Serve as workspaces for resources and provide a layer of isolation for resources in different projects. |
| `rolebindings` | Assign a user the permissions indicated in a role. |
| `services` | Serve as high-level groupings of SLOs. |
| `slos` | Define a set of target values for an SLO. |

:::caution
If you are using a `sloctl` version older than 0.0.56, you will not be able to use the `kind: Project` or `kind: RoleBinding`.
:::

### Flags

**Common flags** pass data to a command or parameter:

| Flag | Long Form | Description |
|---|---|---|
| `-h` | `--help` | Get help. |
| `-o` | `--output` *string* | Specify the output format: one of `table|yaml|json` (default yaml). |

Certain `sloctl` commands accept other flags. **Global flags** define the scope of the current command, such as the project, context, or location of the configuration file:

| Flag | Long Form | Description |
|------|-----------|---------|
| `-A` | `--all-projects` | Display the objects from all of the projects. |
|   | `--config string` | Specify the path to the config file (without this flag, sloctl checks in `%UserProfile%\.config\nobl9\config.toml` on Windows and `~/.config/nobl9/config.toml` on other operating systems). |
| `-c` | `--context` *string* | Override the default context for the duration of the command. |
| `-p` | `--project` *string* | Override the default project from the active context for the duration of the command. |

## Command Reference

### `add-context`

The `add-context` command adds a new `sloctl` configuration context.

A context in Nobl9 is a configuration you use to access the Nobl9 app with your user account. It is a set of access parameters that includes a Client ID, Client Secret, and a Project.

You can switch between different contexts depending on what Project you wish to work against in sloctl. For this see the [`use-context`](#use-context) command below.

**Usage:**

```bash
  sloctl add-context
```

This is an interactive command that collects parameters in a wizard mode, as follows:

1. Set the **context name**.

    `New context name:` _Enter the context name and press Enter_

2. Set the **Client ID**. In the Nobl9 UI, the Client ID is generated by navigating to **Settings** **>** **Access Keys** **>** **Create Access Key**:
    `Client ID:`_Enter the Client ID and press Enter_

3. Set the **Client Secret**.
    `Client Secret:` _Enter the Client Secret and press Enter_

4. Set a default **Project**. The project can be overridden with the `-p` (`--project`) flag in any command.
    `Project [default]:` _Enter the default project name and press Enter_

5. Indicate whether the newly created context should be set as the default now.

    * `Set '{context name from Step 1}' as a default context? [y/N]:` _Type_ `y` _(for Yes) or_ `n` _(for No) and press Enter._

    **Note**: Hitting Enter without selecting `y` or `n` defaults to _No_.

### `apply`

The `apply` command commits your changes by sending the updates to the application.

**Usage:**

```bash
  sloctl apply [flags]
```

**Examples:**

* Apply the configuration from _slo.yaml_:

    ```bash
    sloctl apply -f ./slo.yaml
    ```

* Apply resources from multiple different sources at once:

    ```bash
    sloctl apply -f ./slo.yaml -f test/config.yaml -f <<https://my-definition.com/slo.yaml>>
    ```

* Apply the YAML or JSON passed directly into stdin:

    ```bash
    cat slo.yaml | sloctl apply -f -
    ```

* Apply the configuration from _slo.yaml_ and set the project if it is not defined in the file:

    ```bash
    sloctl apply -f ./slo.yaml -p slo
    ```

**Flags:**

| Flag | Long Form | Description |
|---|---|---|
| `-f` | `--file` *string* | Provide a file path or a URL to the configuration in YAML or JSON format. This option can be used multiple times. |
| `-h` | `--help` | Get help. |

**Global Flags:**

| Flag | Long Form | Description |
|---|---|---|
| `-A` | `--all-projects`| Display the objects from all of the projects. |
|   | `--config` *string* | Specify the path to the config file (without this flag, sloctl checks in `%UserProfile%.config\nobl9\config.toml` on Windows and `~/.config/nobl9/config.toml` on other operating systems). |
| `-c` | `--context` *string* | Override the default context for the duration of the command. |
| `-p` | `--project` *string* | Override the default project from the active context for the duration of the command. |

Use `sloctl apply [object] --help` for more information about using the `apply` command with different objects.

When the specified changes have been applied successfully, you will see the following confirmation message:

```yaml
sloctl apply -f ./samples/sample.yaml

Resources successfully created.
```

### `completion`

The `completion` command generates the autocompletion script for `sloctl` for the specified shell.

**Usage:**

```bash
  sloctl completion [command]
```

**Available commands**

| Command | Description |
|---|---|
| `bash` | Generate the autocompletion script for bash. |
| `fish` | Generate the autocompletion script for fish. |
| `powershell` | Generate the autocompletion script for PowerShell. |
| `zsh` | Generate the autocompletion script for zsh. |

**Flags:**

| Flag | Long Form | Description |
|---|---|---|
| `-h` | `--help` | Get help. |

**Global Flags:**

| Flag | Long Form | Description |
|---|---|---|
| `-A` | `--all-projects`| Display the objects from all of the projects. |
|   | `--config` *string* | Specify the path to the config file (without this flag, sloctl checks in `%UserProfile%\.config\nobl9\config.toml` on Windows and `~/.config/nobl9/config.toml` on other operating systems). |
| `-c` | `--context` *string* | Override the default context for the duration of the command. |
| `-p` | `--project` *string* | Override the default project from the active context for the duration of the command. |

### `delete`

The `delete` command allows users to delete different resources.

**Usage:**

```bash
  sloctl delete [flags]
  sloctl delete [command]
```

**Examples:**

* Delete the configuration from _slo.yaml_:

    ```bash
    sloctl delete -f ./slo.yaml
    ```

* Delete resources from multiple different sources at once:

    ```bash
    sloctl delete -f ./slo.yaml -f test/config.yaml -f <<https://my-definition.local/slo.yaml>>
    ```

* Delete the YAML or JSON passed directly into stdin:

    ```bash
    cat slo.yaml | sloctl delete -f -
    ```

* Delete specific resources by specifying their names:

    ```bash
    sloctl delete slo my-slo-name
    ```

* Delete the configuration from _slo.yaml_ and set the project context if it is not defined in the file:

    ```bash
    sloctl delete -f ./slo.yaml -p slo
    ```

**Available objects:**

* `agents`, `alertmethods`, `alertpolicies`, `alerts`, `annotations`, `dataexports`, `directs`, `projects`, `rolebindings`, `services`, `slos`

For details, see [Common Objects](#common-objects).

**Flags:**

| Flag | Long Form | Description |
|---|---|---|
| `-f` | `--file` *string* | Provide a file path or a URL to the configuration in YAML or JSON format. This option can be used multiple times. |
| `-h` | `--help` | Get help. |

**Global Flags:**

| Flag | Long Form | Description |
|---|---|---|
| `-A` | `--all-projects`| Display the objects from all of the projects. |
|   | `--config` *string* | Specify the path to the config file (without this flag, sloctl checks in `%UserProfile%\.config\nobl9\config.toml` on Windows and `~/.config/nobl9/config.toml` on other operating systems). |
| `-c` | `--context` *string* | Override the default context for the duration of the command. |
| `-p` | `--project` *string* | Override the default project from the active context for the duration of the command. |

Use `sloctl delete [object] --help` for more information about using the `delete` command with different objects.

When the specified objects have been deleted successfully, `sloctl` shows the following confirmation message:

```bash
sloctl delete -f example.yaml

The resources were successfully deleted.
```

### `get`

The `get` command prints a table of the most important information about the specified resources.

**Usage:**

```bash
  sloctl get [object]
```

**Available objects:**

* `agents`,
* `alertmethods`,
* `alertpolicies`,
* `alerts`,
* `annotations`,
* `dataexports`,
* `directs`,
* `projects`,
* `rolebindings`,
* `services`,
* `slos`

For details, see [Common Objects](#common-objects).

**Flags:**

| Flag | Long Form | Description |
|---|---|---|
| `-h` | `--help` | Get help. |
| `-l` | `--labels` | Filter resources by label. For example: `key=value,key2=value2,key2=value3`. |
| `-o` | -`-output` *string* | Specify the output format: one of `table|yaml|json` (default yaml). |

**Global Flags:**

| Flag | Long Form | Description |
|---|---|---|
| `-A` | `--all-projects`| Display the objects from all of the projects. |
|   | `--config` *string* | Specify the path to the config file (without this flag, sloctl checks in `%UserProfile%\.config\nobl9\config.toml` on Windows and `~/.config/nobl9/config.toml` on other operating systems). |
| `-c` | `--context` *string* | Override the default context for the duration of the command. |
| `-p` | `--project` *string* | Override the default project from the active context for the duration of the command. |

Use `sloctl get [object] --help` for more information about using the `get` command with different objects.

**Notes:**

* If there are no objects of the given type associated with the given project, `sloctl` returns the following message:

    ```text
    sloctl get slo

    No resources found in 'default' project.
    ```

* If a user provides a valid type (e.g., `slo`) without a mandatory name, `sloctl` returns a list of objects:

    ```yaml
    sloctl get slo

    - apiVersion: n9/v1alpha
      kind: SLO
      metadata:
        name: streaming-slo
        project: default
      spec:
        ...
    - apiVersion: n9/v1alpha
      kind: SLO
      metadata:
        name: streaming-other-slo
        project: default
      spec:
        ...
    ```

* If a user provides an object type and name, `sloctl` returns only the specific object:

    ```yaml
    sloctl get slo streaming-other-slo

    - apiVersion: n9/v1alpha
      kind: SLO
      metadata:
        displayName: Streaming Other
        name: streaming-other-slo
        project: default
      spec:
        alertPolicies:
        - budget-is-burning-too-fast
        budgetingMethod: Occurrences
        description: ""
        indicator:
          metricSource:
            kind: Agent
            name: prometheus-source
            project: default
          rawMetric:
            prometheus:
              promql: cpu_usage_user{cpu="cpu-total"}
        objectives:
        - displayName: Good
          op: lte
          tag: default.streaming-other-slo.100d000000
          target: 0.9
          value: 100
        - displayName: Poor
          op: lte
          tag: default.streaming-other-slo.200d000000
          target: 0.99
          value: 200
        service: webapp-service
        timeWindows:
        - count: 7
          isRolling: true
          period:
            begin: "2021-04-28T13:09:35Z"
            end: "2021-05-05T13:09:35Z"
          unit: Day
    ```

* It is possible to pass multiple names, space-separated:

    ```bash
    sloctl get slo streaming-other-slo streaming-latency-slo
    ```

### `help` (Start Screen)

```bash
sloctl
sloctl -h
sloctl --help
```

Use this tool to work with definitions of SLOs in YAML files. For a list of commands available for execution, see **Summary of** `sloctl` **Commands** above.

For each command, more detailed help is available: use `sloctl [command] --help` for more information about a command.

**Usage:**

```bash
sloctl [command] --help
```

**Flags:**

| Flag | Long Form | Description |
|---|---|---|
| `-h` | `--help` | Get help. |

**Global flags:**

| Flag | Long Form | Description |
|---|---|---|
| `-A` | `--all-projects`| Display the objects from all of the projects. |
|   | `--config` *string* | Specify the path to the config file (without this flag, sloctl checks in `%UserProfile%\.config\nobl9\config.toml` on Windows and `~/.config/nobl9/config.toml` on other operating systems). |
| `-c` | `--context` *string* | Override the default context for the duration of the command. |
| `-p` | `--project` *string* | Override the default project from the active context for the duration of the command. |

### `use-context`

You can define multiple contexts in `sloctl`, and the `use-context` command allows you to choose the default context. It is helpful if the user belongs to multiple organizations or wants to switch between different default projects.

Also see the [`add-context`](#add-context) command above.

**Usage:**

The `use-context` command sets the default context for `sloctl`.

```bash
  sloctl use-context [context-name] # non-interactive mode
  sloctl use-context # interactive mode
```

When `sloctl use-context` is used in interactive mode and some contexts are already defined, the user is asked to select a context from the list (by typing its name at the prompt):

```bash
sloctl use-context
    Select the default context from the existing contexts [prod, staging, dev]:
```

When no contexts have been defined yet, `sloctl` returns the following error:

```text
  Error: You don't have any contexts in the current configuration file.
  Add at least one context in the current configuration file and then set it as the default.
  Run 'sloctl add-context' or indicate the path to the file using flag '--config'.
```

**Flags:**

| Flag | Long Form | Description |
|---|---|---|
| `-h` | `--help` | Get help. |

**Global flags:**

| Flag | Long Form | Description |
|---|---|---|
| `-A` | `--all-projects`| Display the objects from all of the projects. |
|   | `--config` *string* | Specify the path to the config file (without this flag, sloctl checks in `%UserProfile%\.config\nobl9\config.toml` on Windows and `~/.config/nobl9/config.toml` on other operating systems). |
| `-c` | `--context` *string* | Override the default context for the duration of the command. |
| `-p` | `--project` *string* | Override the default project from the active context for the duration of the command. |

### `version`

The `version` command prints the installed version of `sloctl`.

Usage:

```bash
  sloctl version
```

The output includes the system architecture. For example:

`sloctl/0.0.50-HEAD-bc7ec082 (linux amd64 go1.16.3)`

## Common Errors/Warnings

The following are common errors/warnings that users may experience:

* When a user applies a default context that does not exist:

    ```text
    sloctl use-context asdasd

    Error: There is no such context: 'not-existing-context'.  Please enter the correct name.
    ```

* When a user wants to add a context that already exists:

    ```text
    sloctl add-context
    New context name: local

    Context 'local' is already in the configuration file.
    Do you want to overwrite it? [y/N]:
    ```

    If the user answers `n` (for _No_), the following message is shown:

    ```text
    Please try to add a new context with a different name.
    ```

* When a context is configured with incorrect credentials, as in:

    _(config.toml context)_

    ```yaml
    defaultContext = "local"

    [Contexts]
       [Contexts.local]
           clientId = "xyz"
           clientSecret = "xyz"
    ```

    and a user wants to invoke any command:

    ```text
    Error: error getting new access token from the customer identity provider: cannot access the token, customer identity provider replied with 401 {"errorCode":"invalid_client","errorSummary":"Invalid value for 'client_id' parameter.","errorLink":"invalid_client","errorId":"oaejFe6MwoIRo200IuIj7Hp1g","errorCauses":[]}
    ```

* When a user provides a path to an invalid file:

    ```text
    sloctl apply -f xyz.yaml

    Error: error while reading provided file: open xyz.yaml: no such file or directory
    ```

* When a user provides an invalid context name:

    ```text
    sloctl add-context
    New context name: ^

    Error: Enter a valid context name. Use letters, numbers, and `-` characters.
    ```

## Use Cases of SLO Configurations

For detailed examples of how to create SLOs for sample services using `sloctl`, refer to the [Getting Started Guide](https://docs.nobl9.com).

## Deprecated

With the 0.0.58 release, `kind: Integration` has been deprecated and `kind: AlertMethod` has been introduced instead.

During the transition period, users can still apply their YAML files that use `kind: Integration`. Nobl9 will no longer return it but will return an `AlertMethod` instead. The `sloctl get` command will not return any results for `integrations`.

## Useful Links

`sloctl` [Releases page](https://github.com/nobl9/sloctl/releases)
