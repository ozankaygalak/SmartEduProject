const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require('mongoose');
const pageRouter = require('./routes/pageRoute');
const courseRouter = require('./routes/courseRoute');
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use("/",pageRouter );
app.use("/courses",courseRouter );

mongoose.connect('mongodb://127.0.0.1:27017/smartedu-db')
  .then(() => console.log('Connected!'));

const port = 3020;
app.listen(port, () => {
  console.log(`Sayfa ${port} da çalışıyor`);
});
