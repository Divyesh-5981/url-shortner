import { nanoid } from "nanoid";
import URLModel from "../models/url.js";

const createUrl = async (req, res) => {
	try {
		const { url } = req.body;

		if (!url) {
			return res.status(400).json({ error: "URL is required" });
		}

		const shortURL = nanoid(8);

		await URLModel.create({
			shortId: shortURL,
			redirectURL: url,
			visitHistory: [],
		});

		return res.status(201).render("Home", {
			shortId: shortURL,
			specificStylesheet: 'home.css'
		});
	} catch (error) {
		res.status(500).json({ message: "Internal server error", error });
	}
};

const getUrls = async (_req, res) => {
	try {
		const allUrls = await URLModel.find({});

		res.status(200).json({ message: "Success", data: allUrls });
	} catch (error) {
		res.status(500).json({ message: "Internal server error", error });
	}
};

const deleteUrls = async (_req, res) => {
	try {
		await URLModel.deleteMany({});
		res.status(200).json({ message: "Success" });
	} catch (error) {
		res.status(500).json({ message: "Internal server error", error });
	}
};

const redirectUrl = async (req, res) => {
	try {
		const shortId = req.params.id;

		const document = await URLModel.findOneAndUpdate(
			{ shortId },
			{
				$push: {
					visitHistory: {
						timeStamp: Date.now(),
					},
				},
			},
		);

		if (!document) {
			return res.status(404).json({ error: "Short URL not found" });
		}

		res.redirect(document.redirectURL);
	} catch (error) {
		res.status(500).json({ message: "Internal server error", error });
	}
};

const getUrlAnalytics = async (req, res) => {
	try {
		const shortId = req.params.id;
		const document = await URLModel.findOne({ shortId });

		if (!document) {
			return res.status(404).json({ error: "Short URL not found" });
		}

		const totalVisit = document.visitHistory.length;

		res.json({
			message: "Success",
			totalVisit,
			analytics: document.visitHistory,
		});
	} catch (error) {
		res.status(500).json({ message: "Internal server error", error });
	}
};

export { createUrl, getUrls, deleteUrls, redirectUrl, getUrlAnalytics };
