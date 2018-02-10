


;(function() {

	var margin = { top: 10, right: 10, bottom: 100, left: 50 };
	var width = 500;
	var height = 500;

	var dataXRange = { min: 40, max: 100 };
	var dataYRange = { min: 0, max: 100 };
	var xAxisLabelHeader = "X Header";
	var yAxisLabelHeader = "Y Header";
	var circleRadius = 4;

	var data;
	var chart;
	var chartWidth;
	var chartHeight;

	init();

	function init() {

		chartWidth = width - margin.left - margin.right;
		chartHeight = height - margin.top - margin.bottom;

		// load data from json
		d3.json("./data/stream_1b.json", function(error, json) {
			if (error) {
				return console.warn(error);
			} else {
				data = json;
				console.log("JSON loaded");
				initializeChart();
				createAxes();

				//drawDots();

				// you could load more data here using d3.json() again...

			}
		});

	}//end init

	function initializeChart() {
		chart = d3.select("#chartDiv").append("svg")
			.attr("width", width)
			.attr("height", height);

		chart.plotArea = chart.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	}

	function createAxes() {

		// x axis
		chart.xScale = d3.scaleLinear()
			.domain([dataXRange.min, dataXRange.max])
			.range([0, chartWidth]);

		chart.xAxis = d3.axisBottom()
			.tickSizeOuter(0)
			.scale(chart.xScale);

		chart.xAxisContainer = chart.append("g")
			.attr("class", "x axis scatter-xaxis")
			.attr("transform", "translate(" + (margin.left) + ", " + (chartHeight + margin.top) + ")")
			.call(chart.xAxis)
				//.tickFormat(d3.timeFormat("%Y-%m-%d"));
			
        //d3.interval(update, 100);
		// x axis header label
		chart.append("text")
			.attr("class", "x axis scatter-xaxis")
			.style("font-size", "12px")
			.attr("text-anchor", "middle")
			.attr("transform", "translate(" + (margin.left + chartWidth / 2.0) + ", " + (chartHeight + (margin.bottom / 2.0)) + ")")
			.text(xAxisLabelHeader);

		// y axis labels
		chart.yScale = d3.scaleLinear()
			.domain([dataYRange.min, dataYRange.max])
			.range([chartHeight, 0]);

		chart.yAxis = d3.axisLeft()
			.scale(chart.yScale);

		chart.yAxisContainer = chart.append("g")
			.attr("class", "y axis scatter-yaxis")
			.attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
			.call(chart.yAxis);

		// y axis header label
		chart.append('text')
			.style("font-size", "12px")
			.attr("class", "heatmap-yaxis")
			.attr("text-anchor", "middle")
			.attr("transform", "translate(" + (margin.left / 2.0) + ", " + (chartHeight / 2.0) + ") rotate(-90)")
			.text(yAxisLabelHeader);




	}

	function drawDots() {
		// do something with the data here!

		// plot dots
		var dots = chart.plotArea.selectAll(".dot")
			.data(data)
			
        

        dots.enter().append('circle')
        .attr('class', 'roundy')
        .attr('id', function (d, i) { return d.id})
        .attr('r', 4)
        .attr('cx',  function (d, i) { return chart.xScale(d.xVal); } )
        .attr('cy', function (d, i) { return chart.xScale(d.yVal); } )
        .style('fill', 'steelblue')
      .merge(dots) // update + merge
         .transition()
          .delay(400)
          .duration(900)
           .attr('cx', function (d, i) { return chart.xScale(d.xVal); } )
           .attr('cy', function (d, i) { return chart.xScale(d.yVal); } )
          .style('fill', 'green')

    dots.exit().transition()
        .duration(8)
        .style("fill", "red")
        .remove();

	}


var tick = 0

function timerCallback(elapsed) {
  // console.log('tick ' + elapsed);
  if (elapsed > 2000) {
    tick = tick + 1;

 
    var newThing = {
      id: tick,
      xVal: data[0].xVal,
      yVal:  data[0].yVal
    }
    

    // remove from first data?
    data.shift();
    data.push(newThing);


    console.log(data.length)

    drawDots();
    //removeDots();

    timer.restart(timerCallback);
  }
}

var timer = d3.timer(timerCallback);


})();
