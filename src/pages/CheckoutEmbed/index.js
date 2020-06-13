import React from 'react';
import { connect } from 'react-redux'

const CheckoutEmbed = (props) => {
  const { cart: { carts, cartToken } } = props
  if (carts.length === 0) {
    return null;
  }
  const cart = carts[0]
  return (
    <div className={`container-fluid`}>
      <div className={`container`}>
        <div className={`row`}>
          <div className={`col-md-12`}>
            <iframe
            title={`Embedded checkout`}
            src={`${process.env.REACT_APP_API_URL}/checkout/${cart.id}?cartToken=${cartToken}`}
            frameBorder={0}
            style={{
              width: '100%',
              height: '100vh',
            }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = ({ cart }) => ({ cart })
export default connect(mapStateToProps)(CheckoutEmbed);
