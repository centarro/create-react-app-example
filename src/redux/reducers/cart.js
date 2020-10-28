import { handleActions } from 'redux-actions';

export default handleActions({
  SET_CART_TOKEN: (state, { payload }) => {
    localStorage.setItem('cartToken', payload)
    return ({
      ...state,
      cartToken: payload
    })
  },
  CART_FETCH_STARTED: (state, { payload }) => {
    return {
      ...state,
      loading: true,
    };
  },
  CART_FETCH_SUCCEEDED: (state, { payload }) => {
    const { cart, included } = payload;
    return {
      ...state,
      carts: cart ? [cart] : [],
      included: included ? included : [],
      itemCount: included ? included
      .filter(item => item.type.indexOf('order-item--') === 0)
      .reduce((previousValue, currentValue) => {
        return previousValue + parseInt(currentValue.attributes.quantity)
      }, 0) : 0
    }
  },
  CART_FETCH_FAILED: (state, { payload }) => {
    console.log(payload);
    return state;
  },
  CART_FETCH_ENDED: (state, { payload }) => {
    return {
      ...state,
      loading: false,
    };
  },
  CART_ADD_STARTED: (state, { payload }) => {
    return {
      ...state,
      loading: true,
    };
  },
  CART_ADD_SUCCEEDED: (state, { payload }) => {
    const { cart, included } = payload;
    return {
      ...state,
      carts: [cart],
      included,
      itemCount: included ? included
      .filter(item => item.type.indexOf('order-item--') === 0)
      .reduce((previousValue, currentValue) => {
        return previousValue + parseInt(currentValue.attributes.quantity)
      }, 0) : 0
    }
  },
  CART_ADD_ENDED: (state, { payload }) => {
    return {
      ...state,
      loading: false,
    };
  },
  CART_ADD_FAILED: (state, { payload }) => {
    // @todo get the error from the error payload.
    alert('Sorry, the product could not be added to the cart.')
    return state;
  },
  CART_UPDATE_ITEM_STARTED: state => {
    return {
      ...state,
      loading: true,
    }
  },
  CART_UPDATE_ITEM_SUCCEEDED: (state, { payload }) => {
    const { cart, included } = payload;
    return {
      ...state,
      carts: [cart],
      included,
      itemCount: payload.included ? payload.included
      .filter(item => item.type.indexOf('order-item--') === 0)
      .reduce((previousValue, currentValue) => {
        return previousValue + parseInt(currentValue.attributes.quantity)
      }, 0) : 0
    }
  },
  CART_UPDATE_ITEM_ENDED: (state, { payload }) => {
    return {
      ...state,
      loading: false,
    };
  },
  CART_UPDATE_ITEM_FAILED: (state, { payload }) => {
    console.log(payload);
    return state;
  },
  CART_ADD_COUPON_STARTED: (state, { payload }) => {
    return {
      ...state,
      errorMessage: null,
    }
  },
  CART_ADD_COUPON_SUCCEEDED: (state, { payload }) => {
    if (payload.errors) {
      const error = payload.errors[0];
      if (error.status === "400") {
        return {
          ...state,
          errorMessage: 'You must provide a promotional code',
        }
      }
      else if (error.status === "422") {
        const errorMessage = error.detail.includes('coupons.0.target_id: ') ?
        error.detail.substr("coupons.0.target_id: ".length) :
        error.detail;
        return {
          ...state,
          errorMessage
        }
      }
      else {
        return {
          ...state,
          errorMessage: 'Unknown error, try again.',
        }
      }
    }
    return state;
  },
}, {
  loading: false,
  cartToken: null,
  carts: [],
  included: [],
  itemCount: 0,
  errorMessage: null,
})
