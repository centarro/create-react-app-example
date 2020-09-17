import React, { useState, useEffect } from 'react';
import ProductFeatured from '../../blocks/ProductFeatured/jsonapi'
import { jsonapiClient } from '../../utils/api'
import { getMappedIncludes } from '@centarro/js-sdk';

const JsonApiCatalog = ({ categoryId }) => {
  const [state, setState] = useState({
    error: null,
    isLoaded: false,
    data: [],
    included: []
  });

  useEffect(() => {
    async function fetchProducts() {
      try {
        const result = await jsonapiClient(process.env.REACT_APP_API_URL, 'catalog_products', {
          parameters: {
            id: categoryId
          }
        });
        const { data, included } = result;
        setState({
          isLoaded: true,
          data: data,
          included: getMappedIncludes(included)
        });
      } catch (error) {
        setState({
          isLoaded: true,
          error
        });
      }
    }
    fetchProducts();
  }, [categoryId]);

  return <div className={`container`}>
  <div className={`row`}>
    {/* <aside className={`col-sm-3`}>
      <div className={`block-facets`}>
        <h3 className={`block-title`}>Brand</h3>
        <div className={`block-facet__content collapse show`}>
          <div className={`facets-widget-checkbox`}>
          </div>
        </div>
      </div>
      <div className={`block-facets`}>
        <h3 className={`block-title`}>Categories</h3>
        <div className={`block-facet__content collapse show`}>
          <div className={`facets-widget-checkbox`}>
          </div>
        </div>
      </div>
      <div className={`block-facets`}>
        <h3 className={`block-title`}>Special Categories</h3>
        <div className={`block-facet__content collapse show`}>
          <div className={`facets-widget-checkbox`}>
          </div>
        </div>
      </div>
    </aside> */}
    <section>
      <div className={`container-fluid`}>
        <div className={`row`}>
          {state.data.map(entity => {
            return (
              <div className={`col-lg-4 col-md-6`} key={entity.id}>
                <ProductFeatured product={entity} included={state.included} />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  </div>
</div>
}
export default JsonApiCatalog;
