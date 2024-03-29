import { storageService } from './async-storage.service'
import { httpService } from './http.service'
import { utilService } from './util.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedInUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
    changeScore
}

// createUsers()

window.userService = userService


function getUsers() {
    // return storageService.query('user')
    return httpService.get(`user`)
}



async function getById(userId) {
    // const user = await storageService.get('user', userId)
    const user = await httpService.get(`user/${userId}`)
    return user
}

function remove(userId) {
    // return storageService.remove('user', userId)
    return httpService.delete(`user/${userId}`)
}

async function update({ _id, imgUrl }) {
    // const user = await asyncStorageService.get('user', _id)
    // const user = getLoggedInUser()
    // console.log('user in service (last step frontend: ', user)
    // user.imgUrl = imgUrl
    // await asyncStorageService.put('user', user)

    const user = await httpService.put(`user/${_id}`, {_id, imgUrl})
    // // Handle case in which admin updates other user's details
    // if (getLoggedInUser()._id === user._id) saveLocalUser(user)
    // console.log('user from service', user)
    return user
}

async function login(userCred) {
    // const users = await storageService.query('user')
    // const user = users.find(user => user.username === userCred.username)
    const user = await httpService.post('auth/login', userCred)
    if (user) {
        return saveLocalUser(user)
    }
}

async function signup(userCred) {
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    userCred.score = 10000
    // const user = await storageService.post('user', userCred)
    const user = await httpService.post('auth/signup', userCred)
    return saveLocalUser(user)
}

async function logout() {
    // sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    return await httpService.post('auth/logout')
}

async function changeScore(by) {
    const user = getLoggedInUser()
    if (!user) throw new Error('Not loggedin')
    user.score = user.score + by || by
    await update(user)
    return user.score
}


function saveLocalUser(user) {
    const { _id, fullname, imgUrl, username } = user;
    const userToSave = { _id, fullname, imgUrl, username, score: user.score }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(userToSave))
    return user
}

function getLoggedInUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}



// function createUsers() {
//     let users = utilService.loadFromStorage('user')
//     if (!users || !users.length) {
//         users = [
//             {
//                 _id: "u101",
//                 username: "luski",
//                 password: "123456",
//                 fullname: "Gal luski",
//                 imgUrl: "/img/users/luski.jpg",
//                 following: [],
//                 followers: [],
//                 savedStoryIds: []
//             },
//             {
//               _id: "u102",
//               username: "adidas",
//               password: "123456",
//               fullname: "adidas",
//               imgUrl: "/img/users/adidas.jpg",
//               following: [],
//               followers: [],
//               savedStoryIds: []
//             },
//               {
//                 _id: "u103",
//                 username: "default",
//                 password: "123456",
//                 fullname: "Default User",
//                 imgUrl: "/img/users/default_pic.jpg",
//                 following: [],
//                 followers: [],
//                 savedStoryIds: []
//               },
//               {
//                 _id: "u104",
//                 username: "kingJames",
//                 password: "123456",
//                 fullname: "Lebron James",
//                 imgUrl: "/img/users/Lebron_James.jpg",
//                 following: [],
//                 followers: [],
//                 savedStoryIds: []
//               },
//               {
//                 _id: "u105",
//                 username: "ole",
//                 password: "123456",
//                 fullname: "Diario Ole",
//                 imgUrl: "/img/users/ole.png",
//                 following: [],
//                 followers: [],
//                 savedStoryIds: []
//               },
//             ]
    
//         utilService.saveToStorage('user', users)
//     }
// }

// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()



