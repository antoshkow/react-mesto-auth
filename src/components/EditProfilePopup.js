import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';
import { useFormWithValidation } from '../hooks/useForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, btnText }) {
  const currentUser = React.useContext(CurrentUserContext);

  const {values, handleChange, resetForm, errors, isValid} = useFormWithValidation();

  React.useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [currentUser, resetForm]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser(values);
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      btnText={btnText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={!isValid}
    >
      <input
        onChange={handleChange}
        value={values.name || ''}
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
        className="popup__error popup__error_visible"
        id="popup-name-error"
      >
        {errors.name || ''}
      </span>
      <input
        onChange={handleChange}
        value={values.about || ''}
        type="text"
        name="about"
        id="popup-description"
        className="popup__input"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required
      />
      <span
        className="popup__error popup__error_visible"
        id="popup-name-error"
      >
        {errors.about || ''}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
