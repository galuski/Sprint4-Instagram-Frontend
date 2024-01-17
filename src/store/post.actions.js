import { postService } from "../services/post.service.local.js";
import { userService } from "../services/user.service.js";
import { store } from './store.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { ADD_POST, REMOVE_POST, SET_POSTS,REMOVE_COMMENT, UPDATE_POST, OPEN_MODAL, CLOSE_MODAL, SET_SELECTED_POST } from "./post.reducer.js";
import { SET_SCORE } from "./user.reducer.js";

// Action Creators:
export function getActionRemovePost(postId) {
    return {
        type: REMOVE_POST,
        postId
    }
}
export function getActionAddPost(post) {
    return {
        type: ADD_POST,
        post
    }
}
export function getActionUpdatePost(post) {
    return {
        type: UPDATE_POST,
        post
    }
}

export function getActionRemoveComment(commentId) {
    return {
        type: REMOVE_COMMENT,
        commentId
    }
}

export async function loadPosts() {
    try {
        const posts = await postService.query()

        store.dispatch({
            type: SET_POSTS,
            posts
        })

    } catch (err) {
        console.log('Cannot load posts', err)
        throw err
    }

}

export async function loadPost(postId) {
    try {
        // showLoader()
        const post = await postService.getById(postId)
        // hideLoader()
        store.dispatch({ type: SET_SELECTED_POST, post })
    } catch (err) {
        console.log(err)
    }
}

export async function removePost(postId) {
    try {
        await postService.remove(postId)
        store.dispatch(getActionRemovePost(postId))
    } catch (err) {
        console.log('Cannot remove post', err)
        throw err
    }
}

export async function addPost(post) {

    try {
        const savedPost = await postService.save(post)
        store.dispatch(getActionAddPost(savedPost))
        return savedPost
    } catch (err) {
        console.log('Cannot add post', err)
        throw err
    }
}

export async function updatePost(post) {
    try {
        const savedPost = await postService.save(post);
        console.log('Updated post:', savedPost);
        store.dispatch(getActionUpdatePost(savedPost));
        return savedPost;
    } catch (err) {
        console.error('An error occurred:', err);
        throw err;
    }
}

export async function removeComment(commentId) {
    try {
        const updatedPost = await postService.removeComment(commentId)
        console.log('update post', updatedPost)
        store.dispatch(getActionRemoveComment(commentId))
    } catch (err) {
        console.log('err', err)
        throw err
    }
}

export function openModal() {
    store.dispatch({
        type: OPEN_MODAL,
    })
}

export function closeModal() {
    store.dispatch({
        type: CLOSE_MODAL,
    })
}