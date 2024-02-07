import { useSelector } from 'react-redux'
import { ProfileUserHeader } from '../cmps/ProfileUserHeader'
import { ProfileUserFooter } from '../cmps/ProfileUserFooter'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { Sidebar } from '../cmps/Sidebar'
import Logo from "../cmps/Logo"

export function ProfileUserPage() {
    const user = useSelector(storeState => storeState.userModule.user)
    const { userId } = useParams()

    return (
        <section className='profile-user-page'>
            <div className="logo-mobile">
                <Logo />
            </div>
            <div className='side-bar-position-profile'>
                <Sidebar />
            </div>
            <main className='profile-user'>
                <ProfileUserHeader />
                <ProfileUserFooter />
                <div className="nested-route">
                    <Outlet />
                </div>
            </main>
        </section>
    )
}