
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

export const postsDemo = [
  {
    _id: "s101",
    txt: "El momento de mi vida ⭐⭐⭐",
    imgUrl: "./src/assets/img/posts/messiworldcup.jpg",
    by: {
      _id: "u101",
      fullname: "Lionel Messi",
      imgUrl: "./src/assets/img/users/messi1.avif"
    },
    loc: { // Optional
      lat: 11.11,
      lng: 22.22,
      name: "Tel Aviv"
    },
    comments: [],
    likedBy: [],
    tags: []
  },
  {
    _id: "s102",
    txt: "La boca, Bs As",
    imgUrl: "./src/assets/img/posts/laboca.jpg",
    by: {
      _id: "u101",
      fullname: "Gal Luski",
      imgUrl: "./src/assets/img/users/luski.jpg"
    },
    loc: { // Optional
      lat: 11.11,
      lng: 22.22,
      name: "Tel Aviv"
    },
    comments: [],
    likedBy: [],
    tags: []
  },
  {
    _id: "s103",
    txt: "Copa Libertadores final: Superclasico",
    imgUrl: "./src/assets/img/posts/olesuperclasico.jpg",
    by: {
      _id: "u102",
      fullname: "Ole",
      imgUrl: "./src/assets/img/users/ole.png"
    },
    loc: { // Optional
      lat: 11.11,
      lng: 22.22,
      name: "Tel Aviv"
    },
    comments: [],
    likedBy: [],
    tags: []
  }
]

const userDemo = [
  {
    _id: "u101",
    username: "Vacations",
    password: "dodli",
    fullname: "Muki Muka",
    imgUrl: "./src/assets/img/posts/post1.jpg",
    following: [],
    followers: [],
    savedStoryIds: []
  },
  {
    _id: "u102",
    username: "shayel12",
    password: "mukmuk",
    fullname: "Shayel moalem",
    imgUrl: "./src/assets/img/posts/post2.jpg",
    following: [],
    followers: [],
    savedStoryIds: []
  },
  {
    _id: "u103",
    username: "luski",
    password: "mukmuk",
    fullname: "Gal luski",
    imgUrl: "./src/assets/img/posts/post3.jpg",
    following: [],
    followers: [],
    savedStoryIds: []
  },
  {
    _id: "u104",
    username: "Mukoasf",
    password: "mukmuk",
    fullname: "danirel",
    imgUrl: "./src/assets/img/posts/post4.jpg",
    following: [],
    followers: [],
    savedStoryIds: []
  }
]

const STORAGE_KEY = 'post'

export const postService = {
  query,
  getById,
  save,
  remove,
  getEmptyPost,
  addPostMsg
}
window.cs = postService


async function query(filterBy = { txt: '', price: 0 }) {
  var posts = await storageService.query(STORAGE_KEY)
  if (!posts || !posts.length) {
    utilService.saveToStorage(STORAGE_KEY,postsDemo)
    posts = await storageService.query(STORAGE_KEY)
  }

  if (filterBy.txt) {
    const regex = new RegExp(filterBy.txt, 'i')
    posts = posts.filter(post => regex.test(post.vendor) || regex.test(post.description))
  }
  if (filterBy.price) {
    posts = posts.filter(post => post.price <= filterBy.price)
  }

  return posts
}

function getById(postId) {
  return storageService.get(STORAGE_KEY, postId)
}

async function remove(postId) {
  // throw new Error('Nope')
  await storageService.remove(STORAGE_KEY, postId)
}

async function save(post) {

  var savedPost
  if (post._id) {
    savedPost = await storageService.put(STORAGE_KEY, post)
  } else {
    // Later, owner is set by the backend
    post.by = {
      fullname: 'shayel Moalem',
      imgUrl: './src/assets/img/posts/post3.jpg'
    }
    post._id = utilService.makeId()
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

function getEmptyPost() {
  return {
    txt: '',
    imgUrl: '',
    by: null,
    comments: [],
    likedBy: [],
    tags: []

  }
}


// TEST DATA
// storageService.post(STORAGE_KEY, getEmptyPost()).then(x => console.log(x))



const story = {
  _id: "s101",
  txt: "Best trip ever",
  imgUrl: "http://some-img",
  by: {
    _id: "u101",
    fullname: "Ulash Ulashi",
    imgUrl: "http://some-img"
  },
  loc: { // Optional
    lat: 11.11,
    lng: 22.22,
    name: "Tel Aviv"
  },
  comments: [
    {
      id: "c1001",
      by: {
        _id: "u105",
        fullname: "Bob",
        imgUrl: "http://some-img"
      },
      txt: "good one!",
      likedBy: [ // Optional
        {
          "_id": "u105",
          "fullname": "Bob",
          "imgUrl": "http://some-img"
        }
      ]
    },
    {
      id: "c1002",
      by: {
        _id: "u106",
        fullname: "Dob",
        imgUrl: "http://some-img"
      },
      txt: "not good!",
    }
  ],
  likedBy: [
    {
      _id: "u105",
      fullname: "Bob",
      imgUrl: "http://some-img"
    },
    {
      _id: "u106",
      fullname: "Dob",
      imgUrl: "http://some-img"
    }
  ],
  tags: ["fun", "romantic"]
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