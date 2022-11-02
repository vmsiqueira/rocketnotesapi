require("express-async-errors");
const express = require('express');
const routes = require("./routes");
const AppError = require("./utils/AppError");
const migrationsRun = require("./database/sqlite/migrations")
const uploadConfig = require("./configs/upload");

migrationsRun();

const app = express();
app.use(express.json());
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));
app.use(routes);

app.use((error, request, response, next) => {
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  })
})

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`Server is running on port: ${port} 🚀`)
})
