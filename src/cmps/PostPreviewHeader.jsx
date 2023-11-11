import dotsSvg from '/src/assets/icons/dots.svg'
import { EllipsisModal } from "./EllipsisModal"
import React from 'react';
const { useState } = React




// export default PostPreviewHeader

export default function PostPreviewHeader({ post, onEllipsis}) {
    const [isEllipsisModalOpen, setIsEllipsisModalOpen] = useState(false)

    function openEllipsisModal() {
        setIsEllipsisModalOpen(true)
    }
    function closeEllipsisModal() {
        setIsEllipsisModalOpen(false)
    }

    return (
        <div className="post-preview-header">
            <div>
                <img src={post.by?.imgUrl} alt="profile" />
                <strong className="userName-preview">{post.by?.fullname}</strong>
            </div>

            <img className='dots' title='Ellipsis' onClick= { openEllipsisModal } src={dotsSvg} alt="" />
            {isEllipsisModalOpen && <EllipsisModal closeEllipsisModal={closeEllipsisModal} pst={post}></EllipsisModal>}

        </div>
    )
}

// onClick={() => onDeletePost(post._id)} src={dotsSvg} alt=""