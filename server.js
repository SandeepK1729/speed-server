require('dotenv').config();

const userLib = require("./backend/lib/userLib");
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = process.env.PORT || 5050;

app.use('/static', express.static('static'));
app.use('/templates', express.static('templates'));


app.get('/', (req, res) => {
    // res.send("Hello, Sandeep!");
    res.sendFile(__dirname + '/templates/index.html');
});
app.get('/resume', (req, res) => {
    res.sendFile(__dirname + '/templates/resume.html');
});
app.get('/card', (req, res) => {
    res.sendFile(__dirname + '/templates/card.html');
});
app.get('/getAllUsers', (req, res) => {
    userLib.getAllUsers((err, result) => {
        if (err) {
            res.send(err);
        } else {
            console.log(result);
            res.send(result);
        }
    })
});

mongoose.set('strictQuery', true);
mongoose.connect(
    process.env.MONGO_CONNECTION_STRING, {}, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Database Connected");

            // do not create user if already exist

            // userLib.getSingleUser({ username: "Sandeep1729" })
            userLib.createFirstUser((err, res) => {
                if (err) {

                    console.log("hello " + err);
                } else {
                    console.log("User: " + res);
                }
            });

            // connecting server with port
            app.listen(port, () => {
                console.log(`Server Running on http://localhost:${port}`);
            });
        }
    }
);