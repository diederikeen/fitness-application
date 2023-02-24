import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import user from "./routes/user";
import weight from "./routes/weight";

const PORT = 8080;
const app = express();

// Middlewares
app.use(cookieParser());
app.use(bodyParser.json());

// Routes
app.use('/user', user);
app.use('/weight', weight);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))