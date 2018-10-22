const jsonfile = require("jsonfile");
var LinkedList = require("linked-list");
const { performance } = require("perf_hooks");

const generateRandomString = () =>
  Math.random()
    .toString(36)
    .substring(2);

const generateArray = length => {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(generateRandomString());
  }
  return arr;
};

// Iteration, Insert, Search, Delete
const getOperationResultsObject = () => {
  const operationResults = [
    {
      size: "10^3",
      results: []
    },
    {
      size: "10^4",
      results: []
    },
    {
      size: "10^5",
      results: []
    },
    {
      size: "10^6",
      results: []
    },
    {
      size: "10^7",
      results: []
    }
  ];
  return operationResults;
};

const dataStructures = [
  {
    name: "Array",
    operations: [
      {
        name: "iterate",
        operationResults: []
      },
      {
        name: "insert",
        operationResults: []
      },
      {
        name: "search",
        operationResults: []
      },
      {
        name: "delete",
        operationResults: []
      },
      {
        name: "sort",
        operationResults: []
      }
    ]
  },
  {
    name: "Map",
    operations: [
      {
        name: "iterate",
        operationResults: []
      },
      {
        name: "insert",
        operationResults: []
      },
      {
        name: "search",
        operationResults: []
      },
      {
        name: "delete",
        operationResults: []
      },
      {
        name: "sort",
        operationResults: []
      }
    ]
  },
  {
    name: "Set",
    operations: [
      {
        name: "iterate",
        operationResults: []
      },
      {
        name: "insert",
        operationResults: []
      },
      {
        name: "search",
        operationResults: []
      },
      {
        name: "delete",
        operationResults: []
      },
      {
        name: "sort",
        operationResults: []
      }
    ]
  },
  {
    name: "Linked list",
    operations: [
      {
        name: "iterate",
        operationResults: []
      },
      {
        name: "insert",
        operationResults: []
      },
      {
        name: "search",
        operationResults: []
      },
      {
        name: "delete",
        operationResults: []
      },
      {
        name: "sort",
        operationResults: []
      }
    ]
  }
];

// generate data for array and gather results for each operation
const array_10_3 = generateArray(1000);
const array_10_4 = generateArray(10000);
const array_10_5 = generateArray(100000);
const array_10_6 = generateArray(1000000);
const array_10_7 = generateArray(10000000);
const arraySizes = [array_10_3, array_10_4, array_10_5, array_10_6, array_10_7];

// Run each operation 10 times for each array size and collect results
arraySizes.forEach((arr, arraySizeIndex) => {
  // run iterate's
  const arrayIterationResults = getOperationResultsObject();
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
  dataStructures[0].operations[0].operationResults = arrayIterationResults;

  // run insert's
  const arrayInsertResults = getOperationResultsObject();
  for (let i = 0; i < 10; i++) {
    const arrCopy = [...arr];
    const middle = arrCopy.length / 2;
    const start = performance.now();
    // insert into middle of array
    arrCopy.splice(middle, 0, "insert-item");
    const timeElapsed = performance.now() - start;
    arrayInsertResults[arraySizeIndex].results.push(timeElapsed);
  }
  dataStructures[0].operations[1].operationResults = arrayInsertResults;

  // run searches
  const arraySearchResults = getOperationResultsObject();
  for (let i = 0; i < 10; i++) {
    const arrCopy = [...arr];
    const middleItem = arrCopy[arrCopy.length / 2];
    const start = performance.now();
    // search for middle item in array
    arrCopy.indexOf(middleItem);
    const timeElapsed = performance.now() - start;
    arraySearchResults[arraySizeIndex].results.push(timeElapsed);
  }
  dataStructures[0].operations[2].operationResults = arraySearchResults;

  // run delete's
  const arrayDeleteResults = getOperationResultsObject();
  for (let i = 0; i < 10; i++) {
    const arrCopy = [...arr];
    const middle = arrCopy.length / 2;
    const start = performance.now();
    // delete middle item in array
    arrCopy.splice(middle, 1);
    const timeElapsed = performance.now() - start;
    arrayDeleteResults[arraySizeIndex].results.push(timeElapsed);
  }
  dataStructures[0].operations[3].operationResults = arrayDeleteResults;

  // run sorts
  const arraySortResults = getOperationResultsObject();
  for (let i = 0; i < 10; i++) {
    const arrCopy = [...arr];
    const start = performance.now();
    // delete middle item in array
    arrCopy.sort();
    const timeElapsed = performance.now() - start;
    arraySortResults[arraySizeIndex].results.push(timeElapsed);
  }
  dataStructures[0].operations[4].operationResults = arraySortResults;
});

delete array_10_3;
delete array_10_4;
delete array_10_5;
delete array_10_6;
delete array_10_7;

jsonfile.writeFileSync(
  "./results/array-benchmark-results.json",
  dataStructures
);
