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

const width = 500,
  height = 500;

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

//importat data

const KICKSTARTER =
  " https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json";
const MOVIE_SALES =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json";
const VIDEO_GAME_SALES =
  " https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";

d3.json(KICKSTARTER, (error, kickStarter) => {
  if (error) throw error;

  //establish treemap

  var root = d3.hierarchy(kickStarter).sum((d) => d.value);
  const treemap = d3.treemap().size([width, height]);
  treemap(root);

  //link colors to categories

  const chooseColor = {};
  const categoryNames = root.children.map((d) => d.data.name);
  categoryNames.forEach((key, i) => (chooseColor[key] = colors[i]));

  //display treemap

  svgContainer
    .selectAll("rect")
    .data(root.leaves())
    .enter()
    .append("rect")
    .attr("class", "tile")
    .attr("data-name", "d.data.name")
    .attr("data-category", "d.data.category")
    .attr("data-value", "d.data.value")
    .attr("x", (d) => d.x0)
    .attr("y", (d) => d.y0)
    .attr("width", (d) => d.x1 - d.x0)
    .attr("height", (d) => d.y1 - d.y0)
    .style("stroke", "black")
    .style("fill", (d) => {
      return "var(--" + chooseColor[d.data.category] + ")";
    });

  //display labels

  svgContainer
    .selectAll("text")
    .data(root.leaves())
    .enter()
    .append("text")
    .attr("x", (d) => d.x0 + 5)
    .attr("y", (d) => d.y0 + 20)
    .text((d) => d.data.name)
    .style("font-size", 5)
    .style("fill", "white");

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
