import React, { useRef, useState } from "react";
import createModalSvg from '/src/assets/icons/create-modal.svg'
import backSvg from '/src/assets/icons/back.svg'
import close from '/src/assets/icons/close.svg'
import emojiSvg from '../assets/icons/emoji.svg'
import { uploadService } from "../services/upload.service";
import { systemReducer, LOADING_DONE, LOADING_START } from "../store/system.reducer";
import { useDispatch, useSelector } from "react-redux";
import EmojiPicker from 'emoji-picker-react';

export function CreatePostModal({ onCloseModal, onAddPost }) {
    const dispatch = useDispatch()
    const isLoading = useSelector(storeState => storeState.systemModule.isLoading)
    const [selectedFile, setSelectedFile] = useState(null);

    const [text, setText] = useState('')

    const handleChange = (event) => {
        setText(event.target.value);
    }
    async function handleAddPhoto(ev) {
        try {
            dispatch({
                type: LOADING_START
            })
            const file = await uploadService.uploadImg(ev)
            setSelectedFile(file.secure_url)
            dispatch({
                type: LOADING_DONE
            })
        } catch (error) {
            console.log(error)
        }
    };

    if (isLoading) {
        return (
            <section className="create-modal-container">
                <div className="modal-header">
                    <h4>Create new post</h4>
                </div>
                <div className="loader-line"></div>
            </section>
        )
    }
    else if (selectedFile) {
        return (
            <section className="create-modal-img-edit">

                <div className="modal-header-share" >
                    <button className="btn-back" onClick={() => setSelectedFile(null)} ><img src={backSvg} alt="back" /></button>
                    <h4>Create new post</h4>
                    <button className="btn-share" onClick={() => onAddPost(text, selectedFile)}>Share</button>
                </div>
                <div className="create-img-container">

                    <img className="create-img" src={selectedFile} alt="Uploaded" />
                    <div className="modal-edit-area">
                        <img className="profile-img-circle" src='./src/assets/img/users/guest-user.jpg' alt="profile" />
                        <strong className="userName-preview">guest_user</strong>
                    </div>
                    <textarea className="text-area" rows={10} maxLength={2200} onChange={handleChange} value={text} type="text" placeholder="Write a caption..." ></textarea>
                    <div className="div-chars-emoji">
                        <span className="count-chars">{text.length}/{2200}</span>
                        <button className="emoji-btn"><img src= {emojiSvg} alt="emoji" /></button>

                    </div>
                    <button onClick={onCloseModal} className="close-modal"><img src={close} alt="close" /></button>
                </div>


            </section>
        )

    } else return (
        <section className="create-modal-container">
            <div className="modal-header">
                <h4>Create new post</h4>
            </div>
            <div className="add-files">
                <img className="create-svg" src={createModalSvg} alt="" />
                <label htmlFor="btn-upload" className="label-upload">Select from computer</label>
                <input id="btn-upload" className="btn-upload" onChange={handleAddPhoto} type="file" />
            </div>
            <button onClick={onCloseModal} className="close-modal">X</button>
        </section>
    )
}


