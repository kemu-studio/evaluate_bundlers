// const wrappedRequire = require;

const wrappedRequire = (...x) => {
  return require(...x)
};

// const wrappedRequire = (x) => {
//   console.log(x);
// }

module.exports = { wrappedRequire };