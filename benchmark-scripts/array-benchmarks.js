const jsonfile = require("jsonfile");
const { performance } = require("perf_hooks");
const utils = require("./utils");

const arrayBenchmarkData = {
  name: "Array",
  operations: [
    {
      name: "Iterate - Array",
      operationResults: []
    },
    {
      name: "Insert - Array",
      operationResults: []
    },
    {
      name: "Search - Array",
      operationResults: []
    },
    {
      name: "Delete - Array",
      operationResults: []
    },
    {
      name: "Sort - Array",
      operationResults: []
    },
    {
      name: "Combined Workload - Array",
      operationResults: []
    }
  ]
};

// generate data for array and gather results for each operation
const array_10_3 = utils.generateArray(10);
const array_10_4 = utils.generateArray(10);
const array_10_5 = utils.generateArray(10);
const array_10_6 = utils.generateArray(10);
const array_10_7 = utils.generateArray(10);
const arraySizes = [array_10_3, array_10_4, array_10_5, array_10_6, array_10_7];

const arrayIterationResults = utils.getOperationResultsObject();
const arrayInsertResults = utils.getOperationResultsObject();
const arraySearchResults = utils.getOperationResultsObject();
const arrayDeleteResults = utils.getOperationResultsObject();
const arraySortResults = utils.getOperationResultsObject();
const arrayCombinedWorkloadResults = utils.getOperationResultsObject();

// Run each operation 10 times for each array size and collect results
arraySizes.forEach((arr, arraySizeIndex) => {
  // run iterate's
  for (let i = 0; i < 10; i++) {
    const arrCopy = [...arr];
    const start = performance.now();
    // iterate over array an run no-op function
    arrCopy.forEach(() => {
      return;
    });
    const timeElapsed = performance.now() - start;
    arrayIterationResults[arraySizeIndex].results.push(timeElapsed);
  }

  // run insert's
  for (let i = 0; i < 10; i++) {
    const arrCopy = [...arr];
    const middle = arrCopy.length / 2;
    const start = performance.now();
    // insert into middle of array
    arrCopy.splice(middle, 0, "insert-item");
    const timeElapsed = performance.now() - start;
    arrayInsertResults[arraySizeIndex].results.push(timeElapsed);
  }

  // run searches
  for (let i = 0; i < 10; i++) {
    const arrCopy = [...arr];
    const middleItem = arrCopy[arrCopy.length / 2];
    const start = performance.now();
    // search for middle item in array
    arrCopy.indexOf(middleItem);
    const timeElapsed = performance.now() - start;
    arraySearchResults[arraySizeIndex].results.push(timeElapsed);
  }

  // run delete's
  for (let i = 0; i < 10; i++) {
    const arrCopy = [...arr];
    const middle = arrCopy.length / 2;
    const start = performance.now();
    // delete middle item in array
    arrCopy.splice(middle, 1);
    const timeElapsed = performance.now() - start;
    arrayDeleteResults[arraySizeIndex].results.push(timeElapsed);
  }

  // run sorts
  for (let i = 0; i < 10; i++) {
    const arrCopy = [...arr];
    const start = performance.now();
    // delete middle item in array
    arrCopy.sort();
    const timeElapsed = performance.now() - start;
    arraySortResults[arraySizeIndex].results.push(timeElapsed);
  }

  // run combined workload
  // 6 inserts, 1 search, 1 iterate, 2 delete
  for (let i = 0; i < 10; i++) {
    const arrCopy = [...arr];
    const middle = arrCopy.length / 2;
    const start = performance.now();

    // workload
    arrCopy.splice(middle, 0, "insert-item");
    arrCopy.splice(middle, 0, "insert-item");
    arrCopy.splice(middle, 0, "insert-item");
    arrCopy.splice(middle, 0, "insert-item");
    arrCopy.splice(middle, 0, "insert-item");
    arrCopy.splice(middle, 0, "insert-item");

    arrCopy.indexOf("insert-item");

    arrCopy.forEach(() => {
      return;
    });

    arrCopy.splice(middle, 1);
    arrCopy.splice(middle, 1);
    // end workload

    const timeElapsed = performance.now() - start;
    arrayCombinedWorkloadResults[arraySizeIndex].results.push(timeElapsed);
  }
});

arrayBenchmarkData.operations[0].operationResults = arrayIterationResults;
arrayBenchmarkData.operations[1].operationResults = arrayInsertResults;
arrayBenchmarkData.operations[2].operationResults = arraySearchResults;
arrayBenchmarkData.operations[3].operationResults = arrayDeleteResults;
arrayBenchmarkData.operations[4].operationResults = arraySortResults;
arrayBenchmarkData.operations[5].operationResults = arrayCombinedWorkloadResults;

delete array_10_3;
delete array_10_4;
delete array_10_5;
delete array_10_6;
delete array_10_7;

jsonfile.writeFileSync(
  "./results/array-benchmark-data.json",
  arrayBenchmarkData
);
