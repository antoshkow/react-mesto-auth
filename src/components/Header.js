import logo from '../images/logo.svg';

function Header() {
  return (
    <header className="header">
      <a
        href="#"
        target="_blank"
        rel="noopener"
        className="header__logo"
      >
        <img
          src={logo}
          className="header__logo"
          alt="Лого Mesto"
        />
      </a>
    </header>
  );
}

export default Header;
