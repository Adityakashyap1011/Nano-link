import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
  {
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true },
    shortCode: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    clicks: { type: Number, default: 0 },
    referrers: { type: [String], default: []},
  },
  { timestamps: true }
);

export default mongoose.model("Link", linkSchema);
