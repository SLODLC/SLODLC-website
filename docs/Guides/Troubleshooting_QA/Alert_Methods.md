---
id: alert-methods
title: Alert Methods
sidebar_label: Alert Methods
sidebar_position: 1
toc_min_heading_level: 2
toc_max_heading_level: 5
description: Troubleshooting for N9 Alert Methods
keywords:
  - FAQ
  - Troubleshooting
  - Alert Methods
---

# Alert Methods



<details>
  <summary>

  #### How do I close an <code>Alert method</code>?
  </summary>
  <div>
      <ul>
        <li>We currently support closing an alert method for Pagerduty. You can find detailed instructions in the <a href="https://docs.nobl9.com/Alert_Methods/pagerduty/#sending-notification-for-a-resolved-alert-to-pagerduty" target=" blank"> Sending Notification for a Resolved Alert to PagerDuty | Nobl9 Documentation </a>. For other sources, alerts must be closed manually.</li>
      </ul>
  </div>
</details>

<hr/>

<details>
  <summary>

  #### How many custom <code>headers</code> can I include when adding a Webhook as an Alert Method??
  </summary>
  <div>
      <ul>
        <li>The max number of custom <code>headers</code> is 10.</li>
      </ul>
  </div>
</details>

<hr/>

<details>
  <summary>

  #### Is there a way to notify the project members based on their <code>alert preference</code> if there is a new SLO added or removed?
  </summary>
  <div>
      <ul>
        <li>No, not yet. This feature is on our roadmap.</li>
      </ul>
  </div>
</details>

<hr/>

<details>
  <summary>

  ####  How can I browse my fired Alerts?
  </summary>
  <div>
      <ul>
        <li>The only way to get the log of all fired alerts is through sloctl. To do that, use the <code>sloctl get alerts</code> command.</li>
      </ul>
  </div>
</details>