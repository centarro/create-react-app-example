import React from 'react'
import VariationsAddToCart from './AddToCart/variations'
import SimpleAddToCart from './AddToCart/simple'
import { Helmet } from 'react-helmet';
import { getRelationshipFromMappedIncludes } from '@centarro/js-sdk';

const Product = ({ data, included, selectedVariation }) => {
    const variations = data.relationships.variations.data;

    const variationImageRelationship = selectedVariation.relationships.images.data[0];
    const variationImage = included[variationImageRelationship.type][variationImageRelationship.id]

    const productBrand = getRelationshipFromMappedIncludes(data, 'brand', included);

    const productCategories = getRelationshipFromMappedIncludes(data, 'product_categories', included) || [];
    const specialCategories = getRelationshipFromMappedIncludes(data, 'special_categories', included) || [];

    const stores = data.relationships.stores.data.map(rel => rel.id);
    const isPurchasable = !stores.includes(localStorage.getItem('currentStoreId') || process.env.REACT_APP_STORE_UUID);

    return (
      <div className={`container-fluid`}>
        <Helmet>
          <title>{data.attributes.title} | Commerce Demo</title>
        </Helmet>
        <div className={`container commerce-product--full`}>
          <div className={`row`}>
              <div className={`col-md-6`}>
                <img src={variationImage.attributes.uri.url} width={variationImageRelationship.meta.width} height={variationImageRelationship.meta.height} alt={variationImageRelationship.meta.alt} className={`img-fluid`} />
              </div>
              <div className={`col-md-6`}>
                <div className={`commerce-product__contents`}>
                  <div className={`field--name-title`}>{data.attributes.title}</div>
                  <div className={`field--name-price`}>{selectedVariation.attributes.resolved_price.formatted}</div>
                  <p className={`font-weight-leight small badge badge-secondary`}>{selectedVariation.attributes.sku}</p>
                  <div className="field--name-field-brand">{productBrand.attributes.name}</div>
                  <div className={`field--name-body`}>
                    <div dangerouslySetInnerHTML={{__html: data.attributes.body.processed}}/>
                  </div>
                  {variations.length === 1 ?
                  <SimpleAddToCart selectedVariation={selectedVariation} key="simple" disabled={isPurchasable}/> :
                  <VariationsAddToCart variations={variations.map(rel => included[rel.type][rel.id])} selectedVariation={selectedVariation} included={included} key="variations" disabled={isPurchasable}/>}
                  <div className={`field--name-field-product-categories d-inline-flex mb-3 mr-5`}>
                    {productCategories.map(category => (
                      <div key={category.id}>{category.attributes.name}</div>
                    ))}
                  </div>
                  <div className={`field--name-field-special-categories d-inline-flex mb-3`}>
                    {specialCategories.map(category => (
                      <div key={category.id}>{category.attributes.name}</div>
                    ))}
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    )
}

export default Product
