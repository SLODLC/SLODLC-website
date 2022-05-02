---
id: application-release-notes
title: Application Release Notes
sidebar_position: 1
pagination_label: Application Release Notes
custom_edit_url:
description: How do I find you when I cannot solve this problem
keywords:
  - release
  - notes
---

# Application Release Notes

## March 24, 2022

:::note Application Changes (1.28)
**IMPROVEMENTS**

* Fixed issues with rendering graphs on the Grid View
* Multiple minor fixes and improvements


:::


## March 08, 2022

<details>
    <summary>Version 1.27</summary>
    <div>
        <div><b>IMPROVEMENTS</b></div>
        <div>
        <ul>
        <li>Updated Alert Policy Details UI</li>
            <ul>
                <li>SLO Details moved to the right panel to enable larger screen space to display graphs.</li>
            </ul>
        <li>Displaying a datapoint as soon as it is available</li>
            <ul>
                <li>In the Grid View, users will see the first data point readily once it is available on each graph.</li>
            </ul>
        </ul>
        </div>
        <br/>
    </div>
</details>

## February 14, 2022

<details>
    <summary>Version 1.26</summary>
    <div>
        <div><b>IMPROVEMENTS</b></div>
        <div>
        <ul>
        <li>Amazon Redshift</li>
            <ul>
                <li>Users can add their Amazon Redshift source using Direct method.</li>
            </ul>
        <li>Service Health Dashboard</li>
            <ul>
                <li>Reduced the whitespace and compressed the view for a better experience with a smaller number of services.</li>
            </ul>
                <li> Minor UI improvements: </li>
                <ul>
                    <li> Caption updates. </li>
                    <li> Tooltips that explain different Error budget statuses. </li>
            </ul>
        <li> SLO Details panel </li>
            <ul>
            <li>SLO Details moved to the right panel to enable larger screen space to display graphs.</li>
            </ul>
        </ul>
        </div>
        <br/>
    </div>
</details>

## January 31, 2022

<details>
    <summary>Version 1.25</summary>
    <div>
        <div><b>HEADLINES</b></div>
        <div>
            <ul>
                <li>Amazon Redshift
                    <ul>
                        <li>Customers can add Amazon Redshift as a data source from the Nobl9 UI and set SLOs based on its metrics.</li>
                    </ul>
                </li>
                <li> “All clear” notification to Pager Duty</li>
                    <ul>
                        <li> Customers can send an “All Clear” notification to their Pagerduty.</li>
                        <li>“All clear” is sent when alert conditions are no longer satisfied, and when the alert event is resolved.</li>
                    </ul>
                <li>Quota per users in a single organization</li>
                    <ul>
                        <li>Quota limits were added to Users to protect customers from accidentally exceeding their resource limitations.</li>
                        <li>When you exceed the available quota limit, you can request an upgrade by contacting support@nobl9.com.</li>
                        <li>Most customers won’t be affected by this change.</li>
                    </ul>
            </ul>
        </div>
        <div><b>IMPROVEMENTS</b></div>
        <div>
        <ul>
        <li>Data sources list</li>
            <ul>
                <li>Data Source wizard was updated to show the logo of the Data Source and its name on the list.</li>
            </ul>
        <li>Digits presentation</li>
            <ul>
                <li>The number of digits shown before converting to the scientific notation was increased from 7 to 9.</li>
            </ul>
        </ul>
        </div>
        <br/>
    </div>
</details>

## January 20, 2022

<details>
    <summary>Version 1.24</summary>
    <div>
        <div><b>IMPROVEMENTS</b></div>
        <div>
            <ul>
                <li> SLI Ratio metric graphs
                    <ul>
                        <li>SLI graphs show the difference in value between Good and Total metric as delta.
                            metrics.</li>
                    </ul>
                </li>
                <li>Service Health Dashboard
                    <ul>
                        <li>If available, project display names are shown instead of Kubernetes names.</li>
                    </ul>
                <li>Other bug fixes and minor UI improvements.</li>
                </li>
            </ul>
        </div>
        <br />
    </div>
</details>

