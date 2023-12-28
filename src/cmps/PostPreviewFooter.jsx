import React from 'react';
import { Link } from "react-router-dom";
import { utilService } from "../services/util.service";
import { postService } from "../services/post.service.local";
import { useState, useEffect, useRef } from 'react'
import EmojiPicker from 'emoji-picker-react';
import { Emoji, EmojiStyle } from 'emoji-picker-react';
import { PostDetails } from "../pages/PostDetails";

import likeSvg from '../../public/icons/like.svg'
import commentSvg from '../../public/icons/comment.svg'
import sendSvg from '../../public/icons/share.svg'
import saveSvg from '../../public/icons/save.svg'
import likedSvg from '../../public/icons/liked.svg'
import emojiSvg from '../../public/icons/emoji.svg'


import { userService } from "../services/user.service";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';


import { closeModal, openModal, updatePost } from "../store/post.actions";

export default function PostPreviewFooter({ post }) {

    const { txt, imgUrl, by, _id, comments, likedBy, uploadTime } = post
    const [isLiked, setIsLiked] = useState()
    const [likeUrl, setLikeUrl] = useState(likeSvg)
    const [comment, setComment] = useState('')
    const [inputValue, setInputValue] = useState("")
    const [selectedEmoji, setSelectedEmoji] = useState("")
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)



    const [newComment, setNewComment] = useState('')
    const [countComment, setCountComment] = useState(post.comments?.length || 0)

    var [likesCount, setLikesCount] = useState(likedBy?.length || 0)
    let loggedUser = userService.getLoggedInUser()



    useEffect(() => {
        const bIsLiked = post.likedBy.find(user => userService.getLoggedInUser()._id === user._id) ? true : false

        setIsLiked(bIsLiked)
        bIsLiked ? setLikeUrl(likedSvg) : setLikeUrl(likeSvg)

        function handleClickOutside(event) {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
                setShowEmojiPicker(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const emojiPickerRef = useRef(null);
    function openMenuEmoji() {
        setShowEmojiPicker(!showEmojiPicker);
    }

    async function toggleLike() {
        if (isLiked) {
            setLikeUrl(likeSvg)
            setIsLiked(false)
            setLikesCount(likesCount - 1)
            const pstCpy = { ...post }
            const idx = post.likedBy.findIndex(user => user._id === loggedUser._id)
            pstCpy.likedBy.splice(idx, 1)
            updatePost(post)

        } else {
            setLikeUrl(likedSvg)
            setIsLiked(true)
            setLikesCount(likesCount + 1)
            const pstCpy = { ...post }
            pstCpy.likedBy.push(loggedUser)
            updatePost(post)
        }
    }

    function openDetailsModal() {
        
    }

    function onSendComment() {
        setCountComment(prevCount => prevCount + 1)
        setNewComment(comment)
        postService.addComment(post._id, comment);
        setComment('');
        setInputValue('');
    }

    function onClick(emojiData, event) {
        setComment(
            (inputValue) =>
                inputValue + (emojiData.isCustom ? emojiData.unified : emojiData.emoji)
        );
    }

    return (
        <section className='post-preview-footer'>

            <div className="actions-container">
                <div className="like-comment-send">
                    <img onClick={toggleLike} src={likeUrl} alt="" />
                    <Link to={`/pst/${post._id}`}>
                        <img onClick={openDetailsModal} src={commentSvg} alt="" />
                    </Link>
                    <img src={sendSvg} alt="" />
                </div>
                <div className='save'>
                    <img src={saveSvg} alt="" />
                </div>
            </div>

            <div className="post-stats">
                {likesCount > 0 && (
                    <p className="likes-stats"><strong>
                        {likesCount} {likesCount === 1 ? 'like' : 'likes'}
                    </strong></p>
                )}
                {likesCount === 0 && (
                    <p className="likes-stats">
                        {likesCount === 1 ? 'Be the first to like' : 'Be the first to like'}
                    </p>
                )}
                <span className="username-preview">{post.by?.fullname}</span>
                <p>{post.txt}</p>
                
            </div>
            <div className="comment-text-area">
                    <div className="view-comments">
                        {countComment > 0 && (
                            <Link to={`/pst/${post._id}`}>
                                <button className="view-all-comments" onClick={openDetailsModal}>
                                    {countComment === 1 ? 'View 1 comment' : `View all ${countComment} comments`}
                                </button>
                            </Link>
                        )}
                    </div>


                    {newComment &&
                        (<div className="new-comment">
                            <div className="new-comment-user">
                            <span className="username-preview">{loggedUser.username}</span>
                            {newComment}
                            </div>
                            <div className="like-preview">
                            <button className="btn-like-preview" onClick={toggleLike}>
                                <img src={likeUrl} alt="like" />
                            </button>
                            </div>
                        </div>)}
                    <div className="comment-input-container" ref={emojiPickerRef}>
                        <input className='post-preview-input' type="text" placeholder="Add a comment..." value={comment} onChange={(e) => { setComment(e.target.value); setInputValue(e.target.value) }}

                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {  // Check for Enter key press without Shift
                                    e.preventDefault();  // Prevent default to avoid newline in input
                                    onSendComment();     // Call the function to handle comment submission
                                }
                            }}



                        />
                        <div className="emoji-Post">
                            {<Emoji unified={selectedEmoji} size={28} />}
                            {comment.length > 0 || selectedEmoji ? (
                                <button className="post-btn" onClick={onSendComment}>Post</button>
                            ) : null}

                            <button onClick={openMenuEmoji} className="emoji-post-btn"><img className="emjoi-btn1" src={emojiSvg}></img></button>

                            <div className="emojis-container">
                                {showEmojiPicker && <EmojiPicker onEmojiClick={onClick} />}
                            </div>

                        </div>
                    </div>
                </div>

        </section>
    )
}