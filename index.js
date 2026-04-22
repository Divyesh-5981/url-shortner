import express from "express";
import "dotenv/config";
import connectMongoDB from "./connection.js";
import urlRouter from "./routes/url.js";

const app = express();
const URL = process.env.MONGO_URI;
const PORT = process.env.PORT;
const URL_ROUTE = "/api/urls";

// MongoDB connection
connectMongoDB(URL)
	.then(() => {
		console.log("✅✅ MongoDB is connected successfully");
		// ✅ start server only after DB connects
		app.listen(PORT, () => {
			console.log(`🚀🚀 Server is started at port: ${PORT}`);
		});
	})
	.catch((error) => {
		console.error("❌❌ MongoDB connection error:", error);
	});

// Built-in Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(URL_ROUTE, urlRouter);
