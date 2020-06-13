import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { cartFetch, cartAddCoupon } from '../../redux/actions/cart'

class PromotionCode extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      message: null,
      couponCode: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  async handleRemove() {
    const {cart: {cartToken, carts}, dispatch} = this.props
    const cart = carts[0]

    await fetch(`${process.env.REACT_APP_API_URL}/jsonapi/carts/${cart.id}/coupons`, {
      method: 'DELETE',
      headers: {
        'Commerce-Cart-Token': cartToken,
        'Commerce-Current-Store': process.env.REACT_APP_STORE_UUID,
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json',
      },
    })
    dispatch(cartFetch())
  }

  handleChange (event) {
    this.setState({
      couponCode: event.target.value
    })
  }

  async handleSubmit (event) {
    event.preventDefault()
    const {cart: {carts}, dispatch} = this.props
    const cart = carts[0]
    dispatch(cartAddCoupon(cart.id, this.state.couponCode))
  }

  render () {
    const {cart: {carts}} = this.props
    const cart = carts[0]
    if (cart.relationships.coupons.data && cart.relationships.coupons.data.length > 0) {
      return (
        <div className={`row`} key={`applied`}>
          <div className={`col-md-8`}>
            <div key={`message`} className={`alert alert-primary mb-0`}>Promotion applied!</div>
          </div>
          <div className={`col-md-4`}>
            <button type={`submit`} className={`btn btn-primary`} onClick={this.handleRemove}>Remove</button>
          </div>
        </div>
      )
    }

    return (
      <form onSubmit={this.handleSubmit}>
        {this.props.cart.errorMessage !== null ? [
          <div key={`message`} className={`alert alert-warning`}>{this.props.cart.errorMessage}</div>
        ] : null}
        <div className={`form-row`}>
          <div className={`col`}>
            <input type={`text`} className={`form-control`} placeholder={`Have a promotional code?`}
                   value={this.state.couponCode} onChange={this.handleChange}/>
          </div>
          <button type={`submit`} className={`btn btn-primary`}>Apply</button>
        </div>
        <div>
          <small>Try using the <strong>FIFTEENPERCENT</strong> promotion code.</small>
        </div>
      </form>
    )
  }
}

const mapStateToProps = ({cart}) => ({cart})
export default connect(mapStateToProps)(PromotionCode)
