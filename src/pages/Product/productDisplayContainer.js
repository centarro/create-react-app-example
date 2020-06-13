import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { setDefaultVariation, getProduct } from '../../redux/actions/productDisplay'
import ProductDisplay from './jsonapi';

class ProductDisplayContainer extends PureComponent {
    componentDidMount() {
      const {productType, productId} = this.props.match.params
      this.props.getProduct(productType, productId);
    }
    render() {
      const { isLoaded, error} = this.props;
      if (!isLoaded) {
        return null
      }
      if (error !== null) {
        console.log(this.props.error);
        return 'Oops, an error happened.';
      }
      return <ProductDisplay {...this.props}/>
    };
}
function mapStateToProps(state) {
    return {
        selectedVariation: state.productDisplay.selectedVariation,
        error: state.productDisplay.error,
        isLoaded: state.productDisplay.isLoaded,
        data: state.productDisplay.data,
        included: state.productDisplay.included,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        setDefaultVariation: variation => dispatch(setDefaultVariation(variation)),
        getProduct: (productType, productId) => dispatch(getProduct(productType, productId)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductDisplayContainer);
