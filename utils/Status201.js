class CreationReturn extends Error {
  constructor(message) {
    super(message);
    this.name = "Created";
    this.statusCode = 201;
  }
}

module.exports = CreationReturn;
