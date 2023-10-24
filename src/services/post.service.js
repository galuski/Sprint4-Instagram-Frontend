
// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'


const STORAGE_KEY = 'post'

export const postService = {
    query,
    getById,
    save,
    remove,
    getEmptypost,
    addpostMsg
}
window.cs = postService


async function query(filterBy = { txt: '', price: 0 }) {
    return httpService.get(STORAGE_KEY, filterBy)
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


function getEmptypost() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}





