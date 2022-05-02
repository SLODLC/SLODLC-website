---
id: sources
title: Sources
sidebar_label: Sources
sidebar_position: 5
toc_min_heading_level: 2
toc_max_heading_level: 5
description: Troubleshooting for N9 Sources
keywords:
  - FAQ
  - Troubleshooting
  - Sources
---

# Sources


<details>
  <summary>

  #### Is <code>SSO login</code> available for Hydrogen customers?
  </summary>
  <div>
      <ul>
        <li>No, SSO login is not enabled for Hydrogen customers. SSO login is an enterprise feature.</li>
      </ul>
  </div>
</details>

<hr/>

<details>
  <summary>

  #### Which <code> SSO integrations</code> are available with Nobl9?
  </summary>
  <div>
      <ul>
        <li>The following integrations are supported:
      <ul>
        <li>Azure</li>
        <li>Google</li>
        <li>Okta org to org</li>
        </ul>
      </li>
      </ul>
  </div>
</details>

<hr/>

<details>
  <summary>

  #### What permission is needed to request <code>Dynatrace integration</code>?
  </summary>
  <div>
      <ul>
        <li>To connect the Nobl9 agent to Dynatrace, you need an access token with metrics.read scope enabled. You can find more details about Dynatrace integration in the <a href="https://www.dynatrace.com/news/blog/measure-slos-with-nobl9-and-dynatrace/" target="blank"> Measure SLOs with Nobl9 and Dynatrace | Dynatrace Resources.</a></li>
      </ul>
  </div>
</details>

<hr/>

<details>
  <summary>

  #### I get an error after setting up integration with Splunk Observability.
  </summary>
  <div>
  <ul>
        <li>There are the two following workarounds to solve the issue:</li>
  </ul>
        <ol type="1">
          <li>Open the incognito mode on your browser and set up the integration again.</li>
          <li>Clear Nobl9 cache on your browser and set up the integration again.</li>
        </ol>
  </div>
</details>

<hr/>

<details>
  <summary>

  #### Are there any plans to expand the list of <code>data sources</code> Nobl9 is supporting?
  </summary>
  <div>
      <ul>
        <li>If there are data sources that are missing, log a suggestion using our <a href="https://www.nobl9.com/contact/support" target="blank">contact form</a> and we'll take a look.</li>
      </ul>
  </div>
</details>

<hr/>

<details>
  <summary>

  #### I receive no data from my <code>data source</code>. How is that treated by Nobl9?
  </summary>
  <div>
      <ul>
        <li>When there is no data, no results get produced. Currently, customers are not notified when the data inflow is stopped.</li>
        <li>Depending on the budgeting method, no data is treated differently:</li>
        <ul>
        <li><b>Occurrences method</b> - no data means that there were no good and no total events, which in turn doesn’t impact the ratio of good to total events.</li>
        <li><b>Timeslices method</b> - minutes without any data are counted as good minutes.</li>
        </ul>
      </ul>
  </div>
</details>