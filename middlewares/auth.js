import { getUser } from "../service/auth.js";

function CheckForAuthentication(req, res, next){
	const token = req.cookies?.uid;

	if (!token) return next();

	const user = getUser(token);

	if (!user) return next();

	req.user = user;

	next();
}

function checkForAuthorization(roles = []){
	return (req, res, next) => {

		const user = req.user;

		if(!user) return res.redirect("/login");

		if(!roles.includes(user.role)) return res.end("Unauthorized");

		next();
	};
}


export { CheckForAuthentication, checkForAuthorization }; 
