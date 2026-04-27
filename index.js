import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import path from "path";

import connectMongoDB from "./connection.js";
import { CheckForAuthentication} from "./middlewares/auth.js";
import staticRouter from "./routes/staticRouter.js";
import urlRouter from "./routes/url.js";
import UserRouter from "./routes/user.js";

const app = express();
const URL = process.env.MONGO_URI;
const PORT = process.env.PORT;
const URL_ROUTE = "/api/urls";
const USER_ROUTE = "/api/user";

// Built-in Middleware
// This tells Express: "Look inside the public folder for any file requested"
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(CheckForAuthentication);

app.use(USER_ROUTE, UserRouter);
app.use(URL_ROUTE, urlRouter);
app.use("/", staticRouter);

// Server-side rendering using EJS
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// MongoDB connection
connectMongoDB(URL)
	.then(() => {
		console.log("✅✅ MongoDB is connected successfully");
		app.listen(PORT, () => {
			console.log(`🚀🚀 Server is started at port: ${PORT}`);
		});
	})
	.catch((error) => {
		console.error("❌❌ MongoDB connection error:", error);
	});
