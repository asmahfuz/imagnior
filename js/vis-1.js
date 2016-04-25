
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
    vis.width = 850, vis.height = 330;  // map width and height, matches


    function getColor(d) {
        return  d > 200 ? '#800026' :
            d > 110  ? '#BD0026' :
                d > 90  ? '#E31A1C' :
                    d > 70  ? '#FC4E2A' :
                        d > 50  ? '#FD8D3C' :
                            d > 30  ? '#FEB24C' :
                                d > 10  ? '#FED976' :
                                    '#FFEDA0'};

    //vis.color_domain = [50, 150, 350, 750, 1500]
    vis.ext_color_domain = [0, 10, 30, 50, 70, 90, 110, 200]
    vis.legend_labels = ["< 10", "10+", "30+", "50+", "70+", "90+", "110+", "> 200"]


    vis.projection = d3.geo.albersUsa()   // define our projection with parameters
        .scale(650)
        .translate([vis.width / 2, vis.height / 2])
        .precision(.1);


    vis.path = d3.geo.path()  // create path generator function
        .projection(vis.projection);  // add our define projection to it


    vis.svg = d3.select("#map").append("svg")   // append a svg to our html div to hold our map
        .attr("width", vis.width)
        .attr("height", vis.height);

    vis.div = d3.select("#map").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);




    vis.svg.selectAll("path")
        .data(vis.us.features)
        .enter()
        .append("path")
        .attr("d", vis.path)
        .style("stroke", "#fff")
        .style("stroke-width", "1")
        .style("fill", function(d) {
            // Get data value
            var value = d.properties.cn;
            if (value) {
                //If value exists…
                return getColor(value);
            } else {
                //If value is undefined…
                return "rgb(213,222,217)";
            }
        })


        //Adding mouseevents

        .on("mouseover", function(d) {
            vis.div.transition()
                .duration(200)
                .style("opacity", .9);
            vis.div.text(d.properties.name + " : " + d.properties.cn)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })

        .on("mouseout", function(d) {
            vis.div.transition()
                .duration(500)
                .style("opacity", 0);
        });



    //Adding legend for our Choropleth

    vis.legend = vis.svg.selectAll("g.legend")
        .data(vis.ext_color_domain)
        .enter().append("g")
        .attr("class", "legend");

    vis.ls_w = 20, vis.ls_h = 20;

    vis.legend.append("rect")
        .attr("x", 635)
        .attr("y", function(d, i){ return vis.height - (i*vis.ls_h) - 2*vis.ls_h;})
        .attr("width", vis.ls_w)
        .attr("height", vis.ls_h)
        .style("fill", function(d, i) { return getColor(d); })
        .style("opacity", 0.8);

    vis.legend.append("text")
        .attr("x",660)
        .attr("y", function(d, i){ return vis.height - (i*vis.ls_h) - vis.ls_h - 4;})
        .text(function(d, i){ return vis.legend_labels[i]; });



}