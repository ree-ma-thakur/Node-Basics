const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  // in string we mentioned shop DB for connection; if there is no shop DB mongoDB will make the DB as well
  MongoClient.connect(
    "mongodb+srv://reemathakur0214:Noderoot%40123@cluster0.n4dgexg.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0"
  )
    .then((client) => {
      console.log("Connected!");
      _db = client.db(); // connect to shop db once; we don't have to connect on operation now
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDB = () => {
  if (_db) {
    return _db;
  }
  throw "No DB found";
};

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
