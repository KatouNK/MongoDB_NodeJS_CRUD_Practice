const { MongoClient, ObjectId } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://Demo:7UMBLZr6Y6zPbzkv@clustercrudtest.e5u1vnv.mongodb.net/?retryWrites=true&w=majority";

    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // ID film yang ingin dihapus
        const movieId = "573a1390f29313caabcd56df";

        // Melakukan penghapusan data film
        await deleteMovieById(client, movieId);

        console.log("Movie deleted successfully!");

    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);

/**
 * Delete a movie by its ID
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_mflix database
 * @param {string} movieId The ID of the movie to delete
 */
async function deleteMovieById(client, movieId) {
    const result = await client.db("sample_mflix").collection("movies").deleteOne(
        { "_id": new ObjectId(movieId) }  // Menggunakan new di sini
    );

    if (result.deletedCount === 0) {
        console.log(`No movie found with ID: ${movieId}`);
    } else {
        console.log(`Movie with ID ${movieId} deleted successfully`);
    }
}
