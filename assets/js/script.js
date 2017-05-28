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
  var scaleSecs = d3.scaleLinear()
                          .domain([0, 59 + 999/1000])
                          .range([0, 2 * pi]);
  var scaleMins = d3.scaleLinear()
                          .domain([0, 59 + 59/60])
                          .range([0, 2 * pi]) ;
  var scaleHors = d3.scaleLinear()
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
    var secArc = d3.arc()
                      .innerRadius(0)
                      .outerRadius(70)
                      .startAngle(function(d) {
                        return scaleSecs(d.numeric);
                      })
                      .endAngle(function(d) {
                        return scaleSecs(d.numeric)
                      });
    var minArc = d3.arc()
                      .innerRadius(0)
                      .outerRadius(60)
                      .startAngle(function(d) {
                        return scaleMins(d.numeric);
                      })
                      .endAngle(function(d) {
                        return scaleMins(d.numeric)
                      });
    var horArc = d3.arc()
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

//
//
//---------------------------------   GeoGlobe Start   ---------------------------------
//
//

function geoGlobe(pointColor, csvGeo, w, h) {
  //Inspired by https://habrahabr.ru/post/186532/
  var w;
  var h;
  var scrollSpeed = 50;
  var current = 180;
  // scale
  var longitudeScale = d3.scaleLinear()
    .domain([0, w])
    .range([-180, 180]);
  // projection
  var planetProj = d3.geoOrthographic()
    .scale(200)
    .rotate([longitudeScale(current), 0])
    .translate([w / 2, h / 2])
    .clipAngle(90);
  var pointProj = d3.geoOrthographic()
    .scale(200)
    .rotate([longitudeScale(current), 0])
    .translate([w / 2, h / 2])
    .clipAngle(90);
  // path
  var path = d3.geoPath()
    .projection(planetProj);
  // svg
  var svg = d3.select(".globe").append("svg")
    .attr("width", w)
    .attr("height", h);
  // mask
  var center = planetProj.translate();   
  // get the center of the circle
  var edge = planetProj([-90, 90]); 
  // edge point 
  var r = Math.pow(Math.pow(center[0] - edge[0], 2) + Math.pow(center[1] - edge[1], 2), 0.5); // radius

  svg.append("defs")
      .append("clipPath")
      .append("circle")
      .attr("id", "edgeCircle")
      .attr("cx", center[0])
      .attr("cy", center[1])
      .attr("r", r)
  var mask = svg.append("mask").attr("id", "edge")
  mask.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("fill", "white");
  mask.append("use")
      .attr("xlink:href", "#edgeCircle")
      .attr("fill", "black");
  // import data/draw globe
  d3.json("/assets/data/world.json", function(error, world) {
    if (error) throw error;
    var planet = svg.append("path")
      .datum(topojson.feature(world, world.objects.land))
      .attr("class", "land")
      .attr("d", path);
    d3.csv(csvGeo, function(error, data) {
      if (error) throw error;

      var max = d3.max(data, function(d) {
        return parseInt(d.Value);
      })
      var points = svg.selectAll(".point")
          .data(data)
          .enter()
          .append("circle")
          .attr("r", "3")
          .attr("fill", pointColor)
          .attr("class", "point")
          .attr("opacity", ".45");
      function bgscroll() {
        current += 1;
        planetProj.rotate([longitudeScale(current), 0]);
        pointProj.rotate([longitudeScale(current), 0]);
        planet.attr("d", path);
        // hide points at back
        points.attr("display", function(d) {
          var longitude = Number(d.Longitude) + 180;
          var startLongitude = 360 - ((longitudeScale(current) + 270) % 360);
          var endLongitude = (startLongitude + 180) % 360;
          if ((startLongitude < endLongitude && longitude > startLongitude && longitude < endLongitude) ||
              (startLongitude > endLongitude && (longitude > startLongitude || longitude < endLongitude)))
              return "block";
          else
              return "none";
      })
    .attr("cx", function(d) {
       return planetProj([d.Longitude, d.Latitude])[0];
     }).attr("cy", function(d) {
       return planetProj([d.Longitude, d.Latitude])[1];
     });
  }
       setInterval(bgscroll, scrollSpeed);  
    })
  })
}

//
//
//---------------------------------   GeoGlobe End   ---------------------------------
//
//

//
//
//---------------------------------   RadioButton Start   ---------------------------------
//
//
function radioButton() {
  var inputElems = d3.selectAll("input");
  timeSerie("/assets/data/o.film.csv");
  function inputChange() {
    d3.selectAll(".linecharts")
      .selectAll("*")
      .remove();
    if (this.value === "film") {
      timeSerie("/assets/data/o.film.csv");
    }
    else if (this.value === "name") {
      timeSerie("/assets/data/o.name.csv");
    }
  }

  inputElems.on("change", inputChange);
}
//
//
//---------------------------------   RadioButton End   ---------------------------------
//
//

