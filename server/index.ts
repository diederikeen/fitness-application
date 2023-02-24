import express from "express";
import user from "./routes/user";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const PORT = 8080;
const app = express();

// Middlewares
app.use(cookieParser());
app.use(bodyParser.json());

// Routes
app.use('/user', user);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))