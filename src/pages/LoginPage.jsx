import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../assets/img/logo.png'
import { CHANGE_COUNT } from '../store/user.reducer'
import { utilService } from '../services/util.service'
import { httpService } from '../services/http.service'
import { useNavigate, redirect } from 'react-router'

const postsDemo = [
  [
    {
      _id: "s101",
      txt: "Best trip ever",
      imgUrl: "./src/assets/img/posts/post2.jpg",
      by: {
        _id: "u101",
        fullname: "Muki Muka",
        imgUrl: "./src/assets/img/posts/post5.jpg"
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
      txt: "Best dream ever",
      imgUrl: "./src/assets/img/posts/post3.jpg",
      by: {
        _id: "u101",
        fullname: "Muki Muka",
        imgUrl: "./src/assets/img/posts/post5.jpg"
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
      txt: "Best place ever",
      imgUrl: "./src/assets/img/posts/post1.jpg",
      by: {
        _id: "u102",
        fullname: "daniel daniel",
        imgUrl: "./src/assets/img/posts/post4.jpg"
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
      _id: "s104",
      txt: "Best love ever",
      imgUrl: "./src/assets/img/posts/post1.jpg",
      by: {
        _id: "u102",
        fullname: "Vacations",
        imgUrl: "./src/assets/img/posts/post4.jpg"
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


export function LoginPage() {
  const navigate = useNavigate()

  function handleSignUp(user) {

    // httpService.post('')
    console.log(user)
  }
  function onQuickLogin() {
    utilService.saveToStorage('post', postsDemo)
    utilService.saveToStorage('user', userDemo)
    navigate('/home')
  }

  return (
    <section className='login-container' >
      <img className='image' src="src\assets\img\instagram-logo-login.jpg" alt="" />
      <div className='login-data' >
        <div >
          <div>
            <Logo />
            <p className='grey'> Sign up to see photos and videos from your friends.</p>
          </div>
          <Button onClick={onQuickLogin} title={'Quick login'} />
          <hr />

          <Form onSubmitForm={handleSignUp} />
        </div>
        <div>
          <p>Have an account? Log in</p>
        </div>
      </div>

    </section >

  )
}

function Logo() {
  return (
    <h2 className="logo">Instagram</h2>

  )
}

function Form({ onSubmitForm }) {
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  function handleFormSubmit(ev) {
    ev.preventDefault()
    const newUser = {
      email,
      fullName,
      userName,
      password
    }
    onSubmitForm(newUser)
  }
  return (
    <form onSubmit={handleFormSubmit} style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }} >
      <input type="email" placeholder='Email' value={email} onChange={(ev) => setEmail(ev.target.value)} />
      <input type="text" placeholder='Full Name' value={fullName} onChange={(ev) => setFullName(ev.target.value)} />
      <input type="text" placeholder='UserName' value={userName} onChange={(ev) => setUserName(ev.target.value)} />
      <input type="password" placeholder='Password' value={password} onChange={ev => setPassword(ev.target.value)} />
      <p>People who use our service may have uploaded your contact information to Instagram. Learn More
      </p>
      <p>By signing up, you agree to our Terms , Privacy Policy and Cookies Policy .</p>
      <Button title={'Sign up'} bgcolor={'#4CB5F9'} />
    </form>

  )
}
function Button({ title, onClick }) {
  return (
    <button onClick={onClick} className='login-btn'>
      {title}
    </button>
  )
}