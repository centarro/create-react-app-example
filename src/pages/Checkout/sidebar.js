import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {getMappedIncludes, getRelationshipFromMappedIncludes} from "@centarro/js-sdk";
import CartSummary from "../../blocks/CartSummary";

const Sidebar = (props) => {
  const {cart: {carts, included}} = props
  if (carts.length === 0) {
    return <div key={`loading`}>Loading...</div>
  }
  const cart = carts[0]
  const mappedIncludes = getMappedIncludes(included)

  return (
    <Fragment>
      <h3>Order summary</h3>
      <table className={`table`}>
        <tbody>
        {getRelationshipFromMappedIncludes(cart,'order_items', mappedIncludes).map(orderItem => {
          const purchaseEntity = getRelationshipFromMappedIncludes(orderItem, 'purchased_entity', mappedIncludes)
          return (
            <tr key={orderItem.id}>
              <td className="cart-block--offcanvas-cart-table__title w-50">
                <Link className={``} to={`/product/purchaseEntity.relationships.product_id.data.type.split('--').pop()}/${purchaseEntity.relationships.product_id.data.id}`}>{orderItem.attributes.title}</Link>
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
          <td colSpan={2}>
            <CartSummary cart={cart} />
          </td>
        </tr>
        </tfoot>
      </table>
    </Fragment>
  )
}
const mapStateToProps = ({cart}) => ({cart})
export default connect(mapStateToProps)(Sidebar);
