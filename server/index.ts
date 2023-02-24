import express from "express";
import user from "./routes/user";
import cookieParser from "cookie-parser";

const PORT = 8080;
const app = express();

app.use(cookieParser());

// Routes
app.use('/user', user);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))