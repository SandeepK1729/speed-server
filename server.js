require('dotenv').config();

const userLib = require("./backend/lib/userLib");
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = process.env.PORT || 5050;

const options = {
    extensions: ['htm', 'html', 'css', 'js', 'ico', 'jpg', 'jpeg', 'png', 'svg'],
    index: ['index.html'],
}
app.use(express.static("public"));
// app.use('/static', express.static('static'));
// app.use('/templates', express.static('templates'));

app.use(
    express.urlencoded({
        extended: true
    })
);
app.use(express.json());

app.get('/', (req, res) => {
    // res.send("Hello, Sandeep!");
    res.sendFile('index.html');
});
app.get('/resume', (req, res) => {
    res.sendFile(__dirname + '/public/resume.html');
});
app.get('/card', (req, res) => {
    res.sendFile(__dirname + '/public/card.html');
});
app.get('/getAllUsers', (req, res) => {
    userLib.getAllUsers((err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })
});
app.post('/createUser', (req, res) => {
    userLib.createAUser(req.body, (err, result) => {
        res.send(err ? err : result);
    });
});
app.post('/deleteUser', (req, res) => {
    console.log("My dear user : " + req.body.username);
    userLib.deleteSingleUser(req.body, (err, result) => {
        console.log(err);
        res.send(err ? err : result);
    })
});
app.post('/updateUser', (req, res) => {
    userLib.updateSingleUser(req.body.filterQuery, req.body.updatedObject, (err, result) => {
        res.send(err ? err : result);
    })
});
app.use('/weather', (req, res) => {
    res.sendFile(__dirname + "/public/weather.html")
})


mongoose.set('strictQuery', true);
mongoose.connect(
    process.env.MONGO_CONNECTION_STRING, {}, (err) => {
        if (err) {
            console.error(err);
            return;
        } // else {
        console.log("Database Connected");

        // do not create user if already exist

        // userLib.getSingleUser({ username: "Sandeep1729" })
        userLib.createFirstUser((err, res) => {
            console.log(err ? ("hello " + err) : ("User: " + res));
        });

        // connecting server with port
        app.listen(port, () => {
            console.log(`Server Running on http://localhost:${port}`);
        });
        // }
    }
);