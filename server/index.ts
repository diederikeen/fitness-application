import express from "express";
import user from "./routes/user";

const PORT = 8080;
const app = express();

// Routes
app.use('/user', user);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))