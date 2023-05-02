import React from "react";

export default function PopupWithForm({
  title,
  name,
  children,
  isOpen,
  onClose,
  onSubmit
}) {
  return (
    <div className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_form_size">
        <button
          className="popup__button-close"
          type="button"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form popup__form_edit" noValidate name={name} onSubmit={onSubmit}>
          {children}
          <button className="popup__button" type="submit">
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
}
