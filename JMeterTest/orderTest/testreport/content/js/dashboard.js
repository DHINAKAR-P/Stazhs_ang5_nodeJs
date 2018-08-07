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
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 87.5, "KoPercent": 12.5};
    var dataset = [
        {
            "label" : "KO",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "OK",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.3333333333333333, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.0, 500, 1500, "69 /api/SalesOrder/get/"], "isController": false}, {"data": [0.5, 500, 1500, "69 /api/SalesOrder/get/580"], "isController": false}, {"data": [0.0, 500, 1500, "69 /api/SalesOrder/get/528"], "isController": false}, {"data": [0.0, 500, 1500, "69 /api/SalesOrder/get/144"], "isController": false}, {"data": [0.3125, 500, 1500, "41 /auth/login"], "isController": false}, {"data": [0.4375, 500, 1500, "59 /api/SalesOrder/getall"], "isController": false}, {"data": [0.5, 500, 1500, "69 /api/SalesOrder/get/574"], "isController": false}, {"data": [0.0, 500, 1500, "69 /api/SalesOrder/get/533"], "isController": false}, {"data": [0.5, 500, 1500, "69 /api/SalesOrder/get/149"], "isController": false}, {"data": [0.5, 500, 1500, "69 /api/SalesOrder/get/554"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 24, 3, 12.5, 1258.6666666666667, 314, 1574, 1547.0, 1569.25, 1574.0, 4.734661668968239, 108.98969224699152, 4.008549208423752], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Throughput", "Received", "Sent"], "items": [{"data": ["69 /api/SalesOrder/get/", 1, 1, 100.0, 356.0, 356, 356, 356.0, 356.0, 356.0, 2.8089887640449436, 1.4127238412921348, 1.1493811446629214], "isController": false}, {"data": ["69 /api/SalesOrder/get/580", 1, 0, 0.0, 1308.0, 1308, 1308, 1308.0, 1308.0, 1308.0, 0.764525993883792, 2.117378631498471, 0.8951822916666666], "isController": false}, {"data": ["69 /api/SalesOrder/get/528", 1, 0, 0.0, 1574.0, 1574, 1574, 1574.0, 1574.0, 1574.0, 0.6353240152477764, 0.929409545743329, 0.7438998967598475], "isController": false}, {"data": ["69 /api/SalesOrder/get/144", 1, 0, 0.0, 1539.0, 1539, 1539, 1539.0, 1539.0, 1539.0, 0.649772579597141, 1.8116217917478883, 0.7189378248862899], "isController": false}, {"data": ["41 /auth/login", 8, 1, 12.5, 1422.125, 1296, 1555, 1555.0, 1555.0, 1555.0, 3.2679738562091503, 5.405800015318627, 1.4504825367647058], "isController": false}, {"data": ["59 /api/SalesOrder/getall", 8, 1, 12.5, 1022.875, 314, 1321, 1321.0, 1321.0, 1321.0, 3.252032520325203, 212.07682291666666, 3.3802559705284554], "isController": false}, {"data": ["69 /api/SalesOrder/get/574", 1, 0, 0.0, 1491.0, 1491, 1491, 1491.0, 1491.0, 1491.0, 0.670690811535882, 1.856844190140845, 0.8023400821596244], "isController": false}, {"data": ["69 /api/SalesOrder/get/533", 1, 0, 0.0, 1533.0, 1533, 1533, 1533.0, 1533.0, 1533.0, 0.6523157208088715, 1.3868079337899544, 0.7013668052837574], "isController": false}, {"data": ["69 /api/SalesOrder/get/149", 1, 0, 0.0, 1379.0, 1379, 1379, 1379.0, 1379.0, 1379.0, 0.7251631617113851, 2.6485451414068164, 0.7796920322697607], "isController": false}, {"data": ["69 /api/SalesOrder/get/554", 1, 0, 0.0, 1468.0, 1468, 1468, 1468.0, 1468.0, 1468.0, 0.6811989100817438, 0.9918628661444142, 0.8508334042915532], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Percentile 1
            case 8:
            // Percentile 2
            case 9:
            // Percentile 3
            case 10:
            // Throughput
            case 11:
            // Kbytes/s
            case 12:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["400/Bad Request", 1, 33.333333333333336, 4.166666666666667], "isController": false}, {"data": ["401/Unauthorized", 2, 66.66666666666667, 8.333333333333334], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 24, 3, "401/Unauthorized", 2, "400/Bad Request", 1, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["69 /api/SalesOrder/get/", 1, 1, "401/Unauthorized", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["41 /auth/login", 8, 1, "400/Bad Request", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["59 /api/SalesOrder/getall", 8, 1, "401/Unauthorized", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
