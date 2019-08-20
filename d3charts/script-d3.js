/* Circle */
var margin = {
    top: 50,
    bottom: 50,
    left: 50,
    right: 50
  },
  width = 380 - margin.left - margin.right,
  height = 380 - margin.top - margin.bottom;

var svg1 = d3
  .select("#my_datavis")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .call(d3.zoom().scaleExtent([.4, 15]).on("zoom", function(){
                    svg1.attr("transform", d3.event.transform)
                    }))  
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

var ranColor = ["#3B1F2B", "#DB162F", "#DBDFAC", "#5F758E", "#383961"];
var i, n, m;
var data = [];
for (i = 1; i < 6; i++) {
  data.push(i * 5);
}
for (n = -600; n < 1000; n = n + 75) {
  for (m = -600; m < 1000; m = m + 75) {
    svg1
      .selectAll("myCircle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", n + 6)
      .attr("cy", m + 6)
      .attr("r", 1)
      .transition()
      .duration(2000)    
      .attr("r", function(d) {
        return d;
      })
      .attr("stroke", "#FFFFFF")
      .attr("stroke", function(d) {
        return ranColor[Math.floor(Math.random() * ranColor.length)];
      })
      .attr("stroke-width", function(d) {
        return Math.random() * 3;
      })
      .style("fill", "none")
  }
}
/* Circle */

/* Bar Plot Line */
var svg2 = d3
.select("#my_datavis")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("/assets/data/d3charts/d3-2.csv", function(data) {
  var x = d3
  .scaleBand()
  .range([0, width])
  .domain(
    data.map(function(d) {
      return d.Country;
    })
  )
  .padding(1);
  svg2
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .attr("class", "xaxis")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-25)")
    .style("text-anchor", "end");
  var xtick = svg2.selectAll(".xaxis").selectAll(".tick");
  xtick.style("font-size", 5);

  var y = d3
  .scaleLinear()
  .domain([0, 13000])
  .range([height, 0]);
  svg2.append("g").call(d3.axisLeft(y));

  svg2
    .selectAll("bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "Bar")
    .attr("x", function(d) {
    return x(d.Country) - 2;
  })
    .attr("width", 5)
    .attr("fill", "#4DA1A9")
    .attr("height", function(d) {
    return height - y(0);
  })
    .attr("y", function(d) {
    return y(0);
  });
  svg2
    .selectAll("rect")
    .transition()
    .duration(800)
    .attr("y", function(d) {
    return y(d.Value);
  })
    .attr("height", function(d) {
    return height - y(d.Value);
  })
    .delay(function(d, i) {
    return i * 100;
  });
  svg2
    .append("path")
    .datum(data)
    .attr("class", "Line")
    .attr("fill", "none")
    .attr("stroke", "#2E5077")
    .attr("stroke-width", 3.5)
    .attr(
    "d",
    d3
    .line()
    .x(function(d) {
      return x(d.Country);
    })
    .y(function(d) {
      return y(0);
    })
  );
  svg2
    .selectAll(".Line")
    .transition()
    .duration(900)
    .attr(
    "d",
    d3
    .line()
    .x(function(d) {
      return x(d.Country);
    })
    .y(function(d) {
      return y(d.Value);
    })
  )
    .delay(function(d, i) {
    return i * 100;
  });

  svg2
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "Plot")
    .attr("cx", function(d) {
    return x(d.Country);
  })
    .attr("cy", function(d) {
    return y(0);
  });
  svg2
    .selectAll("circle")
    .transition()
    .duration(500)
    .attr("cx", function(d) {
    return x(d.Country);
  })
    .attr("cy", function(d) {
    return y(d.Value);
  })
    .delay(function(d, i) {
    return i * 100;
  })
    .attr("r", 4)
    .attr("fill", "#C5283D");
  var color = ["#4DA1A9", "#C5283D", "#2E5077"];
  var legend = ["Bar", "Plot", "Line"];
  svg2
    .selectAll("legends")
    .append("g")
    .data(legend)
    .enter()
    .append("text")
    .attr("x", function(d, i) {
    return width + margin.right - margin.left - 40 * i;
  })
    .attr("y", 10)
    .text(function(d) {
    return d;
  })
    .style("fill", function(d, i) {
    return color[i];
  })
    .style("font-size", 15)
    .on("click", function(d) {
    textLine = d3.select(this).style("text-decoration");
    console.log(textLine);
    d3
      .select(this)
      .style(
      "text-decoration",
      textLine == "line-through" ? "none" : "line-through"
    );
    currentOpacity = d3.selectAll("." + d).style("opacity");
    d3
      .selectAll("." + d)
      .transition()
      .duration(1000)
      .style("opacity", currentOpacity == 1 ? 0 : 1);
  });
});
/* Bar Plot Line */

