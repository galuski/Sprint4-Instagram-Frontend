import { ProfileUserFooterGuest } from '../cmps/ProfileUserFooterGuest'
import { Outlet, useNavigate } from 'react-router-dom'
import { ProfileUserHeaderGuest } from '../cmps/ProfileUserHeaderGuest'
import { Sidebar } from '../cmps/Sidebar'
import Logo from "../cmps/Logo"

export function ProfileUserGuest() {

    return (
        <section className='profile-user-guest'>
            <div className="logo-mobile">
                <Logo />
            </div>
            <div className='side-bar-position-guest'>
                <Sidebar />
            </div>
            <main className='profile-user'>
                <ProfileUserHeaderGuest />
                <ProfileUserFooterGuest />
                <div className="nested-route">
                    <Outlet />
                </div>
            </main>
        </section>
    )
}