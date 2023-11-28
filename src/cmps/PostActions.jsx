import likeSvg from '../../public/icons/like.svg'
import commentSvg from '../../public/icons/comment.svg'
import sendSvg from '../../public/icons/share.svg'
import saveSvg from '../../public/icons/save.svg'
import likedSvg from '../../public/icons/liked.svg'
import { postService } from '../services/post.service.local'
import { updatePost } from '../store/post.actions'
import { useState } from 'react'
import { PostPreview } from './PostPreview'
import { useSelector } from 'react-redux'
import { PostDetails } from '../pages/PostDetails'
import { Link } from 'react-router-dom'

export default function PostActions({ post }) {
    const loggedUser = useSelector(storeState => storeState.userModule.user)
    const [isLike, setIsLike] = useState(false)

    async function onLikePost(id) {
        const post = await postService.getById(id)
        if (isLike) {
            const idx = post.likedBy.findIndex((user, idx) => user.Id === loggedUser.id)
            post.likedBy.splice(idx, 1)
            await updatePost(post)
            setIsLike(state => !state)

        } else {

            post.likedBy.push({
                Id: loggedUser.id,
                imgUrl: loggedUser.imgUrl,
                fullName: loggedUser.fullName
            })

            await updatePost(post)
            setIsLike(state => !state)
        }

    }
    
    function openDetailsModal() {

    }

    return (
        <>
        {/* // {openPreview ? <div className="post-preview"><PostPreview onCloseModal={ToggleModal} /></div> : null} */}
        <div className="actions-container">
            <div className="like-comment-send">
                <img onClick={() => onLikePost(post._id)} src={isLike ? likedSvg : likeSvg} alt="" />
                <Link to={`/pst/${post._id}`}>
                <img onClick={openDetailsModal} src={commentSvg} alt="" />
                </Link>
                <img src={sendSvg} alt="" />
            </div>
            <div className='save'>
            <img src={saveSvg} alt="" />
            </div>

        </div>
        </>
    )
}