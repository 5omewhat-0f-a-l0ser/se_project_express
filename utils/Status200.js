class SuccessReturn extends Error {
  constructor(message) {
    super(message);
    this.name = "Successful";
    this.statusCode = 200;
  }
}

module.exports = SuccessReturn;
