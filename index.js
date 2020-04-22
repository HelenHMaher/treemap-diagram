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

d3.queue()
  .defer(d3.json, KICKSTARTER)
  .defer(d3.json, MOVIE_SALES)
  .defer(d3.json, VIDEO_GAME_SALES)
  .await((error, kickStarter, movieSales, videoGame) => {
    if (error) throw error;
    svgContainer
      .append("text")
      .text(JSON.stringify(movieSales))
      .attr("x", 10)
      .attr("y", 20);
  });
