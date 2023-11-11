import { useState } from 'react'
import { updatePost } from '../store/post.actions'

export default InputComment


function InputComment({ post }) {
    const [inputComment, setInputComment] = useState('')
    async function sendComment(txt) {
        post.comments.push({
            Id: '12',
            imgUrl: './src/assets/img/posts/post2.jpg',
            fullname: 'Gal'
        })
        await updatePost(post)
        setInputComment('')
        console.log(post)
    }
    return (
        <article className='comment'>
            <input value={inputComment} onChange={(ev) => setInputComment(ev.target.value)} className="comment-input" type="text" placeholder="Add a comment..." />
            <button className="btn-post" onClick={() => sendComment(inputComment, post)}>Post</button>
        </article>
    )
}