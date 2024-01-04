import React from 'react'
import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { ProfileUserPage } from './pages/ProfileUserPage.jsx'
import { UserPost } from './cmps/UserPost.jsx'
import { PostDetails } from './pages/PostDetails.jsx'
import { UserReel } from './cmps/UserReels.jsx'
import { UserSaved } from './cmps/UserSaved.jsx'
import { UserTagged } from './cmps/UserTagged.jsx'


import routes from './routes'

// import { AppFooter } from './cmps/AppFooter'
import { UserDetails } from './pages/UserDetails'

export function RootCmp() {

    return (
        <div>
            {/* <AppHeader /> */}
            <main>
                <Routes>
                    {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                    <Route path="user/:id" element={<UserDetails />} />
                    <Route element={<ProfileUserPage />} path="/profile/:userId" >
                                <Route path="psts" element={<UserPost />}>
                                    <Route path=":pstId" element={<PostDetails />}></Route>
                                </Route>
                                <Route path="reels" element={<UserReel />}></Route>
                                <Route path="saved" element={<UserSaved />}></Route>
                                <Route path="tagged" element={<UserTagged />}></Route>
                            </Route>
                </Routes>
            </main>
            {/* <AppFooter /> */}
        </div>
    )
}


