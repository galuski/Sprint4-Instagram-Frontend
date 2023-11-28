import React from 'react';
import { removeComment } from '../store/post.actions';
import { useSelector } from 'react-redux';
export function MenuComment({comment,onClose}) {
    
    return (
    <section className="menu-comment">
        <button className="delete" onClick={()=>{removeComment(comment.id)}}>Delete</button>
       <button className="cancel" onClick={onClose}>Cancel</button>
    </section>
)
}