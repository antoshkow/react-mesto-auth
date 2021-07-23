function Popup({ name, title, children, isOpen, onClose }) {
  return (
    <section
      className={`popup popup_${name} ${isOpen && 'popup_opened'}`}
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
