const pool = require("../config/db");

async function getAllPosts() {
  const { rows } = await pool.query(
    `SELECT id, author_id, title, content, published, created_at
     FROM posts
     ORDER BY id`
  );
  return rows;
}

async function getPostById(id) {
  const { rows } = await pool.query(
    `SELECT id, author_id, title, content, published, created_at
     FROM posts
     WHERE id = $1`,
    [id]
  );
  return rows[0] || null;
}

async function getPostsByAuthor(authorId) {
  const { rows } = await pool.query(
    `SELECT
       posts.id,
       posts.title,
       posts.content,
       posts.published,
       posts.created_at,
       authors.id AS author_id,
       authors.name AS author_name,
       authors.email AS author_email
     FROM posts
     JOIN authors ON authors.id = posts.author_id
     WHERE posts.author_id = $1
     ORDER BY posts.id`,
    [authorId]
  );
  return rows;
}

async function createPost({ author_id, title, content, published }) {
  const { rows } = await pool.query(
    `INSERT INTO posts (author_id, title, content, published)
     VALUES ($1, $2, $3, $4)
     RETURNING id, author_id, title, content, published, created_at`,
    [author_id, title, content, published || false]
  );
  return rows[0];
}

async function updatePost(id, { title, content, published }) {
  const { rows } = await pool.query(
    `UPDATE posts
     SET title = $1, content = $2, published = $3
     WHERE id = $4
     RETURNING id, author_id, title, content, published, created_at`,
    [title, content, published || false, id]
  );
  return rows[0] || null;
}

async function deletePost(id) {
  const { rows } = await pool.query(
    "DELETE FROM posts WHERE id = $1 RETURNING id",
    [id]
  );
  return rows[0] || null;
}

module.exports = {
  getAllPosts,
  getPostById,
  getPostsByAuthor,
  createPost,
  updatePost,
  deletePost,
};
