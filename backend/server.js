import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config();

const app = express()

const port = process.env.PORT || 8000

connectDB();


app.use(express.json())
app.use(cors())

app.use('/api/user', userRouter)

app.get('/' ,(req,res) => {
    res.send("API Working")
})

app.listen(port, () => {
    console.log("Server started running on Port: " + port)
})
