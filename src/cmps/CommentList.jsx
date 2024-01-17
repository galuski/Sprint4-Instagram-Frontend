import { useDispatch, useSelector } from 'react-redux';
import { CommentDetails } from './CommentDetails';

export function CommentList({ post }) {
    // const psts = useSelector(storeState => storeState.pstModule.psts) || [];
    
    return (
        <section className='comment-list'>
        <div className="list">
            {post.comments.map((comment, index) => (
                <CommentDetails key={index} post={post} comment={comment} />
            ))}
        </div>
        </section>
    )
}