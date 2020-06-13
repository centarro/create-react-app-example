import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { cartRemove, cartUpdateItem } from '../../redux/actions/cart'
import PromotionCode from './promotionCode'
import PayPalCheckout from './PayPalCheckout';
import {getMappedIncludes, getRelationshipFromMappedIncludes} from "@centarro/js-sdk";
import CartSummary from "../../blocks/CartSummary";

const CartPage = ({ cart: { carts, included, cartToken }, dispatch, history }) => {
  if (carts.length === 0) {
    return (<div className={`container`} key={`no_items`}>
      <div className={`row`}>
        <div className={`col-sm-12`}><p>No items in your cart</p></div>
    </div>
  </div>)
  }
  const mappedIncludes = getMappedIncludes(included)
  return (
    <Fragment>
      {carts.map(cart => {
        const orderItemsRelationship = cart.relationships.order_items
        if (!orderItemsRelationship.data || orderItemsRelationship.data.length === 0) {
          return (<div className={`container`} key={`no_items`}>
            <div className={`row`}>
              <div className={`col-sm-12`}><p>No items in your cart</p></div>
          </div>
        </div>)
        }
        const cartItems = getRelationshipFromMappedIncludes(cart,'order_items', mappedIncludes)
        return (
          <div key={cart.id} className={`container`}>
          <div className={`row`}>
            <div className={`col-sm-8`}>
              <table className={`table my-4`}>
                <tbody>
                {cartItems.map(orderItem => {
                  const purchaseEntity = getRelationshipFromMappedIncludes(orderItem, 'purchased_entity', mappedIncludes)
                  return (
                    <tr key={orderItem.id}>
                      <td className="cart-block--offcanvas-cart-table__title w-50">
                        <Link className={``} to={`/product/${purchaseEntity.relationships.product_id.data.id}`}>{orderItem.attributes.title}</Link>
                      </td>
                      <td className="cart-block--offcanvas-cart-table__quantity">
                        <input className="form-control" type={`number`} size={5} min={0} defaultValue={parseInt(orderItem.attributes.quantity)} onChange={e => {
                              dispatch(cartUpdateItem(orderItem, e.target.value))
                            }}/>
                      </td>
                      <td className="cart-block--offcanvas-cart-table__price w-15">
                      {orderItem.attributes.total_price.formatted}
                      </td>
                      <td className="cart-block--offcanvas-cart-table__remove text-right">
                        <button className="btn btn-primary" onClick={() => { dispatch(cartRemove(orderItem)) }}>Remove</button>
                      </td>
                    </tr>
                  )
                })}
                </tbody>
                <tfoot>
                <tr>
                  <td colSpan={3} />
                  <td className={``}>
                    <CartSummary cart={cart} />
                  </td>
                </tr>
                </tfoot>
              </table>
              <div className={`col-md-7`}>
                <div className={`well`}>
                  <PromotionCode/>
                </div>
              </div>
            </div>
            <div className={`col-sm-4 text-right my-4`}>
            <PayPalCheckout cart={cart} cartToken={cartToken} history={history} />
            </div>
          </div>
          <div className={`row`}>
            <div className={`col-md-12`}>
              <div className="mt-5 btn-group">
                <Link to={`/checkout-iframe/${cart.id}`} className={`btn btn-primary`}>Checkout (iframe)</Link>
                <Link to={`/checkout/${cart.id}`} className={`btn btn-warning`}>Checkout (onsite)</Link>
                <a href={`${process.env.REACT_APP_API_URL}/checkout/${cart.id}?cartToken=${cartToken}`} className={`btn btn-light`}>Checkout (offsite)</a>
              </div>

            </div>
          </div>
        </div>
        )
      })}
    </Fragment>
  )
};

const mapStateToProps = ({ cart }) => ({ cart });
export default connect(mapStateToProps)(CartPage);
