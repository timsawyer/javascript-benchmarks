const jsonfile = require("jsonfile");
const { performance } = require("perf_hooks");
const utils = require("./utils");

const setBenchmarkData = {
  name: "Set",
  operations: [
    {
      name: "Iterate - Set",
      operationResults: []
    },
    {
      name: "Insert - Set",
      operationResults: []
    },
    {
      name: "Search - Set",
      operationResults: []
    },
    {
      name: "Delete - Set",
      operationResults: []
    }
  ]
};

// generate data for array and gather results for each operation
const set_10_3 = utils.generateSet(10);
const set_10_4 = utils.generateSet(10);
const set_10_5 = utils.generateSet(10);
const set_10_6 = utils.generateSet(10);
const set_10_7 = utils.generateSet(10);
const setSizes = [set_10_3, set_10_4, set_10_5, set_10_6, set_10_7];

const setIterationResults = utils.getOperationResultsObject();
const setInsertResults = utils.getOperationResultsObject();
const setSearchResults = utils.getOperationResultsObject();
const setDeleteResults = utils.getOperationResultsObject();

// Run each operation 10 times for each set size and collect results
setSizes.forEach((set, setSizeIndex) => {
  // run iterate's
  for (let i = 0; i < 10; i++) {
    const start = performance.now();
    // iterate over array an run no-op function
    set.forEach(() => {
      return;
    });
    const timeElapsed = performance.now() - start;
    setIterationResults[setSizeIndex].results.push(timeElapsed);
  }

  // run searches
  for (let i = 0; i < 10; i++) {
    const middleItem = set.size / 2;
    const start = performance.now();
    // search for middle item in set
    // (we know middle based on insertion order of generateSet function)
    set.has(middleItem);
    const timeElapsed = performance.now() - start;
    setSearchResults[setSizeIndex].results.push(timeElapsed);
  }

  // run insert's
  for (let i = 0; i < 10; i++) {
    const newItem = set.size + 1;
    const start = performance.now();
    // add new item to set
    set.add(newItem);
    const timeElapsed = performance.now() - start;
    setInsertResults[setSizeIndex].results.push(timeElapsed);
  }

  // run delete's
  for (let i = 0; i < 10; i++) {
    const middleItem = set.size / 2;
    const start = performance.now();
    // delete middle item in set
    set.delete(middleItem);
    const timeElapsed = performance.now() - start;
    setDeleteResults[setSizeIndex].results.push(timeElapsed);
  }
});

setBenchmarkData.operations[0].operationResults = setIterationResults;
setBenchmarkData.operations[1].operationResults = setInsertResults;
setBenchmarkData.operations[2].operationResults = setSearchResults;
setBenchmarkData.operations[3].operationResults = setDeleteResults;

delete set_10_3;
delete set_10_4;
delete set_10_5;
delete set_10_6;
delete set_10_7;

jsonfile.writeFileSync("./results/set-benchmark-data.json", setBenchmarkData);
