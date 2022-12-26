import express, { Application } from "express";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import ErrorMiddleWare from "./app/middleware/Error.middleware";
import config from "./app/config";
import Routers from "./app/routes/index";
import Handler from "./app/controller/Handler.controller";
import path from "path";
// import db from "./app/database/connect";

const app: Application = express();
const port = config.port || 5000;
const HandleErrors = new ErrorMiddleWare();

//middleware to parse incoming request
app.use(express.json());
//http request loggen middleware
app.use(morgan("common"));
//http security middleware
app.use(helmet());
// Apply the rate limiting middleware to all requests
app.use(
  rateLimit({
    windowMs: config.TimeLimit * (60 * 1000),
    max: config.RequestLimit,
    standardHeaders: true,
    legacyHeaders: false,
    message: config.MessageLimit,
  })
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/app/views"));

//Home Router
if (config.ActiveHome) {
  app.get("/", Handler.Home);
}

// db.connect(function (err: Error) {
//   if (err) throw err;
//   console.log("database Connected!");
// });
// db.end();

//routers
app.use("/api", Routers);

//handle errors
app.use(HandleErrors.HandleErrors);

//404 Request
app.use(Handler.Error404);

app.listen(port, () => console.log("server is listening on port 5000"));

export default app;
