import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as stripe from 'stripe';
import * as express from 'express';

import { StripeController } from './controllers/stripe.controller';

const stripeClient = new stripe(functions.config().stripe.secret);

exports.createUser = functions.https.onCall(async (user, context) => {
  const authRecord = await admin.auth().createUser({ 
    email: user.email,
    password: user.password
  });
  delete user['password'];

  try {
    // create stripe customer
    const customer = await stripeClient.customers.create({
      email: user.email,
      source: user.stripeToken.id
    });
    await admin.firestore().doc(authRecord.uid).update({
      stripeCustomerId: customer.id
    });
    user.stripeCustomerId = customer.id;
  
    // create the subscription
    const subscription = await stripeClient.subscriptions.create({
      customer: customer.id,
      items: [
        { plan: user.plan, quantity: 1 }
      ],
      coupon: user.coupon ? user.coupon : null
    });
  
    // create the user record in firebase
    const dbRecord = await admin.firestore().doc(authRecord.uid).set({
      customerId: customer.id,
      subscriptionId: subscription.id,
      ...user
    });

    return dbRecord;
  } catch(err) {
    const r = await admin.auth().deleteUser(authRecord.uid);
    throw err;
  }
});

const app = express();
exports.api = functions.https.onRequest(app);

app.post("/stripe", StripeController.webhooks);

// define your custom node application below, it will exist at /api on your functions endpoint
