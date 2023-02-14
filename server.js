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

app.listen(port, () => {
    console.log(`Server Running on http://localhost:${port}`);
})