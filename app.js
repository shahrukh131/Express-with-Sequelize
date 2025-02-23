require("module-alias/register");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const { Sequelize } = require("sequelize");
const dbConfig = require("./config/config.js");
const logger = require("@utils/logger");
let corsOptions = {
  origin: "https://localhost:8081",
};



const sequelize = new Sequelize(
  dbConfig.development.database,
  dbConfig.development.username,
  dbConfig.development.password,
  {
    host: dbConfig.development.host,
    dialect: dbConfig.development.dialect,
    logging: false, // Optional: Disable logging of SQL queries
  }
);

/**
 ** Check the database connection
 */
sequelize.authenticate()
  .then(() => {
    logger.info('Database connection has been established successfully.'); 
  })
  .catch((error) => {
    logger.error('Unable to connect to the database:', error); 
    process.exit(1); 
  });

/**
 ** Middleware
 */
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to nodejs application." });
});

// import routes middleware
const routes = require("./routes");

// use routes middleware
app.use("/api", routes);

const PORT = process.env.PORT || 8000;


app.listen(PORT, () => {
  logger.info(`Server running at PORT ${PORT}`)
});