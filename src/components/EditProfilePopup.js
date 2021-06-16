import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

//объект валидации
// const validators = {
//   name: {
//     required: (value) => { return value === '' },
//     minLength: (value) => { return value.length < 2 },
//     maxLength: (value) => { return value.length > 40 }
//   },
//   description: {
//     required: (value) => { return value === '' },
//     minLength: (value) => { return value.length < 2 },
//     maxLength: (value) => { return value.length > 200 }
//   }
// }

function EditProfilePopup({ isOpen, onClose, onUpdateUser, btnText }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  // const [formValues, setFormValues] = React.useState({
  //   name: '',
  //   description: ''
  // });

  //стейт ошибок
  // const [errors, setErrors] = React.useState({
  //   name: {
  //     required: false,
  //     minLength: false,
  //     maxLength: false
  //   },
  //   description: {
  //     required: false,
  //     minLength: false,
  //     maxLength: false
  //   }
  // });

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  //   setFormValues({
  //     name: currentUser.name,
  //     description: currentUser.about
  //   });
  }, [currentUser, isOpen]);

  function onChangeName(evt) {
    setName(evt.target.value);
  }

  function onChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description
    });
  }

  // const handleInputChange = React.useCallback(
  //   (evt) => {
  //     const { name, value } = evt.target;
  //     setFormValues((prevState) => ({...prevState, [name]: value }));
  //   },
  //   [setFormValues]
  // );

  // React.useEffect(() => {
  //   function validateInputs() {
  //     const { name, description } = formValues;

  //     const nameValidationResult = Object.keys(validators.name).map(
  //       errorKey => {
  //         const errorResult = validators.name[errorKey](name);

  //         return { [errorKey]: errorResult}
  //       }
  //     )
  //       .reduce((acc, el) => ({...acc, ...el}), {});

  //     const descriptionValidationResult = Object.keys(validators.description).map(
  //       errorKey => {
  //         const errorResult = validators.description[errorKey](description);

  //         return { [errorKey]: errorResult}
  //       }
  //     )
  //       .reduce((acc, el) => ({...acc, ...el}), {});;

  //     setErrors({
  //       name: nameValidationResult,
  //       description: descriptionValidationResult
  //     });
  //   }
  // }, [formValues, setErrors]);

  // const { name, description } = formValues;

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      btnText={btnText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        onChange={onChangeName}
        value={name || ''}
        type="text"
        name="name"
        id="popup-name"
        className="popup__input"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
      />
      <span
        className="popup__error"
        id="popup-name-error"
      />
      {/* {errors.name.required && <span className="popup__error popup__error_visible" id="popup-name-error">Поле обязательно для заполнения</span>}
      {errors.name.minLength && <span className="popup__error popup__error_visible" id="popup-name-error">Текст должен быть не короче 2 симв.</span>}
      {errors.name.maxLength && <span className="popup__error popup__error_visible" id="popup-name-error">Текст должен быть не длиннее 200 симв.</span>} */}
      <input
        onChange={onChangeDescription}
        value={description || ''}
        type="text"
        name="description"
        id="popup-description"
        className="popup__input"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required
      />
      <span
        className="popup__error"
        id="popup-name-error"
      />
      {/* {errors.description.required && <span className="popup__error popup__error_visible" id="popup-name-error">Поле обязательно для заполнения</span>}
      {errors.description.minLength && <span className="popup__error popup__error_visible" id="popup-name-error">Текст должен быть не короче 2 симв.</span>}
      {errors.description.maxLength && <span className="popup__error popup__error_visible" id="popup-name-error">Текст должен быть не длиннее 200 симв.</span>} */}
    </PopupWithForm>
  );
}

export default EditProfilePopup;
