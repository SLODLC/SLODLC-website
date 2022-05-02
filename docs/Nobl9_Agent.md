---
id: the-nobl9-agent
title: The Nobl9 Agent
sidebar_label: The Nobl9 Agent
sidebar_position: 2
pagination_label: The Nobl9 Agent
toc_min_heading_level: 2
toc_max_heading_level: 5
description: Getting started with Nobl9 Agent
keywords:
  - agent
---
# The Nobl9 Agent

Nobl9 provides the ability to run an Agent to retrieve SLI metrics from configured data sources and send the data back to the Nobl9 backend. You can run the Agent in your Kubernetes cluster or as a Docker container.

The Agent is a lightweight application that executes the queries defined for your Nobl9 SLOs. Queries are written in the language supported by the data source in question and executed via native APIs. The interval at which the queries are executed varies by data source, but in most cases is one minute (refer to the [Sources](/Sources/Sources.md) section of the documentation for more details about the resolution of the queries).

The Agent then sends your SLI metrics back to Nobl9 for processing and error budget calculation.

## Why Use the Nobl9 Agent?

Nobl9 users can choose between a Direct or Agent configuration when connecting to a data source.

A Direct configuration requires users to enter their authentication credentials (API key, token, etc.). These values are encrypted and safely stored in Nobl9. With an Agent configuration, the user passes their credentials when launching the Agent, and those credentials are not stored in the Nobl9 backend.

A second difference with the Agent configuration is that users have access to the Agent's logs, which makes troubleshooting easier (see the [Troubleshooting](#troubleshooting) section below). For this reason, we recommend making your initial connection to a data source with an Agent configuration.

You can also use the Nobl9 Agent to collect and return data if your company's firewall blocks outbound connections. You will still need to open a port for the Nobl9 Agent to send data back to Nobl9, but it removes the need for the Nobl9 application to make direct calls to your environment.

## Getting Started with the Nobl9 Agent

### Requirements

You can deploy the Nobl9 Agent in any Kubernetes cluster or Docker environment.

:::note
A Docker environment on your local machine with proper firewall access is enough for testing purposes. However, we do not advise using it past the initial test, as the data flow will stop when your machine sleeps.
:::

Make sure that you are using the latest version of the Agent, so you have access to all the most recently introduced features. For details on the Agent releases, refer to the Agent Release Notes.

### Deploying the Nobl9 Agent

#### Deploying the Agent in Kubernetes

When you add a new data source, Nobl9 will automatically generate a Kubernetes configuration in YAML and a Docker command line for you:

* If you configure your Agent in the UI, these configurations will be generated for you immediately.

* If you create your Agent via YAML, you need to go to the **Integrations > Sources** tab and find the respective Agent configuration tabs under **Details**.

If you have a running Kubernetes cluster, you can copy and paste the generated YAML into your Kubernetes configuration to deploy the Nobl9 Agent in your cluster.

<img src="/img/k8s_config.png" title="Fig. 1: Kubernetes deployment command"></img>

Be sure to swap in your own credentials (e.g., `<API_TOKEN>`, `<CREDENTIALS_FILE>`); instructions in the UI will specify what credentials need to be passed, and these will differ depending on the data source.

#### Deploying the Agent in a Docker Container

When you add a new data source through the Nobl9 UI, a Docker command line will be generated automatically for you to use to deploy the Agent. The following is a generic example of what you will see in the UI:

Be sure to swap in your own credentials (e.g., `<API_TOKEN>`, `<CREDENTIALS_FILE>`); instructions in the UI will specify what credentials need to be passed.

<img src="/img/docker_config.png" title="Fig. 2: Docker invocation for Agent"></img>

#### Checking the Agent Connection in the UI

To verify that the Agent has successfully connected to Nobl9, check for a valid timestamp in the Last Connection field in the UI.

<img src="/img/agent_status.png" title="Fig. 3: Agent connection status in the UI" className="center"></img>

:::caution
Note that the Connected status does not indicate that the Agent is connected to the specified data source, only that it has successfully established a connection to the Nobl9 backend.
:::

#### Exposing the Agent to Metrics

To expose the Agent's internal metrics, you need to make the following changes in your Kubernetes cluster or Docker invocation:

* To deploy the Agent, add the environment variable `N9_METRICS_PORT`, specifying the port on which you would like to expose the metrics (e.g., `N9_METRICS_PORT=9876`). These metrics will then be available for scraping at `/metrics`.

