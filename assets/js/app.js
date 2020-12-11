const svgHeight = 400
const svgWidth = 800

const margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 100
  }

const chartHeight = svgHeight - margin.top - margin.bottom
const chartWidth = svgWidth - margin.left - margin.right

const minRadius = 10
const maxRadius = 10

const svg = d3.select("body").append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth)
  
const chartG = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`)
  .classed("chart-group", true)

d3.csv("assets/data/data.csv").then(data => {
    console.log(data)

    const y = d3.scaleLinear()
        .domain([0, d3.max(data.map(d => parseInt(d.healthcare)))])
        .range([chartHeight, 0])

    const x = d3.scaleLinear()
        .domain([0, d3.max(data.map(d => parseInt(d.poverty)))])
        .range([0, chartWidth])

    const size = d3.scaleLinear()
        .domain(d3.extent(data.map(d => parseInt(d.poverty))))
        .range([minRadius, maxRadius])

    const yAxis = d3.axisLeft(y)
    const xAxis = d3.axisBottom(x)

    chartG.append("g")
        .call(yAxis)
    
    chartG.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(xAxis)
    
        const labelArea = svg
        .append("g")
        .attr(
          "transform",
          `translate(${svgWidth / 3}, ${svgHeight - margin.bottom + 30})`
        );
    
    labelArea.append("text").attr("stroke", "#000000").text("Lacks Healthare (%) vs. In poverty (%)");



    const plotArea = chartG.append("g")
            .classed("plot-area", true)

    const circleG = plotArea.selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", d => `translate(${x(parseInt(d.poverty))}, ${y(parseInt(d.healthcare))})`)

    circleG.append("circle")
        .attr("r", d => size(parseInt(d.poverty)))
        .attr("fill", "LightBlue")


    circleG.append("text")
        .text(d => d.abbr)
        .attr("stroke", "#FFFFFF")
        .attr("fill", "#FFFFFF")
        .attr("dy", ".3em")
        .attr("text-anchor", "middle")
        .attr("font-size", "10px")

    // circleG.append("text")
    //     .text(d => d.healthcare)
    //     .attr("stroke", "#FF0000")
    //     .attr("fill", "#FF0000")
    //     .attr("dy", "1.3em")
    //     .attr("text-anchor", "middle")
})