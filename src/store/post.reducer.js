export const SET_POSTS = 'SET_POSTS'
export const REMOVE_POST = 'REMOVE_POST'
export const ADD_POST = 'ADD_POST'
export const UPDATE_POST = 'UPDATE_POST'
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
        // case ADD_TO_postT:
        //     newState = { ...state, cart: [...state.cart, action.car] }
        //     break
        // case REMOVE_FROM_CART:
        //     cart = state.cart.filter(car => car._id !== action.carId)
        //     newState = { ...state, cart }
        //     break
        // case CLEAR_CART:
        //     newState = { ...state, cart: [] }
        //     break
        // case UNDO_REMOVE_CAR:
        //     if (state.lastRemovedCar) {
        //         newState = { ...state, posts: [...state.posts, state.lastRemovedCar], lastRemovedCar: null }
        //     }
        //     break
        default:
    }
    return newState
}
