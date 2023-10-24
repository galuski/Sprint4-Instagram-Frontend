import dotsSvg from '/src/assets/icons/dots.svg'
import likeSvg from '/src/assets/icons/like.svg'
import commentSvg from '/src/assets/icons/comment.svg'
import sendSvg from '/src/assets/icons/share.svg'
import saveSvg from '/src/assets/icons/save.svg'
import { postService } from '../services/post.service.local'
import { useSelector } from 'react-redux'
import { updatePost } from '../store/post.actions'
import { useState } from 'react'
import likedSvg from '/src/assets/icons/liked.svg'

export function PostList({ posts, onDeletePost }) {
    return (
        <>
            {posts.map(post => <PostPreview onDeletePost={onDeletePost} key={post._id} post={post} />)}
        </>
    )
}

function PostPreview({ post, onDeletePost }) {

    return (
        <article className="post-preview">
            <PostPreviewHeader onDeletePost={onDeletePost} post={post} />
            <PostImage img={post.imgUrl} />
            <PostActions post={post} />
            <PostStats post={post} />
            <InputComment post={post} />
            <hr />
        </article>
    )
}

function PostPreviewHeader({ post, onDeletePost }) {

    return (
        <div className="post-preview-header">
            <div>
                <img src={post.by?.imgUrl} alt="profile" />
                <strong className="userName-preview">{post.by?.fullname}</strong>
            </div>

            <img title='Delete post' onClick={() => onDeletePost(post._id)} src={dotsSvg} alt="" />
        </div>
    )
}
function PostImage({ img }) {
    return (
        <div className="post-img-container">
            <img className="post-img" src={img} alt="profile" />
        </div>
    )
}
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

        <div className="actions-container">
            <div className="like-comment-send">
                <img onClick={() => onLikePost(post._id)} src={isLike ? likedSvg : likeSvg} alt="" />

                <img src={commentSvg} alt="" />
                <img src={sendSvg} alt="" />
            </div>
            <img src={saveSvg} alt="" />

        </div>
    )
}
function PostStats({ post }) {
    return (
        <>
            <p className="likes-stats">{post.likedBy?.length} likes</p>
            <p className="name-stats"><strong className="name-color" > {post.by?.fullname} </strong>{post.txt}</p>
            {post.comments ? <p className="comments-stats">View all {post.comments.length} comments</p> : null}
        </>
    )
}
function InputComment({ post }) {
    const [inputComment, setInputComment] = useState('')
    async function sendComment(txt) {
        post.comments.push({
            Id:'12',
            imgUrl:'./src/assets/img/posts/post2.jpg',
            fullname:'shayel'
        })
       await updatePost(post)
       setInputComment('')
       console.log(post)
    }
    return (
        // <h1>dfs</h1>
        <>
            <input value={inputComment} onChange={(ev) => setInputComment(ev.target.value)} className="comment-input" type="text" placeholder="Add a comment..." />
            <span onClick={() => sendComment(inputComment,post)}>send</span>
        </>
    )
}