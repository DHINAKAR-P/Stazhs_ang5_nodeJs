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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.4375, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.5, 500, 1500, "90 /api/PurchaseOrders/get/H1yWxre9ifQ                         "], "isController": false}, {"data": [0.375, 500, 1500, "89 /api/PurchaseOrders/getall"], "isController": false}, {"data": [0.5, 500, 1500, "90 /api/PurchaseOrders/get/BkPZJrecifQ                         "], "isController": false}, {"data": [0.3125, 500, 1500, "41 /auth/login"], "isController": false}, {"data": [1.0, 500, 1500, "90 /api/PurchaseOrders/get/HJLeSx9ofQ                          "], "isController": false}, {"data": [1.0, 500, 1500, "90 /api/PurchaseOrders/get/S1gGxrx9sMX                         "], "isController": false}, {"data": [0.0, 500, 1500, "90 /api/PurchaseOrders/get/"], "isController": false}, {"data": [1.0, 500, 1500, "90 /api/PurchaseOrders/get/Hyplrlqofm                          "], "isController": false}, {"data": [0.5, 500, 1500, "90 /api/PurchaseOrders/get/SyLeeSe5sMm                         "], "isController": false}, {"data": [0.5, 500, 1500, "90 /api/PurchaseOrders/get/Hkrzkre5oG7                         "], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 24, 3, 12.5, 976.125, 250, 2403, 1546.0, 2190.5, 2403.0, 5.663048607833884, 78.00195035983954, 5.106329636621047], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Throughput", "Received", "Sent"], "items": [{"data": ["90 /api/PurchaseOrders/get/H1yWxre9ifQ                         ", 1, 0, 0.0, 778.0, 778, 778, 778.0, 778.0, 778.0, 1.2853470437017993, 1.0694489074550129, 1.7547999678663238], "isController": false}, {"data": ["89 /api/PurchaseOrders/getall", 8, 1, 12.5, 704.375, 254, 1553, 1553.0, 1553.0, 1553.0, 3.073376872839032, 119.48202794852092, 3.212564228774491], "isController": false}, {"data": ["90 /api/PurchaseOrders/get/BkPZJrecifQ                         ", 1, 0, 0.0, 1325.0, 1325, 1325, 1325.0, 1325.0, 1325.0, 0.7547169811320754, 0.6279481132075472, 0.9625589622641509], "isController": false}, {"data": ["41 /auth/login", 8, 1, 12.5, 1557.5, 1311, 2403, 2403.0, 2403.0, 2403.0, 3.3030553261767133, 5.463830899050372, 1.4660533649876135], "isController": false}, {"data": ["90 /api/PurchaseOrders/get/HJLeSx9ofQ                          ", 1, 0, 0.0, 388.0, 388, 388, 388.0, 388.0, 388.0, 2.577319587628866, 2.14441043814433, 3.211581829896907], "isController": false}, {"data": ["90 /api/PurchaseOrders/get/S1gGxrx9sMX                         ", 1, 0, 0.0, 262.0, 262, 262, 262.0, 262.0, 262.0, 3.8167938931297707, 3.1756917938931295, 5.113907442748092], "isController": false}, {"data": ["90 /api/PurchaseOrders/get/", 1, 1, 100.0, 250.0, 250, 250, 250.0, 250.0, 250.0, 4.0, 2.01171875, 1.98828125], "isController": false}, {"data": ["90 /api/PurchaseOrders/get/Hyplrlqofm                          ", 1, 0, 0.0, 278.0, 278, 278, 278.0, 278.0, 278.0, 3.5971223021582737, 2.992918165467626, 4.826607464028776], "isController": false}, {"data": ["90 /api/PurchaseOrders/get/SyLeeSe5sMm                         ", 1, 0, 0.0, 750.0, 750, 750, 750.0, 750.0, 750.0, 1.3333333333333333, 1.109375, 1.890625], "isController": false}, {"data": ["90 /api/PurchaseOrders/get/Hkrzkre5oG7                         ", 1, 0, 0.0, 1301.0, 1301, 1301, 1301.0, 1301.0, 1301.0, 0.7686395080707148, 0.6395320906994619, 0.9562956379707918], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 24, 3, "401/Unauthorized", 2, "400/Bad Request", 1, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": ["89 /api/PurchaseOrders/getall", 8, 1, "401/Unauthorized", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["41 /auth/login", 8, 1, "400/Bad Request", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["90 /api/PurchaseOrders/get/", 1, 1, "401/Unauthorized", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
