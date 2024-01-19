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
            <div className='nb-home'>
            <NavbarButton icon={homeSvg} title={'Home'} onClick={() => navigate(`/pst`)} />
            </div>
            <div className='nb-search'>
            <NavbarButton icon={searchSvg} title={'Search'} />
            </div>
            <div className='nb-explore'>
            <NavbarButton icon={exploreSvg} title={'Explore'} onClick={() => navigate('/explore')} />
            </div>
            <div className='nb-reels'>
            <NavbarButton icon={reelsSvg} title={'Reels'} />
            </div>
            <div className='nb-messages'>
            <NavbarButton icon={messagesSvg} title={'Messages'} />
            </div>
            <div className='nb-create'>
            <NavbarButton onClick={onCreate} icon={createSvg} title={'Create'} />
            </div>
            <div className='nb-profile'>
            <NavbarButton icon={profileImg} title={'Profile'} onClick={() => navigate(`/profile/${user._id}/psts`)} isProfile={true} />
            </div>
        </nav>
    )
}
