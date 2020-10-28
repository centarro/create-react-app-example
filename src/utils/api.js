import {HttpClient} from '@centarro/js-sdk'

/**
 * An async helper function for making requests to a Drupal backend.
 *
 * @param {string} REACT_APP_API_URL
 *  The base url of the backend (Drupal)
 * @param {string} endpoint
 *  The name of the end point you want to use.
 * @param {Object} [settings={}]
 *  Optional settings.
 * @param {Object} [settings.parameters={}]
 *  Route string construction parameters.
 * @param {Object} [settings.options={}]
 *  HTTP request options.
 * @return {Promise}
 *  Result of the fetch operation.
 */
export async function jsonapiClient(
  REACT_APP_API_URL,
  endpoint,
  {parameters = {}, options = {}} = {},
) {
  options.headers = options.headers || {};
  const httpClient = new HttpClient(
    REACT_APP_API_URL,
    '/jsonapi',
    parameters.cartToken || undefined,
    localStorage.getItem('currentStoreId') || process.env.REACT_APP_STORE_UUID
  );

  switch (endpoint) {
    case 'carts':
    case 'fetch_cart':
      return await httpClient.getCart({
        'product--simple': ['path'],
        'product--clothing': ['path'],
        'product-variation--simple': ['product_id'],
        'product-variation--clothing': ['product_id'],
        'order-item--product-variation': ['title', 'quantity', 'unit_price', 'total_price', 'purchased_entity', 'order_id'],
        'order--physical': ['email', 'billing_information', 'shipping_information', 'total_price', 'order_total', 'coupons', 'order_items']
      }, ['order_items.purchased_entity.product_id']);

    case 'add_to_cart':
      return await httpClient.addToCart(parameters.purchasedEntity, parameters.quantity || 1, {
        'product--simple': ['path'],
        'product--clothing': ['path'],
        'product-variation--simple': ['product_id'],
        'product-variation--clothing': ['product_id'],
        'order-item--product-variation': ['title', 'quantity', 'unit_price', 'total_price', 'purchased_entity', 'order_id'],
        'order--physical': ['email', 'billing_information', 'shipping_information', 'total_price', 'order_total', 'coupons', 'order_items']
      }, ['order_id.order_items.purchased_entity.product_id'])

    case 'update_cart_item':
      return await httpClient.updateCartItem(parameters.orderItem, parameters.quantity, {
        'product--simple': ['path'],
        'product--clothing': ['path'],
        'product-variation--simple': ['product_id'],
        'product-variation--clothing': ['product_id'],
        'order-item--product-variation': ['title', 'quantity', 'unit_price', 'total_price', 'purchased_entity', 'order_id'],
        'order--physical': ['total_price', 'order_total', 'coupons', 'order_items'],
      }, ['order_id', 'order_id.order_items', 'order_id.order_items.purchased_entity', 'order_id.order_items.purchased_entity.product_id'])

    case 'remove_cart_item':
      return await httpClient.removeCartItem(parameters.orderItem)

    case 'add_promotional_code':
      // url = `/jsonapi/carts/${parameters.cartId}/coupons`
      break;

    case 'content':
      return await httpClient.request('/node')

    case 'content_single':
      return await httpClient.request(`/node/${parameters.bundle}/${parameters.id}`);

    case 'taxonomy_term':
      return await httpClient.request(`/taxonomy_term/${parameters.type}`);

    case 'menu':
      return await httpClient.request(`/menu_items/main`);

    case 'featured_products':
      return await httpClient.request(`/products/simple`, {
        includes: ['variations', 'variations.images'],
        fields: {
          'product--simple': ['title', 'variations', 'path'],
          'product-variation--simple': ['resolved_price', 'prices', 'images'],
          'product--clothing': ['title', 'variations', 'path'],
          'product-variation--clothing': ['resolved_price', 'prices', 'images'],
          'file--file': ['uri'],
        },
        filter: {
          'special_categories.entity.name': 'Featured'
        },
        page: {
          limit: 6
        },
        sort: ['-changed']
      });

    case 'catalog_products':
      return await httpClient.request(`/products`, {
        includes: ['variations', 'variations.images'],
        fields: {
          'product--simple': ['title', 'variations', 'path'],
          'product-variation--simple': ['resolved_price', 'prices', 'images'],
          'product--clothing': ['title', 'variations', 'path'],
          'product-variation--clothing': ['resolved_price', 'prices', 'images'],
          'file--file': ['uri'],
        },
        filter: {
          'product_categories.id': parameters.id
        },
        page: {
          limit: 6
        },
        sort: ['title']
      });

    case 'product_single':
      const queryInclude = ['variations', 'variations.images', 'special_categories', 'product_categories', 'brand'];
      const queryVariationFields = ['sku', 'price', 'resolved_price', 'images'];
      if (parameters.bundle === 'clothing') {
        queryInclude.push('variations.attribute_color', 'variations.attribute_size')
        queryVariationFields.push('attribute_color', 'attribute_size');
      }
      const productFieldsKey = `fields[product--${parameters.bundle}]`;
      const variationFieldsKey = `product-variation--${parameters.bundle}`
      return await httpClient.request(`/products/${parameters.bundle}/${parameters.id}`, {
        fields: {
          'taxonomy_term--product_categories': ['name'],
          'taxonomy_term--special_categories': ['name'],
          'taxonomy_term--brands': ['name'],
          'file--file': ['uri'],
          [productFieldsKey]: ['title', 'body', 'variations', 'special_categories', 'product_categories', 'brand', 'stores', 'metatag'],
          [variationFieldsKey]: queryVariationFields
        },
        includes: queryInclude
      })

    case 'get_checkout':
      return await httpClient.getCheckout(parameters.cart, {
        'product--simple': ['path'],
        'product--clothing': ['path'],
        'product-variation--simple': ['product_id'],
        'product-variation--clothing': ['product_id'],
        'order-item--product-variation': ['title', 'quantity', 'unit_price', 'total_price', 'purchased_entity', 'order_id'],
      }, ['order_items', 'order_items.purchased_entity', 'order_items.purchased_entity.product_id'])

    case 'patch_checkout':
      return await httpClient.patchCheckout(parameters.cart, parameters.attributes, {
        'product--simple': ['path'],
        'product--clothing': ['path'],
        'product-variation--simple': ['product_id'],
        'product-variation--clothing': ['product_id'],
        'order-item--product-variation': ['title', 'quantity', 'unit_price', 'total_price', 'purchased_entity', 'order_id'],
      }, ['order_items', 'order_items.purchased_entity', 'order_items.purchased_entity.product_id'])

    default:
      return await httpClient.request(endpoint)
  }

}

export async function oauthToken(username, password, cartToken) {
  const baseUri = '/oauth/token'
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Commerce-Cart-Token': cartToken,
    },
    body: {
      grant_type: 'password',
      client_id: process.env.REACT_APP_OAUTH2_CLIENT,
      username: username,
      password: password,
    }
  };
  return await fetch(baseUri, options).then(res => {
    return res.json();
  });
}
