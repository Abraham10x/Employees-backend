const express = require("express");
const router = express.Router();
const path = require("path");

router.get("^/$|/index(.html)?", (req, res) => {
  //   res.send("Hello World!");
  //   res.sendFile("./views/index.html", { root: __dirname });
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});
router.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "./index.html");
});

module.exports = router;
