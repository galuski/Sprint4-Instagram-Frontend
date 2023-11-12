import dotsSvg from '/src/assets/icons/dots.svg'
import { EllipsisModal } from './EllipsisModal'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import React, { useState, useEffect } from 'react'

export default function PostPreviewHeader({ post }) {

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
                <img src={post.by?.imgUrl} alt="profile" />
                <strong className="userName-preview">{userName}</strong>
            </div>

            <img className="dots" title="Ellipsis" onClick={openEllipsisModal} src={dotsSvg} alt="" />
            {isEllipsisModalOpen && <EllipsisModal closeEllipsisModal={closeEllipsisModal} pst={post} />}
        </div>
    );
}
