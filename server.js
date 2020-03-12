// const path = require('path');
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const fileupload = require("express-fileupload")




// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

//File Upload
app.use(fileupload())



// Route files
const candidates = require("./routes/candidates")
const election = require("./routes/election")
const region = require('./routes/region')
const bureau = require("./routes/bureau")
const constituency = require("./routes/constituency")
const subconstituency = require("./routes/subconstituency")
const user = require("./routes/user")
const vr = require("./routes/vr")
const candidate = require("./routes/candidate");
const endorsement = require("./routes/endorsement");
const courses = require("./routes/courses");



// Mount routers
app.use("/api/v1/candidates", candidates);
app.use("/api/v1/election", election);
app.use("/api/v1/region", region);
app.use("/api/v1/bureau", bureau);
app.use("/api/v1/constituency", constituency);
app.use("/api/v1/subconstituency", subconstituency);
app.use("/api/v1/user", user);
app.use("/api/v1/candidate", candidate);
app.use("/api/v1/endorsement", endorsement);
app.use("/api/v1/vr", vr);

app.use(errorHandler);

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
    app.use(cors())
}

const PORT = process.env.PORT || 5000;
const server = app.listen(
    PORT,() => console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
            .bold
    )
   
    
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    // Close server & exit process
    // server.close(() => process.exit(1));
});

module.exports = app
