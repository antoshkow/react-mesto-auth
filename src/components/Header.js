import logo from '../images/logo.svg';
import React from 'react';
import { Link, Route } from 'react-router-dom';

function Header({ email, onSignOut }) {
  return (
    <header className="header">
      <Link
        to="/"
        target="_blank"
        rel="noopener"
        className="header__logo"
      >
        <img
          src={logo}
          className="header__logo"
          alt="Лого Mesto"
        />
      </Link>
      <div className="header__auth">
        <Route exact path="/">
          <p className="header__email">{email}</p>
          <Link
            to="/sign-in"
            className="header__link"
            onClick={onSignOut}
          >
            Выйти
          </Link>
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
