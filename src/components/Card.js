import React, { useContext } from "react";
import trash from "../images/Trash.svg";
import { CurrentUserContext } from "./contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = ( 
    `card__button-like ${isLiked && 'card__button-like_active'}` 
  );;
  function handleClick() {
    onCardClick(card);
  }
  return (
    <div className="card">
      <img
        className="card__image"
        src={card.link}
        onClick={handleClick}
        alt={card.name}
      />
      {isOwn && <img src={trash} className="card__trash" onClick={()=> onCardDelete(card)}/>} 
      <div className="card__description">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <button className= {cardLikeButtonClassName} type="button" onClick={() => onCardLike(card)}></button>
          <p className="card__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}
