import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { cartRemove, cartUpdateItem } from '../redux/actions/cart'
import { cartFlyoutClose } from '../redux/actions/cartFlyout'
import { Link } from 'react-router-dom'
import { MdClose } from 'react-icons/md'
import { getMappedIncludes, getRelationshipFromMappedIncludes } from '@centarro/js-sdk'

const closeFlyout = (dispatch) => dispatch(cartFlyoutClose());

const CartFlyout = (props) => {
  const {
    dispatch,
    cart: {
      carts,
      included,
      itemCount
    },
    cartFlyout: { open }
  } = props;
  const mappedIncludes = getMappedIncludes(included);
  return (
    <Fragment>
      <aside id="cart-offcanvas" className={`cart-offcanvas is-${open ? 'open' : 'closed'} cart-offcanvas--right`}>
        <div className="cart--cart-offcanvas well well-lg well-primary text-light">
          <div className="cart--cart-offcanvas__close">
            <button type="button" className="button btn close-btn"><span className="visually-hidden"> Close cart</span></button>
          </div>
          {itemCount === 0 ? <div key={`empty`}>Your cart is empty</div> : [
            <div className={`cart-block--offcanvas-contents`} key={`contents`}>
              <div className={`cart-block--offcanvas-contents__inner`}>
                <h2>Shopping bag</h2>
                <div className={`cart-block--offcanvas-contents__items`}>
                  <table className={`cart-block--offcanvas-cart-table table`}>
                    <tbody>
                    {carts[0].relationships.order_items.data.map(rel => mappedIncludes[rel.type][rel.id]).map(orderItem => {
                      const purchaseEntity = getRelationshipFromMappedIncludes(orderItem, 'purchased_entity', mappedIncludes);
                      const product = getRelationshipFromMappedIncludes(purchaseEntity, 'product_id', mappedIncludes);
                      return (
                        <tr key={orderItem.id}>
                          <td className="cart-block--offcanvas-cart-table__title align-middle w-50">
                            <Link className={`text-light`} to={product.attributes.path.alias}>{orderItem.attributes.title}</Link>
                          </td>
                          <td className="cart-block--offcanvas-cart-table__quantity align-middle w-25">
                            <input className="form-control invert" type={`number`} min={0} value={parseInt(orderItem.attributes.quantity)} onChange={e => {
                              dispatch(cartUpdateItem(orderItem, e.target.value))
                            }}/>
                          </td>
                          <td className="cart-block--offcanvas-cart-table__price align-middle text-light">
                            {orderItem.attributes.total_price.formatted}
                          </td>
                          <td className="cart-block--offcanvas-cart-table__remove align-middle">
                            <button className="btn btn-link text-light" onClick={() => { dispatch(cartRemove(orderItem)) }}><MdClose/></button>
                          </td>
                        </tr>
                      )
                    })}
                    </tbody>
                    <tfoot>
                    {/* <tr>
                      <td className={`text-right`} colSpan={4}>
                        <button type="submit" className="cart-block--offcanvas-contents__update btn btn-link text-light">Update quantities</button>
                      </td>
                    </tr> */}
                    </tfoot>
                  </table>
                </div>
                <div className="cart-block--offcanvas-contents__links text-center">
                  <Link to="/cart" className={`btn w-100 btn-outline-light`}>View cart</Link>
                </div>
                <div className="cart--cart-offcanvas__close d-md-none text-center">
                  <button type="button" onClick={() => closeFlyout(dispatch)} className="btn text-light btn-link">Continue shopping</button>
                </div>
              </div>
            </div>
          ]}
        </div>
      </aside>
      <div id="cart-offcanvas-bg" className={`cart-offcanvas-bg is-${open ? 'open' : 'closed'}`} onClick={() => closeFlyout(dispatch)}/>
    </Fragment>
  )
}
const mapStateToProps = ({ cart, cartFlyout }) => ({ cart, cartFlyout });
export default connect(mapStateToProps)(CartFlyout);
