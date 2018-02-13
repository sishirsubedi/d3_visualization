
;(function() {

  console.log("starting page...")

  var data;
  var dataXRange = { min: 0, max: 100 };
  var dataYRange = { min: 0, max: 100 };
   
   var width = 800;
   var height = 500;
   var circleRadius =7;


   var canvas = d3.select("body")
   				.append("svg")
   				.attr("width", width)
   				.attr("height",height+100)
   				.append("g")
   				.attr("transform","translate(0,0)")

   var widthscalex = d3.scaleLinear()
   				    .domain([dataXRange.min, dataXRange.max])
   				    .range([0,width])
   
   var widthscaley = d3.scaleLinear()
   				    .domain([dataYRange.min, dataYRange.max])
   				    .range([height,50])


   var xaxis = d3.axisBottom()
              .ticks(20)
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

   d3.json("./data/stream_1.json", function(error, json) {
			if (error) {
				return console.warn("error",error);
			} else {
				data = json;
			}
		})




function updatecircles(tick) {

  var theCircles = canvas.selectAll('.roundy')
        .data(data, function (d, i) {return d.id })

     theCircles.enter().append('circle')
        .attr('class', 'roundy')
        .attr('id', function (d, i) { return d.id})
        .attr('r', circleRadius)
        .attr('cx', function (d, i) { return widthscalex(d.xVal) } )
        .attr('cy', function (d, i) { return widthscaley(d.yVal) } )
        .style('fill', 'steelblue')
        .on("mouseover", function(d) {
            d3.selectAll('.roundy')
  					.filter(function(d) {

  						      if( (widthscalex(d.xVal) < d3.event.clientX+75) && (widthscalex(d.xVal) > d3.event.clientX-75) &&
  						          (widthscaley(d.yVal) < d3.event.clientY+75) && (widthscaley(d.yVal) > d3.event.clientY-75)){
  						       	return d

  						      }
  					                      })
         	        .transition()
         	        .style('fill', 'yellow')
         	        .attr("r", circleRadius + 5)
         	        .transition()
         	        	.style('fill', 'red')
         	        	.attr("r", circleRadius + 5)
         	        	.transition()
         	        	.attr("r", circleRadius)
         	        	.style('fill', 'steelblue')

         	   // .filter(function(d2) {

  						     //  if( (widthscalex(d2.xVal) > d3.event.clientX+50) && (widthscalex(d2.xVal) < d3.event.clientX+75) &&
  						     //      (widthscaley(d2.yVal) > d3.event.clientY+50) && (widthscaley(d2.yVal) < d3.event.clientY+75) &&
  						     //      (widthscalex(d2.xVal) < d3.event.clientX-50) && (widthscalex(d2.xVal) > d3.event.clientX-75) &&
  						     //      (widthscaley(d2.yVal) < d3.event.clientY-50) && (widthscaley(d2.yVal) > d3.event.clientY-75)

  						     //  ){
  						     //   	return d2

  						     //  }
  					      //                 })
         	   //          .transition()
         	   //      	.style('fill', 'pink')
         	   //      	.attr("r", circleRadius + 50)
	         	  //       	.transition()
	         	  //       	.attr("r", circleRadius)
	         	  //       	.style('fill', 'steelblue')
         	        
         	       
         	       

		                    })                 
	    .on("mouseout", function(d) {
            d3.selectAll('.roundy')
  					//.filter(function(d2) { return d2.xVal == d.xVal;})
         	        //.transition()
         	        .style('fill', 'steelblue')
         	        .attr("r", circleRadius)
         	       // .ease("elastic-out")

		                    })  




// move the dots 
         theCircles.transition()
          	.delay(0)
          	.duration(1000)
           .attr('cx', function (d) { 

           	d.xVal = d.xVal- 1
           return widthscalex(d.xVal) })
           
// remove dots when near y axis
         d3.selectAll('.roundy')
  					.filter(function(d2) { return d2.xVal<8;})
                    .remove()

}


function updateaxes(tick) {

   	d3.select(".xaxisb").remove();
   
    var widthscalex2 = d3.scaleLinear()
   				    .domain([dataXRange.min, dataXRange.max])
   				    .range([-(12*tick),width])
   
   console.log("tick is ", tick)
   var xaxis = d3.axisBottom()
              .ticks(20)
              .scale(widthscalex2)

   canvas.append("g")
   		  .attr("transform","translate(50,500)")
   		  .attr("class",'xaxisb')
   		  .call(xaxis)
    

        }

var timer = d3.timer(timerCallback); 

var restart_btn = d3.select("#chartDiv")
    .append("button")
    .text("Restart")
    .attr("position", "right")
    .classed("button", true)
    .on('click', function(){
        console.log("restart")
        location.reload();

    });

var pause_btn = d3.select("#chartDiv")
    .append("button")
    .text("Pause")
    .classed("button", true)
    .on('click', function(){
        console.log("pause")
        timer.stop()
    });

var play_btn = d3.select("#chartDiv")
    .append("button")
    .text("Play")
    .classed("button", true)
    .on('click', function(){
        console.log("play")
        timer.restart(timerCallback); 
    });


//
var tick = 0

function timerCallback(elapsed) {
  // console.log('tick ' + elapsed);
  if (elapsed > 1000) {
    tick = tick + 1;

    
    // var newThing = {
    //   id: tick,
    //   xVal: data[0].xVal,
    //   yVal: data[0].yVal,
    // }
    // data.push(newThing);

    // data.shift();
    // console.log(jsonData)

    updatecircles(tick);
    updateaxes(tick);

    timer.restart(timerCallback);
  }
}



	})();