/* Parallel */
var svg3 = d3
.select("#my_datavis")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("/assets/data/d3charts/d3-3.csv", function(data) {
  var dimensions = d3.keys(data[0]).filter(function(d) {
    return d != "Species";
  });

  var color = d3
  .scaleOrdinal()
  .domain(["setosa", "versicolor", "virginica"])
  .range(["#40BCD8", "#F39237", "#D63230"]);

  var y = {};

  for (i in dimensions) {
    var name = dimensions[i];
    y[name] = d3
      .scaleLinear()
      .domain(
      d3.extent(data, function(d) {
        return +d[name];
      })
    )
      .range([height, 0]);
  }
  x = d3
    .scalePoint()
    .range([0, width])
    .domain(dimensions);
  var highlight = function(d) {
    var selected_specie = d.Species;

    d3
      .selectAll(".line")
      .transition()
      .duration(300)
      .style("stroke", "lightgrey")
      .style("opacity", 0.3);
    d3
      .selectAll("." + selected_specie)
      .transition()
      .duration(300)
      .style("stroke", color(selected_specie))
      .style("opacity", 1);
  };

  var noHighlight = function(d) {
    d3
      .selectAll(".line")
      .transition()
      .duration(300)
      .delay(1000)
      .style("stroke", function(d) {
      return color(d.Species);
    })
      .style("opacity", 1);
  };

  function path(d) {
    return d3.line()(
      dimensions.map(function(p) {
        return [x(p), y[p](d[p])];
      })
    );
  }

  svg3
    .selectAll("paths")
    .data(data)
    .enter()
    .append("path")
    .attr("class", function(d) {
    return "line " + d.Species;
  })
    .attr("d", path)
    .style("fill", "none")
    .style("stroke", function(d) {
    return color(d.Species);
  })
    .style("opacity", 0.8)
    .on("mouseover", highlight)
    .on("mouseout", noHighlight);

  svg3
    .selectAll("axes")
    .data(dimensions)
    .enter()
    .append("g")
    .attr("class", "axis")
    .attr("transform", function(d) {
    return "translate(" + x(d) + ")";
  })
    .each(function(d) {
    d3.select(this).call(d3.axisLeft().scale(y[d]));
  })
    .style("opacity", 0.4)
    .append("text")
    .style("text-anchor", "middle")
    .attr("y", -9)
    .text(function(d) {
    return d;
  })
    .style("fill", " black");
});
/* Parallel */

/* Streamgraph */
var svg4 = d3
.select("#my_datavis")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("/assets/data/d3charts/d3-4.csv", function(data) {
  var keys = data.columns.slice(1);
  var x = d3
  .scaleLinear()
  .domain(
    d3.extent(data, function(d) {
      return d.year;
    })
  )
  .range([0, width]);
  svg4
    .append("g")
    .attr("transform", "translate(0," + height * 0.8 + ")")
    .call(
    d3
    .axisBottom(x)
    .tickSize(height * -0.7)
    .tickValues([1900, 1925, 1975, 2000])
  )
    .select(".domain")
    .remove();
  svg4.selectAll(".tick line").attr("stroke", "#B8B8B8");

  svg4
    .append("text")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height - 30)
    .text("Time (year)")
    .attr("font-size", 9);

  var y = d3
  .scaleLinear()
  .domain([-95000, 95000])
  .range([height, 0]);

  var colorArr = ["#540d6e", "#ee4266", "#ffd23f", "#0BC9CD"];
  var color = d3
  .scaleOrdinal()
  .domain(keys)
  .range(colorArr);

  var stackedData = d3
  .stack()
  .offset(d3.stackOffsetSilhouette)
  .keys(keys)(data);

  var area = d3
  .area()
  .x(function(d) {
    return x(d.data.year);
  })
  .y0(function(d) {
    return y(d[0]);
  })
  .y1(function(d) {
    return y(d[1]);
  });

  var tooltip = svg4
  .append("text")
  .attr("x", 0)
  .attr("y", 0)
  .style("opacity", 0)
  .style("fontsize", 17);

  var mouseover = function(d) {
    tooltip.style("opacity", 1);
    d3.selectAll(".myArea").style("opacity", 0.2);
    d3
      .select(this)
      .style("stroke", "#FFFFFF")
      .style("opacity", 1);
  };
  var mousemove = function(d, i) {
    grp = keys[i];
    tooltip.text(grp);
  };
  var mouseleave = function(d) {
    tooltip.style("opacity", 0);
    d3
      .selectAll(".myArea")
      .style("opacity", 1)
      .style("stroke", "none");
  };

  svg4
    .selectAll("mylayers")
    .data(stackedData)
    .enter()
    .append("path")
    .attr("class", "myArea")
    .style("fill", function(d) {
    return color(d.key);
  })
    .attr("d", area)
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave);
});
/* Streamgraph */

