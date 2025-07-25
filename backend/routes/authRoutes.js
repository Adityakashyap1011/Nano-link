import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";


const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = new User({ email, password });
    await user.save();
    
    console.log("User saved:", user);
    const token = jwt.sign({ id: user._id }, "xyz", {
      expiresIn: "1h",
    });
    console.log("token ",token);
    res.status(201).json({ token });

  } catch (error) {
    res.status(400).json({ error: "User registration failed" });
  }
});



router.post("/login", async (req, res) => {      
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, "xyz", {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

export default router;