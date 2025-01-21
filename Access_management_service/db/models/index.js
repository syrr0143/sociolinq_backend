import { Sequelize } from "sequelize";
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const configPath = path.join(__dirname, "../config/config.json");
const configJson = JSON.parse(fs.readFileSync(configPath, "utf8"));
const config = configJson[env];

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// Dynamically import models using ES modules
const importModels = async () => {
  const files = fs
    .readdirSync(__dirname)
    .filter(
      (file) =>
        file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );

  for (const file of files) {
    // Convert absolute file path to a `file://` URL
    const modelPath = pathToFileURL(path.join(__dirname, file)).href;

    const modelModule = await import(modelPath);
    const model = modelModule.default(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  }
};

// Call the dynamic import function
await importModels();

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