/* Hexbin */
var svg5 = d3
.select("#my_datavis")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("/assets/data/d3charts/d3-5.csv", function(data) {
  var x = d3
  .scaleLinear()
  .domain([5, 18])
  .range([0, width]);
  svg5
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  var y = d3
  .scaleLinear()
  .domain([5, 20])
  .range([height, 0]);
  svg5.append("g").call(d3.axisLeft(y));

  var fData1 = [],
      fData2 = [],
      fData3 = [];
  data.forEach(function(d) {
    if (d.group === "A") {
      fData1.push([x(d.x), y(d.y)]);
    } else if (d.group === "B") {
      fData2.push([x(d.x), y(d.y)]);
    } else {
      fData3.push([x(d.x), y(d.y)]);
    }
  });
  var dataArr = [fData1, fData2, fData3];

  var colorArr = ["#C73E1D", "#035E7B", "#7E1F86"];
  var hexbin = d3
  .hexbin()
  .radius(6)
  .extent([[0, 0], [width, height]]);
  svg5
    .append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", width)
    .attr("height", height);

  for (var i = 0; i < 3; i++) {
    var color = d3
    .scaleLinear()
    .domain([0, 10000])
    .range(["transparent", colorArr[i]]);
    var color2 = d3
    .scaleLinear()
    .domain([0, 600])
    .range(["transparent", colorArr[i]]);
    svg5
      .append("g")
      .attr("clip-path", "url(#clip)")
      .selectAll("path")
      .data(hexbin(dataArr[i]))
      .enter()
      .append("path")
      .attr("class", "hexpath")
      .attr("d", hexbin.hexagon())
      .attr("transform", function(d) {
      return "translate(" + d.x + "," + d.y + ")";
    })
      .attr("fill", function(d) {
      return color(d.length);
    })
      .transition()
      .duration(1500)
      .attr("fill", function(d) {
      return color2(d.length);
    })
      .attr("stroke", "black")
      .attr("stroke-width", "0.1");
  }
});
/* Hexbin */

