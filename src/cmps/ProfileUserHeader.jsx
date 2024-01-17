import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ImgUploader } from './ImgUploader';
import { UploadUserPhotoModal } from './UploadUserPhotoModal';
import { useParams } from 'react-router-dom';
import { userService } from '../services/user.service'
import { postService } from '../services/post.service.local';
import Settings from '../../public/icons/Settings.svg'
import DefaultPic from '../../public/img/users/default_pic.jpg'
import dotsSvg from '../../public/icons/dots.svg';
import addUserSvg from '../../public/icons/add-user.svg';

export function ProfileUserHeader() {
    const user = useSelector(storeState => storeState.userModule.user)
    const { userId } = useParams()
    const [currentUser, setCurrentUser] = useState(null)
    const [showMenu, setShowMenu] = useState(false)
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

    function openMenu() {
        setShowMenu(!showMenu);
    }
    return (
        <>
            <section className='profile-user-header'>
                <div className='about-container'>
                    <button className='profile-user-header-btn' onClick={openMenu}>
                        <img className="profile-user-header-img" src={currentUser?.imgUrl || DefaultPic} alt="User Img" />
                    </button>
                    {showMenu && <UploadUserPhotoModal />}

                    <div className='profile-user-info-container'>
                        <div className='settings-area'>
                            <p className={isCurrentUser ? 'current-user' : 'guest-user'}>{currentUser?.username}</p>
                            {isCurrentUser ? (
                                <>
                                    <button className='edit-profile-btn'>Edit profile</button>
                                    <button className='view-archive-btn'>View Archive</button>
                                    <button className='settings-btn'><img src={Settings} alt='Settings Icon' /></button>
                                </>
                            ) : (
                                <div className='guest-user-area'>
                                    <button className='follow-btn'>Follow</button>
                                    <button className='message-btn'>Message</button>
                                    <button className='add-btn'><img src={addUserSvg}></img></button>
                                    <button className='dots-btn'><img src={dotsSvg}></img></button>
                                </div>
                            )}
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
