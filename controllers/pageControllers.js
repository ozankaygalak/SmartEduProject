exports.getIndexPage = (req, res) => {
  res.status(200).render("index", {
    page_name: 'index',
  });
};

exports.getAboutPage = (req, res) => {
  res.status(200).render("about", {
    page_name: "about",
  });
};

exports.getContactPage = (req, res) => {
  res.render("contact", {
    page_name: "contact",
  });
};

exports.getUser = (req, res) => {
  res.render("register", {
    page_name: "register",
  });
};

exports.getLoginUser = (req, res) => {
  res.render("login", {
    page_name: "login",
  });
};