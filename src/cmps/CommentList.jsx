import { CommentDetails } from './CommentDetails';

export function CommentList({ post }) {
    
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