import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as stripe from 'stripe';
import * as express from 'express';

import { StripeController } from './controllers/stripe.controller';

const stripeClient = new stripe(functions.config().stripe.secret);

exports.createUser = functions.https.onCall(async (user, context) => {
  try {
    const customer = await stripeClient.customers.create({
      email: user.email,
      source: user.stripeToken.id
    });
    await snapshot.ref.update({
      stripeCustomerId: customer.id
    });
    user.stripeCustomerId = customer.id;
  
    const subscription = await stripeClient.subscriptions.create({
      customer: customer.id,
      items: [
        { plan: user.plan, quantity: 1 }
      ],
      coupon: user.coupon ? user.coupon : null
    });
  
    await snapshot.ref.update({
      stripeSubscriptionId: subscription.id,
      status: 'active'
    });
  } catch(err) {
    console.error(err);
    await snapshot.ref.update({
      status: 'declined'
    });
  }
});

const app = express();
exports.api = functions.https.onRequest(app);

app.post("/stripe", StripeController.webhooks);

// define your custom node application below, it will exist at /api on your functions endpoint
