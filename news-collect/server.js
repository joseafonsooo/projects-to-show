const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use("/data", express.static(path.join(__dirname, "data")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
