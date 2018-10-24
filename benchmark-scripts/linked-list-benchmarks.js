const jsonfile = require("jsonfile");
const { performance } = require("perf_hooks");
const utils = require("./utils");

const linkedListBenchmarkData = {
  name: "Linked List",
  operations: [
    {
      name: "Iterate - Linked List",
      operationResults: []
    },
    {
      name: "Insert - Linked List",
      operationResults: []
    },
    {
      name: "Search - Linked List",
      operationResults: []
    },
    {
      name: "Delete - Linked List",
      operationResults: []
    },
    {
      name: "Combined Workload - Linked List",
      operationResults: []
    }
  ]
};

// generate data for array and gather results for each operation
const linkedList_10_3 = utils.generateLinkedList(1000);
const linkedList_10_4 = utils.generateLinkedList(10000);
const linkedList_10_5 = utils.generateLinkedList(100000);
const linkedList_10_6 = utils.generateLinkedList(1000000);
const linkedList_10_7 = utils.generateLinkedList(10000000);
const linkedListSizes = [
  linkedList_10_3,
  linkedList_10_4,
  linkedList_10_5,
  linkedList_10_6,
  linkedList_10_7
];

const linkedListIterationResults = utils.getOperationResultsObject();
const linkedListInsertResults = utils.getOperationResultsObject();
const linkedListSearchResults = utils.getOperationResultsObject();
const linkedListDeleteResults = utils.getOperationResultsObject();
const linkedListCombinedWorkloadResults = utils.getOperationResultsObject();

// Run each operation 10 times for each linkedList size and collect results
linkedListSizes.forEach((linkedList, linkedListSizeIndex) => {
  // run iterate's
  for (let i = 0; i < 10; i++) {
    const start = performance.now();
    // iterate over array an run no-op function
    linkedList.forEach(() => {
      return;
    });
    const timeElapsed = performance.now() - start;
    linkedListIterationResults[linkedListSizeIndex].results.push(timeElapsed);
  }

  // run searches
  for (let i = 0; i < 10; i++) {
    const middleItem = linkedList.size / 2;
    const start = performance.now();
    // search for middle item in linkedList
    // (we know middle based on insertion method in generateLinkedList function)
    linkedList.contains(middleItem);
    const timeElapsed = performance.now() - start;
    linkedListSearchResults[linkedListSizeIndex].results.push(timeElapsed);
  }

  // run insert's
  for (let i = 0; i < 10; i++) {
    const middleIndex = linkedList.getSize() / 2;
    const start = performance.now();
    // add new item to linkedList
    linkedList.insertAt(middleIndex, "insert-item");
    const timeElapsed = performance.now() - start;
    linkedListInsertResults[linkedListSizeIndex].results.push(timeElapsed);
  }

  // run delete's
  for (let i = 0; i < 10; i++) {
    const middleIndex = linkedList.getSize() / 2;
    const start = performance.now();
    // delete middle item in linkedList
    linkedList.removeAt(middleIndex);
    const timeElapsed = performance.now() - start;
    linkedListDeleteResults[linkedListSizeIndex].results.push(timeElapsed);
  }

  // run combined workload
  // 6 inserts, 1 search, 1 iterate, 2 delete
  for (let i = 0; i < 10; i++) {
    const middleIndex = linkedList.getSize() / 2;
    const start = performance.now();

    // workload
    linkedList.insertAt(middleIndex, "insert-item");
    linkedList.insertAt(middleIndex, "insert-item");
    linkedList.insertAt(middleIndex, "insert-item");
    linkedList.insertAt(middleIndex, "insert-item");
    linkedList.insertAt(middleIndex, "insert-item");
    linkedList.insertAt(middleIndex, "insert-item");

    linkedList.contains("insert-item");

    linkedList.forEach(() => {
      return;
    });

    linkedList.removeAt(middleIndex);
    linkedList.removeAt(middleIndex);
    // end workload

    const timeElapsed = performance.now() - start;
    linkedListCombinedWorkloadResults[linkedListSizeIndex].results.push(
      timeElapsed
    );
  }
});

linkedListBenchmarkData.operations[0].operationResults = linkedListIterationResults;
linkedListBenchmarkData.operations[1].operationResults = linkedListInsertResults;
linkedListBenchmarkData.operations[2].operationResults = linkedListSearchResults;
linkedListBenchmarkData.operations[3].operationResults = linkedListDeleteResults;
linkedListBenchmarkData.operations[4].operationResults = linkedListCombinedWorkloadResults;

delete linkedList_10_3;
delete linkedList_10_4;
delete linkedList_10_5;
delete linkedList_10_6;
delete linkedList_10_7;

jsonfile.writeFileSync(
  "./results/linkedList-benchmark-data.json",
  linkedListBenchmarkData
);
