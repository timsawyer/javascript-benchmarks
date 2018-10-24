const jsonfile = require("jsonfile");

jsonfile.readFileSync("./results/array-benchmark-data.json");

const arrayResults = jsonfile.readFileSync(
  "./results/array-benchmark-data.json"
);
const mapResults = jsonfile.readFileSync("./results/map-benchmark-data.json");
const setResults = jsonfile.readFileSync("./results/set-benchmark-data.json");
const linkedListResults = jsonfile.readFileSync(
  "./results/linkedList-benchmark-data.json"
);

const results = [arrayResults, mapResults, setResults, linkedListResults];

jsonfile.writeFileSync("./results/combinedResults.json", results);
