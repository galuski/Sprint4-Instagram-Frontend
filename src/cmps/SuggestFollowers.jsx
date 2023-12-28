import { useEffect, useState } from "react"
import { utilService } from "../services/util.service"
import { useSelector } from "react-redux";
import { SuggestUsersList } from "./SuggestUsersList";
import { useNavigate } from 'react-router-dom';

import { Footer } from "./Footer";


export function SuggestFollowers({ users }) {
    const loggedUser = useSelector(storeState => storeState.userModule.user)
    const navigate = useNavigate();

    function switchUser(){
        navigate('/')
    }
    return (
        <section className="suggestFollowers">
           
            <div className="suggest-profile-container">
            <div className="suggest-profile-items">
                <img className="suggest-profile-img" src={loggedUser.imgUrl} alt="Profile" />
                <span className="suggest-username">{loggedUser.fullname}</span>
            </div>
            <button className="switch-btn" onClick={switchUser}>Switch</button>
            </div>
            <SuggestUsersList users={users}/>
            <Footer />
            </section>
    )
}