module.exports = application => {
	const MongoClient = require('mongodb').MongoClient;
	const assert = require('assert');

	const connection = (callback) => {
		MongoClient.connect(process.env.MONGODB_URL, (err, client) => {
			assert.strictEqual(null, err);
			const db = client.db(process.env.MONGODB_DATABASE);
			if(callback)
				callback(db, client);
		});
	}

	return connection;
};