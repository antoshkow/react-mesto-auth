import React from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({ onEditAvatar, onAddPlace, onEditProfile, onCardClick, onCardLike, onCardDelete, getCardId, cards }) {
  const { name, avatar, about } = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__left">
          <div
            className="profile__overlay"
            onClick={onEditAvatar}
          >
            <img
              src={avatar}
              alt="Аватар"
              className="profile__avatar"
            />
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{name}</h1>
            <p className="profile__description">{about}</p>
            <button
              type="button"
              className="profile__edit-button"
              id="show-popup"
              aria-label="Edit"
              onClick={onEditProfile}
            />
          </div>
        </div>
        <button
          type="button"
          className="profile__add-button"
          id="show-cards-popup"
          onClick={onAddPlace}
        />
      </section>
      <ul className="elements">
        {
          cards.map((card) => (
            <Card
              key={card._id}
              name={card.name}
              link={card.link}
              likes={card.likes}
              owner={card.owner}
              cardId={card._id}

              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              getCardId={getCardId}
            />
          ))
        }
      </ul>
    </main>
  );
}

export default Main;
