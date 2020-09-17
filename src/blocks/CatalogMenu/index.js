import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo-inverted.svg'
import { FaBars } from 'react-icons/fa';
import { jsonapiClient } from '../../utils/api';


const NavItem = ({to, text}) => (
<li className="menu-catalog__item nav-item">
  <Link to={to} className="menu-catalog__link nav-link">{text}</Link>
</li>
);

const CatalogMenu = () => {
  const [toggled, setToggled] = useState(true)
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    async function getMenuItems() {
      const items = await jsonapiClient(process.env.REACT_APP_API_URL, 'menu');
      setMenuItems(items.data.filter(item => item.attributes.parent === ''));
    }
    getMenuItems();
  }, [])
    return (
      <div className="jumbotron" style={{ background: '#babad3', color: '#fff' }}>
          <div className="container">
              <div className="row align-items-center">
                  <div className="col-lg-3">
                      <Link to={`/`}>
                          <img className="logo mx-auto mb-3 mb-sm-4 m-lg-0" src={logo} alt={`Belgrade`} />
                      </Link>
                      <button className="navbar-toggler d-block d-sm-none mx-auto text-white border-white mb-3" type={`button`} onClick={() => setToggled(!toggled)}>
                          <FaBars size={22} />
                      </button>
                  </div>
                  <div className={`${toggled ? "d-none" : ""} d-sm-block col-lg-9 text-lg-right p-0`}>
                      <ul className={`menu nav menu-catalog justify-content-center justify-content-lg-end`}>
                          {menuItems.map(item => <NavItem key={item.id} to={item.attributes.url} text={item.attributes.title} />)}
                      </ul>
                  </div>
              </div>
          </div>
      </div>
      )
}


export default CatalogMenu;
