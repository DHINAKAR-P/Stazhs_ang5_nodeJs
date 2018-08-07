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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.4375, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "58 /api/Shipments/get/86"], "isController": false}, {"data": [1.0, 500, 1500, "58 /api/Shipments/get/54"], "isController": false}, {"data": [1.0, 500, 1500, "58 /api/Shipments/get/62"], "isController": false}, {"data": [1.0, 500, 1500, "58 /api/Shipments/get/103"], "isController": false}, {"data": [1.0, 500, 1500, "58 /api/Shipments/get/104"], "isController": false}, {"data": [0.375, 500, 1500, "50 /api/Shipments/getall"], "isController": false}, {"data": [0.5, 500, 1500, "57 /api/Shipments/get/103"], "isController": false}, {"data": [0.5, 500, 1500, "57 /api/Shipments/get/54"], "isController": false}, {"data": [0.0, 500, 1500, "58 /api/Shipments/get/"], "isController": false}, {"data": [0.5, 500, 1500, "57 /api/Shipments/get/104"], "isController": false}, {"data": [0.25, 500, 1500, "57 /api/Shipments/get/62"], "isController": false}, {"data": [0.5, 500, 1500, "57 /api/Shipments/get/86"], "isController": false}, {"data": [0.125, 500, 1500, "41 /auth/login"], "isController": false}, {"data": [0.0, 500, 1500, "57 /api/Shipments/get/"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 32, 4, 12.5, 1071.4999999999998, 266, 1997, 1751.5, 1912.4999999999998, 1997.0, 5.449591280653951, 52.7766173152248, 4.907592440820845], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Throughput", "Received", "Sent"], "items": [{"data": ["58 /api/Shipments/get/86", 1, 0, 0.0, 300.0, 300, 300, 300.0, 300.0, 300.0, 3.3333333333333335, 12.965494791666668, 3.583984375], "isController": false}, {"data": ["58 /api/Shipments/get/54", 2, 0, 0.0, 357.0, 326, 388, 388.0, 388.0, 388.0, 4.366812227074235, 21.480110534934497, 5.142944868995633], "isController": false}, {"data": ["58 /api/Shipments/get/62", 2, 0, 0.0, 355.5, 307, 404, 404.0, 404.0, 404.0, 2.0161290322580645, 17.261135962701612, 2.2642074092741935], "isController": false}, {"data": ["58 /api/Shipments/get/103", 1, 0, 0.0, 427.0, 427, 427, 427.0, 427.0, 427.0, 2.34192037470726, 19.805693793911008, 2.803900761124122], "isController": false}, {"data": ["58 /api/Shipments/get/104", 1, 0, 0.0, 408.0, 408, 408, 408.0, 408.0, 408.0, 2.450980392156863, 6.917317708333334, 2.872242647058824], "isController": false}, {"data": ["50 /api/Shipments/getall", 8, 1, 12.5, 930.125, 273, 1997, 1997.0, 1997.0, 1997.0, 2.831858407079646, 74.83372511061947, 2.949045907079646], "isController": false}, {"data": ["57 /api/Shipments/get/103", 1, 0, 0.0, 1315.0, 1315, 1315, 1315.0, 1315.0, 1315.0, 0.7604562737642585, 6.43120247148289, 0.9126960551330798], "isController": false}, {"data": ["57 /api/Shipments/get/54", 2, 0, 0.0, 1390.0, 1353, 1427, 1427.0, 1427.0, 1427.0, 1.3468013468013469, 6.624842171717171, 1.5901199494949494], "isController": false}, {"data": ["58 /api/Shipments/get/", 1, 1, 100.0, 266.0, 266, 266, 266.0, 266.0, 266.0, 3.7593984962406015, 1.8907131109022555, 1.541940789473684], "isController": false}, {"data": ["57 /api/Shipments/get/104", 1, 0, 0.0, 1342.0, 1342, 1342, 1342.0, 1342.0, 1342.0, 0.7451564828614009, 2.103029526825633, 0.8754133289865871], "isController": false}, {"data": ["57 /api/Shipments/get/62", 2, 0, 0.0, 1485.0, 1363, 1607, 1607.0, 1607.0, 1607.0, 0.9770395701025891, 8.364947178798241, 1.100123656570591], "isController": false}, {"data": ["57 /api/Shipments/get/86", 1, 0, 0.0, 1301.0, 1301, 1301, 1301.0, 1301.0, 1301.0, 0.7686395080707148, 2.9897374615680246, 0.8286894696387395], "isController": false}, {"data": ["41 /auth/login", 8, 1, 12.5, 1629.3749999999998, 1441, 1867, 1867.0, 1867.0, 1867.0, 3.522677234698371, 5.827123926684281, 1.563532034346103], "isController": false}, {"data": ["57 /api/Shipments/get/", 1, 1, 100.0, 1278.0, 1278, 1278, 1278.0, 1278.0, 1278.0, 0.7824726134585289, 0.39352870696400627, 0.32322843309859156], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["400/Bad Request", 1, 25.0, 3.125], "isController": false}, {"data": ["401/Unauthorized", 3, 75.0, 9.375], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 32, 4, "401/Unauthorized", 3, "400/Bad Request", 1, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["50 /api/Shipments/getall", 8, 1, "401/Unauthorized", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["58 /api/Shipments/get/", 1, 1, "401/Unauthorized", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["41 /auth/login", 8, 1, "400/Bad Request", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["57 /api/Shipments/get/", 1, 1, "401/Unauthorized", 1, null, null, null, null, null, null, null, null], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
