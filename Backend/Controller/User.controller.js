import User from "../Models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cloudinary from "../config/cloudinary.js";
import sendEmail from "../utils/Utils.js";

const token = (id, username) => {
  return jwt.sign({ id, username }, process.env.JWT_TOKEN, { expiresIn: "1h" });
};

const register = async (req, res) => {
  try {
    const { email, Fullname, username, password, gender } = req.body;
    // console.log(req.file);
    // Validate required inputs
    // console.log("form:", req.body);
    if (!email || !Fullname || !username || !password || !gender) {
      return res.status(400).json({ message: "Missing input" });
    }

    // Check if profile picture file exists
    if (!req.file) {
      return res.status(400).json({ message: "Profile picture is required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Upload profile picture to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "profile_pics" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    // Hash the password

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      email,
      Fullname,
      username,
      password: hashedPassword,
      gender,
      profilePic: uploadResult.secure_url,
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, username: newUser.username },
      process.env.JWT_TOKEN,
      { expiresIn: "7d" }
    );

    // Respond with success
    return res.status(200).json({
      message: "User registered successfully",
      user: {
        email: newUser.email,
        Fullname: newUser.Fullname,
        id: newUser._id,
        username: newUser.username,
        profilePic: newUser.profilePic,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

const Login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "missing input" });
    }
    const newUser = await User.findOne({ username });
    if (!newUser) {
      return res.status(401).json({ message: "user not found" });
    }
    const isMatch = await bcrypt.compare(password, newUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const userToken = token(newUser._id, newUser.username);
    return res
      .status(200)
      .cookie("token", userToken, {
        maxAge: 1 * 24 * 60 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: "User login successfully",
        username: newUser,
      });
  } catch (error) {
    return res.status(500).json({
      message: "something went Wrong",
    });
  }
};

const allusers = async (req, res) => {
  // all user except login user
  try {
    const userId = req.id;
    const users = await User.find({ _id: { $ne: userId } }).select("-password");
    if (!users) {
      return res.json({ message: "no users found" });
    }
    return res.status(200).json({
      message: "All users",
      users,
    });
  } catch (error) {
    return res.json({
      message: "something went wrong",
      error: error.messages,
    });
  }
};

const userById = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      res.json({ message: "id not exist" });
    }
    const Iduser = await User.findById(userId);
    if (!Iduser) {
      res.status(400).json({ message: "user not exist" });
    }
    res.status(200).json({ message: "User", Iduser });
  } catch (error) {
    res.json({ message: "something went wrong", error: error.meesage });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, {
      expiresIn: "15m",
    });
    //   if(token){
    //  res.status(200).json({ message: "Reset link sent" });
    //   }

    user.resetToken = token; //  when we hit this api the reset token will be saved  with its expiry date
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;

    await user.save();

    const resetURL = `http://localhost:3000/reset-password/${token}`;
    await sendEmail(
      user.email,
      "Password Reset",
      `Reset your password using this link: ${resetURL}`
    );

    res.status(200).json({ message: "Reset link sent" });
  } catch (err) {
    res.status(500).json({ error: err.message, message: "api fault" });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
      _id: decoded.id,
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    res.status(500).json({ error: "Invalid or expired token" });
  }
};
const Logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false, // if using HTTP
      sameSite: "strict",
    });
    res.status(200).json({
      message: "user logout successfully",
    });
  } catch (error) {
    res.json({ message: "something wrong in api", error: error.message });
  }
};

export {
  register,
  Login,
  allusers,
  userById,
  forgotPassword,
  resetPassword,
  Logout,
};
