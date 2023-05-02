import React, { useRef } from 'react'
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
   const link = useRef(null)
   function handleSubmit(e) {
      e.preventDefault();
    
      onUpdateAvatar({
        avatar: link.current.value,
      });
    }

  return (
   <PopupWithForm
   title={"Обновить аватар"}
   name={"update-avatar"}
   isOpen={isOpen}
   onClose={onClose}
   onSubmit={handleSubmit}
   >
   <input
     id="input-link-update"
     type="url"
     className="popup__input popup__input_type_link-avatar"
     name="link"
     placeholder="Ссылка на картинку"
     ref={link}
     onChange={(evt) => link.current.value = evt.target.value}
     required
   />
   <span className="popup__span-error" id="input-link-update-error"></span>
 </PopupWithForm>
  )
}
