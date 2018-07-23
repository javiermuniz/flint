import * as functions from 'firebase-functions';
import * as stripe from 'stripe';
import * as admin from 'firebase-admin';

const stripeClient = new stripe(functions.config().stripe.secret);
const endpointSecret = functions.config().stripe.endpointSecret;

export class StripeController {
    private eventHandlers = {
        "invoice.payment_failed": async (event) => { 
            
        }
    }
    public static async webhooks(req, res, next) {
        const sig = req.headers["stripe-signature"];
        try {
            const event = stripeClient.webhooks.constructEvent(req.body, sig, endpointSecret);
            
        }
        catch (err) {
            res.status(400).end()
        }
    }
}

