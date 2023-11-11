
import { Sidebar } from "../cmps/Sidebar"
import { PostList } from "../cmps/PostList"
import { SuggestFollowers } from "../cmps/SuggestFollowers"
import React, { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { CreatePostModal } from "../cmps/CreatePostModal"
import { addPost, loadPosts, removePost } from "../store/post.actions"
import { loadUsers } from "../store/user.actions"
import { utilService } from "../services/util.service"
import { postService } from "../services/post.service.local"


export function HomePage() {
    const posts = useSelector(storeState => storeState.postModule.posts)
    const users = useSelector(storeState => storeState.userModule.users)
    useEffect(() => {
        loadPosts()
        loadUsers()
    }, [])
    const [openCreate, setOpenCreate] = useState(false)
    function ToggleModal(ev) {
        ev.preventDefault()
        setOpenCreate(state => !state)
    }

    const [openEllipsis, setOpenEllipsis] = useState(false)
    function ToggleModal(ev) {
        ev.preventDefault()
        setOpenEllipsis(state => !state)
    }

    async function onDeletePost(id) {
        try {
            await removePost(id)

        } catch (error) {
            console.log(error)
        }

    }
    async function onAddPost(txt, file) {
        try {
        const newPost = postService.getEmptyPost()
        newPost.txt=txt
        newPost.imgUrl=file
            addPost(newPost)
        } catch (error) {
            console.log(error)
        } finally {
            setOpenCreate(state => !state)
        }
    }
    return (
        <>
            {openCreate ? <div className="create-modal"><CreatePostModal onAddPost={onAddPost} onCloseModal={ToggleModal} /></div> : null}
            {openEllipsis ? <div className="ellipsis-modal"><EllipsisModal onCloseModal={ToggleModal} /></div> : null}
            <section className={`home-page-container `} >
                <section className="side-bar">
                    <Sidebar onCreate={setOpenCreate} />
                </section>
                <main className="post-list">
                    <PostList posts={posts} />
                </main>
                <section className="suggest-followers">
                    <SuggestFollowers users={users} />
                </section>
            </section>
        </>
    )
}



{/* <PostList onDeletePost={onDeletePost} posts={posts} /> */}





