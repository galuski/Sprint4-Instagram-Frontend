import logo from '/src/assets/icons/logo.svg'
import homeSvg from '/src/assets/icons/home.svg'
import searchSvg from '/src/assets/icons/search.svg'
import exploreSvg from '/src/assets/icons/explorer.svg'
import reelsSvg from '/src/assets/icons/reels.svg'
import messagesSvg from '/src/assets/icons/message.svg'
import createSvg from '/src/assets/icons/create.svg'
import profile from '/src/assets/icons/profile.svg'

import { NavbarButton } from './NavbarButton'
export function Sidebar({ onCreate }) {
    return (
        <nav className='side-bar'>
                <div className='logo-side-bar'><img src={logo} alt="Instagram" /></div>
                    <NavbarButton icon={homeSvg} title={'Home'} />
                    <NavbarButton icon={searchSvg} title={'Search'} />
                    <NavbarButton icon={exploreSvg} title={'Explore'} />
                    <NavbarButton icon={reelsSvg} title={'Reels'} />
                    <NavbarButton icon={messagesSvg} title={'Messages'} />
                    <NavbarButton onClick={onCreate} icon={createSvg} title={'Create'} />
        
        </nav>
    )
}