/* Arc */
var svg6 = d3
.select("#my_datavis")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("/assets/data/d3charts/d3-6.json", function(data) {
  var allNodes = data.nodes.map(function(d) {
    return d.name;
  });

  var x = d3
  .scalePoint()
  .range([0, width])
  .domain(allNodes);

  var labels = svg6
  .selectAll("labels")
  .data(data.nodes)
  .enter()
  .append("text")
  .attr("x", function(d) {
    return x(d.name);
  })
  .attr("y", height / 1.75 + 30)
  .text(function(d) {
    return d.name;
  })
  .attr("text-anchor", "middle")
  .on("mouseover", function(d) {
    labels.attr("fill", "#B8B8B8");
    d3.select(this).attr("fill", "#D05353");
    nodes.attr("fill", function(node_d) {
      return d.id === node_d.id ? "#52489C" : "#B8B8B8";
    });
    links
      .attr("stroke", function(link_d) {
      return link_d.source === d.id || link_d.target === d.id
        ? "#E26D5C"
      : "#b8b8b8";
    })
      .attr("stroke-width", function(link_d) {
      return link_d.source === d.id || link_d.target === d.id ? 6 : 1;
    });
  })
  .on("mouseout", function(d) {
    labels.attr("fill", "#000000");
    nodes.attr("fill", "#0D3B66");
    links.attr("stroke", "#69b3a2").attr("stroke-width", 2);
  });

  var idToNode = {};
  data.nodes.forEach(function(n) {
    idToNode[n.id] = n;
  });

  var links = svg6
  .selectAll("links")
  .data(data.links)
  .enter()
  .append("path")
  .attr("d", function(d) {
    start = x(idToNode[d.source].name);
    end = x(idToNode[d.target].name);
    return [
      "M",
      start,
      height / 1.75,
      "A",
      (start - end) / 2,
      ",",
      (start - end) / 2,
      0,
      0,
      ",",
      start < end ? 1 : 0,
      end,
      ",",
      height / 1.75
    ].join(" ");
  })
  .attr("fill", "none")
  .attr("stroke", "#69b3a2")
  .attr("stroke-width", 2)
  .on("mouseover", function(d) {
    links.attr("stroke", "#B8B8B8");
    d3
      .select(this)
      .attr("stroke", "#E26D5C")
      .attr("stroke-width", 6);
    nodes.attr("fill", function(node_d) {
      return node_d.id === d.source || node_d.id === d.target
        ? "#52489C"
      : "#B8B8B8";
    });
    labels.attr("fill", function(label_d) {
      return label_d.id === d.source || label_d.id === d.target
        ? "#D05353"
      : "#B8B8B8";
    });
  })
  .on("mouseout", function(d) {
    links.attr("stroke", "#69b3a2").attr("stroke-width", 2);
    nodes.attr("fill", "#0D3B66");
    labels.attr("fill", "#000000");
  });

  var nodes = svg6
  .selectAll("nodes")
  .data(data.nodes)
  .enter()
  .append("circle")
  .attr("cx", function(d) {
    return x(d.name);
  })
  .attr("cy", height / 1.75)
  .attr("r", 8)
  .attr("fill", "#0D3B66")
  .on("mouseover", function(d) {
    nodes.attr("fill", "#B8B8B8");
    d3.select(this).attr("fill", "#52489C");
    links
      .attr("stroke", function(link_d) {
      return link_d.source === d.id || link_d.target === d.id
        ? "#E26D5C"
      : "#b8b8b8";
    })
      .attr("stroke-width", function(link_d) {
      return link_d.source === d.id || link_d.target === d.id ? 6 : 2;
    });
    labels.attr("fill", function(label_d) {
      return label_d.id === d.id ? "#D05353" : "#B8B8B8";
    });
  })
  .on("mouseout", function(d) {
    nodes.attr("fill", "#0D3B66");
    links.attr("stroke", "#69b3a2").attr("stroke-width", 2);
    labels.attr("fill", "#000000");
  });
});
/* Arc */

/* Ridgeline */
var svg7 = d3
.select("#my_datavis")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr(
  "transform",
  "translate(" + margin.left * 1.5 + "," + margin.top * 1.5 + ")"
);

d3.csv("/assets/data/d3charts/d3-7.csv", function(data) {
  var categories = data.columns;
  var n = categories.length;
  var color = [
    "#b0ebf8",
    "#28c9ed",
    "#023047",
    "#ffb701",
    "#fc8500",
    "#03256c",
    "#ff6b35",
    "#f7c59f",
    "#efefd0",
    "#1a659e",
    "#003d5b",
    "#30638e",
    "#2299b4",
    "#edae49",
    "#d1495b",
    "#ffb923",
    "#f1e9db"
  ];
  var x = d3
  .scaleLinear()
  .domain([-10, 140])
  .range([0, width]);
  svg7
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .attr("class", "axis");

  var y = d3
  .scaleLinear()
  .domain([0, 0.4])
  .range([height, 0]);

  var yName = d3
  .scaleBand()
  .domain(categories)
  .range([0, height])
  .paddingInner(1);
  svg7
    .append("g")
    .attr("class", "yaxis")
    .call(d3.axisLeft(yName));

  var ytick = svg7.selectAll(".yaxis").selectAll(".tick");
  ytick.style("font-size", 5);
  ytick
    .on("mouseover", function(d) {
    myarea.attr("fill-opacity", 0.3);
    d3
      .select(this)
      .attr("font-weight", "bold")
      .style("color", "#51ff00");
    d3
      .select(
      "." +
      d3
      .select(this)
      .text()
      .replace(/\s+/g, "")
    )
      .attr("fill-opacity", 1);
  })
    .on("mouseout", function(d) {
    myarea.attr("fill-opacity", 0.9);
    d3
      .select(this)
      .attr("font-weight", null)
      .style("color", "#000");
  });

  var kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(100));

  var allDensity = [];

  for (i = 0; i < n; i++) {
    key = categories[i];
    density = kde(
      data.map(function(d) {
        return d[key];
      })
    );
    allDensity.push({ key: key, density: density });
  }

  var myarea = svg7
  .selectAll("areas")
  .data(allDensity)
  .enter()
  .append("path")
  .attr("class", function(d, i) {
    return categories[i].replace(/\s+/g, "");
  })
  .attr("transform", function(d) {
    return "translate(0," + (yName(d.key) - height) + ")";
  })
  .datum(function(d) {
    return d.density;
  })
  .attr("fill", function(d, i) {
    return color[i];
  })
  .attr("stroke", "#345943")
  .attr("stroke-width", 1)
  .attr("opacity", 0.9)
  .attr(
    "d",
    d3
    .line()
    .curve(d3.curveBasis)
    .x(function(d) {
      return x(d[0]);
    })
    .y(function(d) {
      return y(d[1]);
    })
  )
  .on("mouseover", function(d) {
    d3
      .select(this)
      .attr(
      "stroke-width",
      d3.select(this).attr("stroke-width") == 1 ? 3 : 1
    );
  })
  .on("mouseout", function(d) {
    d3.select(this).attr("stroke-width", 1);
  });
});

