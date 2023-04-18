import React, { useEffect, useState } from "react";
import { api } from "../utils/Api";
import Card from "./Card";

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
}) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");

  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInfo().then((data) => {
      setUserName(data.name);
      setUserDescription(data.about);
      setUserAvatar(data.avatar);
    })
    .catch((err)=>console.log(err));
    api.getAllCards().then((data) => {
      setCards(data);
    })
    .catch((err)=>console.log(err));
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__photo" onClick={onEditAvatar}>
          <img
            src={userAvatar}
            className="profile__avatar"
            alt="Аватар профиля"
          />
        </div>
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__name">{userName} </h1>
            <button
              className="profile__edit-button"
              type="button"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__description">{userDescription} </p>
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
            <Card card={element} key={element._id} onCardClick={onCardClick} />
          );
        })}
      </section>
    </main>
  );
}
