const express = require('express');
const path = require('path');
const app = express();

app.use("/smart-scan", express.static(path.join(__dirname, 'build')));
//
// app.get('/smart-scan', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(3000);
