const connect = require('./connect');
const express = require('express');
const cors = require('cors');
const posts = require('./postRoute');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(posts);

app.listen(PORT, () => {
    connect.connectToServer();
    console.log(`Server is running on port: ${PORT}`);
})
