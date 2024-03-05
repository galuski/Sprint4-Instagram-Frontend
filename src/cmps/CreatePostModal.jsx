import React, { useRef, useState, useCallback } from "react";
import createModalSvg from '../../public/icons/create-modal.svg'
import createModalBlueSvg from '../../public/icons/create-modal-blue.svg'
import backSvg from '../../public/icons/back.svg'
import close from '../../public/icons/close.svg'
import emojiSvg from '../../public/icons/emoji.svg'
import defaultImage from '../../public/img/users/default_pic.jpg'
import { uploadService } from "../services/upload.service";
import { userService } from '../services/user.service'
import { systemReducer, LOADING_DONE, LOADING_START } from "../store/system.reducer";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from 'react-dropzone'
import EmojisContainer from "./EmojisContainer";

export function CreatePostModal({ onCloseModal, onAddPost }) {
    const dispatch = useDispatch();

    const isLoading = useSelector(storeState => storeState.systemModule?.isLoading)
    const [selectedFile, setSelectedFile] = useState(null);
    const [text, setText] = useState('')
    const [showEmojis, setShowEmojis] = useState(false)
    const loggedUser = useSelector(storeState => storeState.userModule.user)
    let profileImg = loggedUser.imgUrl


    const handleShowEmojis = () => {
        if (showEmojis == true) {
            setShowEmojis(false)
        } else {
            setShowEmojis(true)
        }
    }

    const handleEmojiSelect = (emoji) => {
        setText(prevText => prevText + emoji);
    };

    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        handleAddPhoto(acceptedFiles[0])
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

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
        );
    } else if (selectedFile) {
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
                        <img className="profile-img-circle" src={profileImg || defaultImage} alt="profile" />
                        <span className="username-create-post">{loggedUser.fullname}</span>
                    </div>
                    <textarea className="text-area" rows={10} maxLength={2200} onChange={handleChange} value={text} type="text" placeholder="Write a caption..." ></textarea>
                    <div className="div-chars-emoji">
                        <span className="count-chars">{text.length}/{2200}</span>
                        <button className="emoji-btn"><img src={emojiSvg} onClick={handleShowEmojis} alt="emoji" /></button>
                        {
                            showEmojis && (<EmojisContainer onEmojiSelect={handleEmojiSelect} />)
                        }
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

                {
                    isDragActive ?
                        <img className="create-svg" src={createModalBlueSvg} alt="" /> :
                        <img className="create-svg" src={createModalSvg} alt="" />
                }

                <p {...getRootProps()}>Drag a photo here</p>
                <label htmlFor="btn-upload" className="label-upload">Select from computer</label>
                <input id="btn-upload" className="btn-upload" {...getInputProps()} type="file" />
            </div>
            <button onClick={onCloseModal} className="close-modal">X</button>
        </section>
    )
}