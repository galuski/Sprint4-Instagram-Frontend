import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Sidebar } from '../cmps/Sidebar';
import { ImgUploader } from './ImgUploader';
import { UploadUserPhotoModal } from './UploadUserPhotoModal';
import { useParams } from 'react-router-dom';
import { userService } from '../services/user.service';
import { postService } from '../services/post.service.local';
import Settings from '../../public/icons/Settings.svg'
import DefaultPic from '../../public/img/users/default_pic.jpg'

export function UserUpperPart() {
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
            <div>
                <Sidebar />
            </div>
            <section className='user-upper-part'>
                <section className='internal-user-upper-part'>
                    <button className='user-button' onClick={openMenu}>
                        <img className="empty-user" src={currentUser?.imgUrl || DefaultPic} alt="User Placeholder" />
                    </button>
                    {showMenu && <UploadUserPhotoModal />}

                    <div className='info-container'>
                        <div className='info'>
                            <div>
                                {/* <h2>{currentUser?.username}</h2> */}
                                <h2 className={isCurrentUser ? 'current-user' : 'other-user'}>{currentUser?.username}</h2>

                            </div>
                            {isCurrentUser ? (
                                <>
                                    <button className='edit-profile'>Edit profile</button>
                                    <button className='view-archive'>View Archive</button>
                                    <button className='settings'><img src={Settings} alt='Settings Icon' /></button>
                                </>
                            ) : (
                                <div className='other-user'>
                                    <button className='follow-button'>Follow</button>
                                    <button className='message'>Message</button>
                                    <button className='add-btn'><img src="addUser.svg"></img></button>
                                    <button className='three-dot'><img src="3dot.svg"></img></button>
                                </div>
                            )}
                        </div>
                        <section className='counts'>
                            <div className='details-about-user'>
                                <h4> <span className='count-post'>{postCount}</span>posts</h4>
                                <h4> <span className='count-followers'>{10}</span>followers</h4>
                                <h4><span className='count-following'>{20}</span> following</h4>
                            </div>
                            <div className='fullname-of-user'>
                                <h4>{currentUser?.fullname}</h4>
                            </div>
                        </section>
                    </div>
                </section>
            </section>
        </>
    )
}
