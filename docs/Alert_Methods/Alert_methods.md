import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Alert Methods

When an incident is triggered, Nobl9 enables you to send an alert to a notification engine or tool (for example, PagerDuty). Nobl9 also supports integration with a web endpoint by using webhooks where you define the endpoint and parameters to pass.

Alerting on SLOs allows you to react immediately to incidents that matter from the perspective of the user experience of your Service (e.g., in terms of latency, errors, correctness, and other SLO-related concepts). Alerts improve the control of what’s going on in your system and enable you to do better-contributing factor analysis when something goes wrong.

Here are important things to keep in mind while setting up your Alerts:

* Both, our attention and energy are limited resources. SLO Alerts must correspond to real and urgent issues of your system.

* Keep in mind that to improve your monitoring, these Alerts have to be intentional (i.e., well-defined) and *need to evolve together with your system*.

## Alert Policy & Alert Method Lifecycle

### Cooldown period

With the release 1.25, users can configure **Cooldown period** for their Alert Policies. Follow [YAML Guide](YAML_Guide.md#alertpolicy) to see how to set up the cooldown period through YAML.

#### What is a Cooldown Period?

**Cooldown** is an interval measured from the last time stamp when all Alert Policy conditions were satisfied. When cool down conditions are satisfied (i.e. no Alert events are triggered during its defined duration), an Alert event is resolved.

The diagram below shows a simplified lifecycle of an Alert Policy with a defined cooldown period:

<img src="/img/Alerting_lifecycle2.png" title="Fig. 1: Alerting lifecycle"></img>

:::warning
Previous method of configuring the cooldown on AlertPolicy condition is now marked as deprecated. For more details, refer to [YAML Guide](YAML_Guide.md).
:::

### Configuring Cooldown Period in the UI

Refer to [Getting Started guide](Getting_Started.md#creating-alert-policies) for details.

## Alert Policy Statuses

When an alert policy is in `Triggered` state, no other new alert can be triggered unless the alert is resolved or canceled.

Alert Policy statuses adhere to the following criteria:

* An alert is resolved when any of the conditions stopped to be true *AND* the cooldown period expired from that time.

* An alert is canceled when Alert policy configuration has changed *OR* a new calendar window has started for the calendar aligned time window SLOs.

### Retrieving Triggered Alerts in `sloctl`

Using `sloctl`, you can retrieve information when an alert stopped to be valid. To do so, run the following command in `sloctl`:

```shell
sloctl get alert
```

<Tabs>
<TabItem value="code" label="unresolved Alert" default>

Here's an example of a triggered Alert that hasn't been resolved yet:

```yaml
apiVersion: n9/v1alpha
  kind: Alert
  metadata:
    name: 6fbc76bc-ff8a-40a2-8ac6-65d7d7a2686e
    project: alerting-test
  spec:
    alertPolicy:
      name: burn-rate-is-4x-immediately
      project: alerting-test
    service:
      name: triggering-alerts-service
      project: alerting-test
    severity: Medium
    slo:
      name: prometheus-rolling-timeslices-threshold
      project: alerting-test
    // highlight-next-line
    status: Triggered
    thresholdValue: 950
    triggeredClockTime: "2022-01-16T00:28:05Z"
```

</TabItem>
<TabItem value="example" label="resolved Alert">

Here's an example of a resolved Alert:

```yaml
  apiVersion: n9/v1alpha
  kind: Alert
  metadata:
    name: 6fbc76bc-ff8a-40a2-8ac6-65d7d7a2686e
    project: alerting-test
  spec:
    alertPolicy:
      name: burn-rate-is-4x-immediately
      project: alerting-test
    // highlight-next-line
    resolvedClockTime: "2022-01-18T12:59:07Z"
    service:
      name: triggering-alerts-service
      project: alerting-test
    severity: Medium
    slo:
      name: prometheus-rolling-timeslices-ratio
      project: alerting-test
    // highlight-next-line
    status: Resolved
    thresholdValue: 1
    triggeredClockTime: "2022-01-18T12:53:09Z"
```

</TabItem>
</Tabs>

## Labels and Alert Methods

### Adding Labels to Alert Methods

Users can add one or more labels to an alert policy, which will be sent along with the alert notification when the policy’s conditions are met.

## Other Relevant Resources

For useful tips on how to get started with your first Alert check [Your First Alert Policy!](https://www.nobl9.com/learn/alerts). Also see our [Tips and Tricks](https://www.nobl9.com/learn/tips).
