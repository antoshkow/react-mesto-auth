import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, btnText }) {
  const avatarRef = React.useRef(null);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      btnText={btnText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
        type="url"
        name="avatar-link"
        id="popup-avatar-link"
        className="popup__input"
        placeholder="Ссылка на картинку"
        required
      />
      <span
        className="popup__error"
        id="popup-avatar-link-error"
      />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
