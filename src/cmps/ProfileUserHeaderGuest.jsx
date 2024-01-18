import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { UploadUserPhotoModal } from './UploadUserPhotoModal';
import { useParams } from 'react-router-dom';
import { userService } from '../services/user.service'
import { postService } from '../services/post.service.local';
import DefaultPic from '../../public/img/users/default_pic.jpg'
import dotsSvg from '../../public/icons/dots.svg';
import addUserSvg from '../../public/icons/add-user.svg';

export function ProfileUserHeaderGuest() {
    const user = useSelector(storeState => storeState.userModule.user)
    const { userId } = useParams()
    const [currentUser, setCurrentUser] = useState(null)
    const [postCount, setPostCount] = useState(0)

    let isCurrentUser = user._id === userId

    useEffect(() => {
        const loadUser = async () => {
            try {
                const currUser = await userService.getById(userId)
                const postNum = await postService.getUserPostCount(userId)
                setPostCount(postNum)
                setCurrentUser(currUser)
            } catch (err) {
                console.log('Error loading user', err)
            }
        }

        loadUser()


        return () => {
            // Component unmount
        }
    }, [userId]);

    return (
        <>
            <section className='profile-user-header'>
                <div className='about-container'>
                    <button className='profile-user-header-btn'>
                        <img className="profile-user-header-img" src={currentUser?.imgUrl || DefaultPic} alt="User Img" />
                    </button>
                    <div className='profile-user-info-container'>
                        <div className='settings-area'>
                            <p className='guest-user'>{currentUser?.username}</p>

                                <div className='guest-user-area'>
                                    <button className='follow-btn'>Follow</button>
                                    <button className='message-btn'>Message</button>
                                    <button className='add-btn'><img src={addUserSvg}></img></button>
                                    <button className='dots-btn'><img src={dotsSvg}></img></button>
                                </div>
                            
                        </div>

                        <div className='follows-area'>
                            <span className='count-post'><strong>{postCount}</strong> posts</span>
                            <span className='count-followers'><strong>{504}</strong> followers</span>
                            <span className='count-following'><strong>{520}</strong> following</span>
                        </div>
                        <div className='name-area'>
                            <span>{currentUser?.fullname}</span>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}
