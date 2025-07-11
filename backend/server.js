import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

import urlRoutes from "./routes/urlRoutes.js";
import authRoutes from "./routes/authRoutes.js";


const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017/url-shortener", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));


app.use("/api/url", urlRoutes);
app.use("/api/auth", authRoutes);

const port =3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});