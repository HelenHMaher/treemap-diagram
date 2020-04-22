const width = 500,
  height = 500;

const svgContainer = d3
  .select(".visHolder")
  .append("svg")
  .attr("id", "svg")
  .attr("width", width)
  .attr("height", height);
