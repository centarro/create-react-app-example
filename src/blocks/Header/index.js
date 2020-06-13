import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { connect } from 'react-redux'
import { cartFlyoutOpen } from '../../redux/actions/cartFlyout'
import { selectCurrentStoreId } from '../../redux/actions/currentStore'

const CartBlock = ({ cart, dispatch }) => {
    return (<div style={{
        cursor: 'pointer',
    }} onClick={() => cart.itemCount > 0 ? dispatch(cartFlyoutOpen()) : null}><FaShoppingCart/> { cart.itemCount } { cart.itemCount === 1 ? 'item' : 'items'}</div>)
}
const mapStateToProps = ({ cart }) => ({ cart });
const ConnectedCartBlock = connect(mapStateToProps)(CartBlock);

const StoreSelector = ({ currentStore, dispatch }) => {
    return (<select className={`form-control form-control-sm invert`} defaultValue={currentStore.id} onChange={(event) => {
        dispatch(selectCurrentStoreId(event.target.value));
        window.location.reload();
    }}>
        <option value={`3c8ffdaa-95c0-4b11-8b4e-d27186863f19`}>Storefront (US)</option>
        <option value={`5f7afd2e-8470-4c25-bc40-46d40563d0f6`}>Schaufenster</option>
        <option value={`c0efc490-c532-4b3d-bf3e-4ff509aed916`}>Storefront (UK)</option>
    </select>)
}
const ConnectedStoreSelector = connect(({ currentStore }) => ({ currentStore}))(StoreSelector);

export default () => <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container">
        <div className={``}>
            <ConnectedStoreSelector/>
        </div>
        <div className="cart"><ConnectedCartBlock/></div>
    </div>
</nav>
