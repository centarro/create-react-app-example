import { handleActions } from 'redux-actions';
import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux'

import cart from './cart';
import cartFlyout from './cartFlyout'
import productDisplay from './productDisplay'

const currentStore = handleActions({
  'SELECT_STORE': (state, { payload }) => {
    localStorage.setItem('currentStoreId', payload)

    return {
      ...state,
      id: payload
    }
  }
}, {
  id: localStorage.getItem('currentStoreId') || process.env.REACT_APP_STORE_UUID,
})

const navigationReducer = handleActions({
  '@@router/LOCATION_CHANGE': (state) => {
    window.scrollTo(0, 0);
    return ({
      ...state,
    })
  },
}, {})

const checkoutReducer = handleActions({
  '@@router/LOCATION_CHANGE': (state) => ({
    ...state,
    currentStep: 'customerInformation'
  }),
  'CHECKOUT_CHANGE_STEP': (state, { payload }) => ({
    ...state,
    currentStep: payload
  }),
  CHECKOUT_GET_SUCCEEDED: (state, { payload }) => {
    return {
      ...state,
      orderId: payload.cart.id,
      orderData: payload.cart,
      included: payload.included,
    }
  },
  CHECKOUT_UPDATE_SUCCEEDED: (state, { payload }) => {
    return {
      ...state,
      orderData: payload.cart,
      included: payload.included,
    }
  }
}, {
  orderId: null,
  orderData: null,
  included: [],
  currentStep: 'customerInformation'
})

export default history => combineReducers({
  router: connectRouter(history),
  cart,
  cartFlyout,
  navigation: navigationReducer,
  checkout: checkoutReducer,
  productDisplay,
  currentStore,
});
