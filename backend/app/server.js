const { AllRoutes } = require("./routers/router");

module.exports = class Application {
  #express = require("express");
  #app = this.#express();
  constructor(PORT, DB_URL) {
    this.configDatabase(DB_URL);
    this.configApplication();
    this.createServer(PORT);
    this.createRoutes();
    this.errorHandler();
  }

  configApplication() {
    this.#app.use(this.#express.json());
    this.#app.use(this.#express.urlencoded());
    this.#app.use(require("cors")({ origin: "*" }));
  }

  createServer(PORT) {
    const http = require("http");
    const server = http.createServer(this.#app);
    server.listen(PORT, () => {
      console.log(`Server run on http://localhost:${PORT}`);
    });
  }

  async configDatabase(DB_URL) {
    const mongoose = require("mongoose");
    await mongoose.connect(DB_URL);
    return console.log("Connect to database successfully...");
  }

  errorHandler() {
    this.#app.use((req, res, next) => {
      return res.status(404).json({
        status: res.statusCode,
        success: false,
        message: "endpoint not found.",
      });
    });
    this.#app.use((error, req, res, next) => {
      const status = error?.status || 500;
      const messages = error?.messages || { error: "InternalServerError" };
      return res.status(status).json({
        status,
        success: false,
        messages,
      });
    });
  }

  createRoutes() {
    this.#app.get("/", (req, res) => {
      return res.json({ message: "Virgobit backed assignment..." });
    });
    this.#app.use(AllRoutes);
  }
};
