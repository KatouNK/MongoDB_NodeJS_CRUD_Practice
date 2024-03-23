const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://Demo:7UMBLZr6Y6zPbzkv@clustercrudtest.e5u1vnv.mongodb.net/?retryWrites=true&w=majority";

    const client = new MongoClient(uri, { useUnifiedTopology: true });

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls

        // Find adventure movies
        const Adventure = "Adventure";
        await findMoviesByGenre(client, Adventure);

    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);

/**
 * Find movies by Adventure
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_mflix database
 * @param {string} Adventure The Adventure of the movies to find
 */
async function findMoviesByGenre(client, Adventure) {
    const cursor = client.db("sample_mflix").collection("movies").find({ genres: Adventure });

    const movies = await cursor.toArray();

    if (movies.length > 0) {
        console.log(`Found ${movies.length} movie(s) with the Adventure '${Adventure}':`);
        movies.forEach((movie, index) => {
            console.log(`${index + 1}. Title: ${movie.title}`);
            console.log(`   Genre(s): ${movie.genres.join(', ')}`);
        });
    } else {
        console.log(`No movies found with the Adventure '${Adventure}'`);
    }
}
