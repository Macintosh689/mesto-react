import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { useEffect, useState } from "react";
import { CurrentUserContext } from "./contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import { api } from "../utils/Api";
import EditAvatarPopup from "./EditAvatarPopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  const [cards, setCards] = useState([]);

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data)
      })
      .catch((err) => console.log(err));
    api
      .getAllCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => console.log(err));
  }, []);

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

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    }).catch((err)=>console.log(err))
}

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(()=>{
      setCards((state) => state.filter((c)=>c._id !== card._id));
    }).catch((err)=>console.log(err))
  }
  
  function handleUpdateUser(user) {
    api.setUserInfo(user).then(() =>{
      setCurrentUser({...currentUser,name:user.name, about:user.about})
      closeAllPopups();
    }).catch((err)=>console.log(err))
  }

  function handleUpdateAvatar(avatar) {
    api.setAvatar(avatar).then((user)=>{
      setCurrentUser(user);
      closeAllPopups();
    }).catch((err)=>console.log(err))
  }

  function handleAddPlaceSubmit(card) {
    api.addNewCard(card).then((newCard)=>{
      setCards([newCard, ...cards]); 
      closeAllPopups();
    }).catch((err)=>console.log(err))
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        cards = {cards}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
      />
      <Footer />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />
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
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
