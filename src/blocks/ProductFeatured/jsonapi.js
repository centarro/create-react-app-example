import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { getRelationshipFromMappedIncludes} from '@centarro/js-sdk'
import { FaEye } from 'react-icons/fa';

const ProductFeatured = (props) => {
  const { product, included } = props;
  const defaultVariation = getRelationshipFromMappedIncludes(product, 'variations', included)[0]
  const variationImageRelationship = defaultVariation.relationships.images.data[0];
  const variationImage = included[variationImageRelationship.type][variationImageRelationship.id];
  const Url = product.attributes.path.alias;

  return (
      <div className={`commerce-product--catalog`}>
        <div className={`commerce-product--catalog__image`}>
          <Link to={Url}>
            <img src={variationImage.attributes.uri.url} width={variationImageRelationship.meta.width} height={variationImageRelationship.meta.height} alt={variationImageRelationship.meta.alt} className={`img-fluid`} />
          </Link>
          <Link to={Url} className="commerce-product--catalog__hover-text"><FaEye size={32} /><span className="mt-2">View product</span></Link>
        </div>
        <div className={`commerce-product--catalog__info`}>
          <div className={`field--name-title`}>
            <Link to={Url}>{product.attributes.title}</Link>
          </div>
          <div className={`field--name-price`}>{defaultVariation.attributes.resolved_price.formatted}</div>
        </div>
      </div>
  )
}
ProductFeatured.propTypes = {
  product: PropTypes.object.isRequired,
  included: PropTypes.object.isRequired,
}
export default ProductFeatured;
