import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'
import configureStore, { history } from './redux/configureStore';
import { generateCartToken } from '@centarro/js-sdk'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import Header from './blocks/Header';
import CatalogMenu from './blocks/CatalogMenu'
import Footer from './blocks/Footer'
import Home from './pages/Home';
import Cart from './pages/Cart';
import { cartFetch, setCartToken } from './redux/actions/cart'
import CartFlyout from './blocks/CartFlyout'
import Checkout from './pages/Checkout'
import CheckoutEmbed from './pages/CheckoutEmbed'
import PaymentConfirmed from './pages/PaymentConfirmed'
import PageFactory from './pages/PageFactory';

const store = configureStore();
store.dispatch(setCartToken(localStorage.getItem('cartToken') || generateCartToken()));
store.dispatch(cartFetch());


class App extends Component {

  render() {
    return (
      <PayPalScriptProvider options={{
        'client-id': process.env.REACT_APP_PAYPAL_SB_CLIENT_ID,
        'data-partner-attribution-id': 'CommerceGuys_Cart_SPB',
      }}>
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
              <Route component={PageFactory} />
            </Switch>
            <Footer />
            <CartFlyout/>
          </div>
        </ConnectedRouter>
      </Provider>
      </PayPalScriptProvider>
    );
  }
}

export default App;
