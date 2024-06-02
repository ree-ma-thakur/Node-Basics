const mongoDB = require("mongodb");
const getDB = require("../util/database").getDB;
class Product {
  constructor(title, price, description, imageUrl, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new mongoDB.ObjectId(id) : null;
  }

  save() {
    const db = getDB();
    let dbOperation;
    if (this?._id) {
      dbOperation = db
        .collection("products")
        .updateOne({ _id: this?._id }, { $set: this }); // $set is to update the specific elt
    } else {
      dbOperation = db.collection("products").insertOne(this); // returns promise
    }
    return dbOperation
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
  }

  static fetchAll() {
    const db = getDB();
    // return db.collection("products").find({title:'A book'});   // will find the document having this title; sort of filter
    return db
      .collection("products")
      .find() // find does  not immediately return promise, instead it gives a cursor/handle to tell mongoDb to give the next document as we can have millions of data
      .toArray() // to convert all documets & turn to JS array, use if we have couple of dozens of 100 documents, otherwise we should use pagination
      .then((products) => {
        return products;
      })
      .catch((err) => console.log(err));
  }

  static findById(prodId) {
    const db = getDB();
    return db
      .collection("products")
      .find({ _id: new mongoDB.ObjectId(prodId) }) // return a cursor; _id is added by mongoDB in different format as ObjectId("idString") which is not equal to prodId therefore we have to use new mongoDB
      .next() // to get the last document
      .then((product) => product)
      .catch((err) => console.log(err));
  }

  static deleteById(prodId) {
    const db = getDB();
    return db
      .collection("products")
      .deleteOne({ _id: new mongoDB.ObjectId(prodId) })
      .then(() => console.log("Deleted"))
      .catch((err) => console.log(err));
  }
}

module.exports = Product;
