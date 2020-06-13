import { createAction } from 'redux-actions'
import { createActionThunk } from 'redux-thunk-actions'
import {jsonapiClient} from "../../utils/api";

export const checkoutChangeStep = createAction('CHECKOUT_CHANGE_STEP');
export const getCheckout = createActionThunk('CHECKOUT_GET', async (cart, store) => {
  const { cart: {cartToken} } = store.getState();
  return await jsonapiClient(process.env.REACT_APP_API_URL, 'get_checkout', {
    parameters: {
      cartToken,
      cart
    }
  });
})
export const patchCheckout = createActionThunk('CHECKOUT_UPDATE', async (cart, attributes, store) => {
  const { cart: {cartToken} } = store.getState();
  return await jsonapiClient(process.env.REACT_APP_API_URL, 'patch_checkout', {
    parameters: {
      cartToken,
      cart,
      attributes
    }
  })
})
