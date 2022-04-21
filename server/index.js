import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/user.js";

import "dotenv/config";

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);
app.use("/users", userRoutes);

const PORT = process.env.PORT;

mongoose
  .connect(process.env.CONECCTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server runing on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);
