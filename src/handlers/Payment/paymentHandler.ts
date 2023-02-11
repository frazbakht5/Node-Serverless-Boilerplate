import { formatJSONResponse } from '@libs/apiGateway';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import InternalServer from 'src/modules/Errors/InternalServer';
import HttpResponse from 'src/modules/Response/HttpResponse';
import Stripe from 'stripe';
const YOUR_DOMAIN = 'http://localhost:4200';

// import StripeService from './service';
const STRIPE_SECERET_KEY =
  'sk_test_51MQhkvKk1ZNlBUs8G3bRRc2nGGAgTjas71XU4hIeGrTehPo0ayp00M4VugOt72dbGBMAP9nNxylr9CeLbJIadJ4J00vGhgnX3k';
const stripe = new Stripe(STRIPE_SECERET_KEY, { apiVersion: '2022-11-15' });

const endpointSecret = 'whsec_c8405a62f44252948ccab16de2d89163bb8a0f12eecd960e60d2a2bd51994105';
export const paymentUrl = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    // const prices = await stripe.prices.list({
    //   lookup_keys: [event.body.lookup_key],
    //   expand: ['data.product'],
    // });
    const session = await stripe.checkout.sessions.create({
      billing_address_collection: 'auto',
      line_items: [
        {
          price: 'price_1MRzODKk1ZNlBUs8FqAvDuF3',
          // For metered billing, do not pass quantity
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${YOUR_DOMAIN}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });
    return formatJSONResponse(HttpResponse.created(session));
  } catch (error: any) {
    console.log(event.body);
    return formatJSONResponse(new InternalServer(error).getResponse());
  }
};
export const webhook = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const sig = event.headers['Stripe-Signature'];
    const session = stripe.webhooks.constructEvent(event.body, sig, endpointSecret);
    // Handle the event
    switch (session.type) {
      case 'payment_intent.succeeded':
        console.log('payment_intent.succeeded == >> ', session.data.object);
        // Then define and call a function to handle the event payment_intent.succeeded
        break;
      case 'subscription_schedule.canceled':
        console.log('subscription_schedule.canceled == >> ', session.data.object);
        // Then define and call a function to handle the event subscription_schedule.canceled
        break;
      case 'subscription_schedule.completed':
        console.log('subscription_schedule.completed == >> ', session.data.object);
        // Then define and call a function to handle the event subscription_schedule.completed
        break;
      case 'subscription_schedule.expiring':
        console.log('subscription_schedule.expiring == >> ', session.data.object);
        // Then define and call a function to handle the event subscription_schedule.expiring
        break;
      case 'subscription_schedule.updated':
        console.log('subscription_schedule.updated == >> ', session.data.object);
        // Then define and call a function to handle the event subscription_schedule.updated
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${session.type}`);
    }
    return formatJSONResponse(HttpResponse.created(session));
  } catch (error: any) {
    console.log(event.headers);
    console.log(error);
    return formatJSONResponse(new InternalServer(error).getResponse());
  }
};
