import React from 'react';
import { Link } from 'react-router-dom';
import LogoFooter from '../../assets/logo-footer.svg'
import { FaFacebook, FaGithub, FaTwitter, FaYoutube } from 'react-icons/fa'

export default () => (
  <footer className={`footer bg-dark`}>
    <div className={`footer--contents container`}>
      <div className="row">
        <div className={`block col-12 col-lg-2`}>
          <Link to={`/`} className={`footer--logo`}>
            <img src={LogoFooter} alt={`Home`} />
          </Link>
          {/*<span>Powered by <a href={`https://www.drupal.org/project/commerce`}>Drupal Commerce</a></span>*/}
        </div>
        <nav className="col-md-4 col-lg-3">
          <h2 className="visually-hidden">Catalog</h2>
          <ul className="menu nav flex-column menu-catalog">
            <li className="menu-catalog__item nav-item">
              <Link to={`/catalog/apothecary`} className="menu-catalog__link nav-link">Apothecary</Link>
            </li>
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
        </nav>
        <nav className="col-md-4 col-lg-3">
          <h2 className="visually-hidden">Footer menu</h2>
          <ul className={`menu nav flex-column menu-footer`}>
            <li className={`nav-link`}><Link to={`/`}>About us</Link></li>
            <li className={`nav-link`}><Link to={`/`}>Contact</Link></li>
          </ul>
        </nav>
        <nav className="col-md-4 col-lg-4">
          <h2 className="visually-hidden">Social</h2>
          <ul className="menu menu-social nav">
            <li className={"nav-item"}>
              <a href="https://www.facebook.com/DrupalCommerce/" className={`nav-link`}> <FaFacebook size={32}/><span className="sr-only">Facebook</span>
              </a>
            </li>
            <li className={"nav-item"}>
              <a href="https://twitter.com/drupalcommerce"  className={`nav-link`}> <FaTwitter size={32}/><span className="sr-only">Twitter</span>
              </a>
            </li>
            <li className={"nav-item"}>
              <a href="https://www.linkedin.com/groups/3787490"  className={`nav-link`}> <FaYoutube size={32}/><span className="sr-only">YouTube</span></a>
            </li>
            <li className={`nav-item`}>
              <a href={`https://github.com/centarro/create-react-app-example`}  className={`nav-link`}> <FaGithub size={32}/><span className={`sr-only`}>GitHub</span></a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </footer>
);
