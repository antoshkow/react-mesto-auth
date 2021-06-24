import React from 'react';
import { Link } from 'react-router-dom';

function BurgerMenu({ email, handleLogOut }) {
  return (
    <div className="burger">
      <p className='burger__email'>{email}</p>
      <Link
        to="/sign-in"
        className="burger__logout"
        onClick={handleLogOut}
      >
        Выйти
      </Link>
    </div>
  );
}

export default BurgerMenu;
