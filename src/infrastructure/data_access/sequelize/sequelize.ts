import * as fs from "fs";
import * as path from "path";
import { Sequelize } from "sequelize";
import environment from "../../config/environment";
const sequelize = new Sequelize(environment.database.url);
const db = {};

fs.readdirSync(path.join(__dirname, "models")).forEach((file) => {
  const model = require(path.join(__dirname, "models", file))(
    sequelize,
    Sequelize
  );
  db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
