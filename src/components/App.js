import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { useState } from "react";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />

      <PopupWithForm
        title={"Редактировать профиль"}
        name={"edit-profile"}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          id="input-name"
          type="text"
          className="popup__input popup__input_type_name-edit"
          name="name"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="popup__span-error" id="input-name-error"></span>
        <input
          id="input-description"
          type="text"
          className="popup__input popup__input_type_description-edit"
          name="about"
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="popup__span-error" id="input-description-error"></span>
      </PopupWithForm>
      <PopupWithForm
        title={"Новое место"}
        name={"add-card"}
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          id="input-name-add"
          type="text"
          className="popup__input popup__input_type_name-add"
          name="name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="popup__span-error" id="input-name-add-error"></span>
        <input
          id="input-link-add"
          type="url"
          className="popup__input popup__input_type_link-add"
          name="link"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__span-error" id="input-link-add-error"></span>
      </PopupWithForm>
      <ImagePopup onClose={closeAllPopups} card={selectedCard} />
      <PopupWithForm
        title={"Вы уверены"}
        name={"delete-card"}
        onClose={closeAllPopups}
      >
        <button className="popup__button" type="submit">
          Да
        </button>
      </PopupWithForm>
      <PopupWithForm
        title={"Обновить аватар"}
        name={"update-avatar"}
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input
          id="input-link-update"
          type="url"
          className="popup__input popup__input_type_link-avatar"
          name="link"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__span-error" id="input-link-update-error"></span>
      </PopupWithForm>
    </div>
  );
}

export default App;
