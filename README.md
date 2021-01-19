# Jumga

This is a marketplace that provided ecommerce services to users in Nigeria, Ghana, Kenya and United Kingdom. Payments is handled by Flutterwave.

## Demo

[Link](https://fluttermart.vercel.app/)

## Approach

Our approach was based on taking advantage of Flutterwave's API feature where payments can be split among multiple subaccounts. Thus a user is restricted to order from only one shop at a time. On order, the shop dispatch rider receives a flat payment of 80% of the delivery fee, and the shop receives 97.5% of the total price.

After payment the server verifies payment after which the order details are saved. Fifteen minutes after an order is place, the order is shipped. Fifteen minutes after this, the order is delivered to the customer.

The customer can cancel an order as long as it hasn't been shipped. That's within the fifteen minutes window. On successful cancellation, a refund is processed.

## Development

1. Clone the project
2. Install dependencies in the `frontend` and `server` folder.
3. Create a .env file, add variables using the .env.example files in the respective folders.
4. For the frontend, run `yarn start`.
5. For the server, run `yarn dev` for development mode. `yarn start` for production mode. Also run `yarn build` to compile the typescript code.

## Authors

Esther Ogundijo

Ochuko Ekrresa
