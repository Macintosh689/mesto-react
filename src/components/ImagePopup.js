import React from "react";

export default function ImagePopup({ onClose, card }) {
  return (
    <div className={`popup popup_form_image ${card ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_form_image">
        <button
          className="popup__button-close"
          type="button"
          onClick={onClose}
        ></button>
        <img className="popup__photo" src={card?.link} alt={card?.name} />
        <h2 className="popup__title popup__title_form_image">{card?.name}</h2>
      </div>
    </div>
  );
}
