import { NavLink, useMatch, useParams, useResolvedPath } from 'react-router-dom';
import PostsSvg from '../../public/icons/posts.svg'
import ReelsSvg from '../../public/icons/reels.svg'
import SaveSvg from '../../public/icons/save.svg'
import TaggedSvg from '../../public/icons/tagged.svg'

export function ProfileUserFooter() {

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
      <CustomNavLink to={`/profile/${userId}/psts`}><img src={PostsSvg} alt="Posts" /><p>POSTS</p></CustomNavLink>
      <CustomNavLink to={`/profile/${userId}/reels`}><img src={ReelsSvg} alt="Reels" /><p>REELS</p></CustomNavLink>
      <CustomNavLink to={`/profile/${userId}/saved`}><img src={SaveSvg} alt="Saved" /><p>SAVED</p></CustomNavLink>
      <CustomNavLink to={`/profile/${userId}/tagged`}><img src={TaggedSvg} alt="Tagged" /><p>TAGGED</p></CustomNavLink>
    </section>
  )
}