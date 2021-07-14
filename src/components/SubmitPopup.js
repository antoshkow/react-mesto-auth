import React from 'react';
import PopupWithForm from './PopupWithForm';

function SubmitPopup({ isOpen, onClose, onSubmitDelete, btnText }) {
  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmitDelete();
  }

  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      btnText={btnText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default SubmitPopup;
