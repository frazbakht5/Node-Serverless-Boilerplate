import { ICheckout } from 'src/interfaces/interfaces';
import Stripe from 'stripe';
import { v4 as uuidv4 } from 'uuid';

const stripe = new Stripe('STRIPE_SECERET_KEY', { apiVersion: '2022-11-15' });
const STRIPE_REFRESH_URL = 'https://we.tv/dev/';
const STRIPE_RETURN_URL = 'https://we.tv/dev/';

export default class StripeService {
  static createUserStripeAccounnt = async (email: string, userId: string): Promise<any | undefined> => {
    try {
      const account = await stripe.accounts.create({
        type: 'express',
        country: 'US',
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
        metadata: {
          email,
          userId,
        },
      });
      const addedd = await stripe.accountLinks.create({
        account: account.id,
        refresh_url: `${STRIPE_REFRESH_URL}${account.id}`,
        return_url: `${STRIPE_RETURN_URL}${account.id}`,
        type: 'account_onboarding',
      });

      // let stripeData = {
      //     account_id: account.id
      // }
      // userService.updateUserById(userId, { stripe_data: stripeData, is_stripe_attached: true });

      // const httpResponse = HttpResponse.get(accountLink)
      // return res.json(httpResponse)

      return { account_id: account.id, ...addedd } as any;
    } catch (error) {
      return undefined;
    }
  };
  static async refreshUserStripeAccounnt(accountId: string) {
    try {
      return await stripe.accountLinks.create({
        account: accountId,
        refresh_url: `${STRIPE_REFRESH_URL}${accountId}`,
        return_url: `${STRIPE_RETURN_URL}${accountId}`,
        type: 'account_onboarding',
      });
      // debugLog2('accountLink', accountLink)
      // res.redirect(accountLink.url)
    } catch (error) {
      return undefined;
    }
  }

  static async getPaymentUrl(title: string, price: number, userId: string, userStripeId: string) {
    try {
      return await stripe.checkout.sessions.create(
        {
          line_items: [
            {
              price_data: {
                currency: 'usd',
                product_data: {
                  name: title,
                },
                unit_amount: price * 100,
              },
              quantity: 1,
            },
          ],
          mode: 'payment',
          success_url: `${process.env.APP_HOST}/?userId=${userId}&success=true&session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${process.env.APP_HOST}/?userId=${userId}&success=false`,
          payment_intent_data: {
            application_fee_amount: 0,
          },
        },
        {
          stripeAccount: userStripeId, // destination
        },
      );

      // StripeOrderModel.create({ session_id: session.id, skeding_user_id: data.userId });
      // const httpResponse = HttpResponse.get({ url: session.url })
      // res.json(httpResponse)

      // return session.url;
    } catch (error) {
      return undefined;
    }
  }

