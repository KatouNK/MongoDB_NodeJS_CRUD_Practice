const { MongoClient, ObjectId } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://Demo:7UMBLZr6Y6zPbzkv@clustercrudtest.e5u1vnv.mongodb.net/?retryWrites=true&w=majority";

    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls

        // ID film yang ingin diupdate
        const movieId = "573a1390f29313caabcd5a93";

        // Data yang ingin diupdate
        const updatedData = {
            $set: {
                title: "Updated Title",
                genres: ["Adventure", "Action"],
                fullplot: "This is the updated full plot of the movie.",
                poster: "https://updated-poster-url.com"
            }
        };

        // Melakukan update data film
        await updateMovieById(client, movieId, updatedData);

        console.log("Movie updated successfully!");

    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);

/**
 * Update a movie by its ID
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_mflix database
 * @param {string} movieId The ID of the movie to update
 * @param {object} updatedData The updated data for the movie
 */
async function updateMovieById(client, movieId, updatedData) {
    const result = await client.db("sample_mflix").collection("movies").updateOne(
        { "_id": new ObjectId(movieId) },  // Menggunakan new di sini
        updatedData
    );
}
