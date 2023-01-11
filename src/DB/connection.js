const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose.connect(process.env.CONNECTION_URL, {
  useNewUrlParser: true,
});

const con = mongoose.connection;

con.on("error", console.error.bind(console, "connection error!"));

con.on("open", function () {
  console.log("database connected  successfully");
});
