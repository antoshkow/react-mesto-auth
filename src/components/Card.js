import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({ name, likes, link, onCardClick, onCardLike, onCardDelete, getCardId, owner, cardId }) {
  const currentUser = React.useContext(CurrentUserContext);
  const currentUserId = currentUser._id;

  function handleCardClick() {
    onCardClick({ name, link });
  }

  function handleLikeClick() {
    onCardLike(likes, cardId, currentUserId);
  }

  function handleDeleteClick() {
    onCardDelete();
    getCardId(cardId);
  }

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = owner._id === currentUserId;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `element__trash ${isOwn ? 'element__trash_visible' : ''}`
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = likes.some(i => i._id === currentUserId);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `element__like ${isLiked ? 'element__like_status_active' : ''}`
  );

  return (
    <li className="element">
      <button
        type="button"
        onClick={handleDeleteClick}
        className={cardDeleteButtonClassName}
      />
      <img
        src={link}
        alt={name}
        className="element__img"
        onClick={handleCardClick}
      />
      <div className="element__bottom">
        <h2 className="element__title">{name}</h2>
        <div className="element__likes">
          <button
            type="button"
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}
          />
          <p className="element__counter">{likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
