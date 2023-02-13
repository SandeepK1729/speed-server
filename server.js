const express = require('express');
const app = express();
const port = process.env.PORT || 5050;

app.get('/', (req, res) => {
    res.send("Hello, Sandeep!");
})

app.listen(port, () => {
    console.log(`Server Running on http://localhost:${port}`);
})