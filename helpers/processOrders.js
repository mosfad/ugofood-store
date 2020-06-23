const db = require("../models");

module.exports = {
  calculateOrderAmount: async (items) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client.
    let sum = 0;
    const ids = items.map((items) => {
      return items.id;
    });
    let productArr = [];
    const response = await db.Product.find().where("_id").in(ids);
    productArr = [...response];
    for (let i = 0; i < items.length; i++) {
      console.log(items[i]);
      console.log(productArr[i]);
      sum += items[i].quantity * productArr[i].price;
    }
    //.then((dbProducts) => {
    //console.log(dbProducts);
    //productArr = [...dbProducts]
    // for (let i = 0; i < items.length; i++) {
    //   console.log(items[i]);
    //   console.log(dbProducts[i]);
    //   sum += items[i].quantity * dbProducts[i].price;
    // }
    // console.log(sum);
    // return sum;
    //})
    //.catch((err) => console.log(err));

    return sum;
  },
};
