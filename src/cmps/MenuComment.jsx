import React from 'react';
import { useDispatch } from 'react-redux';
import { removeComment } from '../store/post.actions';

export function MenuComment({ comment, onClose }) {
    const dispatch = useDispatch();

    const handleDeleteComment = () => {
        dispatch(removeComment(comment.id));
        onClose(); // Close the menu after deleting the comment
    };

    return (
        <section className="menu-comment">
            <button className="delete" onClick={handleDeleteComment}>
                Delete
            </button>
            <button className="cancel" onClick={onClose}>
                Cancel
            </button>
        </section>
    );
}