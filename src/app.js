const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors")
const connectDB = require("./Config/db");
const authRouter = require("./Routes/authRoutes");
const createError = require("./Helpers/errorHelper")
const app = express();


app.use(cors({
    origin: "https://extraordinary-moonbeam-cae328.netlify.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))
app.use(express.json());
connectDB()

app.get("/", (req, res) => {
  res.send("Backend is Live and Running! 🚀");
});

app.use("/api/auth", authRouter);



app.use(function(err, req, res, next){     
    
    const statusCode = err.status || 500
    const meassage = err.meassage || "Server is not working for technical issues"

    res.status(statusCode).json({meassage: meassage})
    
})

app.listen(process.env.PORT, function(){
    console.log("Server is Working Fine");
})



