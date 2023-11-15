import React, { useEffect, useRef } from 'react';
import { removePost } from "../store/post.actions";

export function EllipsisModal({ closeEllipsisModal, pst}) {
  
    const modalRef = useRef(null);

    useEffect(() => {
      function handleClickOutside(event) {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          closeEllipsisModal();
        }
      }
  
    
      document.addEventListener('mousedown', handleClickOutside);
  
     
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [closeEllipsisModal]);

    return (
        <div className="modal-overlay">
        <section className="ellipsis-modal" ref={modalRef}>
            <button className="ellipsis-btn" style={{ color: '#ed4956',fontWeight: 'bold'  }} onClick={()=>{removePost(pst._id)}}>Delete</button>
            <button className="ellipsis-btn" style={{ color: '#ed4956',fontWeight: 'bold'  }}>Report</button>
            <button className="ellipsis-btn">Unfollow</button>
            <button className="ellipsis-btn">Add to favorites</button>
            <button className="ellipsis-btn">Not Interested</button>
            <button className="ellipsis-btn">Go to post</button>
            <button className="ellipsis-btn">Share to...</button>
            <button className="ellipsis-btn">Copy link</button>
            <button className="ellipsis-btn">About this account</button>
            <button className="ellipsis-btn">Embed</button>
            <button className="ellipsis-btn" onClick={closeEllipsisModal}>Cancel</button>
        </section>
        </div>
    )
}