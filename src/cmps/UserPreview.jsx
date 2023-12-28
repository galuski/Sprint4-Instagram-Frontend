import React from 'react';
import { useState } from 'react';

const SuggestUserPreview = ({ user }) => {
    const [isFollowing, setIsFollowing] = useState();
    const [followStatus, setFollowStatus] = useState('Follow');

    function toggleFollow() {
        if (isFollowing) {
            setFollowStatus('Following');
            setIsFollowing(false);

        } else {
            setFollowStatus('Follow');
            setIsFollowing(true);
        }
    }

    return (
        <section className="suggest-user-preview">
            <div className='users-list-items'>
                <img className="user-profile-img" src={user.imgUrl} alt="Profile" />
                <span className="user-username">{user.fullname}</span>
            </div>
            <button className='suggest-follow-btn' onClick={toggleFollow}>{followStatus}</button>
        </section>
    );
}

export default SuggestUserPreview;
