import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import Breadcrumb from './breadcrumb'
import Sidebar from './sidebar'
import ShippingMethod from './shippingMethod'
import PaymentMethod from './paymentMethod'
import { getCheckout, patchCheckout, checkoutChangeStep } from '../../redux/actions/checkout';
import Address from './address';
import { Link } from 'react-router-dom';

const CheckoutActions = ({ currentStep }) => {
  let buttonText = '';
  if (currentStep === 'customerInformation') {
    buttonText = 'Continue to shipping method';
  }
  else if (currentStep === 'shippingMethod') {
    buttonText = 'Continue to payment method';
  }
  else {
    return null;
  }
  return (
    <div className={`d-flex justify-content-between align-items-center mt-4`}>
      {currentStep !== 'paymentMethod' && (<Link to={`/cart`}>&lt; Return to cart</Link>)}
      <button className={`btn btn-primary pull-right`}>{buttonText}</button>
    </div>
  )
}

const Checkout = (props) => {
  const { cart: cartReducer, checkout, patchCheckout, getCheckout } = props;
  const [emailAddress, setEmailAddress] = useState("")
  const [billingAddress, setBillingAddress] = useState({
    address_line1: '',
    address_line2: '',
    locality: '',
    administrative_area: '',
    postal_code: '',
  })
  const [shippingAddress, setShippingAddress] = useState({
    address_line1: '',
    address_line2: '',
    locality: '',
    administrative_area: '',
    postal_code: '',
  })
  const [selectedShippingMethod, setSelectedShippingMethod] = useState('2--default');

  useEffect(() => {
    if (cartReducer.carts.length) {
      getCheckout(cartReducer.carts[0]);
    }
  }, [cartReducer.carts])
  useEffect(() => {
    if (checkout.orderData) {
      setEmailAddress(checkout.orderData.attributes.email || "");

      const { billing_information: orderDataBillingInformation, shipping_information: orderDataShippingInformation } = checkout.orderData.attributes;

      const orderDataBillingAddress = orderDataBillingInformation ? (orderDataBillingInformation.address || {}) : {}
      setBillingAddress({
        ...orderDataBillingAddress,
        country_code: 'US'
      })
      const orderDataShippingAddress = orderDataShippingInformation ? (orderDataShippingInformation.address || {}) : {}
      setShippingAddress({
        ...orderDataShippingAddress,
        country_code: 'US'
      })
      setSelectedShippingMethod(checkout.orderData.attributes.shipping_method || '2--default');
    }
  }, [checkout.orderData])
  const onShippingMethodChange = event => {
    setSelectedShippingMethod(event.target.value)
    patchCheckout(
      checkout.orderData, {
        'shipping_method': event.target.value,
      }
    )
  };
  const onFormSubmit = (event) => {
    event.preventDefault();
    if (checkout.currentStep === 'customerInformation') {
      const shipping_information = {
        address: {
          ...shippingAddress,
          country_code: 'US'
        }
      };
      const test = patchCheckout(
        checkout.orderData, {
          shipping_information,
        }
      )
      test.finally(() => {
        props.checkoutChangeStep('shippingMethod');
      })
    }
    else if (checkout.currentStep === 'shippingMethod') {
      const test = patchCheckout(
        checkout.orderData, {
          'shipping_method': selectedShippingMethod,
        }
      )
      test.finally(() => {
        props.checkoutChangeStep('paymentMethod')
      })
    }
    else {
      alert('payment made?')
    }
  }

  return (
    <div className={`container-fluid`}>
      <div className={`container`}>
        <div className={`row`}>
          <div className={`col-md-8`}>
            <form onSubmit={onFormSubmit}>
              <Breadcrumb activeStep={checkout.currentStep}/>
              {checkout.currentStep === 'customerInformation' && (
                <div>
                  <h3>Customer information</h3>
                  <div className="form-group">
                    <label htmlFor="customerOrderEmail" className={`sr-only`}>Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="customerOrderEmail"
                      placeholder="Email"
                      value={emailAddress}
                      onChange={(event) => setEmailAddress(event.target.value)}
                      onBlur={(event) => {
                        if (event.target.checkValidity()) {
                          patchCheckout(checkout.orderData, { email: event.target.value })
                        }
                    }} />
                  </div>
                  <h3>Shipping information</h3>
                  <Address
                    elementName={`shipping`}
                    setAddress={setShippingAddress}
                    address={shippingAddress}
                    />
                </div>
              )}
              {checkout.currentStep === 'shippingMethod' && (
                <ShippingMethod
                orderData={checkout.orderData}
                handleChange={onShippingMethodChange}
                selectedShippingMethod={selectedShippingMethod}
                />
              )}
              {checkout.currentStep === 'paymentMethod' && (
                <PaymentMethod billingAddress={billingAddress} setBillingAddress={setBillingAddress} />
                )}
              <CheckoutActions currentStep={checkout.currentStep} />
            </form>
          </div>
          <div className={`col-md-4`}>
            <Sidebar/>
          </div>
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = ({cart, checkout}) => ({cart, checkout})
function mapDispatchToProps(dispatch) {
  return {
      getCheckout: (cart) => dispatch(getCheckout(cart)),
      patchCheckout: (cart, attributes) => dispatch(patchCheckout(cart, attributes)),
      checkoutChangeStep: (step) => dispatch(checkoutChangeStep(step)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
