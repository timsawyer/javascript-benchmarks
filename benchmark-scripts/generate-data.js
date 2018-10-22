const rn = require("random-number");
const jsonfile = require("jsonfile");

const rnIntegerOptions = {
  min: -1000,
  max: 1000,
  integer: true
};

const generateIntegerArray = length => {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(rn(rnIntegerOptions));
  }
  return arr;
};

const generateFloatingPointArray = length => {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(Math.random());
  }
  return arr;
};

const generateStringArray = length => {
  const arr = [];
  for (let i = 0; i < length; i++) {
    const randomString = Math.random()
      .toString(36)
      .substring(2);
    arr.push(randomString);
  }
  return arr;
};

const smallIntegerArray = generateIntegerArray(100);
const mediumIntegerArray = generateIntegerArray(1000);
const largeIntegerArray = generateIntegerArray(10000);
const xLargeIntegerArray = generateIntegerArray(100000);
const xxLargeIntegerArray = generateIntegerArray(1000000);

const data = {
  integerArrays: {
    small: generateIntegerArray(100),
    medium: generateIntegerArray(1000),
    large: generateIntegerArray(10000),
    xl: generateIntegerArray(1000000)
  },
  floatingPointArrays: {
    small: generateFloatingPointArray(100),
    medium: generateFloatingPointArray(1000),
    large: generateFloatingPointArray(10000),
    xl: generateFloatingPointArray(1000000)
  },
  stringArrays: {
    small: generateStringArray(100),
    medium: generateStringArray(1000),
    large: generateStringArray(10000),
    xl: generateStringArray(1000000)
  }
};

jsonfile.writeFile("./data.json", data, function(err) {
  if (err) console.error(err);
});
