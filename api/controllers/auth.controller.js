
import { handleError } from "../helpers/handleError.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const Register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const checkUser = await User.findOne({ email });
    if (checkUser) return next(handleError(409, "User already registered."));

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "Registration successful.",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return next(handleError(404, "Invalid login credential."));

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return next(handleError(404, "Invalid login credential."));

    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET
    );

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });

    const userObj = user.toObject({ getters: true });
    delete userObj.password;

    res.status(200).json({
      success: true,
      user: userObj,
      message: "Login successfully.",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const GoogleLogin = async (req, res, next) => {
  try {
    const { name, email, avatar } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      const password = Math.random().toString();
      const hashedPassword = bcrypt.hashSync(password.toString(), 10);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        avatar,
      });

      user = await newUser.save();
    }

    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
      process.env.JWT_SECRET
    );

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });

    const newUser = user.toObject({ getters: true });
    delete newUser.password;

    res.status(200).json({
      success: true,
      user: newUser,
      message: "Login successfully.",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const Logout = async (req, res, next) => {
  try {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });

    res.status(200).json({
      success: true,
      message: "Logout successfully.",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
