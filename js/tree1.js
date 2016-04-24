
Hier1 = function(_data){
    this.td = _data;
    // this.displayData = []; // see data wrangling

    // DEBUG RAW DATA
    //console.log(this.data);

    this.treeChart();
}

Hier1.prototype.treeChart = function() {

    vis = this;
    vis.width = 600,
    vis.height = 700;

    vis.tree = d3.layout.tree()
        //.children(function(d) { return d.root?d.root : d.values })
        .size([vis.height, vis.width - 100])
       // .size([700, 500]);
      /*  .separation(function (a, b) {
        return (a.parent == b.parent ? 1 : 2) / a.depth;
    }); */



    vis.diagonal = d3.svg.diagonal()
        .projection(function(d) { return [d.y, d.x]; });

    vis.svg = d3.select("#map").append("svg")
        .attr("width", vis.width)
        .attr("height", vis.height)
        .append("g")
        .attr("transform", "translate(0,20)");









    vis.nodes = vis.tree.nodes(vis.td);
    vis.links = vis.tree.links(vis.nodes);


    //console.log(vis.nodes.children);
    //console.log(vis.links);

    vis.link = vis.svg.selectAll("path.link")
        .data(vis.links)
        .enter().append("path")
        .attr("class", "link")
        .attr("d", vis.diagonal);

    vis.node = vis.svg.selectAll("g.node")
        .data(vis.nodes)
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + d.y + "," + d.x  + ")"; })


    vis.node.append("circle")
     .attr("r", 4.5);

    vis.node.append("text")
        .attr("dx", function(d) { return d.children ? -8 : 8; })
        .attr("dy", 3)
        .attr("text-anchor", function(d) { return d.children ? "end" : "start"; })
        .text(function(d) { return d.name; });


    //d3.select(self.frameElement).style("height", vis.height + "px");


};