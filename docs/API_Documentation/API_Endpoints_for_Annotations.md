---
id: api-endpoints-for-slo-annotations
title: API Endpoints for SLO Annotations
sidebar_label: API Endpoints for SLO Annotations
sidebar_position: 14
description: Details about API Endpoints for SLO Annotations
keywords:
  - API
  - Endpoints
---
# API Endpoints for SLO Annotations

Using Nobl9 REST API users can create new Annotations, fetch existing ones, or delete them.

Nobl9 API has been designed to make it convenient for admins to programmatically connect their tools (e.g. for CI/CD) to Nobl9 and automate annotating SLOs (for example, during deployments). It’s a standard REST API with `GET`, `POST`, `PUT`, and `DELETE` commands available for use.

## Common headers

|     Header      | Desription |
|-----------------|------------|
| `Accept`        | <ul><li>Nobl9 supports `application/json` with an optional variable version which, for the time being, can only take one value (`v1alpha`).</li>  <li>Nobl9 API does not support csv syntax. Passing (curl syntax) `-H 'Accept: application/json, application/xml'` will return the following error: `application/json, application/xml is interpreted as a single header value.` </li></ul>|
| `Organization`  | <ul><li>Your organization name.</li> <li>You can find the organization name under `/settings/account-settings` **> Personal Information.**</li></ul> |
| `Project`       | <ul><li>The name of the Project found in `/catalog/projects` or through the sloctl command `sloctl get projects`.</li> <li>In most instances, you can also provide a wildcard with `*`.</li> <li>`Project: *` acts similarly to the sloctl command `sloctl get ${resource_name} -A` that searches through all Projects.</li></ul>|
| `Authorization` | <ul><li>Takes the following syntax: `Bearer ${access_token}`</li> <li> Note that syntax differs for generating access token. See the [Generate Access Token](#generate-access-token) section below for more details.</li></ul> |

## Access Token

The Nobl9 API endpoint for SLO Annotations requires an access token. This enables you to secure your web server's URLs so that only you and Nobl9 have access to them. The access token consists of your Client ID and Client Secret (`base64enc(${clientId}:${clientSecret})`) that you can generate in the Nobl9 UI. For details on how to generate your credentials, go [here](http://docs.nobl9.com/sloctl-user-guide).

### Generate Access Token

 ```bash
 POST /api/accessToken
 ```

- Example request:

 ```bash
 curl -X POST https://app.nobl9.com/api/accessToken -H 'Accept: application/json; version=v1alpha' -H 'Organization: nobl9-dev' -H "Authorization: Basic ${encoded_access_keys}"
 ```

- Headers

  | Header          | Mandatory?                                                                   |
  |-----------------|------------------------------------------------------------------------------|
  | `Accept`        | No                                                                           |
  | `Authorization` | Yes.<br/> Use the following syntax:<br/> `Basic base64enc(${clientId}:${clientSecret}).`|
  | `Organization`  | Yes                                                                          |

  :::tip
  We recommend downloading your token once and reusing it in your CI/CD pipeline. Generating multiple tokens may exceed your rate limits. For more details, refer to the [Rate Limits](#annotations-quota-and-rate-limits) section.
  :::

## Annotations

### Get Annotations

Fetch Annotations that have the values specified in a request.

 ```bash
 GET /api/annotations
 ```

Example request:

  ```bash
  curl -X GET https://app.nobl9.com/api/annotations?from=2021-12-07T08:00:00Z&to=2021-12-08T13:00:00Z&name=my-annotation-1&name=my-annotation-2&slo=my-slo' -H 'Accept: application/json; version=v1alpha' -H 'Organization: nobl9-dev' -H 'Project: *' -H "Authorization: Bearer ${access_token}"
  ```

- Example response:

  ```json
  [
      {
          "name": "my-annotation-1",
          "project": "my-project-2",
          "slo": "my-slo",
          "description": "this is my first annotation",
          "startTime": "2021-12-08T12:20:00Z",
          "endTime": "2021-12-08T12:20:00Z",
          "status": {
              "updatedAt": "2021-12-09T16:36:35.298419Z"
          }
      },
      {
          "name": "my-annotation-1",
          "project": "my-project-2",
          "slo": "my-slo",
          "description": "this is my second annotation",
          "startTime": "2021-12-08T12:30:00Z",
          "endTime": "2021-12-08T12:30:00Z",
          "status": {
              "updatedAt": "2021-12-10T12:54:48.93971Z"
          }
      }
  ]
  ```

- Parameters:

  | Parameter   | Description|
  |-------------|------------|
  | `slo`       | The name of the SLO to which the annotations are attached.|
  | `name`      | <ul><li>The name of the annotation.</li> <li>You can provide multiple names.</li> <li>The query matches all the names, just as in the example above (`name=my-annotation-1&name=my-annotation-2`).</li></ul>|
  | `from`      | Start time of the Annotation period in RFC3339 format.|
  | `to`        | End time of the Annotation period in RFC3339 format.|

- Headers:

  | Header          | Mandatory? |
  |-----------------|------------|
  | `Accept`        | No         |
  | `Authorization` | Yes        |
  | `Organization`  | Yes        |
  | `Project`       | Yes        |

### Create Annotations

Create a new Annotation for an incident within one of your SLOs.

 ```bash
 POST /api/annotations
 ```

- Example request:

  ```bash
  curl -X POST https://app.nobl9.com/api/annotations -H 'Accept: application/json; version=v1alpha' -H 'Organization: my-org' -H "Authorization: Bearer ${access_token}" -d "@create.json"
  ```

- Example body:

  ```json
  {
      "name": "my-annotation",
      "project": "my-project",
      "slo": "my-slo",
      "description": "this is my annotation",
      "startTime": "2021-12-08T12:20:00Z",
      "endTime": "2021-12-08T12:20:00Z"
  }
  ```

- Parameters:

  | Parameter | Description |
  |---|---|
  | `slo` | The name of the SLO to which the annotations are attached. |
  | `project` | String, must conform to DNS (RFC 1123 format). |
  | `name` | <ul><li>The name of the annotation.</li> <li>You can provide multiple names.</li> <li>The query matches all the names, just as in the example above (`name=my-annotation-1&name=my-annotation-2`).</li></ul> |
  | `from` | Start time of the Annotation period in RFC3339 format. |
  | `to` | End time of the Annotation period in RFC3339 format. |

- Example response:

  ```json
  {
      "name": "my-annotation",
      "project": "my-project",
      "slo": "my-slo",
      "description": "this is my annotation",
      "startTime": "2021-12-08T12:20:00Z",
      "endTime": "2021-12-08T12:20:00Z",
      "status": {
          "updatedAt": "2021-12-09T16:36:35.298419Z"
      }
  }
  ```

- Headers:

  | Header          | Mandatory? |
  |-----------------|------------|
  | `Accept`        | No         |
  | `Authorization` | Yes        |
  | `Organization`  | Yes        |

### Update Annotations

You can update Annotations using a standard `PUT` request. This method will create a new annotation unless the annotation with the provided name (i.e. specified in the body of the JSON object) does not exist in the specified Project.

In addition, you must also provide all the remaining parameters even if you want to update just one of them (effectively, this command acts like a `REPLACE` command).

 ```bash
 PUT /api/annotations/{name}
 ```

- Example request:

  ```bash
  curl -X PUT https://app.nobl9.com/api/annotations/my-annotation -H 'Accept: application/json; version=v1alpha' -H 'Organization: my-org' -H "Authorization: Bearer ${access_token}"
  ```

- Example body:

  ```json
  {
      "project": "my-project",
      "slo": "my-slo",
      "description": "this is my annotation",
      "startTime": "2021-12-08T12:20:00Z",
      "endTime": "2021-12-08T12:20:00Z"
  }
  ```

- Parameters:

  | Object | Mandatory? | Description |
  |---|---|---|
  | `project` | Yes | String, must conform to DNS (RFC 1123 format). |
  | `slo` | Yes | The name of the SLO to which the Annotation is attached. |
  | `description` | Yes | String, can contain up to 1000 characters. |
  | `startTime` | Yes | Start time of the Annotation period in RFC3339 format. |
  | `endTime` | Yes | End time of the Annotation period in RFC3339 format. |

- Example response:

  ```json
  {
      "name": "my-annotation",
      "project": "my-project",
      "slo": "my-slo",
      "description": "this is my annotation",
      "startTime": "2021-12-08T12:20:00Z",
      "endTime": "2021-12-08T12:20:00Z",
      "status": {
          "updatedAt": "2021-12-09T16:36:35.298419Z"
      }
  }
  ```

- Headers:

  | Header          | Mandatory? |
  |-----------------|------------|
  | `Accept`        | No         |
  | `Authorization` | Yes        |
  | `Organization`  | Yes        |

### Remove Annotations

 ```bash
 DELETE /api/annotations/{name}
 ```

Example request:

  ```bash
  curl -X DELETE https://app.nobl9.com/api/annotations/my-annotation -H 'Accept: application/json; version=v1alpha' -H 'Organization: my-org' -H 'Project: my-project' -H "Authorization: Bearer ${access_token}"
  ```

- Headers:

  | Header        | Mandatory? |
  |---------------|------------|
  | `Accept`      | No         |
  | `Authorization`| Yes       |
  | `Organization`| Yes        |
  | `Project`     | Yes        |

## Annotations Quota and Rate Limits

A quota limits the number of Annotations - there is a limit of 100 000 annotations per organization.

All requests to the `endpoint https://app.nobl9.com/api/accessToken` are rate limited. An organization can make 10 requests per minute - 1 request per 6 seconds. The API returns the `429 HTTP` status code when this limit is exceeded.