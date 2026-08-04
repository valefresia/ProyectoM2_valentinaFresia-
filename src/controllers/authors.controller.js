const authorsService = require("../services/authors.service");

// GET /authors
async function getAuthors(req, res, next) {
  try {
    const authors = await authorsService.getAllAuthors();
    res.status(200).json(authors);
  } catch (err) {
    next(err);
  }
}

// GET /authors/:id
async function getAuthor(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "id must be a number" });
    }

    const author = await authorsService.getAuthorById(id);
    if (!author) {
      return res.status(404).json({ error: "author not found" });
    }

    res.status(200).json(author);
  } catch (err) {
    next(err);
  }
}

// POST /authors
async function createAuthor(req, res, next) {
  try {
    const { name, email, bio } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: "name is required" });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ error: "email is required" });
    }

    const author = await authorsService.createAuthor({
      name: name.trim(),
      email: email.trim(),
      bio,
    });

    res.status(201).json(author);
  } catch (err) {
    if (err.code === "23505") {
      return res.status(400).json({ error: "email already exists" });
    }
    next(err);
  }
}

// PUT /authors/:id
async function updateAuthor(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "id must be a number" });
    }

    const { name, email, bio } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: "name is required" });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ error: "email is required" });
    }

    const author = await authorsService.updateAuthor(id, {
      name: name.trim(),
      email: email.trim(),
      bio,
    });

    if (!author) {
      return res.status(404).json({ error: "author not found" });
    }

    res.status(200).json(author);
  } catch (err) {
    if (err.code === "23505") {
      return res.status(400).json({ error: "email already exists" });
    }
    next(err);
  }
}

// DELETE /authors/:id
async function deleteAuthor(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "id must be a number" });
    }

    const deleted = await authorsService.deleteAuthor(id);
    if (!deleted) {
      return res.status(404).json({ error: "author not found" });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAuthors,
  getAuthor,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};