function kernelDensityEstimator(kernel, X) {
  return function(V) {
    return X.map(function(x) {
      return [
        x,
        d3.mean(V, function(v) {
          return kernel(x - v);
        })
      ];
    });
  };
}

function kernelEpanechnikov(k) {
  return function(v) {
    return Math.abs((v /= k)) <= 1 ? 0.75 * (1 - v * v) / k : 0;
  };
}
/* Ridgeline */

/* Bubble */
var svg8 = d3
  .select("#my_datavis")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("/assets/data/d3charts/d3-8.csv", function(data) {
  var x = d3.scaleLinear()
            .domain([0, 48000])
            .range([0, width])
  var xAxis = svg8.append("g")
      .attr("transform", "translate(0, " + height + ")")
      .call(d3.axisBottom(x).ticks(5))

  svg8.append("text")
     .attr("text-anchor", "end")
     .attr("x", width - 90)
     .attr("y", height + 45)
     .attr("font-size", 12)
     .text("GDP per capita")
  
  var y = d3.scaleLinear()
            .domain([ 40, 85 ])
            .range([ height, 0 ])
  var yAxis = svg8.append("g")
      .call(d3.axisLeft(y))
  
  var highlight = function(d) {
    d3.selectAll(".bubbles")
      .style("opacity", 0.1)
    d3.selectAll("."+d)
      .style("opacity", 1)
  }
  
  var nohighlight = function(d) {
    d3.selectAll(".bubbles")
      .style("opacity", 1)
  }
  
  svg8.append("text")
     .attr("text-anchor", "end")
     .attr("x", 0)
     .attr("y", -20)
     .text("Life Expectancy")
     .attr("font-size", 12)  
     .attr("text-anchor", "start")
  
  var z = d3.scaleSqrt()
            .domain([ 200000, 1310000000 ])
            .range([ 2, 30 ])
  
  var colorArr = ["#F17878", "#B1ECBD", "#FFC66A", "#458FCD", "#5DC4A8"]
  var groups = ["Asia", "Europe", "Americas", "Africa", "Oceania"]
  var color = d3.scaleOrdinal()
                  .domain(groups)
                  .range(colorArr);
  svg8.append("rect")
      .attr("x", 210)
      .attr("y", 80)
      .attr("width", 100)
      .attr("height", 165)
      .style("fill", "none")
      .style("stroke", "#081200")
      .style("stroke-width", 0.5)
  var clip = svg8.append("defs").append("svg:clipPath")
            .attr("id", "clip")
            .append("svg:rect")
            .attr("width", width )
            .attr("height", height )
            .attr("x", 0)
            .attr("y", 0);
   var countries = d3.select("body")
       .append("div")
       .style("position", "absolute")
       .style("z-index", "10")
       .style("visibility", "hidden")
       .style("background-color", "#000000")
       .style("color", "#FFFFFF")
       .style("font-size", 8)
       .style("padding", "5px")
       .style("border", "solid")
       .style("border-radius", "50px");

  var brush = d3.brush()
                .extent( [ [0,0], [width,height] ] )
                .on("end", updateChart)
  var scatter = svg8.append("g")
                     .attr("clip-path", "url(#clip)")
  
  var mouseover = function(d) { 
    countries.style("visibility", "visible")
    countries.html(d.country)
             .style("left", (event.pageX+5)+"px")
             .style("top", (event.pageY+5) + "px")    
  }
  var mousemove = function(d,i) {
    countries.html(d.country)
             .style("left", (event.pageX+5)+"px")
             .style("top", (event.pageY+5) + "px")
  }
  var mouseleave = function(d) {
     countries.style("visibility", "hidden")
  }  
  
  scatter.append("g")
     .selectAll("dot")
     .data(data)
     .enter()
     .append("circle")
     .attr("class", function(d) { return "bubbles " + d.continent})
     .attr("cx", function(d) { return x(d.gdpPercap)})
     .attr("cy", function(d) { return y(d.lifeExp)})
     .attr("r", function(d) { return z(d.pop)})
     .style("fill", function(d) { return color(d.continent)})
     .style("stroke", "#ffffff")
     .style("opacity", 0.95)
     .on("mouseover", mouseover)
     .on("mouseout", mousemove)
     .on("mouseleave", mouseleave)
     
   scatter.append("g")
     .attr("class", "brush")
     .call(brush)

  var legends = [10000000, 100000000, 1000000000]
  var xLegend = 250
  svg8.selectAll("legend")
      .data(legends)
      .enter()
      .append("circle")
      .attr("cx", xLegend)
      .attr("cy", function(d) { return height - 40 - z(d)})
      .attr("r", function(d) { return z(d)})
      .style("fill", "none")
      .style("stroke", "#000000")
      .style("stroke-width", 0.5)
  
  svg8.selectAll("legend")
      .data(legends)
      .enter()
      .append("line")
      .attr("x1", function(d) { return xLegend + z(d) })
      .attr("y1", function(d) { return height - 40 - z(d)})
      .attr("x2", 285)
      .attr("y2", function(d) { return height - 40 - z(d)})
      .attr("stroke", "#000000")
      .style("stroke-dasharray", ("2, 2"))      
      .style("stroke-width", 0.5)
  
  svg8.selectAll("legend")
      .data(legends)
      .enter()
      .append("text")
      .attr("x", 285)
      .attr("y", function(d) { return height - 40 - z(d)})
      .text( function(d) { return d/1000000})
      .style("font-size", 8)
      .attr("alignment-baseline", "middle")

  svg8.append("text")
      .attr("x", xLegend)
      .attr("y", height - 20)
      .text("Population (M)")
      .style("font-size", 9.5) 
      .attr("text-anchor", "middle")
  
  var size = 20
  svg8.selectAll("rects")
      .data(groups)
      .enter()
      .append("circle")
      .attr("cx", 222)
      .attr("cy", function(d, i) { return 90 + i * 15})
      .attr("r", 6)
      .style("fill", function(d) { return color(d)})
      .on("mouseover", highlight)
      .on("mouseleave", nohighlight)
  
  svg8.selectAll("labels")
      .data(groups)
      .enter()
      .append("text")
      .text(function(d) { return d })
      .style("font-size", 9)
      .attr("x", 235)
      .attr("y", function(d, i) { return 90 + i * 15})
      .attr("alignment-baseline", "middle")
      .style("fill", function(d) { return color(d)})
      .on("mouseover", highlight)
      .on("mouseleave", nohighlight)
  
  var idleTimeout
  
  function idled() { idleTimeout = null; }
  
  function updateChart() {
    extent = d3.event.selection
    
    if(!extent){
          if (!idleTimeout) return idleTimeout = setTimeout(idled, 1000);
          x.domain([0,48000])
          y.domain([40,85])
        }else{
          x.domain([extent[0][0], extent[1][0]].map(x.invert, x));
          y.domain([extent[1][1], extent[0][1]].map(y.invert, y));

          scatter.select(".brush").call(brush.move, null)
        }
        yAxis.transition().duration(1000).call(d3.axisLeft(y))
        xAxis.transition().duration(1000).call(d3.axisBottom(x).ticks(5))
        scatter
          .selectAll("circle")
          .transition().duration(1000)
          .attr("cx", function (d) { return x(d.gdpPercap); } )
          .attr("cy", function (d) { return y(d.lifeExp); } )
  }    
})
/* Bubble */

