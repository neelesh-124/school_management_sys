import express from "express";
import bodyParser from "body-parser";
import SchoolRoute from "./school.route.js";

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(bodyParser.json());

// endpoints
app.use("/api", SchoolRoute);

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
