import express from "express";
const app = express();
import { connectDB } from "./utils/db.util.js";
import authRoutes from "./routes/auth.route.js"
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/api/auth", authRoutes);
app.get( "/",(req,res)=>{
res.send("hii")
})

app.listen(PORT, ()=>{
    console.log("Server running at " + PORT);
    connectDB();
})
