// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'


const STORAGE_KEY = 'postDB'
const BASE_URL = 'pst/'

export const postService = {
    query,
    getById,
    save,
    remove,
    getEmptyPost,
    addpostMsg
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
async function save(post) {
    var savedpost
    if (post._id) {
        savedpost = await httpService.put(`post/${post._id}`, post)

    } else {
        savedpost = await httpService.post('post', post)
    }
    return savedpost
}

async function addpostMsg(postId, txt) {
    const savedMsg = await httpService.post(`post/${postId}/msg`, {txt})
    return savedMsg
}


function getEmptyPost() {
    return {
        _id: utilService.makeId(),
        txt: "",
        imgUrl: "",
        by: {
            _id: utilService.makeId(),
            fullName: "",
            imgUrl: ""
        },

        comments: [
            {
                id: utilService.makeId(),
                by: {
                    _id: utilService.makeId(),
                    fullname: "",
                    imgUrl: ""
                },
                txt: "good one!",
                likedBy: [
                    {
                        "_id": utilService.makeId(),
                        "fullname": "",
                        "imgUrl": ""
                    }
                ]
            }],
        tags: ["fun", "romantic"]
    }
}





