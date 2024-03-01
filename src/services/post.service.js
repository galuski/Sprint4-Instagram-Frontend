// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const loggedUser = userService.getLoggedInUser();


const STORAGE_KEY = 'postDB'
const BASE_URL = 'post'

export const postService = {
    query,
    getById,
    save,
    add,
    remove,
    getEmptyPost,
    addpostMsg,
    filter,
    getUserPostCount,
    // removeComment
    // addComment,


}
// window.cs = postService


async function query() {
    return httpService.get(BASE_URL)
}

function getById(postId) {
    return httpService.get(`post/${postId}`)
}

async function remove(postId) {
    return httpService.delete(`post/${postId}`)
}
async function save(post, postId) {
 
    var savedPost
    console.log('post1',post)
    console.log('postID1',postId)
    if (post) {
        savedPost = await httpService.put(`post/${postId}`, post)

    } else {
        savedPost = await httpService.put('post', post)
    }
    return savedPost
}
async function add(post, postId) {
 
    var addPost

    if (postId) {
        addPost = await httpService.put(`post/${postId}`, post)

    } else {
        addPost = await httpService.post('post', post)
    }
    return addPost
}

async function addpostMsg(postId, txt) {
    const savedMsg = await httpService.post(`post/${postId}/msg`, { txt })
    return savedMsg
}

// async function addComment(postId, comment) {
//     const post = await getById(postId);
//     if (!post.comments) post.comments = [];

//     const newComment = {
//       id: utilService.makeId(),
//       by: userService.getLoggedInUser(),
//       txt: comment
//     };

//     post.comments.push(newComment);
//     const updatedPost = await httpService.put(STORAGE_KEY, post);
//     return updatedPost
//   }

//   async function removeComment(commentId) {
//     console.log('gggggggggggggggg',commentId)
//     // 1. Find the post containing the comment
//     let allPosts = await httpService.query(BASE_URL);
//     let foundPost = allPosts.find(post => post.comments.some(comment => comment.id === commentId));

//     // 2. If post found, remove the comment from it
//     if (foundPost) {
//       foundPost.comments = foundPost.comments.filter(comment => comment.id !== commentId);
//       // 3. Save the modified post back to storage
//       const updatedPost = await httpService.put(STORAGE_KEY, foundPost);
//       return updatedPost
//     } else {
//       throw new Error('Comment not found!');
//     }
//   }

async function filter(filterBy = {}) {
    var posts = await httpService.get(BASE_URL)
    // if (!posts || !posts.length) {
    //   utilService.saveToStorage(STORAGE_KEY,postsDemo)
    //   posts = await storageService.query(STORAGE_KEY)
    // }

    // if (filterBy.txt) {
    //   const regex = new RegExp(filterBy.txt, 'i')
    //   posts = posts.filter(post => regex.test(post.vendor) || regex.test(post.description))
    // }
    // if (filterBy.price) {
    //   posts = posts.filter(post => post.price <= filterBy.price)
    // }

    if (filterBy.by) {
        posts = posts.filter(post => post.by._id === filterBy.by)
    }
    return posts
}

async function getUserPostCount(userId) {
console.log('userID', userId)
    var posts = await httpService.get(BASE_URL)
    let postCount = 0
    posts.forEach(post => { if (post.by._id === userId) postCount++ })
    return postCount
}


function getEmptyPost() {
    console.log('log user: ',loggedUser)
    return {
        txt: "",
        imgUrl: "",
        by: {
            _id: loggedUser?._id,
            fullname: loggedUser?.fullname,
            imgUrl: loggedUser?.imgUrl
        },

        comments: [
            // {
            //     id: utilService.makeId(),
            //     by: {
            //         _id: utilService.makeId(),
            //         fullname: "",
            //         imgUrl: ""
            //     },
            //     txt: "good one!",
            //     likedBy: [
            //         {
            //             "_id": utilService.makeId(),
            //             "fullname": "",
            //             "imgUrl": ""
            //         }
            //     ]
            // }
        ],
            likedBy: [
    ],
    comment: null,
    updatedPost: null
    }
}





