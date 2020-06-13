import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import { jsonapiClient } from '../../utils/api';
import {getMappedIncludes} from "@centarro/js-sdk";

class PaymentConfirmed extends PureComponent {
  state = {
    cart: null,
    included: null
  }
  componentDidMount() {
    jsonapiClient(process.env.REACT_APP_API_URL, 'fetch_cart')
    .then(data => {
      const { cart, included } = data;
      this.setState({
        cart,
        included: getMappedIncludes(included)
      })
    })
    .catch(err => {
      console.error(err)
    })
  }
  render() {
    if (this.state.cart === null) {
      return null;
    }
    return (
    <div className={`container-fluid`}>
        <div className={`container`}>
          <div className={`row`}>
            <div className={`col-md-6`}>
              <h2>Thanks for your order!</h2>
              <p>An email receipt has been sent to <em>{this.cart.attributes.email}</em></p>
            </div>
            <div className={`col-md-6`}>
            <table className={`table`}>
                <tbody>
                {this.cart.relationships.order_items.data.map(orderItemIdentifier => {
                  const orderItem = this.state.included[orderItemIdentifier.type][orderItemIdentifier.id];
                  return (
                    <tr key={orderItem.id}>
                      <td className="cart-block--offcanvas-cart-table__title w-50">
                        {orderItem.attributes.title}
                      </td>
                      <td className="cart-block--offcanvas-cart-table__price w-15">
                      {orderItem.attributes.total_price.formatted}
                      </td>
                    </tr>
                  )
                })}
                </tbody>
                <tfoot>
                <tr>
                  <td colSpan={2} className={``}>
                    <dl className={`row text-right`}>
                      <dt className="col-10">Subtotal</dt>
                      <dd className="col-2">{this.cart.attributes.order_total.subtotal.formatted}</dd>
                      {this.cart.attributes.order_total.adjustments.map(adjustment => (
                        <Fragment key={adjustment.type}>
                          <dt className="col-10">{adjustment.label}</dt>
                          <dd className="col-2">{adjustment.amount.formatted}</dd>
                        </Fragment>
                      ))}
                      <dt className="col-10">Total</dt>
                      <dd className="col-2">{this.cart.attributes.order_total.total.formatted}</dd>
                    </dl>
                  </td>
                </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
    </div>
    );
  }
}
const mapStateToProps = ({ cart }) => ({ cart });
export default connect(mapStateToProps)(PaymentConfirmed);
