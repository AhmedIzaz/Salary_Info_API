require("dotenv").config();
const fastify = require("fastify");
const mainRoute = require("./routes");
const db = require("../db");

const app = fastify();
const PORT = process.env.PORT || 5000;

async function build() {
  await app.register(mainRoute);
  return app;
}

db.connect((error) => {
  if (error) return console.error(error);
  console.log(
    "Mysql Database connection established with address : " +
      process.env.DB_HOST +
      ":" +
      process.env.DB_PORT
  );
  build().then((fullfilledApp) => {
    fullfilledApp.listen(
      {
        port: PORT,
        host: "0.0.0.0",
      },
      (err, address) => {
        if (err) console.log(err);
        console.log("server is running on : " + address);
      }
    );
  });
});
