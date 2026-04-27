import jwt from "jsonwebtoken";
const setUser = (user) => {
	return jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET);
};

const getUser = (token) => {
	if (!token) {
		return null;
	}

	try{
		return jwt.verify(token, process.env.JWT_SECRET);

	}catch(error){
		console.error("Error in getUser:", error);
		return null;
	}
};

export { setUser, getUser };
