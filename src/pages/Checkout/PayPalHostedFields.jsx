import React, { useEffect, useRef } from "react";
import { usePayPalScriptReducer } from '@paypal/react-paypal-js';

const HostedFields = (props) => {
  const [{ isLoaded, options }] = usePayPalScriptReducer();
  const containerRef = useRef(null);
  const fields = useRef(null);

  useEffect(() => {
    if (isLoaded) {
      fields.current = window.paypal.HostedFields.render({
        createOrder: function () {return "order-ID";},
        styles: {
          'input': {
            'color': '#3A3A3A',
            'transition': 'color 160ms linear',
            '-webkit-transition': 'color 160ms linear'
          },
          ':focus': {
            'color': '#333333'
          },
          '.invalid': {
            'color': '#FF0000'
          }
        },
        fields: {
          number: {
            selector: '#commerce-paypal-card-number',
            placeholder: 'Card Number',
          },
          cvv: {
            selector: '#commerce-paypal-cvv',
            placeholder: 'CVV',
          },
          expirationDate: {
            selector: '#commerce-paypal-expiration-date',
            placeholder: 'MM/YYYY'
          }
        }
       }).then((hf) => {

       });
    }
  }, [isLoaded]);

  return <div ref={containerRef} />
}

export default HostedFields;
