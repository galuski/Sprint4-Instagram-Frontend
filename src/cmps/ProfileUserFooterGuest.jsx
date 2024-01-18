import { NavLink, useMatch, useParams, useResolvedPath } from 'react-router-dom';
import PostsSvg from '../../public/icons/posts.svg'
import ReelsSvg from '../../public/icons/reels.svg'
import SaveSvg from '../../public/icons/save.svg'
import TaggedSvg from '../../public/icons/tagged.svg'



export function ProfileUserFooterGuest() {

  const { userId } = useParams()

  function CustomNavLink({ to, children }) {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });

    return (
      <NavLink
        to={to}
        className={match ? 'active-link' : ''}
      >
        {children}
      </NavLink>
    );
  }
  return (
    <section className="profile-user-footer">
      <CustomNavLink to={`/profile-g/${userId}/psts`}><img src={PostsSvg} alt="Posts" />POSTS</CustomNavLink>
      <CustomNavLink to={`/profile-g/${userId}/reels`}><img src={ReelsSvg} alt="Reels" />REELS</CustomNavLink>
      <CustomNavLink to={`/profile-g/${userId}/saved`}><img src={SaveSvg} alt="Saved" />SAVED</CustomNavLink>
      <CustomNavLink to={`/profile-g/${userId}/tagged`}><img src={TaggedSvg} alt="Tagged" />TAGGED</CustomNavLink>
    </section>
  )
}
