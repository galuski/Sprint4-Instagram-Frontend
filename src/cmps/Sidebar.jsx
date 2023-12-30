import logo from '../../public/icons/logo.svg'
import homeSvg from '../../public/icons/home.svg'
import searchSvg from '../../public/icons/search.svg'
import exploreSvg from '../../public/icons/explorer.svg'
import reelsSvg from '../../public/icons/reels.svg'
import messagesSvg from '../../public/icons/message.svg'
import createSvg from '../../public/icons/create.svg'
import { userService } from '../services/user.service'
import { NavbarButton } from './NavbarButton'
import { useNavigate } from 'react-router-dom';


export function Sidebar({ onCreate }) {

    const navigate = useNavigate();
    const user = userService.getLoggedInUser()

    let profileImg = user.imgUrl



    return (
        <nav className='side-bar'>
            <div className='logo-side-bar'><img src={logo} alt="Instagram" /></div>
            <NavbarButton icon={homeSvg} title={'Home'} />
            <NavbarButton icon={searchSvg} title={'Search'} />
            <NavbarButton icon={exploreSvg} title={'Explore'} />
            <NavbarButton icon={reelsSvg} title={'Reels'} />
            <NavbarButton icon={messagesSvg} title={'Messages'} />
            <NavbarButton onClick={onCreate} icon={createSvg} title={'Create'} />
            <NavbarButton icon={profileImg} title={'Profile'} onClick={() => navigate(`/profile/${user._id}`)} isProfile={true} />
        </nav>
    )
}
