# Javascript Benchmarks

## Code

The code for the project is available at:
https://github.com/timsawyer/javascript-benchmarks

## Deployed App

A deployed version of the app that I created to explore and visualize the data from this project is available here:
https://javascript-benchmarks.appspot.com

## Description

For this project, I created several benchmarking scripts to test the speeds of various data structures in JavaScript. I tested the following data structures: Array, Map, Set, Linked List. The Array, Map, and Set are native JavaScript data structures. The linked list is an implementation from NPM.

For each data structure, I tested execution times for the following operations: iteration, insertion, deletion, search, and a combined workload. The combined workload for each data structure was comprised of 60% insertion, 20% deletion, 10% insertion, and 10% search. For the Array, I also tested the native sort function.

For insert, delete, and search operations, the middle item in the data structure was targeted each time.

The benchmarking scripts run each of these operations (including the entire combined workload) 10 times on each of the following data structure sizes: 10^3, 10^4, 10^5, 10^6, 10^7. For each operation on each size data structure, I calculate the execution time and then store them in a JSON file.

To visualize and explore the resulting data, I created a web app using Angular and D3. For each operation on each size data structure, a box plot is generated that shows the min, max, and interquartile range. These box plots can be configured and explored on the homepage of the application.

I ran these tests on a Macbook Pro with the following specs:

**OS**: macOS High Sierra Version 10.13.6  
**Processor**: 2.6 GHz Intel Core i7  
**Memory**: 16 GB 2133 MHz LPDDR3

To execute the scripts I used Node.js v8.12.0. The execution time to run all the benchmarking scripts was approximately 5 minutes (Though about half of this time was taken up just on the array sorting operations).

## Analysis

Overall, the results were consistent with what was expected for the complexity of each operation and each data structure.

In the array, the times for every operation increased exponentially as the size of the array increased. Interestingly, even iteration through the array increased exponentially rather than linearly. Sorting was the slowest operation. Sorting an Array of random strings with a length of 10 million took approximately 20 seconds. However, sorting an array of 10 thousand only took 5 milliseconds on average.

The Map and Set data structures showed O(1) execution time for all operations (search, delete, insert) except for iteration. These operation times were fairly impressive, executing in approximately 1 microsecond. The iteration times over Maps and Sets were equivalent to the Array. Therefore, unless a use case requires storing a specific order in the data, Maps or Sets should be preferred.

The Linked List was the slowest of all the data structures for all operations. This was not surprising since it was the only data structure used that was not native to JavaScript. For almost all operations it was 3-5 times slower.
