import { postService } from '../services/post.service.local';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MenuComment } from './MenuComment';
import { useParams, useNavigate, Link } from 'react-router-dom'
import { closeModal, openModal, updatePost} from "../store/post.actions";
import dots from '../../public/icons/dots.svg'
import likeSvg from '../../public/icons/like.svg'
import likedSvg from '../../public/icons/liked.svg'
import DefaultImg from '../../public/img/users/default_pic.jpg'

export function CommentDetails({ post, comment }) {
    const [likeUrl, setLikeUrl] = useState(likeSvg)

    const [likeCommentUrl, setLikeCommentUrl] = useState(likeSvg)
    const [isLiked, setIsLiked] = useState(false)

    const [isLikedComment, setIsLikedComment] = useState(likeSvg)

    const user = useSelector(storeState => storeState.userModule.user)
    const [isMenuComment, setMenuComment] = useState(false)
    const { txt, imgUrl, by, _id, comments, likedBy, uploadTime } = post
    const [likesCount, setLikesCount] = useState(likedBy?.length || 0)

    const [likesCommentCount, setLikesCommentCount] = useState(comment.likedBy?.length || 0)

    const [isMenuVisible, setMenuVisible] = useState(false)
    const userId = user._id
    let loggedUser = userService.getLoggedInUser()

    const navigate = useNavigate()

    const toggleMenu = () => {
        setMenuVisible(!isMenuVisible);
    }



    useEffect(() => {
        const bIsLiked = post.comments.find(user => userService.getLoggedInUser()._id === user._id) ? true : false

        setIsLiked(bIsLiked)
        bIsLiked ? setLikeUrl(likedSvg) : setLikeUrl(likeSvg)

    }, [])


    async function toggleLikeComment() {
        if (isLikedComment) {
            setLikeCommentUrl(likeSvg)
            setIsLikedComment(false)
            setLikesCommentCount(likesCommentCount - 1)
        } else {
            setLikeCommentUrl(likedSvg)
            setIsLikedComment(true)
            setLikesCommentCount(likesCommentCount + 1)
        }
    }
    

    async function toggleLike() {
        if (isLiked) {
            setLikeUrl(likeSvg)
            setIsLiked(false)
            setLikesCount(likesCount - 1)
            const postCopy = { ...post }
            const idx = post.likedBy.findIndex(user => user._id === loggedUser._id)
            postCopy.likedBy.splice(idx, 1)
            updatePost(post)

        } else {
            setLikeUrl(likedSvg)
            setIsLiked(true)
            setLikesCount(likesCount + 1)
            const postCopy = { ...post }
            postCopy.likedBy.push(loggedUser)
            updatePost(post)
        }
    }

    function openMenuComment() {
        setMenuComment(!isMenuComment)
    }

    const navigateProfileUser = () => {
        navigate(`/profile/${comment.by._id}`)
    }
    function getRandomTimeStringV2() {
        // Decide randomly whether to return hours or minutes
        const isHour = Math.random() < 0.5;

        if (isHour) {
            // Generate a random hour between 1 and 3
            const hour = Math.floor(Math.random() * 3) + 1;
            return `${hour}h`;
        } else {
            // Generate a random minute between 1 and 59
            const minute = Math.floor(Math.random() * 59) + 1;
            return `${minute}m`;
        }
    }

    // Example usage:

    return (
        <section className="comment-details">
            <img className='profile-comment-img' onClick={navigateProfileUser}
                src={comment.by.imgUrl || DefaultImg}>
            </img>
            <div className="comment">
                <div className='comment-data'>
                    <span className="username-comment">{comment.by.fullname}</span>
                    <p className='user-comment'>{comment.txt}</p>
                </div>

                <div className='comment-details-actions'>
                    <p className='comment-date-time'>{getRandomTimeStringV2()}</p>
                    {likesCommentCount > 0 && <p className="comment-count-likes">{likesCommentCount} {likesCommentCount === 1 ? 'like' : 'likes'}</p>}
                    <p className='comment-reply'>Reply</p>
                    <img className='three-dot-comment' src={dots} onClick={toggleMenu}></img>
                    {isMenuVisible && <MenuComment comment={comment} onClose={toggleMenu} />}
                </div>

                {isMenuComment && <MenuComment comment={comment} />}
            </div>
            <img className="btn-like-comment" src={likeCommentUrl} onClick={toggleLikeComment}></img>
        </section>
    )
}
