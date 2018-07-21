import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as stripe from 'stripe';
import * as express from 'express';

const stripeClient = new stripe(functions.config().stripe.secret);

exports.onUserCreate = functions.firestore.document('users/{userId}').onCreate(async (snapshot, context) => {
  const user = snapshot.data();
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
  } catch(error) {
    await snapshot.ref.update({
      status: 'declined',
      error: error.message
    })
  }
});

const app = express();

exports.api = functions.https.onRequest(app);

// define your node application below, it will exist at /api on your functions endpoint

app.get("*", (req, res, next) => {
    res.json({ message: "this works" });
});

