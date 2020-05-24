/* validator package validates only strings, so we need this helper
We could have used lodash's isEmpty, but we want to minimize the 
packages we install. */

//helper checks whether an object or string is empty
const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

module.exports = isEmpty;
