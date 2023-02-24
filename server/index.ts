import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import user from "./routes/user";
import weight from "./routes/weight";
import folders from "./routes/folders";

const PORT = 8080;
const app = express();

// Middlewares
app.use(cookieParser());
app.use(bodyParser.json());

// Routes
app.use('/user', user);
app.use('/weight', weight);
app.use('/folders', folders);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))