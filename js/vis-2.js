//Establish Drawing Area
var width = 480,
   height = 580;

var svg1 = d3.select("#chart-area2").append("svg")
   .attr("width", width)
   .attr("height", height);

//Global Variable
var account;

//Load Data
d3.csv("data/Polk_account_info.csv",function(error, data) {
   account = data;

   //console.log(account);

   //Convert Data
   account.forEach(function (d) {
       //Convert numeric values to 'numbers'
       d['PARENT HQ LOCAL FLEET SIZE'] = +d['PARENT HQ LOCAL FLEET SIZE'];
       d['PARENT HQ NATL. FLEET SIZE'] = +d['PARENT HQ NATL. FLEET SIZE'];
       d['REGISTRATION LOCAL FLEET SIZE'] = +d['REGISTRATION LOCAL FLEET SIZE'];
       d['REGISTRATION NATL FLEET SIZE'] = +d['REGISTRATION NATL FLEET SIZE'];
   });

   //Count data by State
   //SALES = account.filter(function(d){
       //if (d.WHO_region == "African" && d.At_risk>=10000000){
         //  return d;
       //}
   //});

   //Sort data by account.length
   account.sort(function(a, b){
       return b.length-a.length;
   });

   //Total Sales(account.length) SVG Rectangles
   svg1.selectAll("rect")
       .data(account)
       .enter()
       .append("rect")
       .style("fill", "blue")//function(d){
       //return color(d.At_risk);
       //})
       .attr("height",15)
       .attr("width", function (d){
           return account.length/2000;
       })
       .attr("x", 225)
       .attr("y", function(d,index){
           return (index * 20)+15;
       });

   //Add State Labels for Total sales(account.length)
   svg1.selectAll(".text_black")
       .data(account)
       .enter()
       .append("text")
       .text(function(d){
           return d['REGISTRATION STATE'];
       })
       .attr("class", "text_black")
       .attr("x", 220)
       .attr("y", function(d, index){
           return (index * 20) + 27;
       })
       .attr("text-anchor", "end");

   //Add Total Sales Labels
   svg1.selectAll(".text_black1")
       .data(account)
       .enter()
       .append("text")
       .text(function(d){return (account.length/1.0e3).toFixed(0) + "K";})
       .attr("class", "text_black1")
       .attr("x",function(d){
           return (account.length/2000) + 230;
       })
       .attr("y", function(d, index){
           return (index*20) + 27;
       })
       .attr("fill", "black")
       .attr("font-size", 10)
       .attr("text-anchor", "start");
});