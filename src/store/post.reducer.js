export const SET_POSTS = 'SET_POSTS'
export const REMOVE_POST = 'REMOVE_POST'
export const ADD_POST = 'ADD_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const SET_SELECTED_POST = 'SET_SELECTED_POST'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const OPEN_MODAL = 'OPEN_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'

// export const UNDO_REMOVE_CAR = 'UNDO_REMOVE_CAR'

const initialState = {
    posts: [],
    // cart: [],
    // lastRemovedCar: null
}

export function postReducer(state = initialState, action) {
    var newState = state
    var posts
    // var cart
    switch (action.type) {
        case SET_POSTS:
            newState = { ...state, posts: action.posts }
            break
        case REMOVE_POST:
            const lastRemovedPost = state.posts.find(post => post._id === action.postId)
            posts = state.posts.filter(post => post._id !== action.postId)
            newState = { ...state, posts, lastRemovedPost }
            break
        case ADD_POST:
            newState = { ...state, posts: [action.post, ...state.posts] }
            break
        case UPDATE_POST:
            posts = state.posts.map(post => (post._id === action.post._id) ? action.post : post)
            newState = { ...state, posts }
            break
        case SET_SELECTED_POST:
            newState = { ...state, selectedPost: action.post }
            break
            case OPEN_MODAL:
                newState = { ...state, isModalOpen: true }
                break
            case CLOSE_MODAL:
                newState = { ...state, isModalOpen: false }
                break
                case REMOVE_COMMENT:
            // Find the index of the post containing the comment
            console.log('action.commentId', action.commentId)

            const pstIdx = state.posts.findIndex(pst => pst.comments.some(comment => comment.id === action.commentId));
            console.log('pstIdx', pstIdx)

            if (pstIdx === -1) break;  // Exit if post not found

            // Find the index of the comment to remove
            const commentIdx = state.posts[pstIdx].comments.findIndex(comment => comment.id === action.commentId);

            console.log('commentIdx', commentIdx)
            if (commentIdx === -1) break; // Exit if comment not found

            // Remove the comment without mutating the state directly
            posts = [...state.posts];
            posts[pstIdx] = { ...posts[pstIdx], comments: [...posts[pstIdx].comments.slice(0, commentIdx), ...posts[pstIdx].comments.slice(commentIdx + 1)] };

            newState = { ...state, posts, selectedPost: posts[pstIdx] };
            console.log('newState', newState)
            break;        

        default:
    }
    return newState
}
