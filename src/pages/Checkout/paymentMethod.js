import React, { Fragment, PureComponent } from 'react'
import { connect } from 'react-redux'

class PaymentMethod extends PureComponent {
  render () {
    if (this.props.checkout.currentStep !== 'paymentMethod') {
      return null;
    }
    // const {cart: {carts}, dispatch } = this.props
    // const cart = carts[0]
    return (
      <Fragment>
        <h3>Payment method</h3>
        {/* <div className={`d-flex justify-content-between align-items-center mt-2`}>
          <button className={`btn btn-link`} onClick={() => dispatch(checkoutChangeStep('shippingMethod'))}>Back</button>
          <button className={`btn btn-primary`}>Complete checkout</button>
        </div> */}
      </Fragment>
    )
  }
}
const mapStateToProps = ({cart, checkout}) => ({cart, checkout})
export default connect(mapStateToProps)(PaymentMethod);