//
//
//---------------------------------   TimeSeries Start   ---------------------------------
//
//

function timeSerie(csvTime) {
  //svg
  var w = 1200, h = 550,
      svg = d3.selectAll(".linecharts")
              .append("svg")
              .attr("width", w)
              .attr("height", h),
      margin = {top: 20, right: 350, bottom: 100, left: 110},
      width = w - margin.left - margin.right,
      height = h - margin.top - margin.bottom;

  var margin2 = {top: 475, right: 350, bottom: 30, left: 110},
      height2 = h - margin2.top - margin2.bottom;

  //parse time
  var parseTime = d3.timeParse("%H:%M");

  //scale
  var x = d3.scaleTime().range([0, width]),
      y = d3.scaleLinear().range([height, 0]),
      z = d3.scaleOrdinal(d3.schemeCategory20);

  //brush scale
  var x2 = d3.scaleTime().range([0, width]),
      y2 = d3.scaleLinear().range([height2, 0]);  
 
  //axes
  var xAxis = d3.axisBottom(x),
      xAxis2 = d3.axisBottom(x2),
      yAxis = d3.axisLeft(y);

  //line
  var line = d3.line()
      .curve(d3.curveBasis)
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.sum); });

  var line2 = d3.line()
      .curve(d3.curveBasis)
      .x(function(d) { return x2(d.date); })
      .y(function(d) { return y2(d.sum); });

  svg.append("defs")
     .append("clipPath")
     .attr("id", "clip")
     .append("rect")
     .attr("width", width)
     .attr("height", height);
 
  var focus = svg.append("g")
                 .attr("class", "focus")
                 .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  var context = svg.append("g")
                  .attr("class", "context")
                  .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");
  //get csv data
  d3.csv(csvTime, function(error, data) {
    if (error) throw error;

    z.domain(d3.keys(data[0]).filter(function(key) {
      return key !== "date"; 
    }));

    data.forEach(function(d) {
      d.date = parseTime(d.date);
    });

    var names = z.domain().map(function(id) {
      return {
        id: id,
        values: data.map(function(d) {
          return { 
            date: d.date, 
            sum: +d[id] 
          };
        }),
      visible: (id ? true : false) 
      };
    });

    //domain
    x.domain(d3.extent(data, function(d) { return d.date; }));
    x2.domain(x.domain());
    y.domain([
      d3.min(names, function(c) { return d3.min(c.values, function(d) { return d.sum; }); }),
      d3.max(names, function(c) { return d3.max(c.values, function(d) { return d.sum; }); })
    ]);
    y2.domain(y.domain());
    z.domain(names.map(function(c) { return c.id; }));

    //brush
    var brush = d3.brushX()
                  .extent([[0,0], [width, height2]])
                  .on("brush end", brushed);

    focus.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    focus.append("g")
        .attr("class", "axis axis--y")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("fill", "#000")
        .text("Mentioned in Tweets");

    var name = focus.selectAll(".name")
      .data(names)
      .enter().append("g")
        .attr("class", "name");

    name.append("path")
        .attr("class", "line")
        .attr("id", function(d) {
        return "line-" + d.id.replace(/ |:|\./gi, "");
      })
        .attr("d", function(d) { return line(d.values); })
        .style("stroke", function(d) { return z(d.id); })
        .on("mouseover", function(d) {
          d3.select(this)
            .transition()
            .attr("width", 17)
            .attr("height", 17)
            .attr("fill", function(d) {
              return z(d.id); 
            });

          d3.select("#line-" + d.id.replace(/ |:|\./gi, ""))
            .style("z-index", 100)            
            .transition()
            .style("stroke-width", 12)
            .style("opacity", 0.95);  
        })

        .on("mouseout", function(d){
          d3.select(this)
            .transition()
            .attr("width", 14)
            .attr("height", 14)
            .attr("fill", function(d) {
            return d.visible ? z(d.id) : "#F1F1F2";
            });

          d3.select("#line-" + d.id.replace(/ |:|\./gi, ""))
            .style("z-index", 1)
            .transition()
            .style("opacity", 0.8)
            .style("stroke-width", 7.5);
        });

    context.append("g")
           .attr("class", "axis axis--x")
           .attr("transform", "translate(0," + height2 + ")")
           .call(xAxis2);

    var name2 = context.selectAll(".name2")
      .data(names)
      .enter().append("g")
        .attr("class", "name2");

    name2.append("path")
        .attr("class", "line")
        .attr("d", function(d) { return line2(d.values); })
        .style("stroke", function(d) { return z(d.id); });

    context.append("g")
           .attr("class", "brush")
           .call(brush)
           .call(brush.move, x.range())        
           .attr("y", -6)
           .attr("height", height2);

    //legend
    var legend = 450 / names.length;

    //legend button
    name.append("rect")
        .attr("width", 14)
        .attr("height", 14)
        .attr("x", width + (margin.right / 4) - 10)
        .attr("y", function(d, i) { 
          return (legend) + i * (legend) - 11;
        })
        .attr("fill", function(d) {
          return d.visible ? z(d.id) : "#F1F1F2"
        })
        .attr("class", "legend")

        //mouse movement
        .on("click", function(d) {
          d.visible = !d.visible;
          maxY = findMaxY(names);
          y.domain([0,maxY]);
          svg.select(".axis--y")
             .transition()
             .call(yAxis);

          name.select("path")
              .transition()
              .attr("d", function(d) {
                return d.visible ? line(d.values) : null;
              })

          name.select("rect")
              .transition()
              //.attr("width", 10)
              //.attr("height", 10)
              .attr("fill", function(d) {
                return d.visible ? z(d.id) : "#F1F1F2";
              });    
        })
        .on("mouseover", function(d) {
          d3.select(this)
            .transition()
            .attr("width", 17)
            .attr("height", 17)
            .attr("fill", function(d) {
              return z(d.id); 
            });

          d3.select("#line-" + d.id.replace(/ |:|\./gi, ""))
            .style("z-index", 100)            
            .transition()
            .style("stroke-width", 12)
            .style("opacity", 0.95);  
        })

        .on("mouseout", function(d){
          d3.select(this)
            .transition()
            .attr("width", 14)
            .attr("height", 14)
            .attr("fill", function(d) {
            return d.visible ? z(d.id) : "#F1F1F2";
            });

          d3.select("#line-" + d.id.replace(/ |:|\./gi, ""))
            .style("z-index", 1)
            .transition()
            .style("opacity", 0.8)
            .style("stroke-width", 7.5);
        });  

      //legend name  
      name.append("text")
        .attr("x", width + (margin.right / 3))
        .attr("y", function (d, i) {
          return (legend) + i * (legend);
        })    
        .text(function(d) {
          return d.id
      });

    //brushed function    
    function brushed() {
      var s = d3.event.selection || x2.range();
      if (s === null) {
        x.domain(x2.domain);
      }
      else {
        x.domain(s.map(x2.invert, x2));
      }  

      maxY = findMaxY(names);
      y.domain([0, maxY]);     

      focus.select(".axis--x")
           .transition()
           .call(xAxis);

      focus.selectAll("path.line")
           .transition()
           .attr("d", function(d) { 
            return d.visible ? line(d.values) : null;
          });   
      focus.select(".axis--y")
           .transition()
           .call(yAxis);            
    }  

  });
  
  function findMaxY(data) {
    var maxYValues = data.map(function(d) { 
      if (d.visible){
        return d3.max(d.values, function(value) {
          return value.sum; })
      }
    });
    return d3.max(maxYValues);
  }
}

