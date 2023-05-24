const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { NOT_FOUND_ERROR_CODE, handleError } = require("./utils/utils.js");

const PORT = 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1/mestodb", {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: "646e8c25df6918733922ab22", // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use("/users", require("./routes/users"));
app.use("/cards", require("./routes/cards"));
app.use((req, res) => {
  handleError(res, NOT_FOUND_ERROR_CODE, "Путь неизвестен");
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
