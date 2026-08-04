function errorHandler(err, req, res, next) {
  console.error("Error no manejado:", err.stack || err.message);
  res.status(500).json({ error: "internal server error" });
}

module.exports = errorHandler;