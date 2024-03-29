
// import { storageService } from './async-storage.service.js'
// import { utilService } from './util.service.js'
// import { userService } from './user.service.js'

// const STORAGE_KEY = 'post'

// var posts = createPost()

// export const postService = {
//   query,
//   getById,
//   save,
//   remove,
//   getEmptyPost,
//   addPostMsg,
//   posts,
//   addComment,
//   getDefaultFilter,
//   removeComment,
//   getUserPostCount
// }

// window.cs = postService

// async function query(filterBy = {}) {
//   var posts = await storageService.query(STORAGE_KEY)
//   // if (!posts || !posts.length) {
//   //   utilService.saveToStorage(STORAGE_KEY,postsDemo)
//   //   posts = await storageService.query(STORAGE_KEY)
//   // }

//   // if (filterBy.txt) {
//   //   const regex = new RegExp(filterBy.txt, 'i')
//   //   posts = posts.filter(post => regex.test(post.vendor) || regex.test(post.description))
//   // }
//   // if (filterBy.price) {
//   //   posts = posts.filter(post => post.price <= filterBy.price)
//   // }

//   if (filterBy.by) {
//     posts = posts.filter(post => post.by._id === filterBy.by)
//   }
//   return posts
// }

// async function getUserPostCount(userId) {
//   const posts = await query()
//   let postCount = 0
//   posts.forEach(pst => { if (pst.by._id === userId) postCount++ })
//   return postCount
// }

// function getById(postId) {
//   return storageService.get(STORAGE_KEY, postId)
// }
// async function remove(postId) {
//   // throw new Error('Nope')
//   await storageService.remove(STORAGE_KEY, postId)
// }

// async function removeComment(commentId) {
//   // 1. Find the post containing the comment
//   let allPosts = await storageService.query(STORAGE_KEY);
//   let foundPost = allPosts.find(post => post.comments.some(comment => comment.id === commentId));

//   // 2. If post found, remove the comment from it
//   if (foundPost) {
//     foundPost.comments = foundPost.comments.filter(comment => comment.id !== commentId);
//     // 3. Save the modified post back to storage
//     const updatedPost = await storageService.put(STORAGE_KEY, foundPost);
//     return updatedPost
//   } else {
//     throw new Error('Comment not found!');
//   }
// }



// async function save(post) {

//   var savedPost
//   if (post._id) {
//     savedPost = await storageService.put(STORAGE_KEY, post)
//   } else {
//     // Later, owner is set by the backend
//     savedPost = await storageService.post(STORAGE_KEY, post)
//   }

//   return savedPost
// }

// async function addPostMsg(postId, txt) {
//   // Later, this is all done by the backend
//   const post = await getById(postId)
//   if (!post.msgs) post.msgs = []

//   const msg = {
//     id: utilService.makeId(),
//     by: userService.getLoggedInUser(),
//     txt
//   }
//   post.msgs.push(msg)
//   await storageService.put(STORAGE_KEY, post)

//   return msg
// }

// async function addComment(postId, comment) {
//   const post = await getById(postId);
//   if (!post.comments) post.comments = [];

//   const newComment = {
//     id: utilService.makeId(),
//     by: userService.getLoggedInUser(),
//     txt: comment
//   };

//   post.comments.push(newComment);
//   const updatedPost = await storageService.put(STORAGE_KEY, post);
//   return updatedPost
// }

// function getDefaultFilter() {
//   return { id: '' }
// }

// function getEmptyPost() {
//   return {
//     txt: "",
//     imgUrl: "",
//     uploadTime: "now",
//     by: userService.getLoggedInUser(),
//     loc: {
//       lat: 11.11,
//       lng: 22.22,
//       name: "Tel Aviv"
//     },

//     comments: [
//     ],
//     likedBy: [
//     ],
//     tags: []
//   }
// }


// // TEST DATA
// // storageService.post(STORAGE_KEY, getEmptyPost()).then(x => console.log(x))



// function createPost() {
//   let posts = utilService.loadFromStorage(STORAGE_KEY);
//   console.log('posts', posts);
//   if (!posts || !posts.length) {
//     posts = [
//       {
//         _id: "s101",
//         txt: "Bs As es mi segunda casa",
//         imgUrl: "/img/posts/floralis.JPG",
//         uploadTime: utilService.randomTimeString(),
//         by: {
//           _id: "u101",
//           fullname: "Gal Luski",
//           imgUrl: "/img/users/luski.jpg"
//         },
//         comments: [
//           {
//             id: "c1",
//             by: {
//               _id: "u101",
//               fullname: "Gal Luski",
//               imgUrl: "../public/img/users/luski.jpg"
//             },
//             txt: "GOAT 🐐",
//             likedBy: [
//               {
//                 _id: "u3",
//                 fullname: "Bob",
//                 imgUrl: "http://some-img"
//               },
//               {
//                 _id: "u3",
//                 fullname: "Bob",
//                 imgUrl: "http://some-img"
//               },
//               {
//                 _id: "u3",
//                 fullname: "Bob",
//                 imgUrl: "http://some-img"
//               },
//             ]
//           },
//           {
//             id: "c2",
//             by: {
//               _id: "u4",
//               fullname: "Alberto Fernández",
//               imgUrl: "../public/img/users/alberto_fernandez.jpg"
//             },
//             txt: "Gracias por traer honor a nuestro país",
//             likedBy: [
//               {
//                 _id: "u3",
//                 fullname: "Bob",
//                 imgUrl: "http://some-img"
//               },
//               {
//                 _id: "u3",
//                 fullname: "Bob",
//                 imgUrl: "http://some-img"
//               }

//             ]
//           },
//           {
//             id: "c3",
//             by: {
//               _id: "u5",
//               fullname: "Diego Maradona",
//               imgUrl: "../public/img/users/maradona.png"
//             },
//             txt: "Vos un dios como yo",
//           }
//         ],
//         likedBy: [
//           {
//             _id: "u3",
//             fullname: "Bob",
//             imgUrl: "http://some-img"
//           },
//           {
//             _id: "u3",
//             fullname: "Bob",
//             imgUrl: "http://some-img"
//           },
//           {
//             _id: "u3",
//             fullname: "Bob",
//             imgUrl: "http://some-img"
//           },
//           {
//             _id: "u3",
//             fullname: "Bob",
//             imgUrl: "http://some-img"
//           },
//           {
//             _id: "u3",
//             fullname: "Bob",
//             imgUrl: "http://some-img"
//           },
//           {
//             _id: "u3",
//             fullname: "Bob",
//             imgUrl: "http://some-img"
//           },
//         ],
//         tags: ["fun", "romantic"]
//       }
//     ];
//     utilService.saveToStorage(STORAGE_KEY, posts)
//     return posts
//   }
//   return posts;
// }