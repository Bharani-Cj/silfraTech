const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const mysql = require("mysql2");
const controllers = require("./Controllers/userController");

const pool = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DATABASE_PORT,
});
controllers.varDec(pool);

//node- PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`port is running on ${port}`);
});
