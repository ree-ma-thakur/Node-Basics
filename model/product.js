const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, content) => {
    if (err) cb([]);
    else {
      cb(JSON.parse(content));
    }
  });
};

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
    getProductsFromFile((products) => {
      products.push(this); // this refers to the class as we have used arrow function
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  //   Static makes sure that we can call this method directly on class itself & not on instantiated object
  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};
