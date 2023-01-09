// path: ./src/api/restaurant/routes/custom-restaurant.js

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/orders/pre-transaction",
      handler: "custom.preTransaction",
    },
  ],
};
