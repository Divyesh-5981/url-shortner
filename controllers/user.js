import UserModel from '../models/user.js';

const createUser = async (req, res) => {
  try{
    const { name, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.render("signup", { message: "User already exists with this email", specificStylesheet: "signup.css" });
    }

    await UserModel.create({ name, email, password });

    res.redirect("/");
  }catch(error){
    res.status(500).json({message: "Internal Server Error", error: error.message});
  }
}

const loginUser = async (req, res) => {
  try{

    const { email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    console.log('existingUser: ', existingUser);

    if (!existingUser) {
      return res.render("login", { message: "User not found. Please sign up first.", specificStylesheet: "login.css" });
    }

    if (password !== existingUser.password) {
      return res.render("login", { message: "Invalid password", specificStylesheet: "login.css" });
    }

    res.redirect("/");
  }catch(error){
    res.status(500).json({message: "Internal Server Error", error: error.message});
  }
}

export { createUser, loginUser };
