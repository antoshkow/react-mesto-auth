import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useFormWithValidation } from '../hooks/useForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, btnText }) {
  const {values, handleChange, resetForm, errors, isValid} = useFormWithValidation();

  // React.useEffect(() => {
  //   if (currentUser) {
  //     resetForm(currentUser, {}, true);
  //   }
  // }, [currentUser, resetForm]);

  React.useEffect(() => {
    resetForm()
  }, [isOpen, resetForm]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace(values);
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
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
        id="popup-add-name"
        className="popup__input"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <span
        className="popup__error popup__error_visible"
        id="popup-add-name-error"
      >
        {errors.name || ''}
      </span>
      <input
        onChange={handleChange}
        value={values.link || ''}
        type="url"
        name="link"
        id="popup-photo-link"
        className="popup__input"
        placeholder="Ссылка на изображение"
        required
      />
      <span
        className="popup__error popup__error_visible"
        id="popup-photo-link-error"
      >
        {errors.link || ''}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
