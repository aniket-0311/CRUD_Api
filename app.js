const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');


const userRoutes = require('./routes/user.js');
const adminRoutes = require('./routes/admin.js');

const ExpressError = require('./utils/ExpressError.js')

// Mongo Connection
mongoose.connect('mongodb://localhost:27017/ILRU',{useNewUrlParser: true, useUnifiedTopology: true,});

const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, 'MongoDB connection error:'));
db.once("open", ()=>{
    console.log("Database Connected");
})
// 


const app = express();


app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Routes for User and Admin
app.use("/", userRoutes);
app.use("/", adminRoutes);



app.all("*", (req, res, next) =>{
    next(new ExpressError("Page Not Found", 404))
});

app.use((err, req, res, next) =>{
    const { statusCode = 500, message = "Something wrong" } = err;
    res.status(statusCode).send(message)
});

app.listen(3000, () =>{
    console.log("Serving on port 3000")
})