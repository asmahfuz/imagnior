
// Set ordinal color scale
var colorScale = d3.scale.category20();

// Variables for the visualization instances
var chomap


// Start application by loading the data
loadData();

function loadData() {
    queue()
        .defer(d3.csv, "data/Polk_account_info.csv")
        .defer(d3.csv, "data/Polk_vehicle_info.csv")
        .defer(d3.json, "data/us.json")
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

            mdata = qdata3;

            // store the path in variable for ease
            var states = topojson.feature(qdata3, qdata3.objects.states).features

            for (var i in states) {    // for each states
                for (var j in qdata4) {  // for each row in the TSV
                    if (states[i].id == qdata4[j].id) {   // if they match
                         states[i].code = qdata4[j].code  // add state code in topojson object
                     }
                  }
                }

            var starr =  []
            for(x in cdata)
                starr.push(cdata[x]["REGISTRATION STATE"]);
            var count = 0;
            for (var i in states) {    // for each states
                 var stcode = states[i].code
                 for (var c = 0; c < starr.length; ++c) {
                    if (starr[c] == stcode)
                        count++;
                }
                //console.log(count);
                states[i].cn = count
                var count = 0;
            }


        }

            //console.log(states);

            createVis();

    }


function createVis() {

	// TO-DO: Instantiate visualization objects here
	// areachart = new ...
	chomap = new Usmap(mdata);
	//timeline = new Timeline("timeline", allData.years);
	//brushed();
}


/*function brushed() {
// Set new domain if brush (user selection) is not empty
	//console.log(timeline.x.domain());
	areachart.x.domain(timeline.brush.empty()? timeline.xContext.domain() : timeline.brush.extent());
// Update focus chart (detailed information)
	areachart.wrangleData();

} */