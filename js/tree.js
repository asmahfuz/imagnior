
Hier = function(_data){
    this.td = _data;
    // this.displayData = []; // see data wrangling

    // DEBUG RAW DATA
    //console.log(this.data);

    this.treeChart();
}

Hier.prototype.treeChart = function() {

    vis = this;
    vis.diameter = 960;

    vis.tree = d3.layout.tree()
        .size([360, vis.diameter / 2 - 120])
        .separation(function (a, b) {
            return (a.parent == b.parent ? 1 : 2) / a.depth;
        });

    vis.diagonal = d3.svg.diagonal.radial()
        .projection(function (d) {
            return [d.y, d.x / 180 * Math.PI];
        });

    vis.svg = d3.select("body").append("svg")
        .attr("width", vis.diameter)
        .attr("height", vis.diameter - 150)
        .append("g")
        .attr("transform", "translate(" + vis.diameter / 2 + "," + vis.diameter / 2 + ")");

    /*d3.json("flare.json", function(error, root) {
     if (error) throw error; */

    /*vis.nodesByName = {};

    // Create nodes for each unique source and target.
    vis.td.forEach(function(link) {
        vis.parent = link.source = vis.nodeByName(link.source);
            child = link.target = vis.nodeByName(link.target);
        if (vis.parent.children) vis.parent.children.push(child);
        else vis.parent.children = [vis.child];
    });

    vis.nodes = tree.nodes(links[0].source); */








    vis.nodes = vis.tree.nodes(vis.td);
    vis.links = vis.tree.links(vis.nodes);
    ////console.log(vis.nodes);
    console.log(vis.links);

     vis.link = vis.svg.selectAll(".link")
     .data(vis.links)
     .enter().append("path")
     .attr("class", "link")
     .attr("d", vis.diagonal);

     vis.node = vis.svg.selectAll(".node")
     .data(vis.nodes)
     .enter().append("g")
     .attr("class", ".node")
     //.attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })

     vis.node.append("circle")
     .attr("r", 4.5);

     vis.node.append("text")
     .attr("dy", ".31em")
     .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
     .attr("transform", function(d) { return d.x < 180 ? "translate(8)" : "rotate(180)translate(-8)"; })
     .text(function(d) { return d.name; });
     //});

     d3.select(self.frameElement).style("height", vis.diameter - 150 + "px");


};