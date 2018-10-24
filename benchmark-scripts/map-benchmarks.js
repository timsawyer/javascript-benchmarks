const jsonfile = require("jsonfile");
const { performance } = require("perf_hooks");
const utils = require("./utils");

const mapBenchmarkData = {
  name: "Map",
  operations: [
    {
      name: "Iterate - Map",
      operationResults: []
    },
    {
      name: "Insert - Map",
      operationResults: []
    },
    {
      name: "Search - Map",
      operationResults: []
    },
    {
      name: "Delete - Map",
      operationResults: []
    },
    {
      name: "Combined Workload - Map",
      operationResults: []
    }
  ]
};

// generate data for array and gather results for each operation
const map_10_3 = utils.generateMap(1000);
const map_10_4 = utils.generateMap(10000);
const map_10_5 = utils.generateMap(100000);
const map_10_6 = utils.generateMap(1000000);
const map_10_7 = utils.generateMap(10000000);
const mapSizes = [map_10_3, map_10_4, map_10_5, map_10_6, map_10_7];

const mapIterationResults = utils.getOperationResultsObject();
const mapInsertResults = utils.getOperationResultsObject();
const mapSearchResults = utils.getOperationResultsObject();
const mapDeleteResults = utils.getOperationResultsObject();
const mapCombinedWorkloadResults = utils.getOperationResultsObject();

// Run each operation 10 times for each map size and collect results
mapSizes.forEach((map, mapSizeIndex) => {
  // run iterate's
  for (let i = 0; i < 10; i++) {
    const start = performance.now();
    // iterate over array an run no-op function
    map.forEach(() => {
      return;
    });
    const timeElapsed = performance.now() - start;
    mapIterationResults[mapSizeIndex].results.push(timeElapsed);
  }

  // run searches
  for (let i = 0; i < 10; i++) {
    const middleKey = map.size / 2;
    const start = performance.now();
    // search for middle item in map
    // (we know middle based on insertion order of generateMap function)
    map.has(middleKey);
    const timeElapsed = performance.now() - start;
    mapSearchResults[mapSizeIndex].results.push(timeElapsed);
  }

  // run insert's
  for (let i = 0; i < 10; i++) {
    const newKey = map.size + 1;
    const start = performance.now();
    // insert new item into map
    map.set(newKey, 0, "insert-item");
    const timeElapsed = performance.now() - start;
    mapInsertResults[mapSizeIndex].results.push(timeElapsed);
  }

  // run delete's
  for (let i = 0; i < 10; i++) {
    const middleKey = map.size / 2;
    const start = performance.now();
    // delete middle item in map
    map.delete(middleKey);
    const timeElapsed = performance.now() - start;
    mapDeleteResults[mapSizeIndex].results.push(timeElapsed);
  }

  // run combined workload
  // 6 inserts, 1 search, 1 iterate, 2 delete
  for (let i = 0; i < 10; i++) {
    let lastKey = map.size;
    const middleKey = map.size / 2;
    const start = performance.now();

    // workload
    map.set(++lastKey, "insert-item");
    map.set(++lastKey, "insert-item");
    map.set(++lastKey, "insert-item");
    map.set(++lastKey, "insert-item");
    map.set(++lastKey, "insert-item");
    map.set(++lastKey, "insert-item");

    map.has(middleKey);

    map.forEach(() => {
      return;
    });

    map.delete(--lastKey);
    map.delete(--lastKey);
    // end workload

    const timeElapsed = performance.now() - start;
    mapCombinedWorkloadResults[mapSizeIndex].results.push(timeElapsed);
  }
});

mapBenchmarkData.operations[0].operationResults = mapIterationResults;
mapBenchmarkData.operations[1].operationResults = mapInsertResults;
mapBenchmarkData.operations[2].operationResults = mapSearchResults;
mapBenchmarkData.operations[3].operationResults = mapDeleteResults;
mapBenchmarkData.operations[4].operationResults = mapCombinedWorkloadResults;

delete map_10_3;
delete map_10_4;
delete map_10_5;
delete map_10_6;
delete map_10_7;

jsonfile.writeFileSync("./results/map-benchmark-data.json", mapBenchmarkData);
