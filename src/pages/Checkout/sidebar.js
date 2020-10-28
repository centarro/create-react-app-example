import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {getMappedIncludes, getRelationshipFromMappedIncludes} from "@centarro/js-sdk";
import CartSummary from "../../blocks/CartSummary";

const Sidebar = (props) => {
  const {checkout: { orderData, included } } = props
  console.log(orderData)
  if (orderData === null) {
    return <div key={`loading`}>Loading...</div>
  }
  const mappedIncludes = getMappedIncludes(included)
  return (
    <Fragment>
      <h3>Order summary</h3>
      <table className={`table`}>
        <tbody>
        {getRelationshipFromMappedIncludes(orderData,'order_items', mappedIncludes).map(orderItem => {
          const purchaseEntity = getRelationshipFromMappedIncludes(orderItem, 'purchased_entity', mappedIncludes)
          const product = getRelationshipFromMappedIncludes(purchaseEntity, 'product_id', mappedIncludes);
          return (
            <tr key={orderItem.id}>
              <td className="cart-block--offcanvas-cart-table__title w-50">
                <Link className={``} to={product.attributes.path.alias}>{orderItem.attributes.title}</Link>
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
            <CartSummary cart={orderData} />
          </td>
        </tr>
        </tfoot>
      </table>
    </Fragment>
  )
}
const mapStateToProps = ({cart, checkout}) => ({cart, checkout})
export default connect(mapStateToProps)(Sidebar);
