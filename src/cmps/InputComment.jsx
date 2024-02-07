import { useState, useRef, useEffect } from 'react';
import { updatePost } from '../store/post.actions';
import emojiSvg from '../../public/icons/emoji.svg';
import EmojiPicker from 'emoji-picker-react';
import { useDispatch } from 'react-redux';
import { Emoji } from 'emoji-picker-react';
import { postService } from "../services/post.service";

import { SET_SELECTED_POST } from '../store/post.reducer';

export default function InputComment({ post }) {
    const [text, setText] = useState('');
    const [showEmojis, setShowEmojis] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState(null); // Define selectedEmoji state
    const emojiPickerRef = useRef(null);
    const [comment, setComment] = useState('');
    const [countComment, setCountComment] = useState(post.comments?.length || 0);
    const dispatch = useDispatch();

    useEffect(() => {
        function handleClickOutside(event) {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
                setShowEmojis(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleShowEmojis = () => {
        setShowEmojis(!showEmojis);
    };

    function handleEmojiSelect(emojiData, event) {
        setComment((inputValue) => inputValue + (emojiData.isCustom ? emojiData.unified : emojiData.emoji));
    }

    async function onSendComment() {
        setCountComment((countComment) => countComment + 1);
        const updatedPost = await postService.addComment(post._id, comment);
        dispatch({ type: SET_SELECTED_POST, post: updatedPost });
        setComment('');
        setSelectedEmoji(null);
    }

    return (
        <article className="comment" ref={emojiPickerRef}>
            <input
                type="text"
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => {
                    setComment(e.target.value);
                    setText(e.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        onSendComment();
                    }
                }}
            />

            <div>
                {selectedEmoji && <Emoji unified={selectedEmoji} size={28} />}
                {comment.length > 0 || selectedEmoji ? (
                    <button className="btn-post" onClick={onSendComment}>
                        Post
                    </button>
                ) : null}

                <button onClick={handleShowEmojis} className="emoji">
                    <img src={emojiSvg} alt="emoji" />
                </button>

                <div className="emoji-btn">
                    {showEmojis && <EmojiPicker onEmojiClick={handleEmojiSelect} />}
                </div>
            </div>
        </article>
    );
}