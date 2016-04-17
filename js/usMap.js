
Usmap = function(_data){
    this.us = _data;
   // this.displayData = []; // see data wrangling

    // DEBUG RAW DATA
    //console.log(this.data);

    this.initVis();
}



Usmap.prototype.initVis = function(){
    var vis = this;
    //console.log(vis.us);
    vis.width = 960, vis.height = 580;  // map width and height, matches

    vis.projection = d3.geo.albersUsa()   // define our projection with parameters
        .scale(600)
        .translate([vis.width / 2, vis.height / 2])
        .precision(.1);


    vis.path = d3.geo.path()  // create path generator function
        .projection(vis.projection);  // add our define projection to it


    vis.svg = d3.select("#map").append("svg")   // append a svg to our html div to hold our map
        .attr("width", vis.width)
        .attr("height", vis.height);

    vis.graticule = d3.geo.graticule();

    vis.svg.insert("path", ".graticule")
        .datum(topojson.feature(vis.us, vis.us.objects.land))
        .attr("class", "land")
        .attr("d", vis.path);

    vis.svg.insert("path", ".graticule")
        .datum(topojson.mesh(vis.us, vis.us.objects.states, function(a, b) { return a !== b; }))
        .attr("class", "state-boundary")
        .attr("d", vis.path);

}