import { useParams, useNavigate, Link } from 'react-router-dom'
import { postService } from '../services/post.service.local'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import { useEffect, useState } from 'react'
import { EllipsisModal } from '../cmps/EllipsisModal'
import { CommentDetails } from '../cmps/CommentDetails'
import { CommentList } from '../cmps/CommentList'
import { useDispatch, useSelector } from 'react-redux'
import { userService } from '../services/user.service'
import { loadPost } from '../store/post.actions'
import dotsSvg from '../../public/icons/dots.svg'
import PostActions from '../cmps/PostActions'
import PostStats from '../cmps/PostStats'

export function PostDetails({ openEllipsisModal, closeEllipsisModal, onRemovePost }) {
    // const [pst, setPst] = useState(null)
    const [isEllipsisModalOpen, setIsEllipsisModalOpen] = useState(false)
    const navigate = useNavigate()
    const post = useSelector(storeState => storeState.postModule.selectedPost)
    let userLogged = userService.getLoggedInUser()
    const user = useSelector(storeState => storeState.userModule.user)
    const userId = user._id


    function closeModalWithRouter() {
        navigate(-1)
    }


    const { pstId } = useParams()

    useEffect(() => {
        loadPost(pstId)
    }, [])

    const navigateProfileUser = () => {
        navigate(`/profile/${post.by._id}`);
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

    if (!post) return <p>Loading...</p>
    return (
        <main>
            <section className='post-details'>

                <img className="img-post-details" src={post.imgUrl} alt="post image" />

                <div className='header-post-details'>
                    <div className='header-profile'>
                        <img className='header-profile-img' onClick={navigateProfileUser} src={post.by.imgUrl} alt="pst preview"></img>
                        <span className="header-profile-name">{post.by.fullname}</span>
                    </div>
                    <button className='btn-dots' onClick={openEllipsisModal}><img className="dots" src={dotsSvg}></img></button>
                    {isEllipsisModalOpen && <EllipsisModal closeDotModal={closeEllipsisModal} pst={post}></EllipsisModal>}
                </div>
                <div className='body-post-details'>
                    <div className='body-container-details-modal'>
                        <img className='body-profile-img' onClick={navigateProfileUser} src={post.by.imgUrl}></img>
                        <div className='post-title'>
                        <div className='body-name-post'>
                            <span className="body-profile-name">{post.by.fullname}</span>
                            <p className='body-text'>{post.txt}</p>
                        </div>
                        <p className='time'>{getRandomTimeStringV2()}</p>
                        </div>
                    </div>
                    <div className='container-comment-list'>
                        <CommentList post={post} />
                    </div>
                </div>
                <div className='post-actions-container'>
                <PostActions post = {post} />
                </div>


            </section>
            <div className="overlay" onClick={closeModalWithRouter}></div>
        </main>

    )
}