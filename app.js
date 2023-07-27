const express = require("express");
const app = express();
const ejs = require("ejs");
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.status(200).render("index",{
    page_name : index
  });
});

app.get("/about", (req, res) => {
  res.status(200).render("about",{
    page_name: 'about'
  });
});

app.get("/contact", (req, res) => {
  res.render("contact",{
    page_name: 'contact'
  });
});

const port = 3020;
app.listen(port, () => {
  console.log(`Sayfa ${port} da çalışıyor`);
});
