import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'
import configureStore, { history } from './redux/configureStore';
import { generateCartToken } from '@centarro/js-sdk'

import Header from './blocks/Header';
import CatalogMenu from './blocks/CatalogMenu'
import Footer from './blocks/Footer'
import Home from './pages/Home';
import Cart from './pages/Cart';
import Catalog from './pages/Catalog/jsonapi';
import Product from './pages/Product/productDisplayContainer';
import { cartFetch, setCartToken } from './redux/actions/cart'
import CartFlyout from './blocks/CartFlyout'
import Checkout from './pages/Checkout'
import CheckoutEmbed from './pages/CheckoutEmbed'
import PaymentConfirmed from './pages/PaymentConfirmed'

const store = configureStore();
store.dispatch(setCartToken(localStorage.getItem('cartToken') || generateCartToken()));
store.dispatch(cartFetch());

const catalogRoutes = [
  { path: 'apothecary', categoryName: 'Apothecary' },
  { path: 'audio-film', categoryName: 'Audio & Film' },
  { path: 'men', categoryName: 'Men' },
  { path: 'print-shop', categoryName: 'Print Shop' },
  { path: 'urban-living', categoryName: 'Urban Living' },
  { path: 'women', categoryName: 'Women' },
];

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
        <div className="App">
            <Header />
            <CatalogMenu />
            <Switch>
              <Route exact path={`/`} component={Home} />
              <Route path={`/cart`} component={Cart} />
              <Route path={`/checkout/:orderId/complete`} component={PaymentConfirmed} />
              <Route path={`/checkout/:orderId`} component={Checkout} />
              <Route path={`/checkout-iframe/:orderId`} component={CheckoutEmbed} />
              {catalogRoutes.map(routeInfo => (
                <Route key={routeInfo.path} path={`/catalog/${routeInfo.path}`} render={(props) => <Catalog {...props} categoryName={routeInfo.categoryName} />} />
              ))}
              <Route path={`/product/:productType/:productId`} component={Product} />
            </Switch>
            <Footer />
            <CartFlyout/>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
