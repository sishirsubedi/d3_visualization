
;(function() {

  console.log("starting page...")
  	//var margin = { top: 10, right: 10, bottom: 10, left: 10 };

  var data;
  var dataXRange = { min: 0, max: 100 };
  var dataYRange = { min: 0, max: 100 };
   
   var width = 800;
   var height = 500;
   var circleRadius =10;

   var canvas = d3.select("body")
   				.append("svg")
   				.attr("width", width)
   				.attr("height",height+100)
   				.append("g")
   				.attr("transform","translate(50,0)")

   var widthscalex = d3.scaleLinear()
   				    .domain([dataXRange.min, dataXRange.max])
   				    .range([50,width])
   
   var widthscaley = d3.scaleLinear()
   				    .domain([dataYRange.min, dataYRange.max])
   				    .range([height,50])


   var xaxis = d3.axisBottom()
              .ticks(10)
              .scale(widthscalex)


   var yaxis = d3.axisLeft()
              .ticks(10)
              .scale(widthscaley)

   canvas.append("g")
   		  .attr("transform","translate(50,500)")
   		  .attr('class', 'xaxisb')
   		  .call(xaxis)
    
    canvas.append("g")
   		  .attr("transform","translate(50,0)")
   		  .call(yaxis)

   d3.json("./data/stream_1b.json", function(error, json) {
			if (error) {
				return console.warn(error);
			} else {
				data = json;
			}
		})




function updatecircles() {

  var theCircles = canvas.selectAll('.roundy')
        .data(data, function (d, i) {return d.id })

     theCircles.enter().append('circle')
        .attr('class', 'roundy')
        .attr('id', function (d, i) { return d.id})
        .attr('r', circleRadius)
        .attr('cx', function (d, i) { return widthscalex(d.xVal) } )
        .attr('cy', function (d, i) { return widthscaley(d.yVal) } )
        .style('fill', 'steelblue')
        //.merge(theCircles)
         .on("mouseover", function(d) {
         	 for (var i = 1; i < 5; ++i) {
		            var position = d3.mouse(canvas.node());

		            var circle = canvas.append("circle")
		                    .attr("cx", position[0])
		                    .attr("cy", position[1])
		                    .attr("r", 0)
		                    .style("stroke-width", 5 / (i))
		                    .transition()
		                        .delay(Math.pow(i, 2.5) * 50)
		                        .duration(2000)
		                        .ease('quad-in')
		                    .attr("r", r)
		                    .style("stroke-opacity", 0)
		                    .each("end", function () {
		                        d3.select(this).remove();
		                    }); 
		                    }})                 
		  .on("mouseout", function(d) {
  					

  					 })
         .transition()
          	.delay(0)
          	.duration(20000)
           .attr('cx', function (d, i) { return widthscalex(1) } )
           .attr('cy', function (d, i) { return widthscaley(d.yVal)} )
          .style('fill', 'steelblue')
           .transition()
            .delay(1)
           .duration(10)
           .attr('cx', function (d, i) { 
            if (d.xVal ==1){
            	d3.select(".roundy").remove()
            }
           } )
           .delay(1)
           .duration(10)
           .style("fill",'white')
}


function updateaxes(tick) {

   	d3.select(".xaxisb").remove();

    var widthscalex = d3.scaleLinear()
   				    .domain([dataXRange.min, dataXRange.max])
   				    .range([0-10*tick,width])
   

   var xaxis = d3.axisBottom()
              .ticks(10)
              .scale(widthscalex)

   canvas.append("g")
   		  .attr("transform","translate(50,500)")
   		  .attr("class",'xaxisb')
   		  .call(xaxis)
    

        }
var btn = d3.select("body");
var menuButton = btn.append("button")
    .text("Restart")
    .attr("id", "buttonCentre")
    .classed("button", true)
    .on('click', function(){
        console.log("restart")
        location.reload();

    });



//
var tick = 0

function timerCallback(elapsed) {
  // console.log('tick ' + elapsed);
  if (elapsed > 1000) {
    tick = tick + 1;

    
    var newThing = {
      id: tick,
      xVal: data[0].xVal,
      yVal: data[0].yVal,
    }
    data.push(newThing);

    //remove from data?
    data.shift();
    //console.log(jsonData)

    updatecircles();
    updateaxes(tick);

    timer.restart(timerCallback);
  }
}

var timer = d3.timer(timerCallback);

	})();