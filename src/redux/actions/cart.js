import { createAction } from 'redux-actions'
import { createActionThunk } from 'redux-thunk-actions'
import { jsonapiClient } from '../../utils/api'

export const setCartToken = createAction(('SET_CART_TOKEN'))
export const cartFetch = createActionThunk('CART_FETCH', async (store) => {
  const { cart: {cartToken} } = store.getState();
  return await jsonapiClient(process.env.REACT_APP_API_URL, 'carts', {
    parameters: {
      cartToken
    }
  });
})
export const cartAdd = createActionThunk('CART_ADD', async (variation, store) => {
  const { cart: {cartToken} } = store.getState();
  return await jsonapiClient(process.env.REACT_APP_API_URL, 'add_to_cart', {
    parameters: {
      cartToken,
      purchasedEntity: variation,
      quantity: 1
    }
  });
}, true)
export const cartRemove = createActionThunk('CART_REMOVE', async (orderItem, store) => {
  const { cart: {cartToken} } = store.getState();
  await jsonapiClient(process.env.REACT_APP_API_URL, 'remove_cart_item', {
    parameters: {
      cartToken,
      orderItem,
    }
  })
  store.dispatch(cartFetch());
})
export const cartUpdateItem = createActionThunk('CART_UPDATE_ITEM', async (orderItem, quantity, store) => {
  const { cart: {cartToken} } = store.getState();
  return await jsonapiClient(process.env.REACT_APP_API_URL, 'update_cart_item', {
    parameters: {
      cartToken,
      orderItem: orderItem,
      quantity,
    }
  })
})
export const checkoutChangeStep = createAction('CHECKOUT_CHANGE_STEP');

export const cartAddCoupon = createActionThunk('CART_ADD_COUPON', async (cartId, couponCode, store) => {
  const { cart: {cartToken} } = store.getState();
  const res = await fetch(`${process.env.REACT_APP_API_URL}/jsonapi/carts/${cartId}/coupons`, {
    method: 'PATCH',
    headers: {
      'Commerce-Cart-Token': cartToken,
      'Commerce-Current-Store': process.env.REACT_APP_STORE_UUID,
      'Content-Type': 'application/vnd.api+json',
      'Accept': 'application/vnd.api+json',
    },
    body: JSON.stringify({
      data: [{
        type: 'promotion-coupon',
        id: couponCode
      }]
    })
  })
  store.dispatch(cartFetch())
  return res.json();
})
