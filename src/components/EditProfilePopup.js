import React, { useContext, useEffect, useState } from 'react'
import { CurrentUserContext } from './contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

export default function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
   const [name, setName]= useState('');
   const [description, setDescription]= useState('');

   // Подписка на контекст
   const currentUser = useContext(CurrentUserContext);

   // После загрузки текущего пользователя из API
   // его данные будут использованы в управляемых компонентах.
   useEffect(() => {
   setName(currentUser.name);
   setDescription(currentUser.about);
   }, [currentUser]);

   function handleSubmit(e) {
   // Запрещаем браузеру переходить по адресу формы
      e.preventDefault();
   
   // Передаём значения управляемых компонентов во внешний обработчик
      onUpdateUser({
      name,
      about: description,
      });
   }

  return (
   <PopupWithForm
   title={"Редактировать профиль"}
   name={"edit-profile"}
   isOpen={isOpen}
   onClose={onClose}
   onSubmit={handleSubmit}
 >
   <input
     id="input-name"
     type="text"
     className="popup__input popup__input_type_name-edit"
     name="name"
     placeholder="Имя"
     minLength="2"
     maxLength="40"
     value={name || ''}
     onChange={(evt) => setName(evt.target.value)}
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
     value={description || ''}
     onChange={(evt) => setDescription(evt.target.value)}
     required
   />
   <span className="popup__span-error" id="input-description-error"></span>
 </PopupWithForm>
  )
}