/* Drag */
var svg9 = d3
  .select("#my_datavis")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .call(d3.zoom().scaleExtent([.4, 15]).on("zoom", function(){
                    svg9.attr("transform", d3.event.transform)
                    }))  
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv(
  "/assets/data/d3charts/d3-9.csv",
  function(data) {
    var data1 = data;
    var data2 = data.filter(function(d) {
      return d.value < 1000000000;
    });
    var colorArr = ["#2A9D8F", "#E9C46A", "#264653", "#F4A261", "#E76F51"];
    var node;

    var color = d3
      .scaleOrdinal()
      .range(colorArr)
      .domain(["Asia", "Europe", "Africa", "Oceania", "Americas"]);
    var size = d3
      .scaleLinear()
      .domain([0, 1400000000])
      .range([2, 80]);
    var simulation = d3
      .forceSimulation()
      .force(
        "forceX",
        d3
          .forceX()
          .strength(0.125)
          .x(width / 2)
      )
      .force(
        "forceY",
        d3
          .forceY()
          .strength(0.125)
          .y(width / 2)
      )
      .force(
        "center",
        d3
          .forceCenter()
          .x(width / 2)
          .y(height / 2)
      )
      .force("charge", d3.forceManyBody().strength(-18))
      .force(
        "collide",
        d3
          .forceCollide()
          .strength(0.4)
          .radius(function(d) {
            return size(d.value) + 3;
          })
          .iterations(1)
      )
      .alphaTarget(1);

    simulation.nodes(data).on("tick", function(d) {
      node.attr("cx", function(d) {
        return d.x;
      });
      node.attr("cy", function(d) {
        return d.y;
      });
    });
    function dragstart(d) {
      if (!d3.event.active) simulation.alphaTarget(0.03).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    function dragging(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }
    function dragend(d) {
      if (!d3.event.active) simulation.alphaTarget(0.03);
      d.fx = null;
      d.fy = null;
    }

    node = svg9
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", function(d) {
        return "circles " + d.key;
      })
      .attr("r", function(d) {
        return size(d.value);
      })
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .style("fill", function(d) {
        return color(d.subregion);
      });

    node.call(
      d3
        .drag()
        .on("start", dragstart)
        .on("drag", dragging)
        .on("end", dragend)
    );

    svg9
      .append("circle")
      .attr("class", "button")
      .attr("cx", -15)
      .attr("cy", -25)
      .attr("r", 7)
      .style("fill", "#FFFBBD")
      .style("stroke", "#E85F5C")
      .style("stroke-width", 1.5)
      .on("mouseover", function(d) {
        svg9.select(".button").style("stroke-width", 3);
      })
      .on("mouseleave", function(d) {
        svg9
          .select(".button")
          .style("fill", "#FFFBBD")
          .style("stroke-width", 1.5);
      })
      .on("mousedown", function(d) {
        svg9.select(".button").style("fill", "#CA3C25");
      })
      .on("mouseup", function(d) {
        svg9.select(".button").style("fill", "#FFFBBD");
      })
      .on("click", update);
    svg9
      .append("text")
      .attr("class", "switch")
      .attr("x", 0)
      .attr("y", -25)
      .attr("alignment-baseline", "middle")
      .style("font-size", 10)
      .text("Click to exclude China&India")
      .on("click", update);

    var tooltip = d3
      .select("#my_datavis")
      .append("div")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .style("background-color", "#000000")
      .style("color", "#FFFFFF")
      .style("padding", "5px")
      .style("border", "solid")
      .style("border-radius", "50px")
      .style("padding", "20px")
      .style("opacity", 0.75)
      .attr("font-size", 5);

    svg9
      .selectAll(".circles")
      .on("mouseover", function(d) {
        tooltip.style("visibility", "visible");
        d3
          .select(this)
          .style("stroke", "#615A61")
          .style("stroke-width", 5);
      })
      .on("mouseleave", function(d) {
        tooltip.style("visibility", "hidden");
        d3.select(this).style("stroke", "none");
      })
      .on("mousemove", function(d) {
        tooltip
          .html(
            "<b>" +
              d.key +
              "</b>" +
              "<br>" +
              d.subregion +
              "<br>" +
              "Population: " +
              d.value
          )
          .style("left", event.pageX + 5 + "px")
          .style("top", event.pageY + 5 + "px");
      });

    var i = 1;
    function update() {
      if (i == 1) {
        i = 2;
        svg9.selectAll(".switch").text("Click to include China&India");
      } else {
        i = 1;
        svg9.selectAll(".switch").text("Click to exclude China&India");
      }
      node = svg9.selectAll(".circles").data(eval("data" + i));
      svg9.select(".China").remove();
      svg9.select(".India").remove();
      node
        .enter()
        .append("circle")
        .attr("r", 0);
      node
        .transition()
        .duration(500)
        .attr("class", function(d) {
          return "circles " + d.key;
        })
        .attr("r", function(d) {
          return size(d.value);
        })
        .style("fill", function(d) {
          return color(d.subregion);
        });

      simulation.nodes(eval("data" + i)).on("tick", function(d) {
        node.attr("cx", function(d) {
          return d.x;
        });
        node.attr("cy", function(d) {
          return d.y;
        });
      });
    }
  }
);
/* Drag */

