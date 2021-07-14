function PopupWithForm({
  name,
  title,
  children,
  btnText,
  isOpen,
  onClose,
  onSubmit,
  isDisabled=false
}) {
  return (
    <section
      className={isOpen ? `popup popup_${name} popup_opened` : `popup popup_${name}`}
    >
      <form
        className='popup__container'
        name={`${name}`}
        noValidate
        onSubmit={onSubmit}
      >
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        />
        <h2 className='popup__title'>{title}</h2>
        <div>{children}</div>
        <button
          type="submit"
          className={`popup__submit-button ${
            isDisabled && 'popup__submit-button_disabled'
          }`}
          disabled={isDisabled}
        >
          {btnText}
        </button>
      </form>
    </section>
  );
}

export default PopupWithForm;
