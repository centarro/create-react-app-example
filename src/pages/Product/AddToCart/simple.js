import React from 'react'
import PropTypes from 'prop-types';
import { cartAdd } from '../../../redux/actions/cart'
import { connect } from 'react-redux'

const Simple = ({ selectedVariation, addToCart, disabled = false }) => {
  return (
    <div className={`field--name-variations`} key={selectedVariation.id}>
      <div className={`field--item`}>
        <button className="button button--primary js-form-submit form-submit btn-success btn" type="button" onClick={() => { addToCart(selectedVariation) }} disabled={disabled}>
          Add to cart
        </button>
      </div>
    </div>
  )
}
Simple.propTypes = {
  selectedVariation: PropTypes.object.isRequired,
  addToCart: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}
function mapDispatchToProps(dispatch) {
  return {
      addToCart: (variation) => dispatch(cartAdd(variation)),
  }
}
export default connect(null, mapDispatchToProps)(Simple);
