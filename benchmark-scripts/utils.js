// linked list used: https://www.npmjs.com/package/dbly-linked-list
var LinkedList = require("dbly-linked-list");

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

const generateMap = size => {
  const map = new Map();
  for (let i = 0; i < size; i++) {
    map.set(i, generateRandomString());
  }
  return map;
};

const generateSet = size => {
  const set = new Set();
  for (let i = 0; i < size; i++) {
    set.add(i);
  }
  return set;
};

const generateLinkedList = size => {
  const linkedList = new LinkedList();
  for (let i = 0; i < size; i++) {
    linkedList.insert(i);
  }
  return linkedList;
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

module.exports = {
  generateRandomString,
  generateArray,
  generateMap,
  getOperationResultsObject,
  generateSet,
  generateLinkedList
};
