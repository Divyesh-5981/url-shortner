import express from "express";
import URLModel from "../models/url.js";

const router = express.Router();

router.get("/", async (_req, res) => {
	const allUrls = await URLModel.find({});

	res.render("Home", {
		urls: allUrls,
		specificStylesheet: 'home.css'
	});
});

export default router;
