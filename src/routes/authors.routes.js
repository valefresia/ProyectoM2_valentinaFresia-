const express = require("express");
const router = express.Router();
const controller = require("../controllers/authors.controller");

router.get("/", controller.getAuthors);
router.get("/:id", controller.getAuthor);
router.post("/", controller.createAuthor);
router.put("/:id", controller.updateAuthor);
router.delete("/:id", controller.deleteAuthor);

module.exports = router;