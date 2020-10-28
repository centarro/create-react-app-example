import React, { useState, useEffect } from 'react';
import ProductFeatured from '../../blocks/ProductFeatured/jsonapi'
import { jsonapiClient } from '../../utils/api'
import { getMappedIncludes } from '@centarro/js-sdk';
import { Helmet } from 'react-helmet';

const CatalogContainer = ({ term, categoryId }) => {
  const [catalogTerm, setCatalogTerm] = useState(null);

  useEffect(() => {
    async function fetchCatalog() {
      const { data } = await jsonapiClient(process.env.REACT_APP_API_URL, `/terms/product-categories/${categoryId}`)
      setCatalogTerm(data)
    }
    fetchCatalog()
  }, [categoryId]);

  if (catalogTerm === null) {
    return null;
  }

  return <div className={`container`}>
  <div className={`row`}>
    <Helmet>
      <title>{catalogTerm.attributes.name} | Commerce Demo</title>
    </Helmet>
    <JsonApiCatalog term={term} categoryId={categoryId} catalogTerm={catalogTerm} />
  </div>
</div>
}

const JsonApiCatalog = ({ term, categoryId }) => {
  const [state, setState] = useState({
    error: null,
    data: [],
    facets: [],
    included: [],
    isLoaded: false,
  });

  useEffect(() => {
    async function fetchProducts() {
      try {
        const result = await jsonapiClient(process.env.REACT_APP_API_URL, 'catalog_products', {
          parameters: {
            id: term.id
          }
        });
        const { data, included, meta } = result;
        setState({
          isLoaded: true,
          data,
          facets: meta.facets,
          included: included,
        });
      } catch (error) {
        console.log(error)
        setState({
          isLoaded: true,
          error,
          data: [],
          facets: [],
          included: []
        });
      }
    }
    fetchProducts();
  }, [categoryId]);
  const mappedIncludes = getMappedIncludes(state.included);
  return <>
        <aside className={`col-sm-3${state.isLoaded ? "" : " loading"}`}>
      {state.facets.map(facet => (
              <div className={`block-facets`} key={facet.id}>
              <h4 className={`block-title`}>{facet.label}</h4>
              <div className={`block-facet__content collapse show`}>
              {facet.terms.map(term => {
                return <div key={term.values.value} className={`form-check`} data-url={term.url}>
                  <input disabled className={`form-check-input`} type="checkbox" id={`${facet.id}-${term.values.value}`} defaultChecked={term.values.active} onChange={(e) => {}}/>
                  <label className={`form-check-label`} htmlFor={`${facet.id}-${term.values.value}`}>{term.values.label}</label>
                </div>
              })}
              </div>
            </div>
      ))}
    </aside>
    <section className={`col-sm-9`}>
      <div className={`container-fluid`}>
        <div className={`row`}>
          {state.data.map(entity => {
            return (
              <div className={`col-lg-4 col-md-6`} key={entity.id}>
                <ProductFeatured product={entity} included={mappedIncludes} />
              </div>
            )
          })}
        </div>
      </div>
    </section>
</>
}
export default CatalogContainer;
