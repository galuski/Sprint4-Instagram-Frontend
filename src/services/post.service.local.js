
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'post'

var posts = createPost()

export const postService = {
  query,
  getById,
  save,
  remove,
  getEmptyPost,
  addPostMsg,
  posts,
  addComment,
  getDefaultFilter,
  removeComment,
  getUserPostCount
}

window.cs = postService

async function query(filterBy = {}) {
  var posts = await storageService.query(STORAGE_KEY)
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
  const posts = await query()
  let postCount = 0
  posts.forEach(pst => { if (pst.by._id === userId) postCount++ })
  return postCount
}

function getById(postId) {
  return storageService.get(STORAGE_KEY, postId)
}
async function remove(postId) {
  // throw new Error('Nope')
  await storageService.remove(STORAGE_KEY, postId)
}

async function removeComment(commentId) {
  // 1. Find the post containing the comment
  let allPosts = await storageService.query(STORAGE_KEY);
  let foundPost = allPosts.find(post => post.comments.some(comment => comment.id === commentId));

  // 2. If post found, remove the comment from it
  if (foundPost) {
      foundPost.comments = foundPost.comments.filter(comment => comment.id !== commentId);
      // 3. Save the modified post back to storage
      const updatedPost = await storageService.put(STORAGE_KEY, foundPost);
      return updatedPost
  } else {
      throw new Error('Comment not found!');
  }
}

// export const postsDemo = [
//   {
//     _id: "s101",
//     txt: "El momento de mi vida ⭐⭐⭐",
//     imgUrl: "./src/assets/img/posts/messiworldcup.jpg",
//     by: {
//       _id: "u101",
//       fullname: "Lionel Messi",
//       imgUrl: "./src/assets/img/users/messi1.avif"
//     },
//     loc: { // Optional
//       lat: 11.11,
//       lng: 22.22,
//       name: "Tel Aviv"
//     },
//     comments: [],
//     likedBy: [],
//     tags: []
//   },
//   {
//     _id: "s102",
//     txt: "La boca, Bs As",
//     imgUrl: "./src/assets/img/posts/laboca.jpg",
//     by: {
//       _id: "u101",
//       fullname: "Gal Luski",
//       imgUrl: "./src/assets/img/users/luski.jpg"
//     },
//     loc: { // Optional
//       lat: 11.11,
//       lng: 22.22,
//       name: "Tel Aviv"
//     },
//     comments: [],
//     likedBy: [],
//     tags: []
//   },
//   {
//     _id: "s103",
//     txt: "Copa Libertadores final: Superclasico",
//     imgUrl: "./src/assets/img/posts/olesuperclasico.jpg",
//     by: {
//       _id: "u102",
//       fullname: "Ole",
//       imgUrl: "./src/assets/img/users/ole.png"
//     },
//     loc: { // Optional
//       lat: 11.11,
//       lng: 22.22,
//       name: "Tel Aviv"
//     },
//     comments: [],
//     likedBy: [],
//     tags: []
//   }
// ]

async function save(post) {

  var savedPost
  if (post._id) {
    savedPost = await storageService.put(STORAGE_KEY, post)
  } else {
    // Later, owner is set by the backend
    savedPost = await storageService.post(STORAGE_KEY, post)
  }

  return savedPost
}

async function addPostMsg(postId, txt) {
  // Later, this is all done by the backend
  const post = await getById(postId)
  if (!post.msgs) post.msgs = []

  const msg = {
    id: utilService.makeId(),
    by: userService.getLoggedinUser(),
    txt
  }
  post.msgs.push(msg)
  await storageService.put(STORAGE_KEY, post)

  return msg
}

async function addComment(postId, comment) {
const post = await getById(postId);
if (!post.comments) post.comments = [];

const newComment = {
    id: utilService.makeId(),
    by: userService.getLoggedinUser(),
    txt: comment
};

post.comments.push(newComment);
const updatedPost = await storageService.put(STORAGE_KEY, post);
return updatedPost
}

function getDefaultFilter() {
return { id: '' }
}

function getEmptyPost() {
  return {
    txt: "",
    imgUrl: "",
    uploadTime: "now",
    by: userService.getLoggedinUser(),
    loc: {
        lat: 11.11,
        lng: 22.22,
        name: "Tel Aviv"
    },

    comments: [
    ],
    likedBy: [
    ],
    tags: []
}
}


// TEST DATA
// storageService.post(STORAGE_KEY, getEmptyPost()).then(x => console.log(x))



function createPost() {
  let posts = utilService.loadFromStorage(STORAGE_KEY);
  console.log('posts', posts);
  if (!posts || !posts.length) {
    posts = [
      {
        _id: "s101",
        txt: "El momento de mi vida ⭐⭐⭐",
        imgUrl: "../public/img/posts/messiworldcup.jpg",
        uploadTime: utilService.randomTimeString(),
        by: {
      _id: "u101",
      fullname: "Lionel Messi",
      imgUrl: "../public/img/users/messi1.avif"
        },
        loc: {
          lat: 11.11,
          lng: 22.22,
          name: "Tel Aviv"
        },
        comments: [
          {
            id: "c1",
            by: {
              _id: "u103",
              fullname: "Gal Luski",
              imgUrl: "../public/img/users/luski.jpg"
            },
            txt: "וואו",
            likedBy: [
              {
                "_id": "u3",
                "fullname": "Bob",
                "imgUrl": "http://some-img"
              },
              {
                "_id": "u3",
                "fullname": "Bob",
                "imgUrl": "http://some-img"
              },
              {
                "_id": "u3",
                "fullname": "Bob",
                "imgUrl": "http://some-img"
              },
              {
                "_id": "u3",
                "fullname": "Bob",
                "imgUrl": "http://some-img"
              },
            ]
          },
          {
            id: "c2",
            by: {
              _id: "u4",
              fullname: "Tomer12",
              imgUrl: "tomer.jpg"
            },
            txt: "מדהיםםםםםםם",
          },
          {
            id: "c3",
            by: {
              _id: "u5",
              fullname: "Yovel",
              imgUrl: "yoval.jpg"
            },
            txt: "מדהיםם",
          }
        ],
        likedBy: [
          {
            _id: "u3",
            fullname: "Bob",
            imgUrl: "http://some-img"
          },
          {
            _id: "u3",
            fullname: "Bob",
            imgUrl: "http://some-img"
          },
          {
            _id: "u3",
            fullname: "Bob",
            imgUrl: "http://some-img"
          },
          {
            _id: "u3",
            fullname: "Bob",
            imgUrl: "http://some-img"
          },
          {
            _id: "u3",
            fullname: "Bob",
            imgUrl: "http://some-img"
          },
          {
            _id: "u3",
            fullname: "Bob",
            imgUrl: "http://some-img"
          },
        ],
        tags: ["fun", "romantic"]
      }
    ];
    utilService.saveToStorage(STORAGE_KEY, posts)
    return posts
  }
  return posts;
}


//   const user = {
//     _id: "u101",
//     username: "Muko",
//     password: "mukmuk",
//     fullname: "Muki Muka",
//     imgUrl: "http://some-img",
//     following: [
//       {
//         _id: "u106",
//         fullname: "Dob",
//         imgUrl: "http://some-img"
//       }
//     ],
//     followers: [
//       {
//         _id: "u105",
//         fullname: "Bob",
//         imgUrl: "http://some-img"
//       }
//     ],
//     savedStoryIds: ["s104", "s111", "s123"] // even better - use mini-story
//   }