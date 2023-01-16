require("express-async-errors")

const migrationsRun = require("./database/sqlite/migrations") // por padão carrega o index.js
const AppError = require("./utils/AppError")

const express = require("express")
const routes = require("./routes"); // por padão carrega o index.js

migrationsRun();

const app = express();
app.use(express.json()); // configuração do uso de JSON no envio e leitura de dados nas ROTAS

app.use(routes);


app.use(( error, request, response, next ) => {
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });

})

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));

