//define colors

const colors = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
];

//define svg area

const width = 800,
  height = 600;

const svgContainer = d3
  .select(".visHolder")
  .append("svg")
  .attr("id", "svg")
  .attr("width", width)
  .attr("height", height);

//define tooltip

const tooltip = d3
  .select(".visHolder")
  .append("div")
  .attr("class", "tooltip")
  .attr("id", "tooltip");

//import data

const KICKSTARTER =
  " https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json";
const MOVIE_SALES =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json";
const VIDEO_GAME_SALES =
  " https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";

d3.json(KICKSTARTER, (error, kickStarter) => {
  if (error) throw error;

  //establish treemap

  const root = d3
    .hierarchy(kickStarter)
    .sum((d) => d.value)
    .sort((a, b) => b.value - a.value);

  const treemap = d3.treemap().size([width, height]).padding(2);
  treemap(root);
  //link colors to categories

  const chooseColor = {};
  const categoryNames = root.children.map((d) => d.data.name);
  categoryNames.forEach((key, i) => (chooseColor[key] = colors[i]));

  //display treemap

  const cell = svgContainer
    .selectAll("g")
    .data(root.leaves())
    .enter()
    .append("g")
    .attr("class", "cell")
    .attr("transform", (d) => {
      return "translate(" + d.x0 + "," + d.y0 + ")";
    });

  const tile = cell
    .append("rect")
    .attr("class", "tile")
    .attr("data-name", (d) => d.data.name)
    .attr("data-category", (d) => d.data.category)
    .attr("data-value", (d) => d.data.value)
    .attr("width", (d) => d.x1 - d.x0)
    .attr("height", (d) => d.y1 - d.y0)
    .style("stroke", "black")
    .style("fill", (d) => {
      return "var(--" + chooseColor[d.data.category] + ")";
    })
    .on("mouseover", (d) => {
      tooltip
        .style("opacity", 0.9)
        .attr("data-value", d.data.value)
        .style("top", d3.event.pageY - 200 + "px")
        .style("left", d3.event.pageX + 50 + "px")
        .html(
          "<strong>" +
            d.data.name +
            "</strong>" +
            "<br>" +
            d.data.category +
            "<br>" +
            d3.format("$,")(d.data.value)
        )
        .on("mouseout", () => {
          tooltip.style("opacity", 0);
        });
    });

  //display labels

  cell
    .selectAll("text")
    .data((d) => d.data.name.split(/(?=[A-Z][^A-Z])/g))
    .enter()
    .append("text")
    .attr("class", "label")
    .attr("x", 5)
    .attr("y", (d, i) => i * 12 + 10)
    .text((d) => d)
    .style("fill", "white")
    .style("font-size", 12)
    .style("text-shadow", "-1px 1px 0, 1px 1px 0, 1px -1px 0, -1px -1px 0");

  //check values

  const catagories = kickStarter.children.map((x) => {
    const valueArray = x.children.map((y) => y.value);
    let value = 0;
    for (i = 0; i < valueArray.length; i++) {
      value += parseInt(valueArray[i]);
    }
    return [x.name, value];
  });
  console.log(catagories);
  console.log("NarrFilm: " + (1911827 + 3105473 + 5702153));
});
