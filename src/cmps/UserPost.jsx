import { useEffect, useState } from 'react';
import { loadUserLoggedPosts } from '../store/user.actions';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Link } from "react-router-dom";


export function UserPost() {
    const [userPosts, setUserPosts] = useState([]);
    const [isIconShown, setIsIconShown] = useState()
    const { userId } = useParams()

    useEffect(() => {
        // Load user posts and update the state when they are loaded
        loadUserLoggedPosts(userId)
            .then((posts) => {
                setUserPosts(posts);
                console.log('User posts:', posts);
            })
            .catch((err) => {
                console.error('Error loading user posts', err);
                showErrorMsg('Cannot load user logged posts');
            });
    }, []);

    function toggleIcons(state) {
        setIsIconShown(state)
    }

    return (
        <div className='user-pst'>

            <ul>
                {userPosts.map((post, index) => (
                    <li key={index}>
                        <div className='user-pst-preview' onMouseEnter={() => { toggleIcons(true) }} onMouseLeave={() => { toggleIcons(false) }}>
                            {/* <p>{pst.txt}</p> */}
                            {/* <p>{pst.tag}</p> */}

                            <Link to={`/profile/${post.by._id}/psts/${post._id}`}>
                                <img src={post.imgUrl} alt="Post Image" />
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
            <Outlet />
        </div>
    );
}
