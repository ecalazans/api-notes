require("dotenv/config");
require("express-async-errors");

const migrationsRun = require("./database/sqlite/migrations"); // por padão carrega o index.js
const AppError = require("./utils/AppError");
const uploadConfig = require("./configs/upload");

const cors = require("cors"); // biblioteca importante para conectar o back-end com o front-end
const express = require("express")
const routes = require("./routes"); // por padão carrega o index.js

migrationsRun();

const app = express();
app.use(cors());
app.use(express.json()); // configuração do uso de JSON no envio e leitura de dados nas ROTAS

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

app.use(routes);

app.use(( error, request, response, next ) => {
  //erro lado cliente
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.error(error);

  //erro lado servidor
  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });

})

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));