## December 20 2021

<details>
    <summary>Version 1.23</summary>
    <div>
        <div><b>HEADLINES</b></div>
        <div>
            <ul>
                <li>Annotations
                    <ul>
                        <li>Customers can add notes to their SLOs charts to keep track of the events that affected their
                            metrics.</li>
                        <li>Annotations can be added via the UI, Sloctl or through the Annotations API.</li>
                    </ul>
                </li>
            </ul>
        </div>
        <div><b>IMPROVEMENTS</b></div>
        <div>
            <ul>
                <li>Bug fixes and minor UI improvements.</li>
            </ul>
        </div>
        <br />
    </div>
</details>

## December 9, 2021

<details>
    <summary>Version 1.22</summary>
    <div>
        <div><b>HEADLINES</b></div>
        <div>
            <ul>
                <li>Resource summary report updated
                    <ul>
                        <li>We extended the Report to summarize the number of SLOs used in an organization.</li>
                    </ul>
                </li>
                <li>In-app help panels
                    <ul>
                        <li>We updated help panels were to display more relevant information when editing resources.
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div><b>IMPROVEMENTS</b></div>
        <div>
            <ul>
                <li>In the SLO Grid View, Details, and Reports, SLOs objectives are sorted by a magnitude—from smallest
                    to largest. </li>
            </ul>
            <ul>
                <li>Bug fixes and minor UI improvements.</li>
            </ul>
        </div>
        <br />
    </div>
</details>

## November 18, 2021

<details>
    <summary>Version 1.21</summary>
    <div>
        <div><b>HEADLINES</b></div>
        <div>
            <ul>
                <li>Amazon Managed Service for Prometheus</li>
                <li>
                    <ul>
                        <li>Customers can add AWS Prometheus as a data source from the Nobl9 UI and set SLOs based on its
                            metrics.</li>
                    </ul>
                </li>
                <li>Pingdom
                    <ul>
                        <li>Customers can add Pingdom as a data source from the Nobl9 UI and set SLOs based on its
                            metrics.</li>
                    </ul>
                </li>
                <li>Support for multiple metric queries in Amazon CloudWatch.
                    <ul>
                        <li>Customers can use JSON queries to fetch arrays of CloudWatch metrics and use math operations
                            to create new time series.</li>
                        <li>For example, they can subtract the sum of 4xx or 5xx errors from total requests to get the
                            number of good requests.</li>
                        <li>For more details, refer to Using metric math.</li>
                    </ul>
                </li>
            </ul>
        </div>
        <div><b>IMPROVEMENTS</b></div>
        <div>
            <ul>
                <li>In the SLO Grid View, Details, and Reports, SLOs objectives are sorted by a magnitude—from smallest
                    to largest. </li>
            </ul>
            <ul>
                <li>The font in the entire platform has been updated to Mulish.</li>
            </ul>
        </div>
        <br />
    </div>
</details>

## November 8, 2021

<details>
    <summary>Version 1.20</summary>
    <div>
        <div><b>HEADLINES</b></div>
        <div>
            <ul>
                <li>SLO Error Budget Status report</li>
                <li>
                    <ul>
                        <li>Customers can export the Error Budget Status report to a CSV file.</li>
                    </ul>
                </li>
                <li>Welcome screen
                    <ul>
                        <li>Newly onboarded users will be presented with a Welcome screen that displays links to useful
                            guides. They explain how new users can set up their first SLOs, and find their way in the
                            Nobl9 platform.</li>
                    </ul>
                </li>
                <li> <i>Integrations User</i> role
                    <ul>
                        <li>We extended the list of RBAC project roles with an <i>Integrations User</i> role. Users with
                            this role can take Data Sources and Alert Methods from Projects in which they are assigned
                            as <i>Integrations Users</i> and use them in Projects that they own. At the same time, they
                            won't be able to edit or delete these resources.</li>
                        <li>This solution gives <i>Project Owners</i> strict control over who can use Data Sources and
                            Alert Methods.</li>
                        <li>Since <i>Integrations User</i> is a new role, this update won't affect existing customers.
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div><b>IMPROVEMENTS</b></div>
        <div>
            <ul>
                <li>In the SLO Grid View, Details, and Reports, SLOs objectives are sorted by a magnitude—from smallest
                    to largest. </li>
            </ul>
            <ul>
                <li>The font in the entire platform has been updated to Mulish.</li>
            </ul>
        </div>
        <br />
    </div>
