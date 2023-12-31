import { LoginSignupPage } from './pages/LoginSignUpPage.jsx'
import {  HomePage } from './pages/HomePage.jsx'
import { PostDetails } from './pages/PostDetails.jsx'
import { ProfileUserPage } from './pages/ProfileUserPage.jsx'
import { Explore } from './pages/Explore.jsx'

// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path: '/',
        component: <LoginSignupPage />,
        label: 'Instagram Login',
    },
    // {
    //     path: 'baba',
    //     component: <BabaIndex />,
    //     label: 'Meet our Babas'
    // },
    // {
    //     path: 'survey',
    //     component: <SurveyIndex />,
    //     label: 'Take our survey'
    // },
    {
        path: '/pst',
        component: <HomePage/>,
        label: 'Instagram home page'
    },
    {
        path: '/pst/:pstId',
        component: <PostDetails />,
        label: 'Post Details'
    },
    // {
    //     path: '/profile/:userId/psts',
    //     component: <ProfileUserPage />,
    //     label: 'Profile Page',
    // },
    {
        path: '/explore',
        component: <Explore />,
        label: 'Explore',
    },
    
   

    // {
    //     path: 'review',
    //     component: <ReviewIndex />,
    //     label: 'Reviews'
    // },
    // {
    //     path: 'chat',
    //     component: <ChatApp />,
    //     label: 'Chat'
    // },
    // {
    //     path: 'about',
    //     component: <AboutUs />,
    //     label: 'About us'
    // },
    // {
    //     path: 'admin',
    //     component: <AdminApp />,
    //     label: 'Admin Only'
    // }
]

export default routes