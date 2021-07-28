
function scatter_plot(){
var margin = {top: 10, right: 30, bottom: 30, left: 120},
    width = 860 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom+300)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("data.csv", function(data) {

  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 60])
    .range([ 0, width ]);
  xAxisG=svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 40])
    .range([ height, 0]);
  yAxisG=svg.append("g")
    .call(d3.axisLeft(y));


//x and y labels
xAxisG.append('text')
          .attr('class', 'axis-label')
          .attr('x', width / 2)
          .attr('y', 100)
          .attr("fill","black")
		.attr("font-size","60px")
		.attr("font-family","Arial")
          .text('Age');

          yAxisG.append('text')
          .attr('class', 'axis-label')
          .attr('x', -height / 2)
          .attr('y', -60)
          .attr('transform', `rotate(-90)`)
          .style('text-anchor', 'middle')
                    .attr("fill","black")
		.attr("font-size","60px")
		.attr("font-family","Arial")
          .text('Smokers');

  // Add dots
  var gdots =  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter();
    
gdots.append("circle")
      .attr("cx", function (d) { return x(d.age); } )
      .attr("cy", function (d) { return y(d.smokes); } )
      .attr("r", 10)
      .style("fill", "#69b3a2");

	gdots.append("text")
		.attr("x",function (d) { return x(d.age); } )
		.attr("y",function (d) { return y(d.smokes); })
		.attr("text-anchor","middle")
		.attr("fill","white")
		.attr("font-size","10px")
		.attr("font-family","Arial")
		.attr("dy",".3em")
		.text(function (d) { return d.abbr; } );


})
}