</details>

## October 28, 2021

<details>
    <summary>Version 1.19</summary>
    <div>
        <div><b>HEADLINES</b></div>
        <div>
            <ul>
                <li>Additions to labels</li>
                <li>
                    <ul>
                        <li>Customers can add labels to <b>Alert Policies</b> They are visible in the <b>Alert Policies</b>
                            details and the Alert Policies list.</li>
                        <li>Customers can add labels to <b>Alert Notifications</b> in all supported <b>Alert Methods</b>.
                        </li>
                        <li>SLO Grid shows a list of labels that were added to each service. Customers can also remove
                            labels from this view. </li>
                    </ul>
                </li>
                <li>Drag-to-zoom on charts in the SLO Details
                    <ul>
                        <li>Customers can drag to select a specific period in the <b>SLO Details</b> charts and zoom it
                            to see the detailed information.</li>
                    </ul>
                </li>
                <li>Thousand Eyes
                    <ul>
                        <li>ThousandEyes Integration supports additional metric types:
                            <ul>
                                <li>Network Loss</li>
                                <li>Page Load</li>
                                <li>DOM Load Time</li>
                                <li>HTTP Server Response</li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li>Error Budget Status Report</li>
                <li>
                    <ul>
                        <li>Customers can see a combined summary of their SLOs and Error Budget Status using the Error
                            Budget Status Report.</li>
                    </ul>
                </li>
            </ul>
        </div>
        <div><b>IMPROVEMENTS</b></div>
        <div>
            <ul>
                <li>Resource Summary Report is available only for Organization Admins.</li>
                <li>Slack Alerts were updated with a more user-friendly format.</li>
                <li>User ID is now visible in the UI (<b>Settings > Account</b> and <b>Settings > Users</b>) to enable
                    user management via <code>sloctl</code>.</li>
            </ul>
        </div>
        <br />
    </div>
</details>

## October 14, 2021

<details>
    <summary>Version 1.18</summary>
    <div>
        <div><b>HEADLINES</b></div>
        <div>
            <ul>
                <li>Account Settings page updates</li>
                <li>
                    <ul>
                        <li>Customers can now change their first and last name and update their password.</li>
                        <li>The page also displays the current pricing tier information where applicable.</li>
                    </ul>
                </li>
                <li>Audit log MVP
                    <ul>
                        <li>Nobl9 now logs all operations executed by the users, both through UI and Sloctl. Clients
                            interested in reviewing the logs can reach out to Nobl9 support to request them.</li>
                    </ul>
                </li>
                <li> Labels additions
                    <ul>
                        <li>The services list in the <b>Catalog</b> can display a list of labels that each service is
                            tagged with. Customers can also remove labels from services using this view.</li>
                        <li>Grid view Labels and Project filters are now persisted as part of the Grid view deep link.
                            Customers can copy or bookmark their Grid view URL to save their filtered view for later
                            use.</li>
                        <li>Customers can use Labels to filter their reports. Reports header was extended to list out
                            the filters that were applied.</li>
                    </ul>
                </li>
            </ul>
        </div>
        <div><b>IMPROVEMENTS</b></div>
        <div>
            <ul>
                <li>Splunk Core does not require a “search” keyword in queries. It enables customers to copy their
                    existing Splunk queries directly to Nobl9.</li>
            </ul>
            <ul>
                <li>YAML update.
                    <ul>
                        <li><code>kind: Integration</code> was updated to <code>kind: AlertMethod</code>. This change
                            was done to maintain consistency between Nobl9 UI and YAMLs.</li>
                    </ul>
                </li>
                <li>RBAC Improvements
                    <ul>
                        <li>Organization-level roles cannot be removed from the User.</li>
                        <li>Nobl9 doesn't allow the removal of the last Admin from an organization to prevent issues
                            stemming from having an organization without an <i>Admin</i></li>
                    </ul>
                </li>
            </ul>
        </div>
        <br />
    </div>
