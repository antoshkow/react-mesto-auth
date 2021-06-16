import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, btnText }) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function onChangeName(evt) {
    setName(evt.target.value);
  }

  function onChangeLink(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name: name,
      link: link
    });
    setName('');
    setLink('');
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      btnText={btnText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        onChange={onChangeName}
        value={name}
        type="text"
        name="photo-name"
        id="popup-add-name"
        className="popup__input"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <span
        className="popup__error"
        id="popup-add-name-error"
      />
      <input
        onChange={onChangeLink}
        value={link}
        type="url"
        name="photo-link"
        id="popup-photo-link"
        className="popup__input"
        placeholder="Ссылка на картинку"
        required
      />
      <span
        className="popup__error"
        id="popup-photo-link-error"
      />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
