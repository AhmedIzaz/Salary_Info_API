require("dotenv").config();
const fastify = require("fastify");
const mainRoute = require("./routes");

const app = fastify();
const PORT = process.env.PORT || 5000;

async function build() {
  await app.register(mainRoute);
  return app;
}

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

