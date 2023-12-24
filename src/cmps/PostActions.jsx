import { useState, useRef, useEffect } from 'react'
import likeSvg from '../../public/icons/like.svg'
import commentSvg from '../../public/icons/comment.svg'
import sendSvg from '../../public/icons/share.svg'
import saveSvg from '../../public/icons/save.svg'
import likedSvg from '../../public/icons/liked.svg'
import { postService } from '../services/post.service.local'
import { updatePost } from '../store/post.actions'
import { PostPreview } from './PostPreview'
import { useSelector } from 'react-redux'
import { PostDetails } from '../pages/PostDetails'
import { Link } from 'react-router-dom'


export default function PostActions({ post }) {
    const [likeUrl, setLikeUrl] = useState(likeSvg)
    const [isLiked, setIsLiked] = useState()
    const loggedUser = useSelector(storeState => storeState.userModule.user)
    var [likesCount, setLikesCount] = useState(likedBy?.length || 0)


    useEffect(() => {
        const bIsLiked = post.likedBy.find(user => userService.getLoggedInUser()._id === user._id) ? true : false
    
        setIsLiked(bIsLiked)
        bIsLiked ? setLikeUrl(likedSvg) : setLikeUrl(likeSvg)
    
    }, []);

    async function toggleLike() {
        if (isLiked) {
            setLikeUrl(likeSvg)
            setIsLiked(false)
            setLikesCount(likesCount - 1)
            const pstCpy = { ...post }
            const idx = post.likedBy.findIndex(user => user._id === loggedUser._id)
            pstCpy.likedBy.splice(idx, 1)
            updatePost(pst)

        } else {
            setLikeUrl(likedSvg)
            setIsLiked(true)
            setLikesCount(likesCount + 1)
            const pstCpy = { ...post }
            pstCpy.likedBy.push(loggedUser)
            updatePost(post)
        }
    }

    function openDetailsModal() {
        // Implement your logic for opening the details modal
    }

    return (
        <>
            <div className="actions-container">
                <div className="like-comment-send">
                    <img onClick={toggleLike} src={likeUrl} alt="" />
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
