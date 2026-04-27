import express from "express";
import URLModel from "../models/url.js";
import { checkForAuthorization } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", checkForAuthorization(["admin", "user"]), async (req, res) => {
	const currentUserId = req.user?.id;
	const allUrls = await URLModel.find({ createdBy: currentUserId });

	res.render("home", {
		urls: allUrls,
		specificStylesheet: "home.css",
	});
});

router.get("/all", checkForAuthorization(["admin"]), async (_req, res) => {

	const allUrls = await URLModel.find({}).populate("createdBy", "name email");

	res.render("home", {
		urls: allUrls,
		showCreator: true,
		specificStylesheet: "home.css",
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
