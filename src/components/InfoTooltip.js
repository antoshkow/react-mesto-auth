import success from "../images/success.svg";
import fail from "../images/fail.svg"
import PopupWithForm from "./PopupWithForm";
// { isOpen, onClose, onUpdateUser, btnText }
function InfoToolTip({ onClose, isOpen, isRegisterSuccess }) {
    return (
      <PopupWithForm
        name="tooltip"
        title=""
        isOpen={isOpen}
        onClose={onClose}
        btnMod={'tooltip'}
        formMod={'tooltip'}
        titleMod={'tooltip'}
      >
        <img
          src={isRegisterSuccess ? success : fail}
          className="popup__tooltip-img"
          alt="успешная регистрация"
        />
        <h2 className="popup__tooltip-info">
          {isRegisterSuccess ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте еще раз."
          }
        </h2>
      </PopupWithForm>
    );
}

export default InfoToolTip;
