import { Sidebar } from "../cmps/Sidebar"
import { PostList } from "../cmps/PostList"
import { SuggestFollowers } from "../cmps/SuggestFollowers"
import React, { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux" // Added useDispatch
import { CreatePostModal } from "../cmps/CreatePostModal"
import { Loading } from '../cmps/Loading'
import { addPost, loadPosts, removePost } from "../store/post.actions"
import { loadUsers } from "../store/user.actions"
import { utilService } from "../services/util.service"
import { postService } from "../services/post.service"
import Logo from "../cmps/Logo"


export function HomePage() {
    const dispatch = useDispatch(); // Added useDispatch
    const posts = useSelector(storeState => storeState.postModule.posts)
    const users = useSelector(storeState => storeState.userModule.users)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        loadPage()
        loadPosts()
        loadUsers()
    }, [])

    useEffect(() => { // Added useEffect for refreshing the page
        loadPage();
        loadPosts()
        loadUsers()
    }, []);

    const loadPage = () => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2500);
    }

    const [openCreate, setOpenCreate] = useState(false)
    function ToggleModal(ev) {
        ev.preventDefault()
        setOpenCreate(state => !state)
    }

    async function onAddPost(txt, file) {
        try {
            const newPost = postService.getEmptyPost()
            newPost.txt = txt
            newPost.imgUrl = file
            dispatch(addPost(newPost)); // Dispatch addPost action
        } catch (error) {
            console.log(error)
        } finally {
            setOpenCreate(state => !state)
        }
    }

    if (isLoading) return <Loading />;
    return (
        <>
            {openCreate ? <div className="create-modal"><CreatePostModal onAddPost={onAddPost} onCloseModal={ToggleModal} /></div> : null}
            <section className={`home-page-container `} >
                <div className="logo-mobile">
                    <Logo />
                </div>
                <section className="side-bar">
                    <Sidebar onCreate={setOpenCreate} />
                </section>
                <main className="post-list">
                    <PostList posts={posts} />
                </main>
                <section className="suggest-followers">
                    <SuggestFollowers users={users} posts={posts} />
                </section>
            </section>
        </>
    )
}