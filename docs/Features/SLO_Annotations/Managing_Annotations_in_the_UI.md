---
id: managing-slo-annotations
title: Managing SLO Annotations in the UI
sidebar_label: Managing SLO Annotations in the UI
sidebar_position: 2
description: Overview of SLO Annotations functionality in Nobl9
keywords:
  - annotations
  - SLOs
---
import ReactPlayer from 'react-player'

# Managing Annotations in the UI

## Adding Annotations

You can easily add annotations to your existing SLOs using Nobl9 UI:

1. Go to **Service Level Objectives** in the main navigation pane.

2. In the SLO grid view, choose the SLO where you want to add your annotation and click it:

    <ReactPlayer controls url='/video/Annotations_Step1.mp4' width="90%" margin="10px" /><br/>

    In the SLO Details view you can add Annotations in:

    * The SLI Chart.

    * The Reliability Burn Down chart.

    * The Error Budget Burn Rate chart.

3. Hover over any of the charts, choose a relevant time point on any of the above charts and click it.

4. You will see a blue line and a pin icon which mark the Annotation and a pop-up window Add a description, specify the Start Date and End Date and click ‘Add Annotation’.

    * The **Start date** and the **End date** fields will be pre-filled with values that you selected by clicking the chart. You can change them by clicking on the Calendar icon.

    * If the Start date = End date, the Annotation will be displayed as a single point in the chart.

    <ReactPlayer controls url='/video/Single_annotation.mp4' width="100%" margin="auto" />

    * If the End date is later than the Start Date, the Annotation will be displayed as a greyed-out area in your chart:

    <ReactPlayer controls url='/video/Annotations_Span.mp4' width="100%" />

    * Your added Annotation will be displayed on every chart in the SLO Details view.

    * You can add Annotations in the overlapping timespans.

5. You will be able to see your Annotations whenever you hover over them on any of the charts in the SLO Details view:

    <ReactPlayer controls url='/video/Annotations_Hover.mp4' width="100%" />

## Deleting Annotations

You can easily delete your Annotations:

1. In the SLO Details hover over the Annotation that you want to delete.

2. Once the Annotation details pop up, hover over the Annotation that you want to delete.

3. Click the Trash icon, then click the Delete button to confirm:

    <ReactPlayer controls url='/video/Delete_Annotations.mp4' width="100%" />
