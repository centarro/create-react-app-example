import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import reducers from './reducers'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'

export const history = createBrowserHistory();

/**
 * @param preloadedState
 * @returns {Store<any, Action> & *}
 */
export default function configureStore(preloadedState) {
  return createStore(
    reducers(history),
    preloadedState,
    compose(
      applyMiddleware(
        routerMiddleware(history),
        thunk
      )
    )
  );
}
