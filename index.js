import express from "express";
import connectMongoDB from "./connection.js";
import urlRouter from "./routes/url.js";

const app = express();
const PORT = 8000;
const URL = "mongodb://127.0.0.1:27017/url-shortener";
const URL_ROUTE = "/api/url";

// MongoDB connection
connectMongoDB(URL)
	.then(() => {
		console.log("✅✅ MongoDB is connected successfully");
	})
	.catch((error) => {
		console.error("❌❌ MongoDB connection error:", error);
	});

// Built-in Middleware
app.use(express.json());
app.use(URL_ROUTE, urlRouter);

app.listen(PORT, () => {
	console.log(`🚀🚀 Server is started at port: ${PORT}`);
});
