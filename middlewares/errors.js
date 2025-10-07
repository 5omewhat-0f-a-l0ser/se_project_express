module.exports = (err, req, res, next) => {
  console.error("Error Name:", err.name);
  console.error("Error Message:", err.message);
  console.error("Error Stack:", err.stack);
  console.error(err);
  const { statusCode = 500, message = "Something just happened and it wasn't good" } = err;
  res.status(statusCode).json({
    message: statusCode === 500 ? "Internal Server Error: Are you sure you didn't break the server?": message,
  });
};