//
//
//---------------------------------   TimeSeries End   ---------------------------------
//
//

//
//
//---------------------------------   TermBubble Start   ---------------------------------
//
//

function termBubble(termJson, w, h) {

  var w, h;

  var svg = d3.select(".bubble").append("svg")
          .attr("width", w)
          .attr("height", h);

  var tooltip = d3.select("body")
                  .append("div")
                  .attr("class", "tooltip")
                  .style("opacity", 0);

  var hueArray = ["green", "red", "blue"];

  var hues = hueArray[Math.floor(Math.random() * hueArray.length)];

  d3.json("/assets/data/o.term.json", function(error, data) {
    if (error) throw error;

    var bubble = d3.pack(data)
        .size([w, h])
        .padding(0.5);

    var nodes = d3.hierarchy(data)
                  .sum(function(d) { return d.amount; });

    var node = svg.selectAll(".node")
                  .data(bubble(nodes).descendants())
                  .enter()
                  .filter(function(d){ return  !d.children })
                  .append("g")
                  .attr("class", "node")
                  .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

    node.append("circle")
        .attr("r", function(d) { return d.r; })
        .attr("class", "circle")
        .style("fill", function(d) { 
          return randomColor({hue: hues});
        })
        .on("mouseover", function(d) {    
          tooltip.transition()    
              .duration(200)    
              .style("opacity", .9);    
          tooltip.html(d.data.name + "</br>" + d.data.amount)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY) + "px");  
            })          
            .on("mouseout", function(d) {   
              tooltip.transition()    
                .duration(500)    
                .style("opacity", 0); 
        });
  });

}

//
//
//---------------------------------   TermBubble End   ---------------------------------
//
//

window.onload = radioButton();
window.onload = geoGlobe("#FFE900", "/assets/data/o.geo.csv", 400,400);
window.onload = termBubble("/assets/data/o.term.json", 400, 400);
