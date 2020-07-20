
import express from "express";
import expressWS from "express-ws";
import dbH from "./dbHander.js";
function ignorparam() {}

const port = 1711;

const app = express();
expressWS(app);

app.use("/", express.static("app"));

// THESE ARE FOR THE DYNAMIC SERVER
app.use(function (req, res, next) {
    ignorparam(res);
    req.testing = "testing";
    return next();
});

app.get("/", function (req, res, next) {
    ignorparam(next);
    ignorparam(req); // better way of ignoring a parameter?
    res.end();
});