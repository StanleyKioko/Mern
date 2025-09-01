const express = require('express')
const database = require('./connect');
const { ObjectId } = require('mongodb').ObjectId

let postRoutes = express.Router()

// #1- Retrieve All
//http://localhost:3000/posts
postRoutes.route("/posts").get(async (request, response) => {
    try {
        let db = database.getDb();
        let data = await db.collection("posts").find({}).toArray();
        if (data.length > 0) {
            response.json(data);
        } else {
            response.status(404).json({ message: "No posts found" });
        }
    } catch (error) {
        console.error("Error retrieving posts:", error);
        response.status(500).json({ error: error.message });
    }
});

//# 2- Retrieve One
//http://localhost:3000/posts/12345
postRoutes.route("/posts/:id").get(async (request, response) => {
    try {
        let db = database.getDb();
        let data = await db.collection("posts").findOne({ _id: new ObjectId(request.params.id) });
        if (data) {
            response.json(data);
        } else {
            response.status(404).json({ message: "Post not found" });
        }
    } catch (error) {
        console.error("Error retrieving post:", error);
        response.status(500).json({ error: error.message });
    }
});

//# 3- Create One
postRoutes.route("/posts").post(async (request, response) => {
    try {
        let db = database.getDb();
        let mongoObject = {
            title: request.body.title,
            description: request.body.description,
            content: request.body.content,
            author: request.body.author,
            dateCreated: request.body.dateCreated || new Date()
        };

        let data = await db.collection("posts").insertOne(mongoObject);
        response.status(201).json(data);
    } catch (error) {
        console.error("Error creating post:", error);
        response.status(500).json({ error: error.message });
    }
});

//# 4- Update One
postRoutes.route("/posts/:id").put(async (request, response) => {
    try {
        let db = database.getDb();
        let mongoObject = {
            $set: {
                title: request.body.title,
                description: request.body.description,
                content: request.body.content,
                author: request.body.author,
                dateCreated: request.body.dateCreated
            }
        };

        let data = await db.collection("posts").updateOne(
            { _id: new ObjectId(request.params.id) }, 
            mongoObject
        );
        
        if (data.matchedCount === 0) {
            return response.status(404).json({ message: "Post not found" });
        }
        
        response.json(data);
    } catch (error) {
        console.error("Error updating post:", error);
        response.status(500).json({ error: error.message });
    }
});

//# 5- Delete One
postRoutes.route("/posts/:id").delete(async (request, response) => {
    try {
        let db = database.getDb();
        let data = await db.collection("posts").deleteOne({ _id: new ObjectId(request.params.id) });
        
        if (data.deletedCount === 0) {
            return response.status(404).json({ message: "Post not found" });
        }
        
        response.json(data);
    } catch (error) {
        console.error("Error deleting post:", error);
        response.status(500).json({ error: error.message });
    }
});

module.exports = postRoutes;