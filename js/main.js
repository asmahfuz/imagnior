

// Variables for the visualization instances
var chomap


// Start application by loading the data
loadData();

function loadData() {
    queue()
        .defer(d3.csv, "data/Polk_account_info.csv")
        .defer(d3.csv, "data/Polk_vehicle_info.csv")
        //.defer(d3.json, "data/us.json")
        .defer(d3.json, "data/us-states.json")
        .defer(d3.tsv, "data/us-state-names.txt")
        .defer(d3.csv, "data/Polk_vehicle_tree.csv")
        .await(processData);
}

    function processData(error, qdata1, qdata2, qdata3, qdata4, qdata5){
        if (!error) {
            // Filter data based on 'Major Accounts' that have Registration Name available'
            cdata = qdata1.filter(function (crow) {
                var cFilter = 'NAME NOT AVAILABLE';
                return crow['MAJOR ACCOUNT'] == 'YES' && crow['REGISTRATION NAME'].indexOf(cFilter) == -1;
            });
            q5data = qdata5.filter(function (vrow) {
                //var vFiltrer = 2014;
                return vrow['YEAR'] == 2014 ;
            });


            /*var vdata = d3.nest()
                    .key(function(e) { YEAR: return e.YEAR; })
                    .key(function(e) { return e.MAKE; })
                    .key(function(e) { return e.SEGMENT; })
                    .key(function(e) { return e.LITERS; })
                    .key(function(e) { return e.CID; })
                    .rollup(function(v) { return { 'count' : v.length}})
                    //.rollup(function(d) { return {NUMBER: d3.count(d.YEAR)}})
                    .entries(qdata5); */

            /*var dataNest = d3.nest()
                .key(function (d) { return d.YEAR })
                .key(function (d) { return d.MAKE })

                .rollup(function (dd) {
                    targets = { children: [] };
                    dd.forEach(function (ddd) { targets.children.push({ "key": ddd.SEGMENT, "name": ddd.LITERS }) });
                    return targets;
                })
                .entries(qdata5); */

            dataNest = _.nest(q5data, ["MAKE", "SEGMENT", "CID"], _.uniq);


           /* dataNest.removeChild = function(idxToRemove) {
                var i, len, results;
                results = [];
                for (i = 0, len = this.children.length; i < len; i++) {
                    if (i !== idxToRemove) {
                        results.push(dataNest.children[i]);
                    }
                }
                this.children = results;
            };

            t = dataNest.removeChild(2);*/




         /*   function click(d) {
                if (d.children) {
                   // d._children = d.children;
                    if (d.depth == 0) {
                    d.children = null;}
                } else {
                    d.children = d._children;
                    d._children = null;
                }};
            click(dataNest); */

           // console.log(dataNest.children)
            /*function getProperty(json, path) {
                var tokens = path.split(".");
                var obj = json;
                for (var i = 0; i < tokens.length; i++) {
                    obj = obj[tokens[i]];
                }
                return obj;
            }

            var fields = ["children", "children", "children", "children", "children", "children", "children"];

            for (var i = 0; i < fields.length; i++) {
                var value = getProperty(dataNest, fields[i]);
                console.log(fields[i] + "=" + value);
            } */

        /*  e = $.each(dataNest, function(key, val) {
               //console.log('a');
                    $.each(val, function(key1, val1) {
                        //console.log('n');
                            $.each(val1, function(key2, val2) {
                                if (key2 == 'children'){
                                     $.each(val2, function(key3, val3) {
                                         //console.log(key3, val3);
                                             $.each(val3, function(key4, val4) {

                                                 if (key4 == 'children'){
                                                  for(var i = 5; i < val4.length; i++) {
                                                  delete val4[i];
                                                  //console.log(val4[1]);
                                                  //val4 = val4[1]  ;
                                                  }};

                                                  console.log(key4, val4);





                                             });




                                    })};
                                //delete(val2);}
                      // $.each(val, function(key, val) {
                               // console.log(key, val);
                       });
                   });
              //  });
            }); */






            for (var i = 0; i < qdata4.length; i++) {
                // Grab State Name
                var dataState = qdata4[i].name;
                // Grab data value
                var dataValue = qdata4[i].code;
                // Find the corresponding state inside the GeoJSON
                for (var j = 0; j < qdata3.features.length; j++)  {
                    var jsonState = qdata3.features[j].properties.name;
                    if (dataState == jsonState) {
                        // Copy the data value into the JSON
                        qdata3.features[j].properties.code= dataValue;
                        // Stop looking through the JSON
                        break;
                    }
                }
            }

            var states = qdata3.features;
            //console.log(states);
            var starr =  []
            for(x in cdata)
                starr.push(cdata[x]["REGISTRATION STATE"]);
            //console.log(starr);
            var count = 0;
            for (var i in states) {    // for each states
                 var stcode = states[i].properties.code
                 for (var c = 0; c < starr.length; ++c) {
                    if (starr[c] == stcode)
                        count++;
                }
                //console.log(count);
                //states[i].cn = count;
                qdata3.features[i].properties.cn = count;
                var count = 0;
            }


        }

           // console.log(dataNest._children);
            //console.log(vdata);

            statesdata = states;
            mdata = qdata3;
            //tdata = dataNest;
            tdata = dataNest;
          //  console.log(tdata);
            createVis();

    }


function createVis() {


	//chomap = new Usmap(mdata);
   treemap = new Hier1(tdata);

}

