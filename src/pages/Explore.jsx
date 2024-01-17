import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadPosts } from '../store/post.actions';
import { showErrorMsg } from '../services/event-bus.service';
import { Link, Outlet } from "react-router-dom";
import { Sidebar } from '../cmps/Sidebar';

export function Explore() {
  const posts = useSelector((storeState) => storeState.postModule.posts) || [];
  useEffect(() => {

    loadPosts().catch(err => {
      console.log('err', err)
      showErrorMsg('Cannot load posts')
    })
  }
    , [])

  return (
    <section className="explore">
      <div className='side-bar-position'>
        <Sidebar />
      </div>
      <div className="table-container">
        <div className="grid">
          {posts.map((post) => (
            <div className="grid-item" key={post._id} >
              <Link to={`/explore/${post._id}`}>
                <img src={post.imgUrl} alt={post.txt} />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Outlet />
    </section>
  );
}
