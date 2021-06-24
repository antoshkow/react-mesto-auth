import logo from '../images/logo.svg';
import React from 'react';
import { Link, Route } from 'react-router-dom';
import menuIcon from '../images/burger.svg';
import closeIcon from '../images/Close-Icon_mobile.svg';

function Header({ email, onSignOut, handleMenuClick, isMenuOpened }) {
  return (
    <header className="header">
      <Link
        to="/"
        rel="noopener"
        className="header__logo"
      >
        <img
          src={logo}
          className="header__logo"
          alt="Лого Mesto"
        />
      </Link>
      <div className='header__auth'>
        <Route exact path="/">
          <p className="header__email">{email}</p>
          <Link
            to="/sign-in"
            className="header__logout"
            onClick={onSignOut}
          >
            Выйти
          </Link>
          <button
            onClick={handleMenuClick}
            className="header__burger"
            type="button"
          >
            <img
              className="header__img"
              src={isMenuOpened ? closeIcon : menuIcon}
              alt="Иконка взаимодействия с меню"
            />
          </button>
        </Route>
        <Route exact path="/sign-in">
          <Link
            to="/sign-up"
            className="header__link"
          >
            Регистрация
          </Link>
        </Route>
        <Route exact path="/sign-up">
          <Link
            to="/sign-in"
            className="header__link"
          >
            Войти
          </Link>
        </Route>
      </div>
    </header>
  );
}

export default Header;
