import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import entryRoute from "./routes/entries.js";
import routineRoute from "./routes/routines.js";
import mealRoute from "./routes/meals.js";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();
const env = dotenv.config().parsed;

const PORT = process.env.PORT || 7700;

const connect = async () => {
    try {
        await mongoose.connect(env.MONGO);
        console.log("Connected to MongoDB");
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected");
});

app.get('/', (req, res) => { res.send('Hello from Express!') });

app.use(cookieParser())
app.use(express.json());
app.use(helmet());

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.use(morgan("common"));

app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/entries", entryRoute);
app.use("/routines", routineRoute);
app.use("/meals", mealRoute);

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
    connect();
});