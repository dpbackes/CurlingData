function doHistogram(data, divId, title) {
    var margin = {top: 10, right: 30, bottom: 40, left: 40},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    var svg = d3.select("#"+divId)
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleLinear()
        .domain([1, 21])
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    var histogram = d3.histogram()
        .value(function(d) { return d.RatingPoints; })
        .domain(x.domain())
        .thresholds(x.ticks(20));

    var bins = histogram(data);

    var y = d3.scaleLinear()
        .range([height, 0]);
        y.domain([0, 140]);

    d3.select("#"+divId).attr("align","center");

    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 2) + 10)
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text(title);

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left - 5)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Number of Curlers");  

        svg.append("text")
            .attr("x", width / 2 )
            .attr("y",  height + margin.bottom - 5)
            .style("text-anchor", "middle")
            .text("Rating Points");

    svg.append("g")
        .call(d3.axisLeft(y));

    svg.selectAll("rect")
        .data(bins)
        .enter()
        .append("rect")
            .attr("x", 1)
            .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
            .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
            .attr("height", function(d) { return height - y(d.length); })
            .style("fill", "#ff0000")

}