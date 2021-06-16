import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import SubmitPopup from './SubmitPopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import api from '../utils/api';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isSubmitPopupOpen, setIsSubmitPopupOpen] = React.useState(false);

  const [cardId, setCardId] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({ isOpened: false });
  const [currentUser, setCurrentUser] = React.useState({});
  const [loading, setLoading] = React.useState(null);

  React.useEffect(() => {
    api.getInitialCards()
      .then((data) => {
        setCards(data)
      })
      .catch((err) => {
        console.log(err)
      });
  }, []);

  React.useEffect(() => {
    api.getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err)
      });
  }, []);

  //Закрытие попапов кликом на esc
  React.useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === 'Escape') closeAllPopups();
    }
    window.addEventListener('keydown', handleEscClose);
  }, []);

  //Закрытие попапов кликом на оверлей
  React.useEffect(() => {
    function handleOverlayClose(evt) {
      if (evt.target.classList.contains('popup_opened')) closeAllPopups();
    }
    window.addEventListener('click', handleOverlayClose);
  }, []);

  //Обработчики открытия/закрытия поп-апов
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }
  function handleSubmitClick() {
    setIsSubmitPopupOpen(!isSubmitPopupOpen);
  }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ isOpened: false });
    setIsSubmitPopupOpen(false);
  }

  //Обработчик лайка карточки
  function handleCardLike(likes, cardId, currentUserId) {
    const isLiked = likes.some(i => i._id === currentUserId);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(cardId, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === cardId ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Обработчик удаления карточки
  function handleCardDelete() {
    api.deleteCard(cardId)
      .then(() => {
        const newCards = cards.filter(card => card._id !== cardId)
        setCards(newCards);
        setLoading(null);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading('Удаление...')
  }

  //Обработчик сабмита формы профиля
  function handleUpdateUser(userData) {
    api.editProfile(userData)
      .then((data) => {
        setCurrentUser(data);
        setLoading(null);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      });
    setLoading('Сохранение...');
  }

  //Обработчик сабмита формы аватара
  function handleUpdateAvatar(userData) {
    api.updateAvatar(userData)
      .then((data) => {
        setCurrentUser(data);
        setLoading(null);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading('Сохранение...')
  }

  //Обработчик сабмита формы добавления карточки
  function handleAddPlaceSubmit(newCard) {
    api.addNewCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        setLoading(null);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading('Создание...')
  }

  //Обработчик клика по картинке
  function handleCardClick({ link, name, isOpened }) {
    setSelectedCard({
      link,
      name,
      isOpened: !isOpened
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleSubmitClick}
          getCardId={setCardId}
          cards={cards}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          btnText={loading || "Сохранить"}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          btnText={loading || "Сохранить"}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          btnText={loading || "Создать"}
        />
        <SubmitPopup
          isOpen={isSubmitPopupOpen}
          onClose={closeAllPopups}
          onSubmitDelete={handleCardDelete}
          btnText={loading || "Да"}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
