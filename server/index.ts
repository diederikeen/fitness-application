import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";

import user from "./routes/user";
import weight from "./routes/weight";
import folders from "./routes/folders";

const PORT = 8080;
const corsOptions = {
  origin: "http://localhost:3000",
}

const app = express();

// Cors issues
app.use(cors(corsOptions));

// Middlewares
app.use(cookieParser());
app.use(bodyParser.json());

// Routes
app.use('/api/user', user);
app.use('/api/weight', weight);
app.use('/api/folders', folders);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))