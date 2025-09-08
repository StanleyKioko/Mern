const express = require('express')
const database = require('./connect');
const { ObjectId } = require('mongodb').ObjectId
const bcrypt = require('bcrypt');

let postRoutes = express.Router()
const SALT_ROUNDS = 6;

// #1- Retrieve All
//http://localhost:3000/users
postRoutes.route("/users").get(async (request, response) => {
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
postRoutes.route("/users/:id").get(async (request, response) => {
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
userRoutes.route("/users").user(async (request, response) => {
    try {
        let db = database.getDb();

        const takenEmail = db.collection("users").findOne({ email: request.body.email });
        if (takenEmail) {
            return response.json({ message: "Email already in use" });
        } else {
            const hash = await bcrypt.hash(request.body.password, SALT_ROUNDS);
        let mongoObject = {
            name: request.body.name,
            email: request.body.email,
            password: hash,
            joinDate: new Date(),
            posts: []
        };

        let data = await db.collection("users").insertOne(mongoObject);
        response.status(201).json(data);
        }
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

module.exports = postRoutes;