const express = require("express");
const app = express();
const { port } = require("./config");
const apiRouter = require("./routes/api");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("./db/mongoose");

// app.use(
//   session({
//     secret: sessionKeySecret,
//     saveUninitialized: true,
//     cookie: { maxAge: 1000 * 60 * 60 * 24 },
//     resave: false,
//   })
// );

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/api/", apiRouter);

app.listen(port, () => {
  console.log(`Server is listining in port ${port}`);
});
