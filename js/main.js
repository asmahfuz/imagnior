

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
        .await(processData);
}

    function processData(error, qdata1, qdata2, qdata3, qdata4){
        if (!error) {
            // Filter data based on 'Major Accounts' that have Registration Name available'
            cdata = qdata1.filter(function (crow) {
                var cFilter = 'NAME NOT AVAILABLE';
                return crow['MAJOR ACCOUNT'] == 'YES' && crow['REGISTRATION NAME'].indexOf(cFilter) == -1;
            });
            vdata = qdata2.filter(function (vrow) {
                //var vFiltrer = '911189635330084';
                return vrow
            });




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

            //console.log(qdata3.objects.states.geometries);

            statesdata = states;
            mdata = qdata3;

            createVis();

    }


function createVis() {

	chomap = new Usmap(mdata);

}

