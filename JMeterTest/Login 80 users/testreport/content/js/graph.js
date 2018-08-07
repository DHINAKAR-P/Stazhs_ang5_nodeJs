/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
    $(".portlet-header").css("cursor", "auto");
});

var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

// Fixes time stamps
function fixTimeStamps(series, offset){
    $.each(series, function(index, item) {
        $.each(item.data, function(index, coord) {
            coord[0] += offset;
        });
    });
}

// Check if the specified jquery object is a graph
function isGraph(object){
    return object.data('plot') !== undefined;
}

/**
 * Export graph to a PNG
 */
function exportToPNG(graphName, target) {
    var plot = $("#"+graphName).data('plot');
    var flotCanvas = plot.getCanvas();
    var image = flotCanvas.toDataURL();
    image = image.replace("image/png", "image/octet-stream");
    
    var downloadAttrSupported = ("download" in document.createElement("a"));
    if(downloadAttrSupported === true) {
        target.download = graphName + ".png";
        target.href = image;
    }
    else {
        document.location.href = image;
    }
    
}

// Override the specified graph options to fit the requirements of an overview
function prepareOverviewOptions(graphOptions){
    var overviewOptions = {
        series: {
            shadowSize: 0,
            lines: {
                lineWidth: 1
            },
            points: {
                // Show points on overview only when linked graph does not show
                // lines
                show: getProperty('series.lines.show', graphOptions) == false,
                radius : 1
            }
        },
        xaxis: {
            ticks: 2,
            axisLabel: null
        },
        yaxis: {
            ticks: 2,
            axisLabel: null
        },
        legend: {
            show: false,
            container: null
        },
        grid: {
            hoverable: false
        },
        tooltip: false
    };
    return $.extend(true, {}, graphOptions, overviewOptions);
}

// Force axes boundaries using graph extra options
function prepareOptions(options, data) {
    options.canvas = true;
    var extraOptions = data.extraOptions;
    if(extraOptions !== undefined){
        var xOffset = options.xaxis.mode === "time" ? 19800000 : 0;
        var yOffset = options.yaxis.mode === "time" ? 19800000 : 0;

        if(!isNaN(extraOptions.minX))
        	options.xaxis.min = parseFloat(extraOptions.minX) + xOffset;
        
        if(!isNaN(extraOptions.maxX))
        	options.xaxis.max = parseFloat(extraOptions.maxX) + xOffset;
        
        if(!isNaN(extraOptions.minY))
        	options.yaxis.min = parseFloat(extraOptions.minY) + yOffset;
        
        if(!isNaN(extraOptions.maxY))
        	options.yaxis.max = parseFloat(extraOptions.maxY) + yOffset;
    }
}

// Filter, mark series and sort data
/**
 * @param data
 * @param noMatchColor if defined and true, series.color are not matched with index
 */
function prepareSeries(data, noMatchColor){
    var result = data.result;

    // Keep only series when needed
    if(seriesFilter && (!filtersOnlySampleSeries || result.supportsControllersDiscrimination)){
        // Insensitive case matching
        var regexp = new RegExp(seriesFilter, 'i');
        result.series = $.grep(result.series, function(series, index){
            return regexp.test(series.label);
        });
    }

    // Keep only controllers series when supported and needed
    if(result.supportsControllersDiscrimination && showControllersOnly){
        result.series = $.grep(result.series, function(series, index){
            return series.isController;
        });
    }

    // Sort data and mark series
    $.each(result.series, function(index, series) {
        series.data.sort(compareByXCoordinate);
        if(!(noMatchColor && noMatchColor===true)) {
	        series.color = index;
	    }
    });
}

// Set the zoom on the specified plot object
function zoomPlot(plot, xmin, xmax, ymin, ymax){
    var axes = plot.getAxes();
    // Override axes min and max options
    $.extend(true, axes, {
        xaxis: {
            options : { min: xmin, max: xmax }
        },
        yaxis: {
            options : { min: ymin, max: ymax }
        }
    });

    // Redraw the plot
    plot.setupGrid();
    plot.draw();
}

