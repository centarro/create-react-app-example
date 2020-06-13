import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'

const paypal = window.paypal;
let PayPalButton = paypal.Buttons.driver('react', { React, ReactDOM });

const PayPalCheckout = ({ cart, cartToken, history }) => {
  const options = {};
  options.method = 'POST';
  options.headers = {};
  options.headers['Commerce-Current-Store'] = process.env.REACT_APP_STORE_UUID;
  options.headers.Accept = 'application/vnd.api+json';
  options.headers['Commerce-Cart-Token'] = cartToken;

  return <PayPalButton
    createOrder={(data, actions) => {
      return fetch(
        `${process.env.REACT_APP_API_URL}/commerce-paypal/checkout-create/paypal_checkout/${cart.id}`,
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
        `${process.env.REACT_APP_API_URL}/jsonapi/checkout/${cart.id}/payment/return`,
        options
        )
      .then(res => res.json())
      .then(details => {
        history.push(`/checkout/${cart.id}/complete`);
      })
      .catch(err => {
        console.error(err);
        alert('There was an error');
      });
    }}
  />;
}
export default connect()(PayPalCheckout);
