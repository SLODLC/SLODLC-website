---
id: slo-annotations
title: SLO Annotations
sidebar_label: SLO Annotations
sidebar_position: 1
pagination_label: SLO Annotations
description: Overview of SLO Annotations functionality in Nobl9
keywords:
  - annotations
  - SLOs
---
# SLO Annotations

The SLO Annotations service enables Nobl9 users to add notes to their metrics which can be displayed in charts, annotation lists, and reports.

When Nobl9 users experience an incident related to their services, it can be helpful for them to add a note about what happened and have that live alongside their metrics. This information is important to review when performing historical analyses of product reliability. Users can also add annotations about upcoming events, such as a deployment or other planned downtime.

Annotations can be added [using the Nobl9 UI](Managing_Annotations_in_the_UI.md) or `sloctl`.

## About Annotations

The Nobl9 SLO Annotations service adheres to the following criteria:

* Annotations are stored and available for one year.
* The maximum number of characters per annotation is 1000.

## Adding Annotations in the UI

Refer to the [Adding Annotations in the UI](Managing_Annotations_in_the_UI.md) section for detailed instructions.

## Applying Annotations in `sloctl`

Users can add or update annotations using the `sloctl apply -f {yamlFile}` command.

The following YAML example shows how to add an annotation to your SLO:

```yaml
apiVersion: n9/v1alpha
kind: Annotation
metadata:
  name: annotation-name
  project: default
spec:
  slo: test-slo
  description: test annotation description
  startTime: 2021-11-02T17:10:05Z
  endTime: 2021-11-22T17:15:05Z
```

**Important Notes:**

* The `metadata.name` field contains a unique annotation name, required for distinguishing project annotations.

* The available YAML file `spec` fields (all mandatory) are:

  * `slo` - The name of the SLO the annotation applies to.

  * `description` - A string (plain text) describing the annotation. The maximum number of characters is 1000.

  * `startTime`, `endTime`\- These fields define the date-time point where the annotation will be placed in the graph. The values must be in the `YYYY-MM-DDTh:mm:ssZ` format that complies with [ISO8601](https://en.wikipedia.org/wiki/ISO_8601). If `startTime` == `endTime` , the annotation will be placed at a single time point.

:::note
By default, `sloctl` always returns time in UTC. You can adjust this for your time zone by replacing the `Z` (for Zulu; a shorthand for UTC) with the offset from UTC, prefaced with either `+` or `-`. For instance, to have sloctl return times adjusted for Eastern Standard Time you would use `startTime: 2021-11-02T17:10:05-05:00`.
:::

## Deleting Annotations in `sloctl`

To delete an annotation, run the following command: `sloctl delete -f {yamlFile}`.

Using Annotations in `sloctl`

The following `sloctl` commands are available for users in the SLO Annotations service:

* `sloctl get annotations` - Get a list of all project annotations. You can change the project by using the `-p {projectName}` parameter.

* `sloctl get annotations {annotationName}` - Get a single annotation.

* `sloctl delete annotation {annotationName}` - Delete a single annotation.

## Validation Errors

Possible errors:

* If the specified SLO does not exist, as in this example:

    ```yaml
    apiVersion: n9/v1alpha
    kind: Annotation
    metadata:
      name: annotation-name
      project: my-project
    spec:
      slo: bad-slo-name
      description: test annotation description
      startTime: 2006-01-02T17:10:05Z
      endTime: 2006-01-02T17:15:05Z
    ```

  `sloctl` returns the following error:<br/>

  `applying Annotation annotation-test-1 in 'default' project failed, because object SLO 'bad-slo-name' referenced in its spec does not exist in 'my-project' project`

* If the `startTime` or `endTime` format is invalid, as shown here:

    ```yaml
    apiVersion: n9/v1alpha
    kind: Annotation
    metadata:
      name: annotation-name
      project: my-project
    spec:
      slo: bad-slo-name
      description: test annotation description
      startTime: 2006-01-02T17:10:05Z
      endTime: 2006-01-02T15:04:05Z07:00
    ```

  `sloctl` returns the following error:<br/>

  `'Annotation.spec.startTime' Error:Field validation for 'startTime' failed on the 'iso8601dateTimeFormatRequired' tag`

* If the annotation `name` is blank:

    ```yaml
    apiVersion: n9/v1alpha
    kind: Annotation
    metadata:
      name:
      project: my-project
    spec:
      slo: bad-slo-name
      description: test annotation description
      startTime: 2006-01-02T17:10:05Z
      endTime: 2006-01-02T15:04:05Z07:00
    ```

  `sloctl` returns the following error:<br/>

  `Annotation.ObjectHeader.MetadataHolder.metadata.name' Error:Field validation for 'name' failed on the 'required' tag`

* If the `endTime` is before the `startTime`:

    ```yaml
    apiVersion: n9/v1alpha
    kind: Annotation
    metadata:
      name:
      project: my-project
    spec:
      slo: bad-slo-name
      description: test annotation description
      startTime: 2020-01-02T17:10:05Z
      endTime: 2019-01-02T15:04:05Z07:00
    ```

  `sloctl` returns the following error:<br/>

  `'Annotation.spec.endTime' Error:Field validation for 'endTime' failed on the 'endTimeBeforeStartTime' tag`

* If the required `description` is missing:

    ```yaml
    apiVersion: n9/v1alpha
    kind: Annotation
    metadata:
      name:
      project: my-project
    spec:
      slo: bad-slo-name
      description: test annotation description
      startTime: 2021-01-02T17:10:05Z
      endTime: 2021-01-02T15:04:05Z07:00
    ```

  `sloctl` returns the following error:<br/>

  `'Annotation.spec.description' Error:Field validation for 'description' failed on the 'required' tag`

* If the value in the `description` field is too long (>1000 characters), `sloctl` returns the following error:<br/>

  `'Annotation.spec.description' Error:Field validation for 'description' failed on the 'max' tag`
