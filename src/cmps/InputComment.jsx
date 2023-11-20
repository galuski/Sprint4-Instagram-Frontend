import { useState } from 'react'
import { updatePost } from '../store/post.actions'
import emojiSvg from '../assets/icons/emoji.svg'
import EmojisContainer  from "./EmojisContainer";




export  default function InputComment({ post }) {
    const [text, setText] = useState('')
    const [showEmojis, setShowEmojis] = useState(false)


    const handleShowEmojis = () => {
        if (showEmojis == true) {
            setShowEmojis(false)
        } else {
            setShowEmojis(true)
        }
    }

    const handleEmojiSelect = (emoji) => {
        setText(prevText => prevText + emoji);
    };

    async function sendComment(txt) {
        post.comments.push({
            Id: '12',
            imgUrl: './src/assets/img/posts/post2.jpg',
            fullname: 'Gal'
        })
        await updatePost(post)
        setText('')
    }
    return (
        <article className='comment'>
            <input value={text} onChange={(ev) => setText(ev.target.value)} className="comment-input" type="text" placeholder="Add a comment..." />
            <button className="btn-post" onClick={() => sendComment(text, post)}>Post</button>
            <button className="emoji-btn"><img src={emojiSvg} onClick={handleShowEmojis} alt="emoji" /></button>
                            {
                                showEmojis && (<EmojisContainer onEmojiSelect={handleEmojiSelect} />)
                            }
        </article>
    )
}