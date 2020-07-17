import * as mongoose from "mongoose";
import environment from "../../config/environment";

mongoose.connect(environment.database.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log(
    `Connection to ${environment.database.dialect} has been established successfully.`
  );
});

module.exports = mongoose;
