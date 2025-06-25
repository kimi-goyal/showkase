import express from "express";
const app = express();
import { connectDB } from "./utils/db.util.js";
import authRoutes from "./routes/auth.route.js"
import artistRoutes from "./routes/artist.route.js"
import dotenv from 'dotenv';
import postRoutes from "./routes/post.routes.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

dotenv.config();
const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/post",postRoutes);
app.use("/api/artists",artistRoutes);
app.get( "/",(req,res)=>{
res.send("hii")
})

if (process.env.NODE_ENV==="production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, ()=>{
    console.log("Server running at " + PORT);
    connectDB();
})
