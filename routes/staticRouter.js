import express from "express";
import URLModel from "../models/url.js";

const router = express.Router();

router.get("/", async (_req, res) => {
	const allUrls = await URLModel.find({});

	res.render("home", {
		urls: allUrls,
		specificStylesheet: 'home.css'
	});
});

router.get("/signup", async (_req, res) => {
	return res.render("signup", {
		specificStylesheet: "signup.css",
	});
});
	
router.get("/login", async (_req, res) => {
	return res.render("login", { specificStylesheet: "login.css" });
});

export default router;
