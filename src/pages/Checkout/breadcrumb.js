import React from 'react';
import { Link } from 'react-router-dom'

export default (props) => (
  <nav aria-label="breadcrumb">
    <ol className="breadcrumb small">
      <li className={`breadcrumb-item`}><Link to={`/cart`}>Cart</Link></li>
      <li className={`breadcrumb-item ${props.activeStep === 'customerInformation' ? `active`: null}`}>Customer information</li>
      <li className={`breadcrumb-item ${props.activeStep === 'shippingMethod' ? `active`: null}`}>Shipping method</li>
      <li className={`breadcrumb-item ${props.activeStep === 'paymentMethod' ? `active`: null}`}>Payment method</li>
    </ol>
  </nav>
)