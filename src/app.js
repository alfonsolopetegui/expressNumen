const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(logger("dev"));
app.use(cors());

const { connect } = require("./db/connect");

const ProductsRouter = require("./routers/products/index");
const UserRouter = require("./routers/user/index");

app.use("/v1", ProductsRouter);
app.use("/v1", UserRouter);

connect();

module.exports = app;
