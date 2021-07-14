import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useFormWithValidation } from '../hooks/useForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, btnText }) {
  const {values, handleChange, resetForm, errors, isValid} = useFormWithValidation();

  React.useEffect(() => {
    resetForm({});
  }, [isOpen, resetForm]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar(values);
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      btnText={btnText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={!isValid}
    >
      <input
        onChange={handleChange}
        value={values.avatar || ''}
        type="url"
        name="avatar"
        id="popup-avatar-link"
        className="popup__input"
        placeholder="Ссылка на изображение"
        required
      />
      <span
        className="popup__error"
        id="popup-avatar-link-error"
      >
        {errors.avatar || ''}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
