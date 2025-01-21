import { Sequelize } from "sequelize";
import { config } from "./dbConfig.js";

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
  }
);

async function connectDb() {
  try {
    await sequelize.authenticate();
    console.log("connection esatblished succcess");
  } catch (error) {
    console.log("error connecting db", error);
  }
}

export { connectDb, sequelize };
