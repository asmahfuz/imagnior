Donutchart = function(_data){
    this.us = _data;
   // this.displayData = []; // see data wrangling

    // DEBUG RAW DATA
    //console.log(this.data);

    this.initVis();
}



Donutchart.prototype.initVis = function(){

var donutchart = c3.generate({
        data: {
          columns: [

          ["American La France",977 ],
          ["Autocar LLC",9772 ],
          ["Caterpiller",1049 ],
          ["Crane Carrier",1612 ],
          ["Freightliner",317299 ],
          ["Hendrickson",7 ],
          ["International",208663 ],
          ["Kenworth",126299 ],
          ["Lodal",23 ],
          ["Mack",92778 ],
          ["Oshkosh",530 ],
          ["Peterbilt",133489 ],
          ["Sterling Truck",30619 ],
          ["Volvo",114663 ],
          ["Western Star", 10795]
          ],

          type : 'donut',
          onmouseover: function (d, i) { console.log("onmouseover", d, i, this); },
          onmouseout: function (d, i) { console.log("onmouseout", d, i, this); },
          onclick: function (d, i) { console.log("onclick", d, i, this); },
          order: null // set null to disable sort of data. desc is the default.
        },

        axis: {
          x: {
            label: 'Sepal.Width'
          },
          y: {
            label: 'Petal.Width'
          }
        },
        donut: {
          label: {
//            format: function (d, ratio) { return ""; }
          },
          title: "Market Share",
          width: 70
        }
      });
    
    }
