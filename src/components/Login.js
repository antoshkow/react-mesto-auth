import React from 'react';

function Login({ handleLogin }) {
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
    handleLogin(email, password);
  }

  return (
    <section className="auth">
      <form
        // noValidate
        className="auth__form"
        onSubmit={handleSubmit}
        name="form-login"
      >
        <h2 className="auth__title">Вход</h2>
        <input
          required
          className="auth__input"
          type="email"
          placeholder="Email"
          minLength="5"
          maxLength="40"
          onChange={handleEmailChange}
          value={email}
          name="email-login"

        />
        <input
          required
          className="auth__input"
          type="password"
          placeholder="Пароль"
          minLength="5"
          maxLength="40"
          onChange={handlePasswordChange}
          value={password}
          name="password-login"
        />
        <button
          type="submit"
          className="auth__btn"
        >
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;
