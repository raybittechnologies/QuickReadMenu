const express = require("express");
const morgan = require("morgan");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const { sendErrorRes } = require("./Controllers/error.controller");

// const { initWebSocket } = require("./sockets/socket");

const server = require("http").createServer(app);
// initWebSocket(server);

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      "http://reactapp.com",
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:5173",
      "https://rayapps.org",
      "http://192.168.100.16:3000",
    ],
    credentials: true,
  })
);

app.options("*", cors());

app.use(express.static(path.join(__dirname, "public/assets")));

app.use("/api/v1/businesses", require("./Routes/buisness.routes"));
app.use("/api/v1/categories", require("./Routes/category.routes"));
app.use("/api/v1/items", require("./Routes/items.routes"));

app.use(sendErrorRes);

//Serve react build in the PIBLIC
// app.get("/FE", (req, res) => {
//   res.sendFile(path.join(__dirname, "Public", "index.html"));
// });

app.all("*", (req, res, next) => {
  res.status(401).json({
    message: "No such api found on this server",
  });
});

module.exports = server;
