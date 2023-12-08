const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const path = require('path');
require("dotenv").config();

// routes
const authRoute = require('../routes/authRoute');
const userRoute = require('../routes/userRoute');
const profileRoute = require("../routes/profileRoute");
const supportRoute = require('../routes/supportRoute');
const systemRoute = require('../routes/systemRoute');
const eventRoute = require("../routes/eventRoute");
const patentRoute = require("../routes/patentRoute");
const guideRoute = require("../routes/guideRoute");
const publicationRoute = require("../routes/publicationRoute");

const achievementRoute = require("../routes/achievementRoute");
const qualificationRoute = require("../routes/qualificationRoute");
const dataRoute = require("../routes/dataRoute");


const app = express();

app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://cp.bvmengineering.com:3000',],
    credentials: true
}));

app.use(logger("dev")); // for logs 
app.use(cookieParser());
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Serve static files from the 'uploads' folder -- temporary
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// view engine setup
app.set('view engine', 'ejs');
app.set('views', './view');

app.get('/', (req, res) => {

    res.status(200).json({
        message: "server is up and running 🛠",
        serverTime: new Date(Date.now()).toLocaleString("en-US", {
            hour: 'numeric',
            minute: 'numeric',
            second: "numeric",
            month: "short",
            day: "numeric",
            year: "numeric",
        })
    })

});

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/profile", profileRoute);
app.use("/api/support", supportRoute);
app.use("/api/system", systemRoute);
app.use("/api/event", eventRoute);
app.use("/api/patent", patentRoute);
app.use("/api/guide", guideRoute);
app.use("/api/publication", publicationRoute);
app.use("/api/achievement", achievementRoute);
app.use("/api/qualification", qualificationRoute);
app.use("/api/data", dataRoute);


app.get('*', (req, res) => {
    return res.status(404).json({ message: 'Not found, Check the URL properly !!!' });
})

app.use((err, req, res, next) => {
    console.log("errr " ,err);
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ message: 'Invalid JSON payload' });
    }

    return res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = app;