import { jsonapiClient } from '../../utils/api'
export const setDefaultVariation = (defaultVariation, variations) => ({
    type: 'SET_DEFAULT_VARIATION',
    defaultVariation,
    variations
});
export const selectVariation = variation => ({ type: 'SELECT_VARIATION', variation });

export const getProduct = (bundle, id) => {
  return async (dispatch) => {
    dispatch({type: 'GET_PRODUCT_LOADING'});
    const result = await jsonapiClient(process.env.REACT_APP_API_URL, 'product_single', {
      parameters: { bundle, id },
    })
    dispatch({type: 'GET_PRODUCT_SUCCESS', data: result});
  }
}
