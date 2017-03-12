var clockD3 = function(TZhr, faceColor, handColor, city) {  
  //get time
  var fields = function() {
    var currentTime = new Date();
    var sec = currentTime.getSeconds();
    var min = currentTime.getMinutes() + sec / 60;
    var hor = currentTime.getHours() + min / 60 + sec / 3600 + TZhr;
    return data = [
      {
        "unit": "seconds",
        "numeric": sec
      }, {
        "unit": "minutes",
        "numeric": min
      }, {
        "unit": "hours",
        "numeric": hor
      }
    ];
  };

  //set scale
  var offSetX = 90;
  var offSetY = 100;
  var pi = Math.PI;
  var scaleSecs = d3.scale.linear()
                          .domain([0, 59 + 999/1000])
                          .range([0, 2 * pi]);
  var scaleMins = d3.scale.linear()
                          .domain([0, 59 + 59/60])
                          .range([0, 2 * pi]) ;
  var scaleHors = d3.scale.linear()
                          .domain([0, 11 + 59/60])
                          .range([0, 2 * pi]);


  //set svg/clockface
  var width = 180;
  var height = 220;
  var svg = d3.selectAll(".clocks")
              .append("svg")
              .classed("clocksvg", true)
              .attr("width", width)
              .attr("height", height);
  var clockFace = svg.append("g") 
                    .attr("transform", "translate(" + offSetX + "," + offSetY + ")"); 
  clockFace.append("circle")
          .attr("r", 80)
          .attr("fill", faceColor)
          .attr("stroke", handColor)
          .attr("stroke-width", 2);
  clockFace.append("circle")
          .attr("r", 4)
          .attr("fill", handColor)
          .attr("class", "clock innercircle")

  //clockhands
  var render = function(data) {
    clockFace.selectAll(".clockhand").remove();
    var secArc = d3.svg.arc()
                      .innerRadius(0)
                      .outerRadius(70)
                      .startAngle(function(d) {
                        return scaleSecs(d.numeric);
                      })
                      .endAngle(function(d) {
                        return scaleSecs(d.numeric)
                      });
    var minArc = d3.svg.arc()
                      .innerRadius(0)
                      .outerRadius(60)
                      .startAngle(function(d) {
                        return scaleMins(d.numeric);
                      })
                      .endAngle(function(d) {
                        return scaleMins(d.numeric)
                      });
    var horArc = d3.svg.arc()
                      .innerRadius(0)
                      .outerRadius(50)
                      .startAngle(function(d) {
                        return scaleHors(d.numeric % 12);
                      })
                      .endAngle(function(d) {
                        return scaleHors(d.numeric % 12)
                      });
    clockFace.selectAll(".clockhand")
             .data(data)
             .enter()
             .append("svg:path")
             .attr("d", function(d) {
              if (d.unit === "seconds") {
                return secArc(d);
              }
              else if (d.unit === "minutes") {
                return minArc(d);
              }
              else if (d.unit === "hours") {
                return horArc(d);
              }
             })
             .attr("class", "clockhand")
             .attr("stroke", handColor)
             .attr("stroke-width", function(d) {
              if (d.unit === "seconds") {
                return 1;
              }
              else if (d.unit === "minutes") {
                return 3;
              }
              else if (d.unit === "hours") {
                return 4;
              }
             })
             .attr("fill", "none");
  };

//set clock name(city)
  var clockName = svg.append("text")
                    .attr("x", 90)
                    .attr("y", 210)
                    .attr("text-anchor", "middle")
                    .text(city)

//set interval
  setInterval(function() {
    var data;
    data = fields();
    return render(data);
  }, 1000);
};
