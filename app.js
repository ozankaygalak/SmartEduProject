const express = require("express");
const app = express();
const ejs = require("ejs");
const flash = require("connect-flash");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const categoryRouter = require("./routes/categoryRoute");
const pageRouter = require("./routes/pageRoute");
const courseRouter = require("./routes/courseRoute");
const userRouter = require("./routes/userRoute");
app.set("view engine", "ejs");
global.userIN = null;

app.use(express.static("public"));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/smartedu-db",
    }),
  }),
);
app.use("*", (req, res, next) => {
  userIN = req.session.userID;
  next();
});

app.use(flash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});

app.use(methodOverride("_method", { methods: ["GET", "POST"] }));

app.use("/", pageRouter);
app.use("/courses", courseRouter);
app.use("/category", categoryRouter);
app.use("/users", userRouter);

mongoose
  .connect("mongodb://127.0.0.1:27017/smartedu-db")
  .then(() => console.log("Connected!"));

const port = 3020;
app.listen(port, () => {
  console.log(`Sayfa ${port} da çalışıyor`);
});
