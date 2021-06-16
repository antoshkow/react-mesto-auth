function ImagePopup({ card, onClose }) {
  return (
    <section
      className={`popup popup_lightbox ${card.isOpened ? 'popup_opened' : ''}`}
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
