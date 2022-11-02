const { Router } = require("express");

//routes
const usersRoutes = require("./users.routes.js")
const notesRoutes = require("./notes.routes.js")
const tagsRoutes = require("./tags.routes.js")
const sessionsRoutes = require("./sessions.routes.js")

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/notes", notesRoutes);
routes.use("/tags", tagsRoutes);

module.exports = routes;