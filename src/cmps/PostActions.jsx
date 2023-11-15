import likeSvg from '/src/assets/icons/like.svg'
import commentSvg from '/src/assets/icons/comment.svg'
import sendSvg from '/src/assets/icons/share.svg'
import saveSvg from '/src/assets/icons/save.svg'
import likedSvg from '/src/assets/icons/liked.svg'
import { postService } from '../services/post.service.local'
import { updatePost } from '../store/post.actions'
import { useState } from 'react'
import { PostPreview } from './PostPreview'

export default PostActions


function PostActions({ post }) {
    const [isLike, setIsLike] = useState(false)
    async function onLikePost(id) {
        const post = await postService.getById(id)
        if (isLike) {
            const idx = post.likedBy.findIndex((user, idx) => user.Id === '12')
            post.likedBy.splice(idx, 1)
            await updatePost(post)
            setIsLike(state => !state)

        } else {

            post.likedBy.push({
                Id: '12',
                imgUrl: './src/assets/img/posts/post3/jpg',
                fullName: 'shayel'
            })

            await updatePost(post)
            setIsLike(state => !state)
        }
    }
    return (
        // {openPreview ? <div className="post-preview"><PostPreview onCloseModal={ToggleModal} /></div> : null}
        <div className="actions-container">
            <div className="like-comment-send">
                <img onClick={() => onLikePost(post._id)} src={isLike ? likedSvg : likeSvg} alt="" />

                <img src={commentSvg} alt="" />
                <img src={sendSvg} alt="" />
            </div>
            <div className='save'>
            <img src={saveSvg} alt="" />
            </div>

        </div>
    )
}