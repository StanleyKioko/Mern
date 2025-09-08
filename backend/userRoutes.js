const express = require('express')
const database = require('./connect');
const { ObjectId } = require('mongodb').ObjectId
const bcrypt = require('bcrypt');

const express = require('express')
const database = require('./connect');
const { ObjectId } = require('mongodb').ObjectId
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './config.env' });


const userRoutes = express.Router()
const SALT_ROUNDS = 6


// #1- Retrieve All
//http://localhost:3000/users
userRoutes.route("/users").get(async (request, response) => {
    try {
        let db = database.getDb();
        let data = await db.collection("users").find({}).toArray();
        if (data.length > 0) {
            response.json(data);
        } else {
            response.status(404).json({ message: "No users found" });
        }
    } catch (error) {
        console.error("Error retrieving users:", error);
        response.status(500).json({ error: error.message });
    }
});

//# 2- Retrieve One
//http://localhost:3000/users/12345
userRoutes.route("/users/:id").get(async (request, response) => {
    try {
        let db = database.getDb();
        let data = await db.collection("users").findOne({ _id: new ObjectId(request.params.id) });
        if (data) {
            response.json(data);
        } else {
            response.status(404).json({ message: "Post not found" });
        }
    } catch (error) {
        console.error("Error retrieving user:", error);
        response.status(500).json({ error: error.message });
    }
});

//# 3- Create One
userRoutes.route("/users").post(async (request, response) => {
    try {
        let db = database.getDb();

        const takenEmail = await db.collection("users").findOne({ email: request.body.email });
        if (takenEmail) {
            return response.status(400).json({ message: "Email already taken" });
        }

        const hashedPassword = await bcrypt.hash(request.body.password, SALT_ROUNDS);
        let newUser = {
            name: request.body.name,
            email: request.body.email,
            password: hashedPassword,
            joinDate: request.body.joinDate,
            posts: request.body.posts || []
        };

        let result = await db.collection("users").insertOne(newUser);
        response.status(201).json(result);
    } catch (error) {
        console.error("Error creating user:", error);
        response.status(500).json({ error: error.message });
    }
});

//# 4- Update One
userRoutes.route("/users/:id").put(async (request, response) => {
    try {
        let db = database.getDb();
        let mongoObject = {
            $set: {
                name: request.body.name,
                email: request.body.email,
                password: request.body.password,
                joinDate: request.body.joinDate,
                posts: request.body.posts,
            }
        };

        let data = await db.collection("users").updateOne(
            { _id: new ObjectId(request.params.id) }, 
            mongoObject
        );
        
        if (data.matchedCount === 0) {
            return response.status(404).json({ message: "Post not found" });
        }
        
        response.json(data);
    } catch (error) {
        console.error("Error updating user:", error);
        response.status(500).json({ error: error.message });
    }
});

//# 5- Delete One
userRoutes.route("/users/:id").delete(async (request, response) => {
    try {
        let db = database.getDb();
        let data = await db.collection("users").deleteOne({ _id: new ObjectId(request.params.id) });
        
        if (data.deletedCount === 0) {
            return response.status(404).json({ message: "Post not found" });
        }
        
        response.json(data);
    } catch (error) {
        console.error("Error deleting user:", error);
        response.status(500).json({ error: error.message });
    }
});

//# 6- login
userRoutes.route("/users/login").post(async (request, response) => {
    try {
        let db = database.getDb();

        const user = await db.collection("users").findOne({ email: request.body.email });
        if (user) {
            let confirmation = await bcrypt.compare(request.body.password, user.password);
            if (confirmation) {
                const token = jwt.sign(user, process.env.SECRETKEY, { expiresIn: '1h' });
                response.json({success: true, token})
            } else {
                response.json({success: false, message: "Incorrect password"})
            }

        }else {
            response.json({success: false, message: "User not found"})
        }
    } catch (error) {
        console.error("Error logging in:", error);
        response.status(500).json({ error: error.message });
    }
});

module.exports = userRoutes;