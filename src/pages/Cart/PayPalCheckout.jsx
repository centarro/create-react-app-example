import React from 'react';
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { PayPalButtons } from "@paypal/react-paypal-js";

const PayPalCheckout = ({ cartId, cart: { cartToken }, dispatch }) => {
  console.log(dispatch);
  const options = {};
  options.method = 'POST';
  options.headers = {};
  options.headers['Commerce-Current-Store'] = process.env.REACT_APP_STORE_UUID;
  options.headers.Accept = 'application/vnd.api+json';
  options.headers['Commerce-Cart-Token'] = cartToken;

  return <PayPalButtons
    createOrder={(data, actions) => {
      return fetch(
        `${process.env.REACT_APP_API_URL}/commerce-paypal/checkout-create/paypal_checkout/${cartId}`,
        options
        )
      .then(res => res.json())
      .then(data => {
        return data.id;
      })

    }}
    onApprove={(data, actions) => {
      options.method = 'GET';
      // const orderId = details.id;
      // const payer = details.payer.name;
      // const status = details.status;
      return fetch(
        `${process.env.REACT_APP_API_URL}/jsonapi/checkout/${cartId}/payment/return`,
        options
        )
      .then(res => res.json())
      .then(details => {
        dispatch(push(`/checkout/${cartId}/complete`));
      })
      .catch(err => {
        console.error(err);
        alert('There was an error');
      });
    }}
  />;
}

const mapStateToProps = ({ cart }) => ({ cart });
export default connect(mapStateToProps)(PayPalCheckout);
