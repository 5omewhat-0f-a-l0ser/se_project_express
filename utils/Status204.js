class NoContentReturn extends Error {
  constructor(message) {
    super(message);
    this.name = "No-Content";
    this.statusCode = 204;
  }
}

module.exports = NoContentReturn;
