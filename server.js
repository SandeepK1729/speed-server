const express = require('express');
const app = express();
const port = process.env.PORT || 5050;

app.use('/static', express.static('static'));
app.uss('/templates', express.static('templates'));

app.get('/', (req, res) => {
    // res.send("Hello, Sandeep!");
    res.sendFile(templates + '/index.html');
});
app.get('/resume', (req, res) => {
    res.sendFile(__dirname + '/resume.html');
});

app.listen(port, () => {
    console.log(`Server Running on http://localhost:${port}`);
})