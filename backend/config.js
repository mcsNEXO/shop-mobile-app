require("dotenv").config();

module.exports = {
  port: process.env.PORT,
  database: process.env.DATABASE,
  secretTokenKey: process.env.SECRET_TOKEN_KEY,
};
