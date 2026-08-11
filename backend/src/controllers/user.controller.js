import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// user register
export const registerUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }
    //check existing user
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "user already exist",
      });
    }

    const hashPassword = await bcrypt.hash(password, 8);
    // create new user
    const newUser = await User.create({
      name,
      username,
      email,
      password: hashPassword,
    });
    const resopnder = {
      _id: newUser._id,
      name: newUser.name,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
    };
    return res.status(200).json({
      success: true,
      message: "new user is added to database",
      data: resopnder,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// user login
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check for email and password empty
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "username and password required",
      });
    }

    // finc]d user with email
    const user = await User.findOne({ email });

    // check is user isnt available
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    // hash password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    // check for password match
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalide Email or Password",
      });
    }

    // generate token of jwt
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    // give positive response if everythink is correct
    return res.status(200).json({
      success: true,
      message: "Login Successfull",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// profile
export const getUserProfile = async (req, res) => {
  try {
    // useer find by id and password is exclude
    const user = await User.findById(req.user.id).select("-password");

    // check for not available user
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // return sucess true if user is available
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name, username } = req.body;

    // store all fields
    const updateData = {};

    // Update name if provided
    if (name) {
      updateData.name = name;
    }

    //  Update username if provided
    if (username) {
      // Check if username already exists
      const existingUser = await User.findOne({ username });

      // If another user already has this username
      if (existingUser && existingUser._id.toString() !== req.user.id) {
        return res.status(409).json({
          success: false,
          message: "Username already exists.",
        });
      }

      updateData.username = username;
    }

    // 6. Update user in database
    const updatedUser = await User.findByIdAndUpdate(req.user.id, updateData, {
      returnDocument: "after",
      runValidators: true,
    }).select("-password");

    // 7. If user is not found
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // 8. Success response
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password and new password are required.",
      });
    }
    
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user.password,
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect.",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 8);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully.",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
