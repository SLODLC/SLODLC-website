---
id: slos
title: SLOs
sidebar_label: SLOs
sidebar_position: 5
toc_min_heading_level: 2
toc_max_heading_level: 5
description: Troubleshooting for N9 SLOs
keywords:
  - FAQ
  - Troubleshooting
  - SLOs
---

# SLOs

<details>
  <summary>

  ####  How do I <code>copy an SLO</code>?
  </summary>
  <div>
      <ul>
        <li>You can use sloctl to retrieve the SLO definition and copy/paste it in YAML. For more information, refer to the <a href="https://docs.nobl9.com/sloctl-user-guide/" target=" blank"> Sloctl user guide | Nobl9 Documentation </a></li>
      </ul>
  </div>
</details>

<hr/>

<details>
  <summary>

  #### What is the <code>retention period</code> of data for Nobl9?
  </summary>
  <div>
      <ul>
        <li>For data retention, we store:</li>
        <ul>
        <li>Hydrogen customer metrics for 6 months</li>
        <li>Enterprise customer metrics for 2 years</li>
        </ul>
        <li>From a security perspective, we can share a detailed policy about deletion under NDA.</li>
      </ul>
  </div>
</details>

<hr/>

<details>
  <summary>

  #### If I <code>delete an SLO</code>, can I get it back?
  </summary>
  <div>
      <ul>
        <li>Unfortunately deletions are permanent and the SLO is removed from Nobl9.</li>
      </ul>
  </div>
</details>

<hr/>

<details>
  <summary>

  #### Why do I see <code>irrelevant data</code> for my SLOs?
  </summary>
  <div>
      <ul>
        <li>You may see the irrelevant, historical data for your SLO if you have deleted an SLO and created a new one using the same <b>Project</b>, <b>name</b>, and <b>objective</b> value. Then, the newly created SLO is measured from scratch. Until the data from the new SLO is collected, the service health dashboard shows the status of the deleted SLO.</li>
      </ul>
  </div>
</details>

<hr/>

<details>
  <summary>

  #### How long does it take for <code>metrics data</code> to get into Nobl9?
  </summary>
  <div>
      <ul>
        <li>Nobl9  starts to display a datapoint as soon as metrics data is received and processed. When Nobl9 starts gathering the metrics data, users can see the first data point on each graph in the grid view and in the details view.</li>
        <li>Note: It applies to the <b>Budget</b>, <b>SLI</b>, and <b>Burn rate</b> graphs.</li>
      </ul>
  </div>
</details>

<hr/>

<details>
  <summary>

  #### Is there a way to <code>sort the dashboard</code> or sort them by projects?
  </summary>
  <div>
      <ul>
        <li>In the grid view, you can use the <i>label</i> functionality to sort the page and tie different SLOs and projects together. From there, you can use the link that is created and bookmark it to always come back to that set of SLOs. For example, this link <a href="https://app.nobl9.com/slo?labels=slo_type%3Alatency" target="blank"> Nobl9</a> points back to all the SLOs in my instance with the label <i>latency</i>.</li>
      </ul>
  </div>
</details>

<hr/>

<details>
  <summary>

  #### Is there a way to create <code>separate Dashboards</code> for different projects?
  </summary>
  <div>
      <ul>
        <li>No, currently there is no way to create separate dashboards for different projects.</li>
      </ul>
  </div>
</details>

<hr/>

<details>
  <summary>

  #### Could I <code>associate an agent</code> to multiple projects?
  </summary>
  <div>
      <ul>
        <li>When an agent is created in a project, it can only have one project associated. However, when an SLO is created, it is possible to use the agent from any project.</li>
      </ul>
  </div>
</details>

<hr/>

<details>
  <summary>

  #### Is it possible to use the <code>same Client ID and Secret</code> for multiple agents?
  </summary>
  <div>
      <ul>
        <li>No, Client IDs and Secrets are different for each agent.</li>
      </ul>
  </div>
</details>

<hr/>

<details>
  <summary>

  #### Is there a <code>historical metrics import</code> or does it always starts from the creation time?
  </summary>
  <div>
      <ul>
        <li>This is currently a feature on our roadmap.</li>
      </ul>
  </div>