</details>

## September 30, 2021

<details>
    <summary>Version 1.17</summary>
    <div>
        <div><b>HEADLINES</b></div>
        <div>
            <ul>
                <li>Cloudwatch Support</li>
                <li>
                    <ul>
                        <li>Customers can add Cloudwatch as a data source from the Nobl9 UI and set SLOs based on its
                            metrics.</li>
                    </ul>
                </li>
                <li>Grafana Loki support
                    <ul>
                        <li>Customers can add Grafana Loki as a data source from the Nobl9 UI and set SLOs based on its
                            metrics.</li>
                        <li>This integration supports the Agent connection method.</li>
                    </ul>
                </li>
                <li> Email alerts
                    <ul>
                        <li>Customers can now be notified via email when an alert is triggered.</li>
                    </ul>
                </li>
                <li> Microsoft Teams alerts
                    <ul>
                        <li>The visibility of Nobl9 resources within an organization has been further limited and
                            depends on the role & permissions of a user.</li>
                        <li>Customers who log into Nobl9 through Single Sign-on by default will be assigned the
                            <i>Organizational User</i> role.</li>
                    </ul>
                </li>
                <li> RBAC - restrict the ability to view resources
                    <ul>
                        <li>Customers can now be notified on the Microsoft Teams channel when an alert is triggered.
                        </li>
                    </ul>
                </li>
                <li> Navigation - New Catalog menu
                    <ul>
                        <li>Projects and services, which are used to organize other resources, are now grouped under the
                            <b>Catalog</b> tab in the UI.
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div><b>IMPROVEMENTS</b></div>
        <div>
            <ul>
                <li>Invite users to organization
                    <ul>
                        <li>While creating a new user, <b>Admins</b> can now set the user's organization role before
                            sending the invitation.</li>
                    </ul>
                </li>
            </ul>
            <ul>
                <li>Display personal information
                    <ul>
                        <li>Customers can view their personal information in the <b>Settings > Account</b> tab.</li>
                    </ul>
                </li>
                <li>Project Details panel improvements
                    <ul>
                        <li>Customers can edit and delete resources that belong to a given project directly from the
                            project's <b>Details</b> panel</li>
                        <li>Customers can view the list of all users belonging to their project(s) in the Project's
                            <b>Details > Users</b> tab.</li>
                        <li><i>Project Owners</i> and <i>Admins</i> can also remove users from projects in the
                            <b>Details</b> tab.</li>
                    </ul>
                </li>
            </ul>
        </div>
        <br />
    </div>
</details>

## September 16, 2021

