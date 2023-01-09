// path: ./src/api/restaurant/controllers/restaurant.js

const { createCoreController } = require("@strapi/strapi").factories;
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  // Method 1: Creating an entirely custom action
  async preTransaction(ctx) {
    try {
      const transformedItems = ctx.request.body.products.map(({ product }) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.attributes.title,
          },
          unit_amount: product.attributes.price * 100,
        },
        quantity: 1,
      }));

      const session = await stripe.checkout.sessions.create({
        /* line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "T-shirt",
              },
              unit_amount: 2000,
            },
            quantity: 1,
          },
        ], */
        line_items: transformedItems,
        mode: "payment",
        success_url: `${process.env.NEXT_DEV_URL}/success`,
        cancel_url: `${process.env.NEXT_DEV_URL}/cancel`,
      });

      const entry = await strapi.entityService.create("api::order.order", {
        data: {
          orderId: ctx.request.body.orderId,
          products: ctx.request.body.products,
          amount: ctx.request.body.amount,
          status: "placed",
          publishedAt: Date.now(),
        },
      });

      ctx.body = session.url;
    } catch (err) {
      ctx.body = err;
    }
  },
}));
