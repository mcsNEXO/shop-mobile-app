const express = require("express");
const app = express();
const { port } = require("./config");
const session = require("express-session");
const apiRouter = require("./routes/api");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const config = require("./config");

require("./db/mongoose");

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/api/", apiRouter);

app.listen(port, () => {
  console.log(`Server is listining in port ${port}`);
});