/* Gooey */
var svg10 = d3
.select("#my_datavis")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.style("filter", "url(#gooey)")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var defs = svg10.append("defs");
var filter = defs.append("filter").attr("id", "gooey");
filter
  .append("feGaussianBlur")
  .attr("in", "SourceGraphic")
  .attr("stdDeviation", "5")
  .attr("result", "blur");
filter
  .append("feColorMatrix")
  .attr("in", "blur")
  .attr("mode", "matrix")
  .attr("values", "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 15 -3");

var colorArr = [
  "#E9C46A",
  "#F4A261",
  "#E76F51",
  "#7EBDC2",
  "#2A9D8F",
  "#264653"
];

var position = [40, 80, 120, 160, 200, 240];

svg10
  .selectAll(".conCir")
  .data(position)
  .enter()
  .append("circle")
  .attr("class", "conCIr")
  .attr("cx", function(d) {
  return d;
})
  .attr("cy", 140)
  .attr("r", 20)
  .style("fill", function(d, i) {
  return colorArr[i];
});

svg10
  .selectAll(".circles")
  .data(position)
  .enter()
  .append("circle")
  .attr("class", "circles")
  .attr("cx", function(d) {
  return d;
})
  .attr("cy", 140)
  .attr("r", 10)
  .style("fill", function(d, i) {
  return colorArr[i];
})
  .transition()
  .duration(3500)
  .attr("cy", 280)
  .delay(function(i) {
  return i * 20;
})
  .transition()
  .on("start", function repeat() {
  d3
    .active(this)
    .attr("cy", 280)
    .transition()
    .duration(6000)    
    .attr("cy", 0)
    .transition()
    .duration(6000)
    .on("start", repeat);
});
/* Gooey */

