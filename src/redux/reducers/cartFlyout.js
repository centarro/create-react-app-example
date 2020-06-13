import { handleActions } from 'redux-actions';
export default handleActions({
  'CART_ADD_SUCCEEDED': (state) => ({
    ...state,
    open: true,
  }),
  CART_FLYOUT_OPEN: (state) => ({
    ...state,
    open: true,
  }),
  CART_FLYOUT_CLOSE: (state) => ({
    ...state,
    open: false,
  }),
  '@@router/LOCATION_CHANGE': (state) => ({
    ...state,
    open: false,
  }),
}, {
  open: true,
})
