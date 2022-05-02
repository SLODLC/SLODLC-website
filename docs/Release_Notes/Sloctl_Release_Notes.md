---
id: sloctl-release-notes
title: sloctl Release Notes
sidebar_label: sloctl Release Notes
sidebar_position: 3
description: What are the newest features of sloctl?
keywords:
  - release
  - notes
  - sloctl
---
# `sloctl` Release notes

## January 31, 2022

:::note `sloctl` Changes (0.0.67)
  * *Added*: Support for Amazon Redshift as a metrics source.
  * *Fixed*: We fixed the issue with an incorrect version of `sloctl` displayed during the build time.
:::

## January 20, 2022

<details>
  <summary> <code>sloctl</code> Changes (0.0.63)</summary>
  <div>
    <div>
      <ul>
        <li><code>sloctl</code> will no longer return errors about deprecated features during its installation on Mac.</li>
      </ul>
    </div>
  </div>
</details>

## December 20, 2021

<details>
  <summary><code>sloctl</code> Changes (0.0.62) </summary>
  <div>
    <div>
      <ul>
        <li>Customers can add, remove and view annotations via <code>sloctl</code></li>
      </ul>
    </div>
  </div>
</details>

## November 18, 2021

<details>
  <summary><code>sloctl</code> changes (0.0.60)</summary>
  <div>
  <div><b><code>sloctl</code> changes (0.0.60)</b></div>
    <div>
      <ul>
        <li>Customers can export SLO Error Budget Status Report from <code>sloctl</code>.</li>
      </ul>
    </div>
  </div>
</details>

## October 28, 2021

<details>
  <summary><code>sloctl</code> Changes (0.0.59) </summary>
  <div>
  <div><b>Agent changes (0.33.0)</b></div>
    <div>
      <ul>
        <li><code>sloctl</code> CSV export: Customers can export the list of SLOs and their metadata from <code>sloctl</code> to a CSV file.</li>
      </ul>
    </div>
  </div>
</details>

## October 14, 2021

<details>
  <summary><code>sloctl</code> Changes (0.0.58)</summary>
  <div>
    <div>
      <ul>
        <li>Filtering SLOs and Services by labels in sloctl
            <ul>
                <li>This functionality allows the use of labels as filters when retrieving SLO and Service information.</li>
            </ul>
        </li>
        <li> Renaming <code>kind: Integration</code> to <code>kind: AlertMethod</code>.
            <ul>
                <li><code>kind: Integration</code> has been deprecated and <code>kind: AlertMethod</code> has been introduced instead. During the transition period Customers can still apply their YAML files that use kind Integration. Nobl9 will no longer return it, it will return AlertMethod instead.</li>
            </ul>
        </li>
      </ul>
    </div>
  </div>
</details>

## September 30, 2021

<details>
  <summary><code>sloctl</code> Changes (0.0.57)</summary>
    <div>
      <ul>
        <li>Minor updates related to the introduction of RBAC, no impact on the users.</li>
      </ul>
    </div>
</details>

## September 16, 2021

<details>
  <summary><code>sloctl</code> Changes (0.0.56)</summary>
    <div>
      <ul>
        <li>A new kind <code>Project</code> was added.</li>
        <li>Role-Based Access Control (RBAC):
            <ul>
                <li><i>Organization Admins</i> can manage users in their Organization, and <i>Project Owners</i> can manage users in their Projects through the sloctl application using <code>RoleBindings</code>.</li>
                <li>A single <code>RoleBinding</code> object allows defining the relation between one user and a single role.</li>
            </ul>
        </li>
      </ul>
    </div>
</details>

## June 28, 2021

<details>
  <summary><code>sloctl</code> Changes (0.0.53)</summary>
    <div>
      <ul>
        <li>Updated messaging: Status and error messages were updated for clarity and cohesiveness.</li>
      </ul>
    </div>
</details>

## May 25, 2021

<details>
  <summary><code>sloctl</code> Changes (0.0.51)</summary>
    <div>
      <ul>
        <li>Timestamp and data source flags were removed since both were not supported.</li>
      </ul>
    </div>
</details>
