import { LoginPage } from './pages/LoginPage.jsx'
import {  HomePage } from './pages/HomePage.jsx'

// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path: '/',
        component: <LoginPage />,
        label: 'Home 🏠',
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
        path: 'home',
        component: <HomePage/>,
        label: 'Instagram home page'
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