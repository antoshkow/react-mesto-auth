function PopupWithForm({ name, title, children, btnText, isOpen, onClose, onSubmit, formMod, titleMod, btnMod }) {
  return (
    <section
      className={isOpen ? `popup popup_${name} popup_opened` : `popup popup_${name}`}
    >
      <form
        className={`popup__container popup__container_${formMod}`}
        name={`${name}`}
        noValidate
        onSubmit={onSubmit}
      >
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        />
        <h2 className={`popup__title popup__title_${titleMod}`}>{title}</h2>
        <div>{children}</div>
        <button
          type="submit"
          className={`popup__submit-button popup__submit-button_${btnMod}`}
        >
          {btnText}
        </button>
      </form>
    </section>
  );
}

export default PopupWithForm;