/* Blend Wave */
var svg12 = d3
.select("#my_datavis")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var colorArr = ["cyan", "magenta", "yellow"]

var data = []
for (var j=0;j<3;j++) {
  data.push(j)
}
var path = svg12.selectAll("circles")
                  .data(data)
                  .enter()
                  .append("circle")
                  .attr("class", function(d, i) { return "path" + i })
                  .attr("cx", function(d) { return d * 55+70})
                  .attr("cy", function(d) { return d * 55+70})
                  .attr("r", 70)
                  .style("stroke", "black")
                  .style("fill", "none")
                  .style("opacity", 0.5)

var dot = svg12.selectAll("circles")
                  .data(data)
                  .enter()
                  .append("circle")
                  .attr("class", function(d, i) { return "dot" + i })
                  .attr("transform", function(d) { return "translate(" + d * 25 + 70 + "," + d * 25 + ")"})
                  .attr("r", 80)
                  .style("fill", function(d, i) { if (i%3==0) {
                    return colorArr[0]
                  } else if (i%3==1) {
                    return colorArr[1]
                  } else {
                    return colorArr[2]
                  }
                  })
                  .style("mix-blend-mode", "darken")

function transition() {
  for (var i=0; i < 25; i++) {
    d3.select(".dot" + i).transition()
          .duration(8000)
          .delay(( i + 1 )*100)
          .attrTween("transform", translateAlong( d3.select(".path" + i).node()))
          .on("end", transition)  
  }
}

transition()

function translateAlong(path) {
  var l = path.getTotalLength() 
  return function(d, i, a) {
    return function(t) {
          var p = path.getPointAtLength(t * l);
          return "translate(" + p.x + "," + p.y + ")"
    }
  }
}
/* Blend Wave */

/* Color Transition */
var svg15 = d3
  .select("#my_datavis")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .call(d3.zoom().scaleExtent([.4, 15]).on("zoom", function(){
                    svg15.attr("transform", d3.event.transform)
                    }))  
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

for (n = -55; n < 400; n = n + 55) {
  for (m = -55; m < 400; m = m + 55) {
    svg15.append("circle")
      .attr("cx", n)
      .attr("cy", m)
      .attr("r", 15)
      .style("fill", "#586BA4")
  }
}

d3.selectAll("circle").transition()
    .delay(function(d, i) { return i + Math.random() * n / 1.2 })
    .on("start", function repeat() {
        d3.active(this)
            .style("fill", "#586BA4")
          .transition()
            .style("fill", "#324376")
          .transition()
            .style("fill", "#F5DD90")
          .transition()  
            .style("fill", "#F68E5F")
          .transition()
            .style("fill", "#F76C5E")
          .transition()
            .style("fill", "#22AED1")
          .transition()
            .style("fill", "#016FB9")
          .transition() 
            .style("fill", "#7DCFB6")
          .transition()
            .style("fill", "#45CB85")
          .transition()
            .style("fill", "#843B62")
          .transition()
            .style("fill", "#F67E7D")
          .transition()      
            .on("start", repeat);
      });
/* Color Transition */
