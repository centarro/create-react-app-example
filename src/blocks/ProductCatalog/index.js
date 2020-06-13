import React from 'react';
import {Link} from "react-router-dom";

export default (props) => {
  const defaultVariation = props.product.queryVariations.entities[0];
  return (
    <div className={`commerce-product--catalog`}>
      <div className={`commerce-product--catalog__info`}>
        <div className={`field--name-title`}>
          <Link to={`/product/${props.product.entityId}`}>{props.product.entityLabel}</Link>
        </div>
        <div className={`field--name-price`}>{defaultVariation.price.formatted}</div>
      </div>
    </div>
  )
}
