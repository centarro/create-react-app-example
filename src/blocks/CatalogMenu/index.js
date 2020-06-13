import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo-inverted.svg'
import { FaBars } from 'react-icons/fa';


const NavItem = ({to, text}) => (
<li className="menu-catalog__item nav-item">
  <Link to={to} className="menu-catalog__link nav-link">{text}</Link>
</li>
);

class CatalogMenu extends Component {

    state = {
        toggle: true,
    }
     
    toggleClass = () => {
    this.setState({
        toggle: !this.state.toggle
        })
    }
    render() {
        return (
        <div className="jumbotron" style={{ background: '#babad3', color: '#fff' }}>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-3">
                        <Link to={`/`}>
                            <img className="logo mx-auto mb-3 mb-sm-4 m-lg-0" src={logo} alt={`Belgrade`} />
                        </Link>
                        <button className="navbar-toggler d-block d-sm-none mx-auto text-white border-white mb-3" type={`button`} onClick={this.toggleClass}>
                            <FaBars size={22} />
                        </button>
                    </div>
                    <div className={`${this.state.toggle ? "d-none" : ""} d-sm-block col-lg-9 text-lg-right p-0`}>
                        <ul className={`menu nav menu-catalog justify-content-center justify-content-lg-end`}>
                            <NavItem to={`/catalog/apothecary`} text={'Apothecary'} />
                            <li className="menu-catalog__item nav-item">
                                <Link to={`/catalog/audio-film`} className="menu-catalog__link nav-link">Audio &amp; Film</Link>
                            </li>
                            <li className="menu-catalog__item nav-item">
                                <Link to={`/catalog/men`} className="menu-catalog__link nav-link">Men</Link>
                            </li>
                            <li className="menu-catalog__item nav-item">
                                <Link to={`/catalog/print-shop`} className="menu-catalog__link nav-link">Print Shop</Link>
                            </li>
                            <li className="menu-catalog__item nav-item">
                                <Link to={`/catalog/urban-living`} className="menu-catalog__link nav-link">Urban Living</Link>
                            </li>
                            <li className="menu-catalog__item nav-item">
                                <Link to={`/catalog/women`} className="menu-catalog__link nav-link">Women</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}


export default CatalogMenu;
