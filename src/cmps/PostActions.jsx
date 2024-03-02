import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { postService } from '../services/post.service';
import { userService } from '../services/user.service';
import { utilService } from '../services/util.service';
import { updatePost } from '../store/post.actions';
import { useDispatch, useSelector } from 'react-redux';
import EmojiPicker, { Emoji } from 'emoji-picker-react'; // Import Emoji from 'emoji-picker-react'
import likeSvg from '../../public/icons/like.svg';
import commentSvg from '../../public/icons/comment.svg';
import sendSvg from '../../public/icons/share.svg';
import saveSvg from '../../public/icons/save.svg';
import likedSvg from '../../public/icons/liked.svg';
import emojiSvg from '../../public/icons/emoji.svg';
import ms from 'ms'


export default function PostActions() {
    const dispatch = useDispatch();
    const post = useSelector(storeState => storeState.postModule.selectedPost);

    const { likedBy } = post;
    const [isLiked, setIsLiked] = useState(false);
    const [likeUrl, setLikeUrl] = useState(likeSvg);
    const [comment, setComment] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [selectedEmoji, setSelectedEmoji] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [countComment, setCountComment] = useState(post.comments?.length || 0);
    const [likesCount, setLikesCount] = useState(likedBy?.length || 0);
    const loggedUser = userService.getLoggedInUser();

    const user = userService.getLoggedInUser()

    useEffect(() => {

        const bIsLiked = likedBy.find((user) => user._id === loggedUser._id) ? true : false;

        setIsLiked(bIsLiked);
        bIsLiked ? setLikeUrl(likedSvg) : setLikeUrl(likeSvg);

        function handleClickOutside(event) {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
                setShowEmojiPicker(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [likedBy, loggedUser]);

    const emojiPickerRef = useRef(null);

    function openMenuEmoji() {
        setShowEmojiPicker(!showEmojiPicker);
    }

    function getRandomTimeStringV2() {
        const isHour = Math.random() < 0.5;

        if (isHour) {
            const hour = Math.floor(Math.random() * 3) + 1;
            return `${hour}h`;
        } else {
            const minute = Math.floor(Math.random() * 59) + 1;
            return `${minute}m`;
        }
    }

    async function toggleLike() {
        if (isLiked) {
            setLikeUrl(likeSvg);
            setIsLiked(false);
            setLikesCount((prevLikesCount) => prevLikesCount - 1);
            const pstCpy = { ...post };
            const idx = pstCpy.likedBy.findIndex((user) => user._id === loggedUser._id);
            pstCpy.likedBy.splice(idx, 1);
            dispatch(updatePost(pstCpy));
        } else {
            setLikeUrl(likedSvg);
            setIsLiked(true);
            setLikesCount((prevLikesCount) => prevLikesCount + 1);
            const pstCpy = { ...post };
            pstCpy.likedBy.push(loggedUser);
            dispatch(updatePost(pstCpy));
        }
    }

    function onSendComment() {
        setCountComment((prevCount) => prevCount + 1);
        setNewComment(comment);
        const fullComment = {
            id: utilService.makeId(),
            by: loggedUser,
            txt: comment,
            time: Date.now(),
            likedBy: []
        }
        post.comments.push(fullComment)

        postService.save(post,post._id).then((updatedPost) => {
            dispatch({ type: 'SET_SELECTED_POST', post: updatedPost });
        });
        setComment('');
        setInputValue('');
    }
    

    function onClick(emojiData) {
        setComment((input) => input + (emojiData.isCustom ? emojiData.unified : emojiData.emoji));
    }

    function openDetailsModal() {

    }

    return (
        <section className="post-actions-container">
            <div className="post-actions">
                <div className="like-comment-send">
                    <img onClick={toggleLike} src={likeUrl} alt="" />
                    <Link to={`/pst/${post._id}`}>
                        <img onClick={openDetailsModal} src={commentSvg} alt="" />
                    </Link>
                    <img src={sendSvg} alt="" />
                </div>
                <div className="save">
                    <img src={saveSvg} alt="" />
                </div>
            </div>

            <div className="post-stats">
                {likesCount > 0 && (
                    <p className="likes-stats">
                        <strong>
                            {likesCount} {likesCount === 1 ? 'like' : 'likes'}
                        </strong>
                    </p>
                )}
                {likesCount === 0 && (
                    <p className="likes-stats">
                        {likesCount === 1 ? 'Be the first to like' : 'Be the first to like'}
                    </p>
                )}
                <p className='time'>{ms(Date.now()-(post.time))}</p>

            </div>

            <div className="comment-actions-container" ref={emojiPickerRef}>
                <div className="actions-emoji-Post">
                    {<Emoji unified={selectedEmoji} size={28} />}
                    <button onClick={openMenuEmoji} className="emoji-post-btn">
                        <img className="emjoi-btn1" src={emojiSvg} alt="emoji" />
                    </button>
                    <div className="emojis-container">
                        {showEmojiPicker && <EmojiPicker onEmojiClick={onClick} />}
                    </div>
                </div>

                <input
                    className="post-actions-input"
                    type="text"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => {
                        setComment(e.target.value);
                        setInputValue(e.target.value);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            onSendComment();
                        }
                    }}
                />
                {comment.length > 0 || selectedEmoji ? (
                    <button className="actions-post-btn" onClick={onSendComment}>
                        Post
                    </button>
                ) : null}
            </div>
        </section>
    );
}