// Prepares DOM items to add zoom function on the specified graph
function setGraphZoomable(graphSelector, overviewSelector){
    var graph = $(graphSelector);
    var overview = $(overviewSelector);

    // Ignore mouse down event
    graph.bind("mousedown", function() { return false; });
    overview.bind("mousedown", function() { return false; });

    // Zoom on selection
    graph.bind("plotselected", function (event, ranges) {
        // clamp the zooming to prevent infinite zoom
        if (ranges.xaxis.to - ranges.xaxis.from < 0.00001) {
            ranges.xaxis.to = ranges.xaxis.from + 0.00001;
        }
        if (ranges.yaxis.to - ranges.yaxis.from < 0.00001) {
            ranges.yaxis.to = ranges.yaxis.from + 0.00001;
        }

        // Do the zooming
        var plot = graph.data('plot');
        zoomPlot(plot, ranges.xaxis.from, ranges.xaxis.to, ranges.yaxis.from, ranges.yaxis.to);
        plot.clearSelection();

        // Synchronize overview selection
        overview.data('plot').setSelection(ranges, true);
    });

    // Zoom linked graph on overview selection
    overview.bind("plotselected", function (event, ranges) {
        graph.data('plot').setSelection(ranges);
    });

    // Reset linked graph zoom when reseting overview selection
    overview.bind("plotunselected", function () {
        var overviewAxes = overview.data('plot').getAxes();
        zoomPlot(graph.data('plot'), overviewAxes.xaxis.min, overviewAxes.xaxis.max, overviewAxes.yaxis.min, overviewAxes.yaxis.max);
    });
}

