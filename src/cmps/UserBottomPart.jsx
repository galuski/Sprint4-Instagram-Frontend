import { NavLink, useMatch, useParams, useResolvedPath } from 'react-router-dom';
import PostsSvg from '../../public/icons/posts.svg'
import ReelsSvg from '../../public/icons/reels.svg'
import SaveSvg from '../../public/icons/save.svg'
import TaggedSvg from '../../public/icons/tagged.svg'



export function UserBottomPart() {

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
    <section className="user-bottom-part">
      <CustomNavLink to={`/profile/${userId}/psts`}><img src={PostsSvg} alt="Posts" />POSTS</CustomNavLink>
      <CustomNavLink to={`/profile/${userId}/reels`}><img src={ReelsSvg} alt="Reels" />REELS</CustomNavLink>
      <CustomNavLink to={`/profile/${userId}/saved`}><img src={SaveSvg} alt="Saved" />SAVED</CustomNavLink>
      <CustomNavLink to={`/profile/${userId}/tagged`}><img src={TaggedSvg} alt="Tagged" />TAGGED</CustomNavLink>
    </section>
  )
}
