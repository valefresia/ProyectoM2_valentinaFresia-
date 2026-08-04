const postsService = require("../services/posts.service");

// GET /posts
async function getPosts(req, res, next) {
  try {
    const posts = await postsService.getAllPosts();
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
}

// GET /posts/:id
async function getPost(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "id must be a number" });
    }

    const post = await postsService.getPostById(id);
    if (!post) {
      return res.status(404).json({ error: "post not found" });
    }

    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
}

// GET /posts/author/:authorId
async function getPostsByAuthor(req, res, next) {
  try {
    const authorId = Number(req.params.authorId);
    if (Number.isNaN(authorId)) {
      return res.status(400).json({ error: "authorId must be a number" });
    }

    const posts = await postsService.getPostsByAuthor(authorId);
    // No es un error que un autor no tenga posts: devolvemos array vacío
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
}

// POST /posts
async function createPost(req, res, next) {
  try {
    const { author_id, title, content, published } = req.body;

    if (!author_id || Number.isNaN(Number(author_id))) {
      return res.status(400).json({ error: "author_id is required and must be a number" });
    }
    if (!title || !title.trim()) {
      return res.status(400).json({ error: "title is required" });
    }
    if (!content || !content.trim()) {
      return res.status(400).json({ error: "content is required" });
    }

    const post = await postsService.createPost({
      author_id: Number(author_id),
      title: title.trim(),
      content: content.trim(),
      published,
    });

    res.status(201).json(post);
  } catch (err) {
    if (err.code === "23503") {
      return res.status(400).json({ error: "author does not exist" });
    }
    next(err);
  }
}

// PUT /posts/:id
async function updatePost(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "id must be a number" });
    }

    const { title, content, published } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ error: "title is required" });
    }
    if (!content || !content.trim()) {
      return res.status(400).json({ error: "content is required" });
    }

    const post = await postsService.updatePost(id, {
      title: title.trim(),
      content: content.trim(),
      published,
    });

    if (!post) {
      return res.status(404).json({ error: "post not found" });
    }

    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
}

// DELETE /posts/:id
async function deletePost(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "id must be a number" });
    }

    const deleted = await postsService.deletePost(id);
    if (!deleted) {
      return res.status(404).json({ error: "post not found" });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getPosts,
  getPost,
  getPostsByAuthor,
  createPost,
  updatePost,
  deletePost,
};