import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/router.js";
import authRoutes from "./routes/authRoute.js";

dotenv.config({ path: "../.env" }); // this is because .env file is outside of server folder, if it was in the server folder it is not required to give path

const db = process.env.DB;
// console.log(db) // this will print the db url
mongoose
        .connect(db)
        .then(() => {
                console.log("DB connected");
        })
        .catch((err) => {
                console.log(err);
        });

const app = express();
app.use(express.json()); // this is the middleware that will allow us to send json data to our server

app.listen(3000, () => {
        console.log("Server running on port 3000");
});

//made a api , check it on localhost:3000 in browser or postman
app.get("/", (req, res) => {
        res.json({
                message: "Api is working - main",
        });
});

// we also need to import userRoutes alias for / router /
app.use("/api/user", userRoutes); // we exported router but we can import different name.
// it can be checked on  http://localhost:3000/api/user
//When you access http://localhost:3000/api/user, the request will be handled by the route defined in router.js, which, in turn, calls the test function from the userCntrl.js controller. The controller then sends a JSON response back to the client.


app.use("/api/auth", authRoutes);
//1. this is not independent, go to authRoute.js in routes and check the code there, especially the router.() line
//1.1. also import authRoutes from "./routes/authRoute.js";