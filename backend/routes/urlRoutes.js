import express from "express";
import { nanoid } from "nanoid";
import normalizeUrl from "normalize-url";
import Link from "../models/Links.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();


router.post("/shorten", authenticateToken, async (req, res) => {


  let { originalUrl } = req.body;
  const userId = req.user.id;

  if (!originalUrl) {
    return res.status(400).json({ message: "URL is required" });
  }

  try {
    originalUrl = normalizeUrl(originalUrl);

    const existingLink = await Link.findOne({ originalUrl, userId });

    if (existingLink) {
      return res.status(409).json({
        message: "You have already shortened this URL.",
        link: existingLink,
      });
    }

    // ✅ Create new short link
    const shortCode = nanoid(8);
    const shortUrl = `http://localhost:3000/${shortCode}`;

    const newLink = new Link({
      originalUrl,
      shortUrl,
      shortCode,
      userId,
    });

    await newLink.save();

    return res.status(201).json({ link: newLink });
  } catch (err) {
    console.error("Error in /shorten:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// GET /api/url/mylinks
router.get("/mylinks", authenticateToken, async (req, res) => {
  try {
    const links = await Link.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ links });
  } catch (err) {
    console.error("Error fetching links:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
