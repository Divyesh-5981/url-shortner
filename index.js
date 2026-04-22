import express from "express";
import "dotenv/config";
import path from "path";

import connectMongoDB from "./connection.js";
import urlRouter from "./routes/url.js";
import staticRouter from "./routes/staticRouter.js";

const app = express();
const URL = process.env.MONGO_URI;
const PORT = process.env.PORT;
const URL_ROUTE = "/api/urls";

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

// Server-side rendering using EJS
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Built-in Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", staticRouter);
app.use(URL_ROUTE, urlRouter);
