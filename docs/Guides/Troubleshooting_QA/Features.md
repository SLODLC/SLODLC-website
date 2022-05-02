---
id: features
title: Features
sidebar_label: Features
sidebar_position: 1
toc_min_heading_level: 2
toc_max_heading_level: 5
description: Troubleshooting for N9 Features
keywords:
  - FAQ
  - Troubleshooting
  - Features
---

# Features

<h3> RBAC </h3>

<details>
  <summary>

  #### Why can’t some users in my organization <code>see SLOs</code> in my Projects?
  </summary>
  <div>
      <ul>
        <li>The default role for all new users in Nobl9 is Organization User (unless a different default role has been set for your organization). This means that if you create a new Project as an Organization Admin, users who reside in your organization will not see the Project in their Project list (<b>Catalog</b> > <b>Projects</b>) or any SLOs related to this Project. For more information, refer to the <a href="https://docs.nobl9.com/Features/RBAC/" target="blank"> Role-Based Access Control | Nobl9 Documentation</a>.</li>
      </ul>
  </div>
</details>

<hr/>

<details>
  <summary>

  #### How can I give my users access to the Project?
  </summary>
  <div>
      <ul>
        <li>There are two methods in which you can give your users access to the Project, and all resources that are related to it:
        <ul>
          <li><b>From the Organization level</b>: change the organization roles of the users to Organization Viewer. This way, they will be able to see all Projects (and their related resources) within your organization. Keep in mind that Organization viewers can’t create new Projects.</li>
          <li><b>From the Project level</b>: when you create a Project, assign users from <b>Settings</b> > <b>Users</b>. Add the project to the relevant users from the level of the Settings pane and assign appropriate project roles to them.</li>
          </ul>
          </li>
      </ul>
  </div>
</details>

<hr/>

<details>
  <summary>

  #### What should I put in the <code>name</code> when configuring an organization-level <code>RoleBinding</code> for a user in <code>sloctl</code>?
  </summary>
  <div>
      <ul>
        <li><code>name</code> field is a string that can contain at most 63 characters and only lowercase alphanumeric characters or <code>-</code>. It must start and end with an alphanumeric character.
        <ul>
        <li>If you create <code>RoleBinding</code> manually with <code>sloctl</code>, you can put any valid string for the <code>name</code>.</li>
       <li>The <code>name</code> must be unique within an Organization (for the Organization roles) or within a Project (for the Project roles).</li>
       <li><code>RoleBinding</code> created with <code>sloctl</code> can be edited in Nobl9 UI. If you create <code>project-owner-adam</code> with <code>sloctl</code>, this object is then available on the <b>Settings</b> > <b>Users</b> tab list. Then, you can edit <code>project-owner-adam</code> object on the <b>Users</b> list.</li>
       <li>If you configure a role in the UI first, it will generate a UUID for a name and you need to get the <code>rolebinding</code> through <code>sloctl</code>.</li>
      </ul>
      For more details on <code>RoleBinding</code>, refer to the <a href="https://docs.nobl9.com/Features/RBAC/role-binding-yaml/" target=" blank"> Role Binding - YAML | Nobl9 Documentation </a>.
      For more information on naming conventions, refer to the <a href="https://docs.nobl9.com/yaml-guide/" target=" blank"> YAML guide | Nobl9 Documentation </a>.
        </li>
      </ul>
  </div>
</details>

<h3> Reports </h3>

<details>
  <summary>

  #### My remaining error budget shows as <code>N/A on the report</code>. What does it mean?
  </summary>
  <div>
      <ul>
        <li>This means that there is no data for the current time window.</li>
      </ul>
  </div>
</details>
