import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { usePayPalScriptReducer } from '@paypal/react-paypal-js';
import PayPalCheckout from '../Cart/PayPalCheckout';

const PaymentMethod = ({ checkout: { orderData, currentStep } }) => {
  const [{ isLoaded }] = usePayPalScriptReducer();
  const [supportsHostedFields, setSupportsHostedFields] = useState(null);

  useEffect(() => {
    if (isLoaded) {
      // @todo replace with `window.paypal.HostedFields.isEligible()`.
      setSupportsHostedFields(false)
    }
  }, [isLoaded])

  if (currentStep !== "paymentMethod" || supportsHostedFields === null || orderData === null) {
    return null;
  }

  return (
    <Fragment>
      <h3>Payment</h3>
      {supportsHostedFields ? <div>
        <p>Comming soon: hosted fields</p>
      </div> : <PayPalCheckout cartId={orderData.id} />}
    </Fragment>
  );
};
const mapStateToProps = ({ checkout }) => ({ checkout });
export default connect(mapStateToProps)(PaymentMethod);
