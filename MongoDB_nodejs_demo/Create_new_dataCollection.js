const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://Demo:7UMBLZr6Y6zPbzkv@clustercrudtest.e5u1vnv.mongodb.net/?retryWrites=true&w=majority&appName=ClusterCRUDTest";

    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls

        // Create a single new listing
        await createListing(client, {
            "_id": "59b99dcccfa9a34dcd7885e6",
            "name": "Rickon Stark",
            "email": "art_parkinson@gameofthron.es",
            "password": "$2b$12$LKBf/wrMe29RwjUCkm6sq.AfuAXshbX6Evys3twd9vaGEsEm6YBqC"
        });

        // Create 3 new listings
        await createMultipleListings(client, [
            {
                "_id": "59b99dcccfa9a34dcd7885e7",
                "name": "Arya Stark",
                "email": "arya_stark@gameofthron.es",
                "password": "$2b$12$LKBf/wrMe29RwjUCkm6sq.AfuAXshbX6Evys3twd9vaGEsEm6YBqD"
            },
            {
                "_id": "59b99dcccfa9a34dcd7885e8",
                "name": "Jon Snow",
                "email": "jon_snow@gameofthron.es",
                "password": "$2b$12$LKBf/wrMe29RwjUCkm6sq.AfuAXshbX6Evys3twd9vaGEsEm6YBqE"
            },
            {
                "_id": "59b99dcccfa9a34dcd7885e9",
                "name": "Sansa Stark",
                "email": "sansa_stark@gameofthron.es",
                "password": "$2b$12$LKBf/wrMe29RwjUCkm6sq.AfuAXshbX6Evys3twd9vaGEsEm6YBqF"
            }
        ]);
    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);

/**
 * Create a new listing
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_mflix database
 * @param {Object} newListing The new listing to be added
 */
async function createListing(client, newListing) {
    const result = await client.db("sample_mflix").collection("users").insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}

/**
 * Create multiple listings
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_mflix database
 * @param {Object[]} newListings The new listings to be added
 */
async function createMultipleListings(client, newListings) {
    const result = await client.db("sample_mflix").collection("listingsAndReviews").insertMany(newListings);

    console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
    console.log(result.insertedIds);
}
