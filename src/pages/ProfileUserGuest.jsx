import { useSelector } from 'react-redux'
import { ProfileUserFooter } from '../cmps/ProfileUserFooter'
import { Outlet, useNavigate } from 'react-router-dom'
import { ProfileUserHeaderGuest } from '../cmps/ProfileUserHeaderGuest'

export function OtherUserProfile() {
    const user = useSelector(storeState => storeState.userModule.user)
    console.log('user',user)

    return (
        <section className='profile-user-page'>
            <ProfileUserHeaderGuest />
            <ProfileUserFooter />
            <div className="nested-route">
            <Outlet />
        </div>
        </section>

    )
}