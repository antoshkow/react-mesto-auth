function ImagePopup({ card, onClose, isOpen }) {
  return (
    <section
      className={`popup popup_lightbox ${isOpen && 'popup_opened'}`}
    >
      <figure className="popup__figure">
        <button
          type="button"
          className="popup__close"
          id="close-lightbox-popup"
          onClick={onClose}
        />
        <img
          src={card.link}
          alt="Фото"
          className="popup__photo"
        />
        <figcaption
          className="popup__figcaption"
        >
          {card.name}
        </figcaption>
      </figure>
    </section>
  );
}

export default ImagePopup;
