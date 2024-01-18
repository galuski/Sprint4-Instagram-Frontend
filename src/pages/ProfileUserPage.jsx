import { useSelector } from 'react-redux'
import { ProfileUserHeader } from '../cmps/ProfileUserHeader'
import { ProfileUserFooter } from '../cmps/ProfileUserFooter'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { Sidebar } from '../cmps/Sidebar'

export function ProfileUserPage() {
    const user = useSelector(storeState => storeState.userModule.user)
    console.log('user', user)
    const { userId } = useParams()
   
    // const navigate = useNavigate('/')

    // useEffect(() => {
    //     navigate(`/profile/${userId}/psts`)
    // }, [])

    return (
        <section className='profile-user-page'>
            <div className='side-bar-position'>
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