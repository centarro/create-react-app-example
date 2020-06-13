import React, { Fragment } from 'react';

const CartSummary = ({ cart }) => {
  return (
    <Fragment>
      <dl className={`row text-right`}>
        <dt className="col-sm-6">Subtotal</dt>
        <dd className="col-sm-6">{cart.attributes.order_total.subtotal.formatted}</dd>
        {cart.attributes.order_total.adjustments.map(adjustment => (
          <Fragment key={adjustment.type}>
            <dt className="col-sm-6">{adjustment.label}</dt>
            <dd className="col-sm-6">{adjustment.amount.formatted}</dd>
          </Fragment>
        ))}
        <dt className="col-sm-6">Total</dt>
        <dd className="col-sm-6">{cart.attributes.order_total.total.formatted}</dd>
      </dl>
    </Fragment>
  )
}
export default CartSummary;
