import express from "express";
import bodyParser from "body-parser";
import SchoolRoute from "./routes/school.route.js";

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(bodyParser.json());

// endpoints
app.get("/", (req, res) => {
  res.status(200).send(
    `<h1 style="color:blue">Server is live!<h1/>
    <div >
        These are the endpoints:<br/> 
        <p style="color:red">POST route /api/addSchool<p/>
        <p style="color:gray">GET route /api/listSchools<p/>
    <div/>`
  );
});
app.use("/api", SchoolRoute);

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
