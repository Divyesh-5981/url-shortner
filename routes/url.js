import express from "express";
import {
	deleteUrls,
	createUrl,
	getUrls,
	getUrlAnalytics,
	redirectUrl,
} from "../controllers/url.js";

const router = express.Router();

router.route("/").get(getUrls).post(createUrl).delete(deleteUrls);

router.get("/:id", redirectUrl);

router.get("/:id/analytics", getUrlAnalytics);

export default router;