<details>
    <summary>Version 1.16</summary>
    <div>
        <div><b>HEADLINES</b></div>
        <div>
            <ul>
                <li>Role-Based Access Control (RBAC)</li>
                <li>
                    <ul>
                        <li> Nobl9 enables granular user permissions and access to the platform's resources.</li>
                        <li> Customers can manage permissions on two levels: (1) the Organization level and (2) the Project
                            level.
                            <ul>
                                <li>The Organization roles enable access across the Nobl9 platform. For each Organization,
                                    users can be assigned as an <i>Admin</i>, <i>User</i>, or <i>Organization Viewer</i>
                                </li>
                                <li>The Project roles enable customers to access a Project and its underlying resources,
                                    such as services or SLOs. For each project, customers can be assigned as an
                                    <i>Owner</i>, <i>Editor</i>, or <i>Viewer</i>.</li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li>Suspend/delete user's account
                    <ul>
                        <li>Organization Admins can now suspend and delete the accounts of users in their Organization
                            without the need to contact Nobl9 Support.</li>
                    </ul>
                </li>
                <li> Access Keys management
                    <ul>
                        <li>Customers can view their sloctl Access Keys in the <b>Settings > Access Keys</b> tab. They
                            can delete, deactivate (and activate) their keys. </li>
                        <li>The maximum number of access keys per single customer in an organization is 2. We did not
                            remove existing Access Keys, even if a customer exceeded this limit. However, to create a
                            new Access Key, the users must remove the Access Keys that exceed this limit.</li>
                    </ul>
                </li>
                <li> Projects as standalone objects
                    <ul>
                        <li>Projects, previously used as metadata of resources (e.g., services or SLOs), are now
                            standalone objects. Customers can use Projects to group resources and organize their
                            Organization by teams or functional areas.</li>
                        <li>With the introduction of RBAC, when a user creates a new Project, they are automatically
                            assigned to it as a <i>Project Owner</i>.</li>
                    </ul>
                </li>
            </ul>
        </div>
        <div><b>IMPROVEMENTS</b></div>
        <div>
            <ul>
                <li>Invite users to organization
                    <ul>
                        <li>While creating a new user, <i>Admins</i> can now set the user's organization role before
                            sending the invitation.</li>
                    </ul>
                </li>
            </ul>
            <ul>
                <li>Display personal information
                    <ul>
                        <li>Customers can view their personal information in the <b>Settings > Account</b> tab.</li>
                    </ul>
                </li>
                <li>Project Details panel improvements
                    <ul>
                        <li>Customers can edit and delete resources that belong to a given project directly from the
                            project's <b>Details</b> panel.</li>
                        <li>Customers can view the list of all users belonging to their project(s) in the Project's
                            <b>Details > Users</b> tab.</li>
                        <li><i>Project Owners</i> and <i>Admins</i> can also remove users from projects in the
                            <b>Details</b> tab.</li>
                    </ul>
                </li>
            </ul>
        </div>
        <br />
    </div>
</details>

## September 2, 2021

<details>
    <summary>Version 1.15</summary>
    <div>
        <div><b>HEADLINES</b></div>
        <div>
            <ul>
                <li>Signalflow API support for Splunk Observability</li>
                <li>
                    <ul>
                        <li> Signalflow API and syntax are now supported in SLOs created using a Splunk Observability
                            metrics source.</li>
                        <li> This solution replaced the support of <code>/timeserieswindow</code> API</li>
                    </ul>
                </li>
            </ul>
        </div>
        <div><b>IMPROVEMENTS</b></div>
        <div>
            <ul>
                <li>SLO Grid deeplink
                    <ul>
                        <li>The information about both a selected SLO and an active search phrase is now included in the
                            URL. Users can share the URL with others to direct them to a specific SLO on the Grid view.
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <br />
    </div>
</details>

## September 2, 2021

<details>
    <summary>Version 1.14</summary>
    <div>
        <div><b>HEADLINES</b></div>
        <div>
            <ul>
                <li>Labels support</li>
                <li>
                    <ul>
                        <li> Customers can tag their SLOs and Services with labels consisting of a <code>Key:Value</code>
                            pair.</li>
                        <li> Customers can filter their SLOs on the Grid view. The Grid view is filtered by selecting a
                            specific project or choosing one or more labels.</li>
                        <li>SLO Details view displays a list of labels added to the SLO.</li>
                    </ul>
                </li>
            </ul>
        </div>
        <div><b>IMPROVEMENTS</b></div>
        <div>
            <ul>
                <li>Added metrics sources
                    <ul>
                        <li>Splunk Core Direct support:Customers can integrate with Splunk Core without the need to set
                            up an Agent.</li>
                    </ul>
                </li>
            </ul>
        </div>
        <br />
        <div><b>BUGS</b></div>
        <div>
            <ul>
                <li>Fixed charts displaying incorrect data after changing the time window</li>
                <li>Improved messaging on Grid view when there isn't much data.</li>
                <li>Added SLO objective label names in SLO details.</li>
            </ul>
        </div>
        <br />
        <div><b>MINOR UI TWEAKS</b></div>
        <div>
            <ul>
                <li>Updates to the naming of table headers.</li>
                <li>Removed the unused/disabled buttons.</li>
                <li>Updates to the Service Health dashboard.</li>
            </ul>
        </div>
        <br />
    </div>
</details>
