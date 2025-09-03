const connect = require('./connect');
const express = require('express');
const cors = require('cors');
const posts = require('./postRoute');
const users = require('./userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(posts);
app.use(users);

app.listen(PORT, async () => {
    try {
        await connect.connectToServer();
        console.log(`Server is running on port: ${PORT}`);
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
});