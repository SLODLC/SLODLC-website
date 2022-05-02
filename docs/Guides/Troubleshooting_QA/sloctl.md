---
id: sloctl
title: sloctl
sidebar_label: sloctl
sidebar_position: 4
toc_min_heading_level: 2
toc_max_heading_level: 5
description: Troubleshooting for sloctl
keywords:
  - FAQ
  - Troubleshooting
  - sloctl
---
import Tabcode from '/src/components/Tabcode.js';

# `sloctl`

<details>
  <summary>

  #### Is there a way to retrieve all my SLOs, alert policies, alerts, and other data from Nobl9?
  </summary>
  <div>
      <ul>
        <li>Yes, you can export all the data from our application by using the following script: </li>
      </ul>

    for obj in agents alertmethods alertpolicies alerts annotations dataexports directs projects rolebindings services slos
    do
      sloctl get -A $obj > $obj.yaml
    done

  </div>
</details>

<hr/>

<details>
  <summary>

  #### Is there a way to set up and use a <code>data export</code> using the sloctl command?
  </summary>
  <div>
      <ul>
        <li>Yes, you can find the detailed explanation in the <a href="https://docs.nobl9.com/yaml-guide/#dataexport" target=" blank"> YAML Guide | Nobl9 Documentation </a>.</li>
      </ul>
  </div>
</details>