import { LoginSignup } from "../cmps/LoginSignup.jsx"
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { login, logout, signup } from '../store/user.actions.js'
import { useNavigate } from 'react-router-dom';
import Logo from "../cmps/Logo.jsx"


import { useEffect, useState } from 'react'
// import { LoginSocialFacebook } from "reactjs-social-login";
// import { FacebookLoginButton } from "react-social-login-buttons";

export function LoginSignupPage() {
  const user = useSelector(storeState => storeState.userModule.user)
  // const slideshowImages = ["frontSign.png", "a.png"]
  // const [currentImgIndex, setCurrentImgIndex] = useState(0);


  const navigate = useNavigate();

  // useEffect(() => {
  //     const timer = setTimeout(() => {
  //         setCurrentImgIndex((prevIndex) => (prevIndex + 1) % slideshowImages.length);
  //     }, 5000)

  //     return () => clearTimeout(timer)
  // }, [currentImgIndex])

  async function onLogin(credentials) {
    try {
      const user = await login(credentials)
      showSuccessMsg(`Welcome: ${user.fullname}`)
      navigate('/pst')
    } catch (err) {
      showErrorMsg('Cannot login')
      navigate('//pst')
    }
  }
  async function onSignup(credentials) {
    try {
      const user = await signup(credentials)
      showSuccessMsg(`Welcome new user: ${user.fullname}`)
      navigate('/pst')
    } catch (err) {
      showErrorMsg('Cannot signup')
      navigate('/pst')
    }
  }
  async function onLogout() {
    try {
      await logout()
      showSuccessMsg(`Bye now`)
    } catch (err) {
      showErrorMsg('Cannot logout')
    }
  }

  function onContinue(){
    navigate('/pst')
  }


  return (
    <section className="login-signup-page-container">
      <div className="banner-side">
        <img className="img-banner" src='.\src\assets\img\mobile.png' alt="mobile banner" />
      </div>

      <div className="form-side">
        <Logo />
        {user &&
          <section className="form-side-user">
            
              <img className='profile-login-img' src={user.imgUrl} alt="profile image" />
              <button className="continue-btn" onClick={onContinue}>Continue as {user.fullname}</button>
            

            <button className="logout-btn" onClick={onLogout}>Logout</button>
          </section>
        }
        {!user &&
          <section>
            <LoginSignup onLogin={onLogin} onSignup={onSignup} />
          </section>
        }
      </div>
    </section>
  )

}