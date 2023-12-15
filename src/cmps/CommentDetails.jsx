import { postService } from '../services/post.service.local';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MenuComment } from './MenuComment';
import { useParams, useNavigate, Link } from 'react-router-dom'
import { closeModal, openModal, updatePost } from "../store/post.actions";
import dots from '../../public/icons/dots.svg'
import like from '../../public/icons/like.svg'
import liked from '../../public/icons/liked.svg'
import DefaultImg from '../../public/img/users/default_pic.jpg'

export function CommentDetails({ pst, comment }) {
    const [likeUrl, setLikeUrl] = useState(like)
    const [isLiked, setIsLiked] = useState(false)
    const user = useSelector(storeState => storeState.userModule.user)
    const [isMenuComment, setMenuComment] = useState(false)
    const { txt, imgUrl, by, _id, comments, likedBy, uploadTime } = pst
    const [likesCount, setLikesCount] = useState(likedBy?.length || 0)
    const [isMenuVisible, setMenuVisible] = useState(false)
    const userId = user._id
    let loggedUser = userService.getLoggedinUser()

    const navigate = useNavigate()

    const toggleMenu = () => {
        setMenuVisible(!isMenuVisible);
    }


    
    useEffect(() => {
        const bIsLiked = pst.likedBy.find(user => userService.getLoggedinUser()._id === user._id) ? true : false

        setIsLiked(bIsLiked)
        bIsLiked ? setLikeUrl("red-likes.svg") : setLikeUrl(like)
    }, [])


    async function toggleLike() {
        if (isLiked) {
            setLikeUrl(like)
            setIsLiked(false)
            setLikesCount(likesCount - 1)
            const pstCpy = { ...pst }
            const idx = pst.likedBy.findIndex(user => user._id === loggedUser._id)
            pstCpy.likedBy.splice(idx, 1)
            updatePost(pst)

        } else {
            setLikeUrl(liked)
            setIsLiked(true)
            setLikesCount(likesCount + 1)
            const pstCpy = { ...pst }
            pstCpy.likedBy.push(loggedUser)
            updatePost(pst)
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
            <div className="comment">
                    <button className='profile-comment-img' onClick={navigateProfileUser}>
                        <img src={comment.by.imgUrl || DefaultImg}></img>
                    </button>

                <div className='comment-data'>
                        <span className="username-comment">{comment.by.fullname}</span>
                        <p className='user-comment'>{comment.txt}</p>


                    <div className='textual-2'>
                        <p className='comment-date-time'>{getRandomTimeStringV2()}</p>
                        {likesCount > 0 && <p className="comment-count-likes">{likesCount} {likesCount === 1 ? 'like' : 'likes'}</p>}
                        <p className='comment-reply'>Reply</p>
                        <button className='three-dot-comment' onClick={toggleMenu}><img src={dots}></img></button>
                        {isMenuVisible && <MenuComment comment={comment} onClose={toggleMenu} />}
                    </div>
                </div>
                {isMenuComment && <MenuComment comment={comment} />}
            </div>
                <button className="btn-like-comment" onClick={toggleLike}>
                    <img src={likeUrl}></img>
                </button>
        </section>
    )
}
