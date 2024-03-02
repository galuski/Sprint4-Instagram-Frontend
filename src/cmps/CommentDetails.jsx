import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ms from 'ms';
import { MenuComment } from './MenuComment';
import { useNavigate } from 'react-router-dom'
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
    const navigate = useNavigate()

    const toggleMenu = () => {
        setMenuVisible(!isMenuVisible);
    }

    useEffect(() => {
        const bIsLiked = post.comments.find(user => userService.getLoggedInUser()?._id === user?._id) ? true : false
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
    
    const navigateProfileUser = () => {
        navigate(`/profile/${comment.by._id}`)
    }

    return (
        <section className="comment-details">
            <img className='profile-comment-img' src={comment.by.imgUrl || DefaultImg} alt="profile"></img>
            <div className="comment">
                <div className='comment-data'>
                    <span className="username-comment">{comment.by.fullname}</span>
                    <p className='user-comment'>{comment.txt}</p>
                </div>

                <div className='comment-details-actions'>
                    {/* Display time difference for the comment */}
                    <p className='comment-date-time'>{ms(Date.now() - comment.time)}</p>
                    {likesCommentCount > 0 && <p className="comment-count-likes">{likesCommentCount} {likesCommentCount === 1 ? 'like' : 'likes'}</p>}
                    <p className='comment-reply'>Reply</p>
                    <img className='three-dot-comment' src={dots} onClick={toggleMenu} alt="menu"></img>
                    {isMenuVisible && <MenuComment comment={comment} onClose={toggleMenu} />}
                </div>

                {isMenuComment && <MenuComment comment={comment} />}
            </div>
            <img className="btn-like-comment" src={likeCommentUrl} onClick={toggleLikeComment} alt="like"></img>
        </section>
    )
}
