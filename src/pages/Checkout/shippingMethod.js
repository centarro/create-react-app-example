import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const ShippingMethod = ({orderData, selectedShippingMethod, handleChange}) => {
  const shippingMethods = orderData.meta.shipping_rates;
    return (
      <Fragment>
        <h3>Shipping method</h3>
        {shippingMethods.map(shippingMethod => (
          <div key={shippingMethod.id} className={`form-check mb-4`}>
            <input
            className={`form-check-input`}
            type="radio"
            name="shipping_method"
            value={shippingMethod.id}
            id={shippingMethod.id}
            checked={shippingMethod.id === selectedShippingMethod}
            onChange={handleChange}
            />
            <label className={`form-check-label`} htmlFor={shippingMethod.id}><strong>{shippingMethod.service.label}</strong>: {shippingMethod.amount.formatted}<br />{shippingMethod.description}</label>
          </div>
        ))}
      </Fragment>
    )
}
ShippingMethod.propTypes = {
  orderData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  selectedShippingMethod: PropTypes.string.isRequired,
}
export default ShippingMethod;
