import constants from "./constants";
import environment from "./environment";

export default {
  async init() {
    if (environment.database.dialect === constants.SUPPORTED_DATABASE.MONGO) {
      require("../data_access/mongoose/mongoose");
      return;
    } else if (
      environment.database.dialect === constants.SUPPORTED_DATABASE.POSTGRES ||
      environment.database.dialect === constants.SUPPORTED_DATABASE.SQLITE
    ) {
      const db = require("../data_access/sequelize/sequelize");
      try {
        await db.sequelize.sync();
        // console.log("Connection to DB has been established successfully.");
        console.log(
          `Connection to ${environment.database.dialect} has been established successfully.`
        );
      } catch (err) {
        console.error("Unable to connect to the database:", err);
      }
    }
  },
};
