

			// Set the dimensions of the canvas / graph
		var margin = {top: 30, right: 20, bottom: 70, left: 50},
		    width = 600 - margin.left - margin.right,
		    height = 400 - margin.top - margin.bottom;

		// Parse the date / time
		var parseDate = d3.time.format("%Y").parse;

		// Set the ranges
		var x = d3.time.scale().range([0, width]);
		var y = d3.scale.linear().range([height, 0]);

		// Define the axes
		var xAxis = d3.svg.axis().scale(x)
		    .orient("bottom").ticks(10);

		var yAxis = d3.svg.axis().scale(y)
		    .orient("left").ticks(5);

		// Define the line
		var priceline = d3.svg.line()	
		    .x(function(d) { return x(d.date); })
		    .y(function(d) { return y(d.fleetsize); });


		    
		// Adds the svg canvas
		var svg = d3.select("#chart-area3").append("svg")
		    .append("svg")
		        .attr("width", 960 )
		        .attr("height", 580 )
		    .append("g")
		        .attr("transform", 
		              "translate(" + margin.left + "," + margin.top + ")");

		// Get the data
		d3.csv("data/volvo.csv", function(error, data) {
		    data.forEach(function(d) {
				d.date = parseDate(d.date);
				d.fleetsize = +d.fleetsize/1000000;
		    });

		    // Scale the range of the data
		    x.domain(d3.extent(data, function(d) { return d.date; }));
		    y.domain([0, d3.max(data, function(d) { return d.fleetsize; })]);

		    // Nest the entries by Company
		    var dataNest = d3.nest()
		        .key(function(d) {return d.company;})
		        .entries(data);

		    var color = d3.scale.category10();   // set the colour scale

		    legendSpace = 10; // spacing for the legend

		    // Loop through each Company / key
		    dataNest.forEach(function(d,i) { 

		        svg.append("path")
		            .attr("class", "line")
		            .style("stroke", function() { // Add the colours dynamically
		                return d.color = color(d.key); })
		            .attr("id", 'tag'+d.key.replace(/\s+/g, '')) // assign ID
		            .attr("d", priceline(d.values));

		        // Add the Legend
		        svg.append("text")
		            .attr("x", 10 + (legendSpace/2))  // space legend
            		.attr("y",  15 +(i-1)*legendSpace)
		            .attr("class", "legend")    // style the legend
		            .style("fill", function() { // Add the colours dynamically
		                return d.color = color(d.key); })
		            
		            // Mouse events programming
		            .on("click", function(){
		                // Determine if current line is visible 
		                var active   = d.active ? false : true,
		                newOpacity = active ? 0 : 1; 
		                // Hide or show the elements based on the ID
		                d3.select("#tag"+d.key.replace(/\s+/g, ''))
		                    .transition().duration(100) 
		                    .style("opacity", newOpacity); 
		                // Update whether or not the elements are active
		                d.active = active;
		                })  
		            .text(d.key); 

		    });

		    // Add the X Axis
		    svg.append("g")
		        .attr("class", "x axis")
		        .attr("transform", "translate(0," + height + ")")
		        .call(xAxis);

		    // Add the Y Axis
		    svg.append("g")
		        .attr("class", "y axis")
		        .call(yAxis);

		});

