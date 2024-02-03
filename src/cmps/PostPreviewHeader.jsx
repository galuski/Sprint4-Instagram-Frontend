import dotsSvg from '../../public/icons/dots.svg'
import { EllipsisModal } from './EllipsisModal'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { userService } from '../services/user.service'



export default function PostPreviewHeader({ post }) {
    const navigate = useNavigate();
    const user = userService.getLoggedInUser()
    // console.log('post.by',post.by?._id, user?._id)
    let isCurrentUser = user?._id === post.by?._id

    function navigateProfileUser() {

        if (isCurrentUser) {
            navigate(`/profile/${post.by._id}/psts`);
        } else {
            navigate(`/profile-g/${post.by._id}/psts`);
        }
    }
    
        
        
    

    const userName = post.by?.fullname
    const [isEllipsisModalOpen, setIsEllipsisModalOpen] = useState(false)

    useEffect(() => {

        return () => {
            clearAllBodyScrollLocks()
        };
    }, []);

    function openEllipsisModal() {
        setIsEllipsisModalOpen(true)
        disableBodyScroll(document.body)
    }

    function closeEllipsisModal() {
        setIsEllipsisModalOpen(false)
        enableBodyScroll(document.body)
    }
    return (
        <div className="post-preview-header">
            <div>
                <img className='preview-profile-img' onClick={navigateProfileUser} src={post.by?.imgUrl} alt="profile" />
                <strong className="username-preview">{userName}</strong>
            </div>

            <img className="dots" title="Ellipsis" onClick={openEllipsisModal} src={dotsSvg} alt="" />
            {isEllipsisModalOpen && <EllipsisModal closeEllipsisModal={closeEllipsisModal} pst={post} />}
        </div>
    );
}
