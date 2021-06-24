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
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoToolTip from './InfoTooltip';
import BurgerMenu from './BurgerMenu';
import CurrentUserContext from '../contexts/CurrentUserContext';
import api from '../utils/api';
import * as auth from '../utils/auth';
import { Route, Switch, useHistory } from 'react-router-dom';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isSubmitPopupOpen, setIsSubmitPopupOpen] = React.useState(false);
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = React.useState(false);

  const [cardId, setCardId] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({ isOpened: false });
  const [currentUser, setCurrentUser] = React.useState({});
  const [loading, setLoading] = React.useState(null);

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState({
    email: ''
  });
  const [isRegisterSuccess, setIsRegisterSuccess] = React.useState('');
  const [errorText, setErrorText] = React.useState('');

  const [isBurgerMenuOpened, setIsBurgerMenuOpened] = React.useState(false);

  const history = useHistory();

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
  function handleTooltip() {
    setIsTooltipPopupOpen(!isTooltipPopupOpen);
  }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ isOpened: false });
    setIsSubmitPopupOpen(false);
    setIsTooltipPopupOpen(false);
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

  //Обработчик проверки токена
  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getContent(jwt)
        .then((res) => {
          setIsLoggedIn(true);
          setUserData({ email: res.data.email });
          history.push('/');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  //Обработчик сабмита регистрации
  function handleRegister(email, password) {
    auth.register(email, password)
      .then(() => {
        handleTooltip();
        setIsRegisterSuccess(true);
        history.push('/sign-in');
      })
      .catch((err) => {
        setIsRegisterSuccess(false);
        if (err.status === 400) {
          setErrorText('Некорректно заполнено одно из полей');
        } else {
          setErrorText('Что-то пошло не так! Попробуйте еще раз.');
        }
      })
      .finally(() => {
        setIsTooltipPopupOpen(true);
      })
  }

  //Обработчик сабмита логина
  function handleLogin(email, password) {
    auth.login(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setIsLoggedIn(true);
        setUserData({ email: email });
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
        setIsTooltipPopupOpen(true);
        setIsRegisterSuccess(false);
        if (err.status === 401) {
          setErrorText('Пользователь с email не найден')
        } else if (err.status === 400) {
          setErrorText('Не передано одно из полей')
        } else {
          setErrorText('Что-то пошло не так! Попробуйте еще раз.')
        }

        });
  }

  //Обработчик мобильного меню
  function handleMenuClick() {
    setIsBurgerMenuOpened(!isBurgerMenuOpened);
  }

  //Выход из профиля
  function handleSignOut() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setUserData({ email: '' })
    history.push('/sign-in');
  }

  React.useEffect(() => {
    tokenCheck();
    api.getInitialCards()
      .then((data) => {
        setCards(data)
      })
      .catch((err) => {
        console.log(err)
      });
  }, []);

  React.useEffect(() => {
    tokenCheck();
    api.getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err)
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        { isBurgerMenuOpened &&
          isLoggedIn &&
          <BurgerMenu
            email={userData.email}
            handleLogOut={handleSignOut}
          />
        }
        <Header
          email={userData.email}
          onSignOut={handleSignOut}
          handleMenuClick={handleMenuClick}
          isMenuOpened={isBurgerMenuOpened}
        />
        <Switch>
          <ProtectedRoute
            exact path="/"
            isLoggedIn={isLoggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleSubmitClick}
            getCardId={setCardId}
            cards={cards}
          />
          <Route path="/sign-in">
            <Login handleLogin={handleLogin} />
          </Route>
          <Route path="/sign-up">
            <Register handleRegister={handleRegister} />
          </Route>
        </Switch>
        {isLoggedIn && <Footer />}
        <InfoToolTip
          isRegisterSuccess={isRegisterSuccess}
          isOpen={isTooltipPopupOpen}
          onClose={closeAllPopups}
          errorText={errorText}
        />
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
