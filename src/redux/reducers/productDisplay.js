import { getMappedIncludes } from '@centarro/js-sdk';
const INITIAL_STATE = {
  selectedVariation: null,
  error: null,
  isLoaded: false,
  data: [],
  included: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
      return {
        ...state,
        selectedVariation: null,
        error: null,
        isLoaded: false,
        data: [],
        included: []
      }
    case 'SET_DEFAULT_VARIATION':
      return { ...state, selectedVariation: action.defaultVariation }
    case 'SELECT_VARIATION':
      return { ...state, selectedVariation: action.variation }
    case 'GET_PRODUCT_SUCCESS':
      const { data, included } = action.data;
      const mappedIncludes = getMappedIncludes(included)
      const defaultVariationRelationship = data.relationships.variations.data[0];
      const defaultVariation = mappedIncludes[defaultVariationRelationship.type][defaultVariationRelationship.id]

      return {
        ...state,
        isLoaded: true,
        data: data,
        included: mappedIncludes,
        selectedVariation: defaultVariation
      }
    default:
      return state;
  }
}
