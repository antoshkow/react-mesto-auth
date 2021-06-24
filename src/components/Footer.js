const date = new Date();

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">&copy; {date.getFullYear()} Mesto Russia</p>
    </footer>
  );
}

export default Footer;