var responseTimePercentilesInfos = {
        data: {"result": {"minY": 251.0, "minX": 0.0, "maxY": 1856.0, "series": [{"data": [[0.0, 251.0], [0.1, 251.0], [0.2, 251.0], [0.3, 251.0], [0.4, 251.0], [0.5, 251.0], [0.6, 251.0], [0.7, 251.0], [0.8, 251.0], [0.9, 251.0], [1.0, 251.0], [1.1, 251.0], [1.2, 251.0], [1.3, 251.0], [1.4, 251.0], [1.5, 251.0], [1.6, 251.0], [1.7, 251.0], [1.8, 251.0], [1.9, 251.0], [2.0, 251.0], [2.1, 251.0], [2.2, 251.0], [2.3, 251.0], [2.4, 251.0], [2.5, 256.0], [2.6, 256.0], [2.7, 256.0], [2.8, 256.0], [2.9, 256.0], [3.0, 256.0], [3.1, 256.0], [3.2, 256.0], [3.3, 256.0], [3.4, 256.0], [3.5, 256.0], [3.6, 256.0], [3.7, 256.0], [3.8, 258.0], [3.9, 258.0], [4.0, 258.0], [4.1, 258.0], [4.2, 258.0], [4.3, 258.0], [4.4, 258.0], [4.5, 258.0], [4.6, 258.0], [4.7, 258.0], [4.8, 258.0], [4.9, 258.0], [5.0, 259.0], [5.1, 259.0], [5.2, 259.0], [5.3, 259.0], [5.4, 259.0], [5.5, 259.0], [5.6, 259.0], [5.7, 259.0], [5.8, 259.0], [5.9, 259.0], [6.0, 259.0], [6.1, 259.0], [6.2, 259.0], [6.3, 259.0], [6.4, 259.0], [6.5, 259.0], [6.6, 259.0], [6.7, 259.0], [6.8, 259.0], [6.9, 259.0], [7.0, 259.0], [7.1, 259.0], [7.2, 259.0], [7.3, 259.0], [7.4, 259.0], [7.5, 259.0], [7.6, 259.0], [7.7, 259.0], [7.8, 259.0], [7.9, 259.0], [8.0, 259.0], [8.1, 259.0], [8.2, 259.0], [8.3, 259.0], [8.4, 259.0], [8.5, 259.0], [8.6, 259.0], [8.7, 259.0], [8.8, 262.0], [8.9, 262.0], [9.0, 262.0], [9.1, 262.0], [9.2, 262.0], [9.3, 262.0], [9.4, 262.0], [9.5, 262.0], [9.6, 262.0], [9.7, 262.0], [9.8, 262.0], [9.9, 262.0], [10.0, 264.0], [10.1, 264.0], [10.2, 264.0], [10.3, 264.0], [10.4, 264.0], [10.5, 264.0], [10.6, 264.0], [10.7, 264.0], [10.8, 264.0], [10.9, 264.0], [11.0, 264.0], [11.1, 264.0], [11.2, 264.0], [11.3, 271.0], [11.4, 271.0], [11.5, 271.0], [11.6, 271.0], [11.7, 271.0], [11.8, 271.0], [11.9, 271.0], [12.0, 271.0], [12.1, 271.0], [12.2, 271.0], [12.3, 271.0], [12.4, 271.0], [12.5, 274.0], [12.6, 274.0], [12.7, 274.0], [12.8, 274.0], [12.9, 274.0], [13.0, 274.0], [13.1, 274.0], [13.2, 274.0], [13.3, 274.0], [13.4, 274.0], [13.5, 274.0], [13.6, 274.0], [13.7, 274.0], [13.8, 274.0], [13.9, 274.0], [14.0, 274.0], [14.1, 274.0], [14.2, 274.0], [14.3, 274.0], [14.4, 274.0], [14.5, 274.0], [14.6, 274.0], [14.7, 274.0], [14.8, 274.0], [14.9, 274.0], [15.0, 277.0], [15.1, 277.0], [15.2, 277.0], [15.3, 277.0], [15.4, 277.0], [15.5, 277.0], [15.6, 277.0], [15.7, 277.0], [15.8, 277.0], [15.9, 277.0], [16.0, 277.0], [16.1, 277.0], [16.2, 277.0], [16.3, 278.0], [16.4, 278.0], [16.5, 278.0], [16.6, 278.0], [16.7, 278.0], [16.8, 278.0], [16.9, 278.0], [17.0, 278.0], [17.1, 278.0], [17.2, 278.0], [17.3, 278.0], [17.4, 278.0], [17.5, 278.0], [17.6, 278.0], [17.7, 278.0], [17.8, 278.0], [17.9, 278.0], [18.0, 278.0], [18.1, 278.0], [18.2, 278.0], [18.3, 278.0], [18.4, 278.0], [18.5, 278.0], [18.6, 278.0], [18.7, 278.0], [18.8, 279.0], [18.9, 279.0], [19.0, 279.0], [19.1, 279.0], [19.2, 279.0], [19.3, 279.0], [19.4, 279.0], [19.5, 279.0], [19.6, 279.0], [19.7, 279.0], [19.8, 279.0], [19.9, 279.0], [20.0, 280.0], [20.1, 280.0], [20.2, 280.0], [20.3, 280.0], [20.4, 280.0], [20.5, 280.0], [20.6, 280.0], [20.7, 280.0], [20.8, 280.0], [20.9, 280.0], [21.0, 280.0], [21.1, 280.0], [21.2, 280.0], [21.3, 282.0], [21.4, 282.0], [21.5, 282.0], [21.6, 282.0], [21.7, 282.0], [21.8, 282.0], [21.9, 282.0], [22.0, 282.0], [22.1, 282.0], [22.2, 282.0], [22.3, 282.0], [22.4, 282.0], [22.5, 282.0], [22.6, 282.0], [22.7, 282.0], [22.8, 282.0], [22.9, 282.0], [23.0, 282.0], [23.1, 282.0], [23.2, 282.0], [23.3, 282.0], [23.4, 282.0], [23.5, 282.0], [23.6, 282.0], [23.7, 282.0], [23.8, 286.0], [23.9, 286.0], [24.0, 286.0], [24.1, 286.0], [24.2, 286.0], [24.3, 286.0], [24.4, 286.0], [24.5, 286.0], [24.6, 286.0], [24.7, 286.0], [24.8, 286.0], [24.9, 286.0], [25.0, 287.0], [25.1, 287.0], [25.2, 287.0], [25.3, 287.0], [25.4, 287.0], [25.5, 287.0], [25.6, 287.0], [25.7, 287.0], [25.8, 287.0], [25.9, 287.0], [26.0, 287.0], [26.1, 287.0], [26.2, 287.0], [26.3, 290.0], [26.4, 290.0], [26.5, 290.0], [26.6, 290.0], [26.7, 290.0], [26.8, 290.0], [26.9, 290.0], [27.0, 290.0], [27.1, 290.0], [27.2, 290.0], [27.3, 290.0], [27.4, 290.0], [27.5, 292.0], [27.6, 292.0], [27.7, 292.0], [27.8, 292.0], [27.9, 292.0], [28.0, 292.0], [28.1, 292.0], [28.2, 292.0], [28.3, 292.0], [28.4, 292.0], [28.5, 292.0], [28.6, 292.0], [28.7, 292.0], [28.8, 292.0], [28.9, 292.0], [29.0, 292.0], [29.1, 292.0], [29.2, 292.0], [29.3, 292.0], [29.4, 292.0], [29.5, 292.0], [29.6, 292.0], [29.7, 292.0], [29.8, 292.0], [29.9, 292.0], [30.0, 299.0], [30.1, 299.0], [30.2, 299.0], [30.3, 299.0], [30.4, 299.0], [30.5, 299.0], [30.6, 299.0], [30.7, 299.0], [30.8, 299.0], [30.9, 299.0], [31.0, 299.0], [31.1, 299.0], [31.2, 299.0], [31.3, 303.0], [31.4, 303.0], [31.5, 303.0], [31.6, 303.0], [31.7, 303.0], [31.8, 303.0], [31.9, 303.0], [32.0, 303.0], [32.1, 303.0], [32.2, 303.0], [32.3, 303.0], [32.4, 303.0], [32.5, 305.0], [32.6, 305.0], [32.7, 305.0], [32.8, 305.0], [32.9, 305.0], [33.0, 305.0], [33.1, 305.0], [33.2, 305.0], [33.3, 305.0], [33.4, 305.0], [33.5, 305.0], [33.6, 305.0], [33.7, 305.0], [33.8, 310.0], [33.9, 310.0], [34.0, 310.0], [34.1, 310.0], [34.2, 310.0], [34.3, 310.0], [34.4, 310.0], [34.5, 310.0], [34.6, 310.0], [34.7, 310.0], [34.8, 310.0], [34.9, 310.0], [35.0, 311.0], [35.1, 311.0], [35.2, 311.0], [35.3, 311.0], [35.4, 311.0], [35.5, 311.0], [35.6, 311.0], [35.7, 311.0], [35.8, 311.0], [35.9, 311.0], [36.0, 311.0], [36.1, 311.0], [36.2, 311.0], [36.3, 311.0], [36.4, 311.0], [36.5, 311.0], [36.6, 311.0], [36.7, 311.0], [36.8, 311.0], [36.9, 311.0], [37.0, 311.0], [37.1, 311.0], [37.2, 311.0], [37.3, 311.0], [37.4, 311.0], [37.5, 312.0], [37.6, 312.0], [37.7, 312.0], [37.8, 312.0], [37.9, 312.0], [38.0, 312.0], [38.1, 312.0], [38.2, 312.0], [38.3, 312.0], [38.4, 312.0], [38.5, 312.0], [38.6, 312.0], [38.7, 312.0], [38.8, 316.0], [38.9, 316.0], [39.0, 316.0], [39.1, 316.0], [39.2, 316.0], [39.3, 316.0], [39.4, 316.0], [39.5, 316.0], [39.6, 316.0], [39.7, 316.0], [39.8, 316.0], [39.9, 316.0], [40.0, 323.0], [40.1, 323.0], [40.2, 323.0], [40.3, 323.0], [40.4, 323.0], [40.5, 323.0], [40.6, 323.0], [40.7, 323.0], [40.8, 323.0], [40.9, 323.0], [41.0, 323.0], [41.1, 323.0], [41.2, 323.0], [41.3, 330.0], [41.4, 330.0], [41.5, 330.0], [41.6, 330.0], [41.7, 330.0], [41.8, 330.0], [41.9, 330.0], [42.0, 330.0], [42.1, 330.0], [42.2, 330.0], [42.3, 330.0], [42.4, 330.0], [42.5, 345.0], [42.6, 345.0], [42.7, 345.0], [42.8, 345.0], [42.9, 345.0], [43.0, 345.0], [43.1, 345.0], [43.2, 345.0], [43.3, 345.0], [43.4, 345.0], [43.5, 345.0], [43.6, 345.0], [43.7, 345.0], [43.8, 354.0], [43.9, 354.0], [44.0, 354.0], [44.1, 354.0], [44.2, 354.0], [44.3, 354.0], [44.4, 354.0], [44.5, 354.0], [44.6, 354.0], [44.7, 354.0], [44.8, 354.0], [44.9, 354.0], [45.0, 355.0], [45.1, 355.0], [45.2, 355.0], [45.3, 355.0], [45.4, 355.0], [45.5, 355.0], [45.6, 355.0], [45.7, 355.0], [45.8, 355.0], [45.9, 355.0], [46.0, 355.0], [46.1, 355.0], [46.2, 355.0], [46.3, 361.0], [46.4, 361.0], [46.5, 361.0], [46.6, 361.0], [46.7, 361.0], [46.8, 361.0], [46.9, 361.0], [47.0, 361.0], [47.1, 361.0], [47.2, 361.0], [47.3, 361.0], [47.4, 361.0], [47.5, 364.0], [47.6, 364.0], [47.7, 364.0], [47.8, 364.0], [47.9, 364.0], [48.0, 364.0], [48.1, 364.0], [48.2, 364.0], [48.3, 364.0], [48.4, 364.0], [48.5, 364.0], [48.6, 364.0], [48.7, 364.0], [48.8, 365.0], [48.9, 365.0], [49.0, 365.0], [49.1, 365.0], [49.2, 365.0], [49.3, 365.0], [49.4, 365.0], [49.5, 365.0], [49.6, 365.0], [49.7, 365.0], [49.8, 365.0], [49.9, 365.0], [50.0, 372.0], [50.1, 372.0], [50.2, 372.0], [50.3, 372.0], [50.4, 372.0], [50.5, 372.0], [50.6, 372.0], [50.7, 372.0], [50.8, 372.0], [50.9, 372.0], [51.0, 372.0], [51.1, 372.0], [51.2, 372.0], [51.3, 379.0], [51.4, 379.0], [51.5, 379.0], [51.6, 379.0], [51.7, 379.0], [51.8, 379.0], [51.9, 379.0], [52.0, 379.0], [52.1, 379.0], [52.2, 379.0], [52.3, 379.0], [52.4, 379.0], [52.5, 379.0], [52.6, 379.0], [52.7, 379.0], [52.8, 379.0], [52.9, 379.0], [53.0, 379.0], [53.1, 379.0], [53.2, 379.0], [53.3, 379.0], [53.4, 379.0], [53.5, 379.0], [53.6, 379.0], [53.7, 379.0], [53.8, 389.0], [53.9, 389.0], [54.0, 389.0], [54.1, 389.0], [54.2, 389.0], [54.3, 389.0], [54.4, 389.0], [54.5, 389.0], [54.6, 389.0], [54.7, 389.0], [54.8, 389.0], [54.9, 389.0], [55.0, 392.0], [55.1, 392.0], [55.2, 392.0], [55.3, 392.0], [55.4, 392.0], [55.5, 392.0], [55.6, 392.0], [55.7, 392.0], [55.8, 392.0], [55.9, 392.0], [56.0, 392.0], [56.1, 392.0], [56.2, 392.0], [56.3, 397.0], [56.4, 397.0], [56.5, 397.0], [56.6, 397.0], [56.7, 397.0], [56.8, 397.0], [56.9, 397.0], [57.0, 397.0], [57.1, 397.0], [57.2, 397.0], [57.3, 397.0], [57.4, 397.0], [57.5, 398.0], [57.6, 398.0], [57.7, 398.0], [57.8, 398.0], [57.9, 398.0], [58.0, 398.0], [58.1, 398.0], [58.2, 398.0], [58.3, 398.0], [58.4, 398.0], [58.5, 398.0], [58.6, 398.0], [58.7, 398.0], [58.8, 406.0], [58.9, 406.0], [59.0, 406.0], [59.1, 406.0], [59.2, 406.0], [59.3, 406.0], [59.4, 406.0], [59.5, 406.0], [59.6, 406.0], [59.7, 406.0], [59.8, 406.0], [59.9, 406.0], [60.0, 411.0], [60.1, 411.0], [60.2, 411.0], [60.3, 411.0], [60.4, 411.0], [60.5, 411.0], [60.6, 411.0], [60.7, 411.0], [60.8, 411.0], [60.9, 411.0], [61.0, 411.0], [61.1, 411.0], [61.2, 411.0], [61.3, 412.0], [61.4, 412.0], [61.5, 412.0], [61.6, 412.0], [61.7, 412.0], [61.8, 412.0], [61.9, 412.0], [62.0, 412.0], [62.1, 412.0], [62.2, 412.0], [62.3, 412.0], [62.4, 412.0], [62.5, 412.0], [62.6, 412.0], [62.7, 412.0], [62.8, 412.0], [62.9, 412.0], [63.0, 412.0], [63.1, 412.0], [63.2, 412.0], [63.3, 412.0], [63.4, 412.0], [63.5, 412.0], [63.6, 412.0], [63.7, 412.0], [63.8, 414.0], [63.9, 414.0], [64.0, 414.0], [64.1, 414.0], [64.2, 414.0], [64.3, 414.0], [64.4, 414.0], [64.5, 414.0], [64.6, 414.0], [64.7, 414.0], [64.8, 414.0], [64.9, 414.0], [65.0, 415.0], [65.1, 415.0], [65.2, 415.0], [65.3, 415.0], [65.4, 415.0], [65.5, 415.0], [65.6, 415.0], [65.7, 415.0], [65.8, 415.0], [65.9, 415.0], [66.0, 415.0], [66.1, 415.0], [66.2, 415.0], [66.3, 424.0], [66.4, 424.0], [66.5, 424.0], [66.6, 424.0], [66.7, 424.0], [66.8, 424.0], [66.9, 424.0], [67.0, 424.0], [67.1, 424.0], [67.2, 424.0], [67.3, 424.0], [67.4, 424.0], [67.5, 424.0], [67.6, 424.0], [67.7, 424.0], [67.8, 424.0], [67.9, 424.0], [68.0, 424.0], [68.1, 424.0], [68.2, 424.0], [68.3, 424.0], [68.4, 424.0], [68.5, 424.0], [68.6, 424.0], [68.7, 424.0], [68.8, 433.0], [68.9, 433.0], [69.0, 433.0], [69.1, 433.0], [69.2, 433.0], [69.3, 433.0], [69.4, 433.0], [69.5, 433.0], [69.6, 433.0], [69.7, 433.0], [69.8, 433.0], [69.9, 433.0], [70.0, 441.0], [70.1, 441.0], [70.2, 441.0], [70.3, 441.0], [70.4, 441.0], [70.5, 441.0], [70.6, 441.0], [70.7, 441.0], [70.8, 441.0], [70.9, 441.0], [71.0, 441.0], [71.1, 441.0], [71.2, 441.0], [71.3, 470.0], [71.4, 470.0], [71.5, 470.0], [71.6, 470.0], [71.7, 470.0], [71.8, 470.0], [71.9, 470.0], [72.0, 470.0], [72.1, 470.0], [72.2, 470.0], [72.3, 470.0], [72.4, 470.0], [72.5, 486.0], [72.6, 486.0], [72.7, 486.0], [72.8, 486.0], [72.9, 486.0], [73.0, 486.0], [73.1, 486.0], [73.2, 486.0], [73.3, 486.0], [73.4, 486.0], [73.5, 486.0], [73.6, 486.0], [73.7, 486.0], [73.8, 500.0], [73.9, 500.0], [74.0, 500.0], [74.1, 500.0], [74.2, 500.0], [74.3, 500.0], [74.4, 500.0], [74.5, 500.0], [74.6, 500.0], [74.7, 500.0], [74.8, 500.0], [74.9, 500.0], [75.0, 505.0], [75.1, 505.0], [75.2, 505.0], [75.3, 505.0], [75.4, 505.0], [75.5, 505.0], [75.6, 505.0], [75.7, 505.0], [75.8, 505.0], [75.9, 505.0], [76.0, 505.0], [76.1, 505.0], [76.2, 505.0], [76.3, 507.0], [76.4, 507.0], [76.5, 507.0], [76.6, 507.0], [76.7, 507.0], [76.8, 507.0], [76.9, 507.0], [77.0, 507.0], [77.1, 507.0], [77.2, 507.0], [77.3, 507.0], [77.4, 507.0], [77.5, 508.0], [77.6, 508.0], [77.7, 508.0], [77.8, 508.0], [77.9, 508.0], [78.0, 508.0], [78.1, 508.0], [78.2, 508.0], [78.3, 508.0], [78.4, 508.0], [78.5, 508.0], [78.6, 508.0], [78.7, 508.0], [78.8, 508.0], [78.9, 508.0], [79.0, 508.0], [79.1, 508.0], [79.2, 508.0], [79.3, 508.0], [79.4, 508.0], [79.5, 508.0], [79.6, 508.0], [79.7, 508.0], [79.8, 508.0], [79.9, 508.0], [80.0, 508.0], [80.1, 508.0], [80.2, 508.0], [80.3, 508.0], [80.4, 508.0], [80.5, 508.0], [80.6, 508.0], [80.7, 508.0], [80.8, 508.0], [80.9, 508.0], [81.0, 508.0], [81.1, 508.0], [81.2, 508.0], [81.3, 510.0], [81.4, 510.0], [81.5, 510.0], [81.6, 510.0], [81.7, 510.0], [81.8, 510.0], [81.9, 510.0], [82.0, 510.0], [82.1, 510.0], [82.2, 510.0], [82.3, 510.0], [82.4, 510.0], [82.5, 517.0], [82.6, 517.0], [82.7, 517.0], [82.8, 517.0], [82.9, 517.0], [83.0, 517.0], [83.1, 517.0], [83.2, 517.0], [83.3, 517.0], [83.4, 517.0], [83.5, 517.0], [83.6, 517.0], [83.7, 517.0], [83.8, 521.0], [83.9, 521.0], [84.0, 521.0], [84.1, 521.0], [84.2, 521.0], [84.3, 521.0], [84.4, 521.0], [84.5, 521.0], [84.6, 521.0], [84.7, 521.0], [84.8, 521.0], [84.9, 521.0], [85.0, 524.0], [85.1, 524.0], [85.2, 524.0], [85.3, 524.0], [85.4, 524.0], [85.5, 524.0], [85.6, 524.0], [85.7, 524.0], [85.8, 524.0], [85.9, 524.0], [86.0, 524.0], [86.1, 524.0], [86.2, 524.0], [86.3, 545.0], [86.4, 545.0], [86.5, 545.0], [86.6, 545.0], [86.7, 545.0], [86.8, 545.0], [86.9, 545.0], [87.0, 545.0], [87.1, 545.0], [87.2, 545.0], [87.3, 545.0], [87.4, 545.0], [87.5, 550.0], [87.6, 550.0], [87.7, 550.0], [87.8, 550.0], [87.9, 550.0], [88.0, 550.0], [88.1, 550.0], [88.2, 550.0], [88.3, 550.0], [88.4, 550.0], [88.5, 550.0], [88.6, 550.0], [88.7, 550.0], [88.8, 581.0], [88.9, 581.0], [89.0, 581.0], [89.1, 581.0], [89.2, 581.0], [89.3, 581.0], [89.4, 581.0], [89.5, 581.0], [89.6, 581.0], [89.7, 581.0], [89.8, 581.0], [89.9, 581.0], [90.0, 599.0], [90.1, 599.0], [90.2, 599.0], [90.3, 599.0], [90.4, 599.0], [90.5, 599.0], [90.6, 599.0], [90.7, 599.0], [90.8, 599.0], [90.9, 599.0], [91.0, 599.0], [91.1, 599.0], [91.2, 599.0], [91.3, 607.0], [91.4, 607.0], [91.5, 607.0], [91.6, 607.0], [91.7, 607.0], [91.8, 607.0], [91.9, 607.0], [92.0, 607.0], [92.1, 607.0], [92.2, 607.0], [92.3, 607.0], [92.4, 607.0], [92.5, 611.0], [92.6, 611.0], [92.7, 611.0], [92.8, 611.0], [92.9, 611.0], [93.0, 611.0], [93.1, 611.0], [93.2, 611.0], [93.3, 611.0], [93.4, 611.0], [93.5, 611.0], [93.6, 611.0], [93.7, 611.0], [93.8, 620.0], [93.9, 620.0], [94.0, 620.0], [94.1, 620.0], [94.2, 620.0], [94.3, 620.0], [94.4, 620.0], [94.5, 620.0], [94.6, 620.0], [94.7, 620.0], [94.8, 620.0], [94.9, 620.0], [95.0, 645.0], [95.1, 645.0], [95.2, 645.0], [95.3, 645.0], [95.4, 645.0], [95.5, 645.0], [95.6, 645.0], [95.7, 645.0], [95.8, 645.0], [95.9, 645.0], [96.0, 645.0], [96.1, 645.0], [96.2, 645.0], [96.3, 650.0], [96.4, 650.0], [96.5, 650.0], [96.6, 650.0], [96.7, 650.0], [96.8, 650.0], [96.9, 650.0], [97.0, 650.0], [97.1, 650.0], [97.2, 650.0], [97.3, 650.0], [97.4, 650.0], [97.5, 752.0], [97.6, 752.0], [97.7, 752.0], [97.8, 752.0], [97.9, 752.0], [98.0, 752.0], [98.1, 752.0], [98.2, 752.0], [98.3, 752.0], [98.4, 752.0], [98.5, 752.0], [98.6, 752.0], [98.7, 752.0], [98.8, 1856.0], [98.9, 1856.0], [99.0, 1856.0], [99.1, 1856.0], [99.2, 1856.0], [99.3, 1856.0], [99.4, 1856.0], [99.5, 1856.0], [99.6, 1856.0], [99.7, 1856.0], [99.8, 1856.0], [99.9, 1856.0]], "isOverall": false, "label": "208 /auth/login", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 200.0, "maxY": 25.0, "series": [{"data": [[600.0, 5.0], [300.0, 22.0], [700.0, 1.0], [200.0, 25.0], [400.0, 12.0], [1800.0, 1.0], [500.0, 14.0]], "isOverall": false, "label": "208 /auth/login", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 1800.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 39.0, "series": [{"data": [[1.0, 13.0]], "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[3.0, 27.0]], "isOverall": false, "label": "Requests in error", "isController": false}, {"data": [[0.0, 39.0]], "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[2.0, 1.0]], "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                },
                colors: ["#9ACD32", "yellow", "orange", "#FF6347"]                
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 7.072727272727271, "minX": 1.53200016E12, "maxY": 7.92, "series": [{"data": [[1.53200016E12, 7.92], [1.53200022E12, 7.072727272727271]], "isOverall": false, "label": "JMeter Login", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.53200022E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: "%H:%M:%S",
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 251.0, "minX": 1.0, "maxY": 429.578125, "series": [{"data": [[8.0, 429.578125], [4.0, 284.5], [2.0, 417.0], [1.0, 251.0], [5.0, 261.3333333333333], [6.0, 274.0], [3.0, 268.5], [7.0, 408.2]], "isOverall": false, "label": "208 /auth/login", "isController": false}, {"data": [[7.3375, 409.78749999999997]], "isOverall": false, "label": "208 /auth/login-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 8.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 203.5, "minX": 1.53200016E12, "maxY": 1197.3333333333333, "series": [{"data": [[1.53200016E12, 575.95], [1.53200022E12, 1197.3333333333333]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.53200016E12, 203.5], [1.53200022E12, 472.9]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.53200022E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: "%H:%M:%S",
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 368.4909090909091, "minX": 1.53200016E12, "maxY": 500.64000000000004, "series": [{"data": [[1.53200016E12, 500.64000000000004], [1.53200022E12, 368.4909090909091]], "isOverall": false, "label": "208 /auth/login", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.53200022E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: "%H:%M:%S",
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 368.14545454545464, "minX": 1.53200016E12, "maxY": 500.28, "series": [{"data": [[1.53200016E12, 500.28], [1.53200022E12, 368.14545454545464]], "isOverall": false, "label": "208 /auth/login", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.53200022E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: "%H:%M:%S",
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 39.61818181818183, "minX": 1.53200016E12, "maxY": 86.51999999999997, "series": [{"data": [[1.53200016E12, 86.51999999999997], [1.53200022E12, 39.61818181818183]], "isOverall": false, "label": "208 /auth/login", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.53200022E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: "%H:%M:%S",
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 251.0, "minX": 1.53200016E12, "maxY": 1856.0, "series": [{"data": [[1.53200016E12, 1856.0], [1.53200022E12, 752.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.53200016E12, 251.0], [1.53200022E12, 256.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.53200016E12, 891.1999999999991], [1.53200022E12, 616.4]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.53200016E12, 1856.0], [1.53200022E12, 1856.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.53200016E12, 1856.0], [1.53200022E12, 680.5999999999997]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.53200022E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: "%H:%M:%S",
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 364.0, "minX": 0.0, "maxY": 379.0, "series": [{"data": [[0.0, 379.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[0.0, 364.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 4.9E-324, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.create();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 364.0, "minX": 0.0, "maxY": 378.0, "series": [{"data": [[0.0, 378.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[0.0, 364.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 4.9E-324, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 0.55, "minX": 1.53200016E12, "maxY": 0.7833333333333333, "series": [{"data": [[1.53200016E12, 0.55], [1.53200022E12, 0.7833333333333333]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.53200022E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: "%H:%M:%S",
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.13333333333333333, "minX": 1.53200016E12, "maxY": 0.6, "series": [{"data": [[1.53200016E12, 0.2833333333333333], [1.53200022E12, 0.6]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.53200016E12, 0.13333333333333333], [1.53200022E12, 0.31666666666666665]], "isOverall": false, "label": "400", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.53200022E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: "%H:%M:%S",
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.13333333333333333, "minX": 1.53200016E12, "maxY": 0.6, "series": [{"data": [[1.53200016E12, 0.13333333333333333], [1.53200022E12, 0.31666666666666665]], "isOverall": false, "label": "208 /auth/login-failure", "isController": false}, {"data": [[1.53200016E12, 0.2833333333333333], [1.53200022E12, 0.6]], "isOverall": false, "label": "208 /auth/login-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.53200022E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: "%H:%M:%S",
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

// Collapse
$(function() {
        $('.collapse').on('shown.bs.collapse', function(){
            collapse(this, false);
        }).on('hidden.bs.collapse', function(){
            collapse(this, true);
        });
});

$(function() {
    $(".glyphicon").mousedown( function(event){
        var tmp = $('.in:not(ul)');
        tmp.parent().parent().parent().find(".fa-chevron-up").removeClass("fa-chevron-down").addClass("fa-chevron-down");
        tmp.removeClass("in");
        tmp.addClass("out");
    });
});

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "responseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    choiceContainer.find("label").each(function(){
        this.style.color = color;
    });
}

// Unchecks all boxes for "Hide all samples" functionality
function uncheckAll(id){
    toggleAll(id, false);
}

// Checks all boxes for "Show all samples" functionality
function checkAll(id){
    toggleAll(id, true);
}

// Prepares data to be consumed by plot plugins
function prepareData(series, choiceContainer, customizeSeries){
    var datasets = [];

    // Add only selected series to the data set
    choiceContainer.find("input:checked").each(function (index, item) {
        var key = $(item).attr("name");
        var i = 0;
        var size = series.length;
        while(i < size && series[i].label != key)
            i++;
        if(i < size){
            var currentSeries = series[i];
            datasets.push(currentSeries);
            if(customizeSeries)
                customizeSeries(currentSeries);
        }
    });
    return datasets;
}

/*
 * Ignore case comparator
 */
function sortAlphaCaseless(a,b){
    return a.toLowerCase() > b.toLowerCase() ? 1 : -1;
};

/*
 * Creates a legend in the specified element with graph information
 */
function createLegend(choiceContainer, infos) {
    // Sort series by name
    var keys = [];
    $.each(infos.data.result.series, function(index, series){
        keys.push(series.label);
    });
    keys.sort(sortAlphaCaseless);

    // Create list of series with support of activation/deactivation
    $.each(keys, function(index, key) {
        var id = choiceContainer.attr('id') + index;
        $('<li />')
            .append($('<input id="' + id + '" name="' + key + '" type="checkbox" checked="checked" hidden />'))
            .append($('<label />', { 'text': key , 'for': id }))
            .appendTo(choiceContainer);
    });
    choiceContainer.find("label").click( function(){
        if (this.style.color !== "rgb(129, 129, 129)" ){
            this.style.color="#818181";
        }else {
            this.style.color="black";
        }
        $(this).parent().children().children().toggleClass("legend-disabled");
    });
    choiceContainer.find("label").mousedown( function(event){
        event.preventDefault();
    });
    choiceContainer.find("label").mouseenter(function(){
        this.style.cursor="pointer";
    });

    // Recreate graphe on series activation toggle
    choiceContainer.find("input").click(function(){
        infos.createGraph();
    });
}
