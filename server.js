require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = process.env.PORT || 5050;

app.use('/static', express.static('static'));
app.use('/templates', express.static('templates'));


app.get('/', (req, res) => {
    // res.send("Hello, Sandeep!");
    res.sendFile(__dirname + '/index.html');
});
app.get('/resume', (req, res) => {
    res.sendFile(__dirname + '/resume.html');
});

mongoose.set('strictQuery', true);
mongoose.connect(
    process.env.MONGO_CONNECTION_STRING, {}, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Database Connected");

            // connecting server with port
            app.listen(port, () => {
                console.log(`Server Running on http://localhost:${port}`);
            });
        }
    }
);