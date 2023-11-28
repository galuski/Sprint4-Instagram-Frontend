import { useParams, useNavigate, Link } from 'react-router-dom'
import { postService } from '../services/post.service.local'
import { useEffect, useState } from 'react'
import { EllipsisModal } from '../cmps/EllipsisModal'
import { CommentDetails } from '../cmps/CommentDetails'
import { CommentList } from '../cmps/CommentList'
import { useDispatch, useSelector } from 'react-redux'
import { userService } from '../services/user.service'
import { loadPost } from '../store/post.actions'
import dotsSvg from '../../public/icons/dots.svg'

export function PostDetails({ openEllipsisModal, closeEllipsisModal, onRemovePost }) {
    // const [pst, setPst] = useState(null)
    const [isEllipsisModalOpen, setIsEllipsisModalOpen] = useState(false)
    const navigate = useNavigate()
    const post = useSelector(storeState => storeState.postModule.selectedPost)
    let userLogged = userService.getLoggedinUser()
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



    if (!post) return <p>Loading...</p>
    return (
        <section className="post-details-container">
            <section className='post-details'>
                <div className='img-side-details'>
                     <img className="details-img" src= {post.imgUrl} alt="post image" />
                </div>

                <div className='header-details-modal'>
                                <img className='profile-header-img' onClick={navigateProfileUser} src={post.by.imgUrl} alt="pst preview"></img>
                                <h4 style={{ marginTop: '6px' }}>{post.by.fullname}</h4>
                                <button onClick={openEllipsisModal}><img className="dots" src={dotsSvg}></img></button>
                                {isEllipsisModalOpen && <EllipsisModal closeDotModal={closeEllipsisModal} onRemovePst={() => onRemovePost(post._id)}></EllipsisModal>}
                </div>
                        <div className='body-container-details-modal'>
                            <section className='first'>
                                <button onClick={navigateProfileUser}>
                                    <img className='profile-details-img' src={post.by.imgUrl}></img>
                                </button>
                                <h4 className='post-by'>{post.by.fullname}</h4>
                                <h4>{post.txt}</h4>
                            </section>
                            <div className='time-div'>
                                <p className='timee'>{getRandomTimeStringV2()}</p>
                            </div>
                        </div>


                        <CommentList pst={post} />          

            </section>
            <div className="overlay" onClick={closeModalWithRouter}></div>
        </section>

    )
}