;(function() {

	var margin = { top: 10, right: 10, bottom: 100, left: 50 };
	var width = 400;
	var height = 300;

	var dataXRange = { min: 40, max: 100 };
	var dataYRange = { min: 0, max: 100 };
	var xAxisLabelHeader = "X Header";
	var yAxisLabelHeader = "Y Header";
	var circleRadius = 4;

	var data;
    var data2;
	var chart;
	var chartWidth;
	var chartHeight;

	init();

	function init() {

		chartWidth = width - margin.left - margin.right;
		chartHeight = height - margin.top - margin.bottom;

		d3.json("./data/stream_1.json", function(error, json) {
			if (error) {
				return console.warn(error);
			}else {
				data = json;
				console.log("JSON loaded");
				initializeChart();
				createAxes();

				drawDots(1);

			}

              d3.json("./data/stream_2.json", function(error, json) {
			if (error) {
				return console.warn(error);
			} else {
				data2 = json;
				console.log("JSON loaded");
				//initializeChart();
				//createAxes();

				drawDots(2);

				// you could load more data here using d3.json() again...

			     }
		    })

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
			.call(chart.xAxis);

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

	function drawDots(num) {
		// do something with the data here!

		if (num==1){
		var dots = chart.plotArea.selectAll(".blue.dot")
			.data(data)
			.enter().append("circle")
				.attr("class", "dot")
				.attr("cx", function(d) { return chart.xScale(d.xVal); })
				.attr("cy", function(d) { return chart.yScale(d.yVal); })
                .attr("r", circleRadius)
                .style("fill", "blue") 
				.on("mouseover", function(d) {
  					d3.select(this).attr("r", circleRadius).style("fill", "red");})                  
				.on("mouseout", function(d) {
  					d3.select(this).attr("r", circleRadius).style("fill", "blue");
		        })
               .on("click", function(d) {

			       d3.selectAll("rect").data(data2, function(d2) { 
                    if(d.xVal == d2.xVal){
                    	console.log("matching points: circle ", d.xVal, ", ", d.yVal, "rect", d2.xVal, ", ", d2.yVal);}
			       })

			       d3.selectAll('rect')
  					.filter(function(d2) { return d2.xVal == d.xVal; })
  					.style('fill', 'yellow')
				});

			}
			else if (num==2){
			var dots = chart.plotArea.selectAll(".green.dot")
			.data(data2)
			.enter().append("rect")
				.attr("class", "dot")
				.attr("x", function(d) { return chart.xScale(d.xVal); })
				.attr("y", function(d) { return chart.yScale(d.yVal); })
                .attr("width", 8)
                .attr("height",8)
                .style("fill", "green") 
				.on("mouseover", function(d) {
  					d3.select(this).style("fill", "red");})                  
				.on("mouseout", function(d) {
  					d3.select(this).style("fill", "green"); })

				.on("click", function(d) {

			       d3.selectAll("circle").data(data, function(d2) { 
                    if(d.xVal == d2.xVal){
                    	console.log("matching points: rect", d.xVal, ", ", d.yVal, "circle", d2.xVal, ", ", d2.yVal);}
			       })

			       d3.selectAll('circle')
  					.filter(function(d2) { return d2.xVal == d.xVal;})
  					.style('fill', 'yellow')
				});
			}

		}


})();
