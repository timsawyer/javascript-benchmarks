# Javascript Benchmarks

A deployed version of this application is available at: https://javascript-benchmarks.appspot.com/

## Description

For this project, I created several benchmarking scripts to test the speeds of various data structures
in JavaScript. I tested the following data structures: [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map), [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set), [Linked List](https://www.npmjs.com/package/dbly-linked-list). The Array, Map, and Set are native JavaScript data structures.
The linked list is an implementation from NPM.

For each data structure, I tested execution times for the following operations: iteration, insertion, deletion, and search. For the Array, I also tested the built in [Sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) function. I also tested a combined workload for each data structures that was comprised of 60% insertion, 20% deletion, 10% insertion, and 10% search.

The benchmarking scripts run each of these operations (included the entire combined workload) 10 times on each of the following data structure sizes: 10^3, 10^4, 10^5, 10^6, 10^7. For each operation on each size data structure, I record the execution times and store in a JSON data structure.

To visualize and explore the resulting data, I created a web app using [Angular](http://angular.io) and [D3](https://d3js.org/).
For each operation on each size data structure, a box plot is generated that shows the min, max, and interquartile range. These box plots can be configured and explored on the home page of the application.

I ran these tests on a Mackbook Pro with the following specs:

**OS**: macOS High Sierra Version 10.13.6  
**Processor**: 2.6 GHz Intel Core i7  
**Memory**: 16 GB 2133 MHz LPDDR3

To excute the scripts I used [Node.js](https://nodejs.org/en/) v8.12.0

## Analysis
