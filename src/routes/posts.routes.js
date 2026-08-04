const express = require("express");
const router = express.Router();
const controller = require("../controllers/posts.controller");

router.get("/", controller.getPosts);

// IMPORTANTE: esta ruta debe ir antes de "/:id"
router.get("/author/:authorId", controller.getPostsByAuthor);

router.get("/:id", controller.getPost);
router.post("/", controller.createPost);
router.put("/:id", controller.updatePost);
router.delete("/:id", controller.deletePost);

module.exports = router;