  static async returnUserStripeAccounnt(accountId: string) {
    try {
      return await stripe.accounts.retrieve(accountId);
      // if (account.details_submitted) {
      //   // await Restaurant.updateOne({ _id: account.metadata.restaurantId }, { stripeAccountId: accountId, stripeDetailsSubmitted: true })
      // }
      // return res.redirect(config.DASHBOARD_URL + 'admin/payment')
    } catch (error) {
      return undefined;
    }
  }
  static async isSessionPaymentSuccessful(data: { userId: string; userStripeId: string; session_id: string }) {
    const { session_id } = data;
    // let sessionFromDb = await StripeOrderModel.findOne({
    //   session_id: session_id,
    //   skeding_user_id: data.userId,
    // });

    // if (!sessionFromDb) {
    //   return false;
    // }

    try {
      const sessionGet = await stripe.checkout.sessions.retrieve(session_id, {
        stripeAccount: data.userStripeId,
      });

      if (sessionGet && sessionGet.payment_status) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  static createStripeToken = async (checkout: ICheckout) => {
    try {
      const idempotencyKey = uuidv4();
      return await stripe.tokens
        .create(
          {
            card: {
              number: checkout.cardNumber,
              exp_month: checkout.cardExpiryDate.split('/')[0].trim(),
              exp_year: checkout.cardExpiryDate.split('/')[1].trim(),
              cvc: checkout.cardCCV.trim(),
            },
          },
          { idempotencyKey },
        )
        .catch((error) => {
          console.log('customer Create Error', error?.raw);
          return {
            error: {
              code: error?.raw.code,
              doc_url: error?.raw.doc_url,
              message: error?.raw.message,
              param: error?.raw.number,
              type: error?.raw.type,
            },
          };
        });
    } catch (error) {
      console.log('Create Token Catch: Error', error);
      return undefined;
    }
  };

  static createStripePaymentMethod = async (checkout: ICheckout) => {
    try {
      const idempotencyKey = uuidv4();
      return await stripe.paymentMethods
        .create(
          {
            type: 'card',
            card: {
              number: checkout.cardNumber,
              exp_month: parseInt(checkout.cardExpiryDate.split('/')[0].trim()),
              exp_year: parseInt(checkout.cardExpiryDate.split('/')[1].trim()),
              cvc: checkout.cardCCV.trim(),
            },
          },

          { idempotencyKey },
        )
        .catch((error) => {
          console.log('customer Create Error', error?.raw);
          return {
            error: {
              code: error?.raw.code,
              doc_url: error?.raw.doc_url,
              message: error?.raw.message,
              param: error?.raw.number,
              type: error?.raw.type,
            },
          };
        });
    } catch (error: any) {
      console.log('Create Token Catch: Error', error);
      return {
        error: {
          code: error?.raw.code,
          doc_url: error?.raw.doc_url,
          message: error?.raw.message,
          param: error?.raw.number,
          type: error?.raw.type,
        },
      };
    }
  };

  static charge = async (checkout: ICheckout, tokenId: string, user: any) => {
    try {
      const idempotencyKey = uuidv4();

      return await stripe.customers
        .create({
          email: user.email,
          source: tokenId, /// for token only
          // payment_method: tokenId, //for payment method
        })
        .then(async (customer) => {
          return await stripe.charges.create(
            {
              amount: checkout.amount * 100,
              currency: 'EUR',
              receipt_email: user.email,
              description: 'any thing you want to',
              customer: customer.id,
              shipping: {
                name: user.name,
                address: {
                  country: checkout.address,
                },
              },
            },
            { idempotencyKey },
          );
        })
        .catch((error) => {
          console.log('customer Create Error', error);
          return {
            error: {
              code: error?.raw.code,
              doc_url: error?.raw.doc_url,
              message: error?.raw.message,
              param: error?.raw.number,
              type: error?.raw.type,
            },
          };
        });
    } catch (error: any) {
      return {
        error: {
          code: error?.raw.code,
          doc_url: error?.raw.doc_url,
          message: error?.raw.message,
          param: error?.raw.number,
          type: error?.raw.type,
        },
      };
    }
  };

  static chargeCard = async (checkout: ICheckout, tokenId: string, user: any) => {
    try {
      const idempotencyKey = uuidv4();

      return await stripe.customers
        .create({
          email: user.email,
          // source: tokenId, /// for token only
          payment_method: tokenId, //for payment method
        })
        .then(async (customer) => {
          return await stripe.charges.create(
            {
              amount: checkout.amount * 100,
              currency: 'EUR',
              receipt_email: user.email,
              description: 'any thing you want to',
              customer: customer.id,
              shipping: {
                name: user.name,
                address: {
                  country: checkout.address,
                },
              },
            },
            { idempotencyKey },
          );
        })
        .catch((error) => {
          console.log('customer Create Error', error);
          return {
            error: {
              code: error?.raw.code,
              doc_url: error?.raw.doc_url,
              message: error?.raw.message,
              param: error?.raw.number,
              type: error?.raw.type,
            },
          };
        });
    } catch (error: any) {
      return {
        error: {
          code: error?.raw.code,
          doc_url: error?.raw.doc_url,
          message: error?.raw.message,
          param: error?.raw.number,
          type: error?.raw.type,
        },
      };
    }
  };
}
