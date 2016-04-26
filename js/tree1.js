Hier1 = function(_data){
    this.td = _data;
    // this.displayData = []; // see data wrangling

    // DEBUG RAW DATA
    //console.log(this.data);

    this.treeChart();
}

Hier1.prototype.treeChart = function() {

    vis = this;

    vis.margin = {top: 20, right: 120, bottom: 20, left: 120};
    vis.width = 960 - vis.margin.right - vis.margin.left;
    vis.height = 500 - vis.margin.top - vis.margin.bottom;

    vis.i = 0;
    vis.duration = 750;
    //vis.root;


    vis.tree = d3.layout.tree().size([vis.height, vis.width]);


    vis.diagonal = d3.svg.diagonal().projection(function (d) {
        return [d.y, d.x];
    });

    vis.svg = d3.select("#chart-area4").append("svg")
        .attr("width", vis.width + vis.margin.right + vis.margin.left)
        .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

    vis.root = this.td;
    vis.root.x0 = vis.height / 2;
    //console.log(vis.x0);
    vis.root.y0 = 0;
    //console.log(vis.y0);
    //console.log(vis.root);
    //console.log(vis.root[0]);

    function collapse(d) {
        if (d.children) {
            d._children = d.children;
            d._children.forEach(collapse);
            d.children = null;
        }
    }

    vis.root.children.forEach(collapse);
    update(vis.root);


//update(vis.root);

    d3.select(self.frameElement).style("height", "500px");

    function update(source) {

        // Compute the new tree layout.
        vis.nodes = vis.tree.nodes(vis.td);
        vis.links = vis.tree.links(vis.nodes);


        // Normalize for fixed-depth.
        vis.nodes.forEach(function (d) {
            d.y = d.depth * 180;
        });

        // Update the nodes…
        vis.node = vis.svg.selectAll("g.node")
            .data(vis.nodes, function (d) {
                return d.id || (d.id = ++vis.i);
            });

        // Enter any new nodes at the parent's previous position.
        vis.nodeEnter = vis.node.enter().append("g")
            .attr("class", "node")
            .attr("transform", function (d) {
                return "translate(" + source.y0 + "," + source.x0 + ")";
            })
            .on("click", click);

        vis.nodeEnter.append("circle")
            .attr("r", 1e-6)
            .style("fill", function (d) {
                return d._children ? "lightsteelblue" : "#fff";
            });

        vis.nodeEnter.append("text")
            .attr("x", function (d) {
                return d.children || d._children ? -13 : 13;
            })
            .attr("dy", ".35em")
            .attr("text-anchor", function (d) {
                return d.children || d._children ? "end" : "start";
            })
            .text(function (d) {
                return d.name;
            })
            .style("fill-opacity", 1e-6);

        // Transition nodes to their new position.
        vis.nodeUpdate = vis.node.transition()
            .duration(vis.duration)
            .attr("transform", function (d) {
                return "translate(" + d.y + "," + d.x + ")";
            });

        vis.nodeUpdate.select("circle")
            .attr("r", 8)
            .style("fill", function (d) {
                return d._children ? "lightsteelblue" : "#fff";
            });

        vis.nodeUpdate.select("text")
            .style("fill-opacity", 1);

        // Transition exiting nodes to the parent's new position.
        vis.nodeExit = vis.node.exit().transition()
            .duration(vis.duration)
            .attr("transform", function (d) {
                return "translate(" + source.y + "," + source.x + ")";
            })
            .remove();

        vis.nodeExit.select("circle")
            .attr("r", 1e-6);

        vis.nodeExit.select("text")
            .style("fill-opacity", 1e-6);

        // Update the links…
        vis.link = vis.svg.selectAll("path.link")
            .data(vis.links, function (d) {
                return d.target.id;
            });

        // Enter any new links at the parent's previous position.
        vis.link.enter().insert("path", "g")
            .attr("class", "link")
            .attr("d", function (d) {
                var o = {x: source.x0, y: source.y0};
                return vis.diagonal({source: o, target: o});
            });

        // Transition links to their new position.
        vis.link.transition()
            .duration(vis.duration)
            .attr("d", vis.diagonal);

        // Transition exiting nodes to the parent's new position.
        vis.link.exit().transition()
            .duration(vis.duration)
            .attr("d", function (d) {
                var o = {x: source.x, y: source.y};
                return vis.diagonal({source: o, target: o});
            })
            .remove();

        // Stash the old positions for transition.
        vis.nodes.forEach(function (d) {
            d.x0 = d.x;
            d.y0 = d.y;
        });


    }

    // Toggle children on click.
    function click(d) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        update(d);
    }




}