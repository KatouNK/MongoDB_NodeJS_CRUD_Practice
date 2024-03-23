const { MongoClient } = require('mongodb');

async function main() {
    const url = "mongodb+srv://Demo:7UMBLZr6Y6zPbzkv@clustercrudtest.e5u1vnv.mongodb.net/?retryWrites=true&w=majority&appName=ClusterCRUDTest";

    const client = new MongoClient(url);

    try {
        await client.connect();
        console.log("Connected successfully to MongoDB server");
        
        await listDatabases(client);
    } catch (e) {
        console.error("Error connecting to MongoDB:", e);
    } finally {
        await client.close();
        console.log("Connection closed");
    }
}

async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => {
        console.log(`- ${db.name}`);
    });
}


main().catch(console.error);
