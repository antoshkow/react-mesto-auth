import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, btnText }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function onChangeName(evt) {
    setName(evt.target.value);
  }

  function onChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      btnText={btnText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        onChange={onChangeName}
        value={name || ''}
        type="text"
        name="name"
        id="popup-name"
        className="popup__input"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
      />
      <span
        className="popup__error"
        id="popup-name-error"
      />
      <input
        onChange={onChangeDescription}
        value={description || ''}
        type="text"
        name="description"
        id="popup-description"
        className="popup__input"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required
      />
      <span
        className="popup__error"
        id="popup-name-error"
      />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
