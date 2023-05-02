import React  from "react";
import Card from "./Card";
import { useContext } from "react";
import { CurrentUserContext } from "./contexts/CurrentUserContext";

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete
}) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__photo" onClick={onEditAvatar}>
          <img
            src={currentUser.avatar}
            className="profile__avatar"
            alt="Аватар профиля"
          />
        </div>
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__name">{currentUser.name} </h1>
            <button
              className="profile__edit-button"
              type="button"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__description">{currentUser.about} </p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="cards-gallery">
        {cards.map((element) => {
          return (
            <Card card={element} key={element._id} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>
          );
        })}
      </section>
    </main>
  );
}
