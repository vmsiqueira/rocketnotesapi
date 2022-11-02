const { Router } = require("express");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const TagsController = require("../controllers/TagsController.js");

const tagsRoutes = Router();

const tagsController = new TagsController();

tagsRoutes.get("/", ensureAuthenticated, tagsController.index);

module.exports = tagsRoutes;