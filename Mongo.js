//To find the each product
db.Products.find().toArray();

// the product price which are between 400 to 800
db.Products.find({ product_price: { $gte: 400, $lte: 800 } });

//The product price which are not between 400 to 600

db.Products.find({
  $or: [{ product_price: { $lt: 400 } }, { product_price: { $gt: 600 } }],
});

// the four product which are grater than 500 in price
db.Products.find({ product_price: { $gt: 500 } }).limit(4);

//the product name and product material of each products
db.Products.find({}, { product_name: 1, product_material: 1, _id: 0 });

//the product with a row id of 10
db.Products.find({ id: "10" });

// the product name and product material
db.Products.find({}, { product_name: 1, product_material: 1, _id: 0 });

//all products which contain the value of soft in product material
db.Products.createIndex({ product_material: "text" });
db.Products.find({ $text: { $search: "soft" } });

// products which contain product color indigo  and product price 492.00
db.Products.find({
  $or: [{ product_color: "indigo" }, { product_price: 492 }],
});

// Delete the products which product price value are same
db.Products.aggregate([
  {
    $group: {
      _id: "$product_price",
      uniqueIds: { $addToSet: "$_id" },
      count: { $sum: 1 },
    },
  },
  {
    $match: {
      count: { $gt: 1 },
    },
  },
]).forEach(function (doc) {
  doc.uniqueIds.shift();
  db.Products.remove({ _id: { $in: doc.uniqueIds } });
});
