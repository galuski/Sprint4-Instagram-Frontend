import { useEffect, useState } from "react"
import { utilService } from "../services/util.service"
import { useSelector } from "react-redux";
import { SuggestUsersList } from "./SuggestUsersList";
import { Footer } from "./Footer";


export function SuggestFollowers({ users }) {
    const loggedUser = useSelector(storeState => storeState.userModule.user)

    return (
        <section className="suggestFollowers">
           
            <div className="suggest-profile-container">
            <div className="suggest-profile-items">
                <img className="suggest-profile-img" src={loggedUser.imgUrl} alt="Profile" />
                <span className="suggest-username">{loggedUser.fullname}</span>
            </div>
            <button className="switch-btn">Switch</button>
            </div>
            <SuggestUsersList users={users}/>
            <Footer />
            </section>
    )
}