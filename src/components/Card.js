import React from "react";
import trash from "../images/Trash.svg";

export default function Card({ card, onCardClick }) {
  function handleClick() {
    onCardClick(card);
  }
  return (
    <div className="card">
      <img className="card__image" src={card.link} onClick={handleClick} />
      <img src={trash} className="card__trash" />
      <div className="card__description">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <button className="card__button-like" type="button"></button>
          <p className="card__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}
