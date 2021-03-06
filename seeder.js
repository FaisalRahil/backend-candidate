const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Load models
const Candidate = require("./models/Candidate");
const Course = require("./models/Course");

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

// Read JSON files
const candidates = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/candidates.json`, "utf-8")
);

const courses = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/courses.json`, "utf-8")
);

// Import into DB
const importData = async () => {
    try {
        await Candidate.create(candidates);
        await Course.create(courses);
        // await User.create(users);
        // await Review.create(reviews);
        console.log("Data Imported...".green.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

// Delete data
const deleteData = async () => {
    try {
        await Candidate.deleteMany();
        await Course.deleteMany();
        // await User.deleteMany();
        // await Review.deleteMany();
        console.log("Data Destroyed...".red.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

if (process.argv[2] === "-i") {
    importData();
} else if (process.argv[2] === "-d") {
    deleteData();
}
