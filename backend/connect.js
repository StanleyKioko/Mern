const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config({ path: './config.env' });

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.ATLAS_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let database;

module.exports = {
  connectToServer: async function() {
    try {
      // Connect the client to the server
      await client.connect();
      console.log("Connected to MongoDB successfully");
      database = client.db("blogData");
      return database;
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    }
  },
  getDb: function() {
    if (!database) {
      throw new Error("Database not initialized. Call connectToServer first.");
    }
    return database;
  }
}