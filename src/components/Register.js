import React from 'react';
import { Link } from 'react-router-dom';


function Register({ handleRegister }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleRegister(email, password);
  }

  return (
    <section className="auth">
      <form
        // noValidate
        className="auth__form"
        name="form-register"
        onSubmit={handleSubmit}
      >
        <h2 className="auth__title">Регистрация</h2>
        <input
          required
          className="auth__input"
          type="email"
          placeholder="Email"
          minLength="5"
          maxLength="40"
          name="email-register"
          onChange={handleEmailChange}
          value={email}
        />
        <input
          required
          className="auth__input"
          type="password"
          placeholder="Пароль"
          minLength="5"
          maxLength="40"
          name="password-register"
          onChange={handlePasswordChange}
          value={password}
        />
        <button
          type="submit"
          className="auth__btn"
        >
          Зарегистрироваться
        </button>
        <Link className="auth__link" to="/sign-in">Уже зарегистрированы? Войти</Link>
      </form>
    </section>
  );
}

export default Register;
