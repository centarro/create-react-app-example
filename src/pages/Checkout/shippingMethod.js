import React, { Fragment } from 'react'

const ShippingMethod = ({orderData}) => {
  const shippingMethods = orderData.meta.shipping_rates;
    return (
      <Fragment>
        <h3>Shipping method</h3>
        {shippingMethods.map(shippingMethod => (
          <div>
            <p>{shippingMethod.label} @ {shippingMethod.amount.number}</p>
          </div>
        ))}
      </Fragment>
    )
}
export default ShippingMethod;
