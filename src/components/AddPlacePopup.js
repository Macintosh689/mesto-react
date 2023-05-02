import React, { useState } from 'react'
import PopupWithForm from './PopupWithForm'

export default function AddPlacePopup({isOpen, onClose, onAddPlace}) {
   const [name, setName] = useState('');
   const [link, setLink] = useState('');

   function handleSubmit(evt) {
      evt.preventDefault();
      onAddPlace({name, link})
   }

  return (
   <PopupWithForm
   title={"Новое место"}
   name={"add-card"}
   isOpen={isOpen}
   onClose={onClose}
   onSubmit={handleSubmit}
 >
   <input
     id="input-name-add"
     type="text"
     className="popup__input popup__input_type_name-add"
     name="name"
     placeholder="Название"
     minLength="2"
     maxLength="30"
     value={name}
     onChange={(evt) => setName(evt.target.value)}
     required
   />
   <span className="popup__span-error" id="input-name-add-error"></span>
   <input
     id="input-link-add"
     type="url"
     className="popup__input popup__input_type_link-add"
     name="link"
     value={link}
     onChange={(evt) => setLink(evt.target.value)}
     placeholder="Ссылка на картинку"
     required
   />
   <span className="popup__span-error" id="input-link-add-error"></span>
 </PopupWithForm>
  )
}
