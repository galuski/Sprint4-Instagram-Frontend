// import { useSelector } from 'react-redux'
import { ProfileUserFooterGuest } from '../cmps/ProfileUserFooterGuest'
import { Outlet, useNavigate } from 'react-router-dom'
import { ProfileUserHeaderGuest } from '../cmps/ProfileUserHeaderGuest'
import { Sidebar } from '../cmps/Sidebar'


export function ProfileUserGuest() {
    // const user = useSelector(storeState => storeState.userModule.user)

    return (
        <section className='profile-user-guest'>
            <div className='side-bar-position'>
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