</details>

<hr/>

<details>
  <summary>

  #### Is it possible to <code>update an SLO</code> to move it to another Service or Project?
  </summary>
  <div>
      <ul>
        <li>Our objects are managed in a declarative manner, similar to Kubernetes. As such, making changes to certain specifications creates a new SLO-type object.</li>
        <ul>
        <li>If you update an SLO using the sloctl binary with its current YAML config and try to change the Project with the <code>sloctl apply</code> command, the SLO is then duplicated in another Project.</li>
        <li>You can use sloctl to move SLOs to another Service as long as they belong to the same Project.</li>
        </ul>
      </ul>
  </div>
</details>

<hr/>

<details>
  <summary>

  #### What happens when I edit an SLO?
  </summary>
  <div>
      <ul>
        <li>Note that editing an SLO and updating some of its settings, such as:</li>
        <ul>
        <li>Target</li>
        <li>Threshold</li>
        <li>Error budget calculation method</li>
        <li>Time window</li>
        </ul>
        <li>results in losing your historical metric data. Any changes in the above settings will reset the Error budget of your SLO and stop showing your SLO's error budget history.</li>
      </ul>
  </div>
</details>

<hr/>

<details>
  <summary>

  #### Is there a <code>sample query</code> for different SLOs?
  </summary>
  <div>
      <ul>
        <li>Sample queries can be found in the <a href="https://docs.nobl9.com/" target="blank">Nobl9 Documentation</a>. Go to the <b>Sources</b> tab, then select the proper data source. Sample queries can be found under <b>Creating SLO in the UI</b> heading. You can find the example in the <a href="https://docs.nobl9.com/Sources/elasticsearch/#creating-slos-in-the-ui" target="blank">Creating SLOs in the UI | Nobl9 Documentation </a>.</li>
      </ul>
  </div>
</details>

<hr/>

<details>
  <summary>

  #### I <code>stopped receiving data</code> for all SLOs. What can I do?
  </summary>
  <div>
      <ul>
        <li>At first, try to restart your agent. If this doesn’t work, contact our <a href="https://www.nobl9.com/contact/support" target="blank"> support team</a>.</li>
      </ul>
  </div>
</details>

<hr/>

<details>
  <summary>

  #### Can I <code>limit the number of SLOs</code> per project or by a Team or a User?
  </summary>
  <div>
      <ul>
        <li>No, you can only limit users based on roles right now. For more information, refer to the <a href="https://docs.nobl9.com/Features/RBAC/" target="blank"> Role-Based Access Control | Nobl9 Documentation</a>.</li>
      </ul>
  </div>
</details>

<hr/>

<details>
  <summary>

  #### How do I share a <code>link to an SLO</code>?
  </summary>
  <div>
      <ul>
        <li>Go to the <b>Service Level Objective</b> page and click the particular SLO to get the details. Then, you get a deep link that can be shared. A deep link is the URL in your browser. Currently, this feature is available on:</li>
        <ul>
        <li>Grid view</li>
        <li>SLO details</li>
        <li>Reports</li>
        </ul>
      </ul>
  </div>
</details>

<hr/>

<details>
  <summary>

  #### Why are error budgets <code>measured in minutes</code>?
  </summary>
  <div>
      <ul>
        <li>Error budgets are measured in a percentage but we additionally display them as a time to make it easier to understand. For example, <i>33% of a 0.1% error allowance over 28 days remaining</i> can be more difficult to rationalize whereas <i>We could sustain 15 minutes of complete downtime</i> is easier to understand at a glance.</li>
      </ul>
  </div>
</details>

<hr/>

<details>
  <summary>

  #### Why are burn rates <code>measured in 1x, 2x, 3x</code>, and such?
  </summary>
  <div>
      <ul>
        <li>Our burn rates are measured in a standard way:</li>
        <ul>
        <li>A 1x burn means you would burn through your budget over your time window. </li>
        <li>Below 1x over an entire time window means you would have a budget remaining.</li>
        <li>Above 1x over an entire time window means you would exceed your budget.</li>
        </ul>
      </ul>
  </div>
</details>