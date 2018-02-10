;(function() {


  var width = 1000
  var height = 1000

  var theData = [18, 14, 20, 50]

 var svg = d3.select('.className').append('svg')
    .attr('width', width)
    .attr('height', height)

  // var circles = svg.selectAll('circle')
  //       .data(theData)
  //     .enter().append('circle')
  //       .attr('r', 30 )
  //       .attr('cx', function(d, i) { return i * 100 + 100; } )
  //       .attr('cy', 150)
  //       .style('fill', 'steelblue')

// event handlers

// console.log('first this: ', this)
//
  // var circles = svg.selectAll('.baller')
  //       .data(theData)
  //     .enter().append('circle')
  //       //.attr('class', 'baller')
  //       .attr('r', function (d, i) { return d} )
  //       .attr('cx', function (d, i) { return i * 100 + 50; } )
  //       .attr('cy', 150)
  //       .style('fill', 'steelblue')
  //       .on('click', function (d, i) { // event handlers!
  //          console.log('i:', i)
  //          console.log('d:', d);
  //         //console.log('this: ' + this)
  //          d3.select(this).style('fill', 'red');
  //       })
  //       .on('mouseover', function (d, i) { // event handlers!
  //         d3.select(this).style('fill', 'orange');
  //       })
  //       .on('mouseout', function (d, i) { // event handlers!
  //         d3.select(this).style('fill', 'steelblue');
  //       })

// TIMER

// function timerCallback(elapsed) {
//   console.log('tick ' + elapsed);
// }
// //
// var timer = d3.timer(timerCallback);

// TIMER MORE
//
// var tick = 0

//   function timerCallback(elapsed) {
//     // console.log('tick ' + elapsed);
//     if (elapsed > 1000) {
//       tick++;

//       theData.push(Math.floor(Math.random() * 20));
//       console.log('tick ' + tick);
//       console.log('data ' + theData);

//       timer.restart(timerCallback);
//     }
//   }

//   var timer = d3.timer(timerCallback);


  // ENTER / EXIT

//
// function updateCircles() {

//   var theCircles = svg.selectAll('.roundy')
//         .data(theData)

//      theCircles.enter().append('circle')
//         .attr('class', 'roundy')
//         .attr('r', function (d, i) { return d} )
//         .attr('cx', function (d, i) { return i * 100 + 50; } )
//         .attr('cy', 150)
//         .style('fill', 'steelblue')

//     // theCircles.exit().remove();

//        theCircles.exit().transition()
//         .duration(900)
//         .style('fill', 'red')
//         .remove();
// }
// //
// var tick = 0

// function timerCallback(elapsed) {
//   // console.log('tick ' + elapsed);
//   if (elapsed > 1000) {
//     tick = tick + 1;

//     // add to data?
//     // theData.push(Math.floor(40 - Math.random() * 30));

//     // remove from data?
//     theData.shift();

//     console.log(theData)
//     updateCircles(); // ADDED UPDATE

//     timer.restart(timerCallback);
//   }
// }

// var timer = d3.timer(timerCallback);

// ///// MORE: ENTER, UPDATE, EXIT... all the rest
//
//
// jsonData = []
// for (var i = 0; i < 10; i++) {
//   jsonData.push({
//     id: 'thing' + i,          // we want a unique key
//     xVal: Math.random() * 40,
//     yVal: Math.random() * 40
//   })
// }


	d3.json("./data/stream_1.json", function(error, json) {
			if (error) {
				return console.warn(error);
			} else {
				jsonData = json;
		

				// you could load more data here using d3.json() again...

			}
		});




// console.log(jsonData)
// //
//
//
function updateCircles() {

  var theCircles = svg.selectAll('.roundy')
        .data(jsonData, function (d, i) {return d.id })

     theCircles.enter().append('circle')
        .attr('class', 'roundy')
        .attr('id', function (d, i) { return d.id})
        .attr('r', 4)// (d, i) { return 10  d.xVal} )
        .attr('cx', width)// function (d, i) { return d.xVal } )
        .attr('cy', width)//function (d, i) { return d.yVal } )
        .style('fill', 'steelblue')
      .merge(theCircles) // update + merge
         .transition()
          .delay(400)
          .duration(900)
          //.attr('cx', function (d, i) { return i * 100 + 50; } )
           .attr('cx', function (d, i) { return d.xVal } )
           .attr('cy', function (d, i) { return d.yVal } )
          .style('fill', 'green')

    theCircles.exit().transition()
        .duration(8)
        .style("fill", "red")
        .remove();
}
//
var tick = 0

function timerCallback(elapsed) {
  // console.log('tick ' + elapsed);
  if (elapsed > 1500) {
    tick = tick + 1;

    //add to data?
    // var newThing = {
    //   id: tick,
    //   xVal: Math.random() * 40,
    //   yVal: Math.random() * 40
    // }
    // jsonData.push(newThing);

    // remove from data?
    jsonData.shift();
    // console.log(jsonData)

    updateCircles();

    timer.restart(timerCallback);
  }
}

var timer = d3.timer(timerCallback);



})(); //end of file