* If you deploy the Agent behind a firewall, make any changes required to allow your metrics system to scrape that port.

* The Agent must be able to open connections to `https://app.nobl9.com/api/input` to send data to Nobl9.

## Troubleshooting

### Logging Mode Options

In the normal logging mode, the Nobl9 Agent only writes events at startup and when errors are encountered. If you have no SLOs, you will only see the startup events. If no errors are returned, this means you have successfully connected to Nobl9.

After adding your first SLO, you will only see a new log message if there is an error. In most cases, these logs can help you diagnose the issue. Note that problems are usually related to the firewall, authentication, or the query.

For debugging purposes, the Agent allows you to enable verbose logging. This means that all logs related to all operations that happen when you execute commands in the Agent will be displayed in the output. You can enable this option as follows:

* **Kubernetes**: If the Agent is already deployed in your Kubernetes cluster, add `args: ["--debug"]` to the YAML configuration file on the level of your container:

  ```yaml
  spec:
        containers:
          - name: agent-container
            image: nobl9/agent:latest
            resources:
              requests:
                memory: "350Mi"
                cpu: "0.1"
            // highlight-next-line
            args: ["--debug"]
  ```

* **Docker**: When you invoke the Agent with `docker run`, add `--debug` at the end of all the statements that are given in the UI:

  ```yaml
  docker run -d --restart on-failure \
    --name nobl9-agent-nobl9-dev-datadog-month-test \
    -e N9_CLIENT_ID="unique_client_id" \
    -e N9_CLIENT_SECRET="unique_client_secret" \
    -e DD_API_KEY="<DATADOG_API_KEY>" \
    -e DD_APPLICATION_KEY="<DATADOG_APPLICATION_KEY>" \
    // highlight-next-line
    telegraf --debug \
    nobl9/agent:latest
  ```

<!-- ### Adding New Users Authentication to Prometheus Agent

The Nobl9 Agent allows you to provide a partial config file for Telegraf, which is then merged with the connection parameters that the Agent downloads from Nobl9. This functionality works with Prometheus (and Cortex/Thanos) set up with a HTTP Basic Authentication.

Follow the steps below to add a user to your Prometheus Agent:

1. Create a config file called e.g. `n9agent.conf` and put into it the following `toml`:

  ```shell
  [n9prometheus]
    username = "REDACTED"
    password = "REDACTED"
  ```

  :::note
  The contents of this config file correspond with the `inputs` section of a standard `telegraf.conf` toml, and the `n9prometheus` input plugin support any of the configurations supported by the stock prometheus input plugin.
  :::

2. Expose that config file to your Kubernetes container.

  :::note
  If you are running the agent in Kubernetes, we recommend making that little file a Kubernetes secret and mounting that to the container (or otherwise, follow your standard method of managing files containing passwords).
  :::

3. Start the Agent with an additional environment variable `N9_LOCAL_CONFIG="/path/to/your/n9agent.conf"` pointing to the path of that config file in the container. -->

### Missing Data

If data appears to be missing, check whether your Agent is running. An Agent that runs on your desktop will stop running and sending data when your machine is sleeping.

### Data Backlog

Our users often ask how Nobl9 handles data backlog in various cases. Below, you can find several possible data backlog scenarios and solutions that will help you address them.

#### Backlogging impact on the Nobl9 Agent

Backlogging issue (for instance, network issues) differs between the data sources available through Nobl9. In general, if the Nobl9 Agent can't reach the N9 data intake, it caches using the FIFO (First In, First Out) method and retries to connect indefinitely.

If the connection outage lasts longer, it may exhaust the Agent's cache. It is also worth noting that the cache is user-configurable by how much memory is allocated to the container.

#### Data outage in the Data Source

If the data source is out, Nobl9 won't get data, which might impact your Error budget.

If the Agent keeps running, it will try to catch up after reconnecting (i.e., varying by data source). If the Agent restarts, then it's possible it would stop retrying.

Nobl9 integration mechanism that queries APIs or metrics systems is naturally susceptible to outages between the Agent and the metrics system or between the Agent and Nobl9. These outages may also include the outage of the metrics system itself.

:::tip
Remember that SLOs are always approximations of the SLI metric and are not ideal reflections of this metric.
:::

### Query Errors

Nobl9 is designed to accept single metric values back from queries. If you see a query error, check that what is being returned by that query is a single metric value.

:::note
Splunk queries may behave differently; see the [documentation](/Sources/Splunk.md) for more details).
:::
