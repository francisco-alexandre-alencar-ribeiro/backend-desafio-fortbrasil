
module.exports = application => {
    var ObjectId = require('mongodb').ObjectID;
    var {dbConnection} = application.config;

    var EstablishmentDAO = {
        collection: "establishment"
    };
        
    EstablishmentDAO.getAll = (query, callback) => {
        dbConnection((db, client) => {
            let collection = db.collection(EstablishmentDAO.collection);
            collection.find({localidade: new RegExp(query.place, 'i')}).toArray((err, result) => {
                if(callback)
                    callback(result);
                client.close();
            });
        });
    }

    EstablishmentDAO.get = (id, callback) => {
        dbConnection((db, client) => {
            let collection = db.collection(EstablishmentDAO.collection);
            collection.find({_id: new ObjectId(id)}).toArray((err, result) => {
                if(callback)
                    callback(result[0]);
                client.close();
            });
        });
    }

    EstablishmentDAO.save = (establishment, callback) => {
        dbConnection((db, client) => {
            let collection = db.collection(EstablishmentDAO.collection);
        
            if(!establishment._id) {
                collection.insertOne(establishment, (err, res) => {
                    if (err) throw err;
                    if(callback)
                        callback(res.result);
                    client.close();
                });
            } else {
                var _id = new ObjectId(establishment._id);
                delete establishment._id;

                collection.updateOne({_id}, { $set: establishment }, function(err, res) {
                    if (err) throw err;
                    if(callback)
                        callback(res.result);
                    client.close();
                });
            }
        });
    }
    
    EstablishmentDAO.delete = (id, callback) => {
        dbConnection((db, client) => {
            let collection = db.collection(EstablishmentDAO.collection);
                
            collection.deleteOne({_id: new ObjectId(id)}, (err, res) => {
                if (err) throw err;
                if(res.result.ok && callback);
                    callback();
                client.close();
            });
        });
    }
    
    return EstablishmentDAO;
};