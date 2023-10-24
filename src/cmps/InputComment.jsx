import { useState } from 'react'

export default InputComment


function InputComment({ post }) {
    const [inputComment, setInputComment] = useState('')
    async function sendComment(txt) {
        post.comments.push({
            Id: '12',
            imgUrl: './src/assets/img/posts/post2.jpg',
            fullname: 'shayel'
        })
        await updatePost(post)
        setInputComment('')
        console.log(post)
    }
    return (
        // <h1>dfs</h1>
        <>
            <input value={inputComment} onChange={(ev) => setInputComment(ev.target.value)} className="comment-input" type="text" placeholder="Add a comment..." />
            <span onClick={() => sendComment(inputComment, post)}>send</span>
        </>
    )
}