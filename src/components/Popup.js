function Popup({ name, title, children, isOpen, onClose }) {
  return (
    <section
      className={isOpen ? `popup popup_${name} popup_opened` : `popup popup_${name}`}
    >
      <div
        className='popup__container popup__container_tooltip'
        name={`${name}`}
      >
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        />
        <h2 className='popup__title popup__title_tooltip'>{title}</h2>
        <div>{children}</div>
      </div>
    </section>
  );
}

export default Popup;
