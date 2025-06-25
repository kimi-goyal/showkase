import express from "express";
import dotenv from "dotenv";
import path from "path";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

app.get("/", (req, res) => {
  res.send("Server is alive");
});

// TEMPORARILY DISABLE ALL ROUTES
// import authRoutes from "./routes/auth.route.js";
// import artistRoutes from "./routes/artist.route.js";
// import postRoutes from "./routes/post.routes.js";
// app.use("/api/auth", authRoutes);
// app.use("/api/post", postRoutes);
// app.use("/api/artists", artistRoutes);

// TEMPORARILY DISABLE STATIC SERVE
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));
//   app.get("/*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
//   });
// }

app.listen(PORT, () => {
  console.log("✅ Server running at " + PORT);
});
