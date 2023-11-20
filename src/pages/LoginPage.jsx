import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CHANGE_COUNT } from '../store/user.reducer'
import { utilService } from '../services/util.service'
import { httpService } from '../services/http.service'
import { useNavigate, redirect } from 'react-router'
import { postsDemo } from '../services/post.service.local'
import { userService } from '../services/user.service'



export function LoginPage() {
  const navigate = useNavigate()

  function handleSignUp(user) {

    // httpService.post('')
    console.log(user)
  }
  function onQuickLogin() {
    utilService.saveToStorage('post', postsDemo)
    // utilService.saveToStorage('user', userDemo)
    navigate('/home')
  }

  return (
    <section className='login-page-container'>
      <div className="banner-side">
        <img className='img-banner' src=".\src\assets\img\mobile.png" alt="" />
      </div>
      <div className='form-side'>
        <div >
          <Logo />
          <p className='p-primary'>
            Sign up to see photos and videos <br /> from your friends.
          </p>
          <Button onClick={onQuickLogin} title={'Quick login'} />
          <h6>OR</h6>
          <Form onSubmitForm={handleSignUp} />
        </div>
        <div>
          <p className='p-second'>Have an account? Log in</p>
        </div>
      </div>

    </section >

  )
}

function Logo() {
  return (
    <img className='logo-login' src='.\src\assets\icons\logo.svg'></img>
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
      <p className='p-second'>People who use our service may have uploaded your contact information to Instagram. Learn More
      </p>
      <p className='p-second'>By signing up, you agree to our Terms , Privacy Policy and Cookies Policy .</p>
      <Button title={'Sign up'} />
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