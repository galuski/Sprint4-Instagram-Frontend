import React, { useRef, useState } from "react";
import createModalSvg from '/src/assets/icons/create-modal.svg'
import backSvg from '/src/assets/icons/back.svg'
import { uploadService } from "../services/upload.service";
import { systemReducer, LOADING_DONE, LOADING_START } from "../store/system.reducer";
import { useDispatch, useSelector } from "react-redux";

export function CreatePostModal({ onCloseModal, onAddPost }) {
    const dispatch = useDispatch()
    const isLoading = useSelector(storeState => storeState.systemModule.isLoading)
    const [selectedFile, setSelectedFile] = useState(null);
    const [postTitle, setPostTitle] = useState('')
    function handleInput(ev) {
        console.log(ev.target.value)
        setPostTitle(ev.target.value)
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
                    <hr />
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
                    <p><strong>Create new post</strong></p>
                    <button className="btn-share" onClick={() => onAddPost(postTitle, selectedFile)}>Share</button>
                </div>
                <div className="create-img-container">

                    <img className="create-img" src={selectedFile} alt="Uploaded" />
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', margin: '15px' }}>
                            <img style={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%'
                            }} src='./src/assets/img/posts/post2.jpg' alt="profile" />
                            <strong className="userName-preview">userName</strong>
                        </div>
                        <input onChange={(ev) => handleInput(ev)} value={postTitle} type="text" placeholder="Write a caption..." style={{ border: 'none', margin: '15px', }} />
                    </div>
                    <button onClick={onCloseModal} className="close-modal">X</button>
                </div>


            </section>
        )

    } else return (
        <section className="create-modal-container">
            <div className="modal-header">
                <h4>Create new post</h4>
                <hr />
            </div>
            <div className="add-files">
                <img style={{ width: '150px', margin: '5px auto' }} src={createModalSvg} alt="" />
                <label htmlFor="btn-upload" className="label-upload">Select from computer</label>
                <input id="btn-upload" className="btn-upload" onChange={handleAddPhoto} type="file" />
                <button onClick={onCloseModal} className="close-modal">X</button>
            </div>
        </section>
    )
}


