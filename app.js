require("module-alias/register");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

let corsOptions = {
  origin: "https://localhost:8081",
};

/**
 * Middleware
 */
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to nodejs application." });
});

// import your routes middleware
const routes = require("./routes");

// use your routes middleware
app.use("/api", routes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running at PORT ${PORT}`);
});
