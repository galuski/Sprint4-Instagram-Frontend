import { postService } from "../services/post.service.local.js";
import { userService } from "../services/user.service.js";
import { store } from './store.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { ADD_POST, REMOVE_POST, SET_POSTS, UPDATE_POST} from "./post.reducer.js";
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

export async function loadPosts() {
    try {
        const posts = await postService.query()
        console.log('posts from DB:', posts)
        store.dispatch({
            type: SET_POSTS,
            posts
        })

    } catch (err) {
        console.log('Cannot load posts', err)
        throw err
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
    
    console.log(post)
    try {
        const savedPost = await postService.save(post)
        console.log('Added post', savedPost)
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


// export function addToCart(car) {
//     store.dispatch({
//         type: ADD_TO_CART,
//         car
//     })
// }

// export function removeFromCart(carId) {
//     store.dispatch({
//         type: REMOVE_FROM_CART,
//         carId
//     })
// }

// export async function checkout(total) {
//     try {
//         const score = await userService.changeScore(-total)
//         store.dispatch({ type: SET_SCORE, score })
//         store.dispatch({ type: CLEAR_CART })
//         return score
//     } catch (err) {
//         console.log('CarActions: err in checkout', err)
//         throw err
//     }
// }


// // Demo for Optimistic Mutation 
// // (IOW - Assuming the server call will work, so updating the UI first)
// export function onRemoveCarOptimistic(carId) {
//     store.dispatch({
//         type: REMOVE_CAR,
//         carId
//     })
//     showSuccessMsg('Car removed')

//     carService.remove(carId)
//         .then(() => {
//             console.log('Server Reported - Deleted Successfully');
//         })
//         .catch(err => {
//             showErrorMsg('Cannot remove car')
//             console.log('Cannot load cars', err)
//             store.dispatch({
//                 type: UNDO_REMOVE_CAR,
//             })
//         })
// }
