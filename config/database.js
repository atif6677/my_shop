const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;


const uri = process.env.MONGO_URI;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(uri)
    .then(client => {
      console.log('Connected to MongoDB!');
      _db = client.db('my_shop_db');
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  // 3. This function checks if the connection exists before giving it to you
  if (_db) {
    return _db;
  }
  throw 'No database found! Did you forget to run mongoConnect?';
};

// Export both functions
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;