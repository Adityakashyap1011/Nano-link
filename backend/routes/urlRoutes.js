import express from "express";
import { nanoid } from "nanoid";
import normalizeUrl from "normalize-url";
import Link from "../models/Links.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();


router.post("/shorten", authenticateToken, async (req, res) => {

  let { originalUrl } = req.body;
  const userId = req.user.id;
  console.log(originalUrl);

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

    const shortCode = nanoid(4);
    const shortUrl = `http://localhost:3000/${shortCode}`;

    const newLink = new Link({  originalUrl,  shortUrl,  shortCode,  userId  });

    await newLink.save();

    return res.status(201).json({ link: newLink });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});


router.get("/mylinks", authenticateToken, async (req, res) => {
  console.log("heree");
  try {
    const links = await Link.find({ userId: req.user.id }).sort({ createdAt: -1 });
    if(!links) res.status(500).send("Error fetching links:");
    res.json({ links });
  } catch (err) {
    console.error("Error fetching links:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get('/:shortCode', async (req, res) => {
  try {
    const link = await Link.findOne({ shortCode: req.params.shortCode });

    if (!link) return res.status(404).json({ message: "Link not found" });

    const referrer = req.get('Referrer') || 'Direct';

    link.referrers.push(referrer);
    link.clicks += 1;

    await link.save();

    return res.redirect(link.originalUrl);
  } catch (err) {
    console.error("Redirect error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
