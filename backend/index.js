import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";

import connectDb from "./utils/dbConnect.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

import userRoutes from "./routes/userRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import collectionRoutes from "./routes/collectionRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import reactionRoutes from "./routes/reactionRoutes.js";

config();
connectDb();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "App is working" });
});

app.use("/api/users", userRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/reactions", reactionRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`App is running on port ${port}`));
