import React, { useEffect, useState } from 'react';
import Catalog from './Catalog/jsonapi';
import Product from './Product/productDisplayContainer';

const PageFactory = ({ location: { pathname }}) => {
  const [page, setPage] = useState(null);

  useEffect(() => {
    async function decoupledRouter() {
      const decoupledRouterRequest = await fetch(`${process.env.REACT_APP_API_URL}/router/translate-path?path=${pathname}&_format=json`);
      const routerData = await decoupledRouterRequest.json();
      setPage(routerData);
    }
    decoupledRouter();
  }, [pathname]);

  if (page === null) {
    return null;
  }
  if (page.details && page.details === "None of the available methods were able to find a match for this path.") {
    return <p>Not found</p>
  }
  if (page.jsonapi.resourceName === "term--product-categories") {
    return <Catalog term={page.entity} categoryId={page.entity.uuid}  />
  }
  if (page.jsonapi.resourceName.indexOf('product--') === 0) {
    return <Product productType={page.jsonapi.resourceName.split('--').pop()} productId={page.entity.uuid} />
  }
  return <p>Not found</p>
}
export default PageFactory;
