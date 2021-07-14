import success from "../images/success.svg";
import fail from "../images/fail.svg"
import Popup from "./Popup";

function InfoToolTip({ onClose, isOpen, isRegisterSuccess, errorText }) {
    return (
      <Popup
        name="tooltip"
        title=""
        isOpen={isOpen}
        onClose={onClose}
      >
        {
          isRegisterSuccess
            ? <img
                src={success}
                className="popup__tooltip-img"
                alt="успешная регистрация"
              />
            : <img
                src={fail}
                className="popup__tooltip-img"
                alt="успешная регистрация"
              />
        }
        <h2 className="popup__tooltip-info">
          {isRegisterSuccess
            ? "Вы успешно зарегистрировались!"
            : errorText
          }
        </h2>
      </Popup>
    );
}

export default InfoToolTip;
