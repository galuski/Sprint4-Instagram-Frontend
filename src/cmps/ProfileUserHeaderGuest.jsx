
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Sidebar } from '../cmps/Sidebar'
import dotsSvg from '../../public/icons/dots.svg';
import addUserSvg from '../../public/icons/add-user.svg';

export function ProfileUserHeaderGuest() {
    const user = useSelector(storeState => storeState.userModule.user)
    const pst = useSelector(storeState => storeState.pstModule.selectedPost)
    console.log("pst from upper", pst)

    return (
        <section className="user-upper-part-other">
            <div>
                <Sidebar />
            </div>
            <section className='internal-user-upper-part'>
                <div className='other-user-profile'>
                    <img src={user.imgUrl} alt="User Placeholder" />
                </div>
                <div className='info-container'>
                    <div className='info'>
                        <h2>{user.username}</h2>
                        <button>Following</button>
                        <button><img src={addUserSvg}></img></button>
                        <button><img src={dotsSvg}></img></button>

                    </div>
                    <section className='counts'>
                        <div className='details-about-user'>

                            <h4> <span className='count-post'>{10}</span>posts</h4>
                            <h4> <span className='count-followers'>{10}</span>followers</h4>
                            <h4><span className='count-following'>{20}</span> following</h4>
                        </div>
                        <div className='fullname-of-user'>
                            <h4>{user.fullname}</h4>
                        </div>

                    </section>
                </div>
            </section>
        </section>
    )
}