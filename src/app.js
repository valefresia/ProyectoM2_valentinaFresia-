const express = require("express");
const authorsRouter = require("./routes/authors.routes");
const postsRouter = require("./routes/posts.routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/authors", authorsRouter);
app.use("/posts", postsRouter);

// Ruta no encontrada: ningún endpoint matcheó
app.use((req, res) => {
  res.status(404).json({ error: "route not found" });
});

// Middleware de errores: siempre al final
app.use(errorHandler);

module.exports = app;