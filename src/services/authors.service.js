const pool = require("../config/db");

async function getAllAuthors() {
  const { rows } = await pool.query(
    "SELECT id, name, email, bio, created_at FROM authors ORDER BY id"
  );
  return rows;
}

async function getAuthorById(id) {
  const { rows } = await pool.query(
    "SELECT id, name, email, bio, created_at FROM authors WHERE id = $1",
    [id]
  );
  return rows[0] || null;
}

async function createAuthor({ name, email, bio }) {
  const { rows } = await pool.query(
    `INSERT INTO authors (name, email, bio)
     VALUES ($1, $2, $3)
     RETURNING id, name, email, bio, created_at`,
    [name, email, bio || null]
  );
  return rows[0];
}

async function updateAuthor(id, { name, email, bio }) {
  const { rows } = await pool.query(
    `UPDATE authors
     SET name = $1, email = $2, bio = $3
     WHERE id = $4
     RETURNING id, name, email, bio, created_at`,
    [name, email, bio || null, id]
  );
  return rows[0] || null;
}

async function deleteAuthor(id) {
  const { rows } = await pool.query(
    "DELETE FROM authors WHERE id = $1 RETURNING id",
    [id]
  );
  return rows[0] || null;
}

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};