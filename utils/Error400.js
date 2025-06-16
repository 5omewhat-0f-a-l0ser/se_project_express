class Error400 extends Error {
  constructor (message) {
    this.name= "Error400";
    this.statusCode = 400;
  }
}

module.exports = Error400;