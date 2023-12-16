const Application = require("./app/server");
require("dotenv").config();
const DB_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@todoappdb.anxbke7.mongodb.net/?retryWrites=true&w=majority`;
new Application(3000, DB_URL);
