var restData = (function() {

  var data = [];

  var now = new Date().getTime();
  for (var i = 62; i > 0; i--) {
    data.push(produceValue(now - i * 1000))
  }

  setInterval(function() {
    produceRestData();
  }, 1000);


  function produceRestData() {
    data.push(produceValue());

    while (data.length > 62) {
      data.shift();
    }
  }

  var lastProducedValue;

  function produceValue(currentTime) {
    var now;
    if (currentTime) {
      now = currentTime;
    } else {
      now = new Date().getTime();
    }

    var newNumber;
    if (!lastProducedValue) {
      lastProducedValue = Math.random() * 10;
    } else {
      if (lastProducedValue > 9) {
        lastProducedValue -= Math.random() * 2;
      } else if (lastProducedValue < 1) {
        lastProducedValue += Math.random() * 2;
      } else {
        lastProducedValue += Math.random() * 3 - 1.5;
      }

    }


    return [now, lastProducedValue];
  }


  function getData() {
    return data;
  }

  return {
    getData: getData
  }
})();








;(function() {



  var margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 50
  },
  height = 300 - margin.top - margin.bottom;
width = 470 - margin.left - margin.right;


  function formatter(time) {
    if ((time.getSeconds() % 10) != 0) {
      return "";
    }
    return d3.time.format('%H:%M:%S')(time);
  }

  var data = restData.getData();
  
  var x = d3.time.scale()
    .domain(d3.extent(data, function(d) {
      return d[0];
    }))
    .range([0, width]);

  var y = d3.scale.linear()
    .domain([0, 10])
    .range([height, 0]);

  var xAxis = d3.svg.axis()
    .scale(x)
    .ticks(d3.time.seconds, 2)
    .tickFormat(formatter)
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

  var line = d3.svg.line()
    .x(function(d) {
      return x(d[0]);
    })
    .y(function(d) {
      return y(d[1]);
    })
    .interpolate("linear");

  var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.append("g")
    .attr("class", "x axis")
    .attr("clipPath", "url(#innerGraph)")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end");

  var holder = svg.append("defs");
  holder.append("svg:clipPath")
    .attr("id", "innerGraph")
    .append("svg:rect")
    .attr("x", 0)
    .attr("y", 0)
    .style("fill", "gray")
    .attr("height", height)
    .attr("width", width);

  svg.append("g")
    .attr("clip-path", "url(#innerGraph)")
    .append("svg:path")
    .attr("class", "line")
    .attr("d", line(data));


  function update() {
    data = restData.getData();
    var svg = d3.select("svg");
    
    //move the graph left
    svg.select(".line")
      .attr("d", line(data))
      .attr("transform", null)
      .transition()
			.delay(0)
      .duration(1000)
      .ease("linear")
      .attr("transform", "translate(" + (x(0) - x(1000)) + ")");


		var currentTime = new Date().getTime();
    var startTime = currentTime - 60000;
    x.domain([startTime, currentTime]);
    xAxis.scale(x);

		//move the xaxis left
    svg.select(".x.axis")
      .transition()
      .duration(1000)
      .ease("linear")
      .call(xAxis);
  }

  setInterval(update, 1100);
});
