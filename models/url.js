import mongoose from "mongoose";

// Schema
const urlSchema = mongoose.Schema({
	shortId: {
		type: String,
		required: true,
		unique: true,
	},
	redirectURL: {
		type: String,
		required: true,
	},
	visitHistory: [
		{
			timeStamp: {
				type: Number,
			},
		},
	],
});

// URL model
const URL = mongoose.model("URL", urlSchema);

export default URL;
