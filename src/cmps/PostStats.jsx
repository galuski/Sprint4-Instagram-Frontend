export default function PostStats({ post }) {

    return (

        <section className="post-stats">
            {likesCount > 0 && (
                <p className="likes-stats"><strong>
                    {likesCount} {likesCount === 1 ? 'like' : 'likes'}
                </strong></p>
            )}
            {likesCount === 0 && (
                <p className="likes-stats">
                    {likesCount === 1 ? 'Be the first to like' : 'Be the first to like'}
                </p>
            )}
            <span className="userName-preview">{post.by?.fullname}</span>
            <p>{post.txt}</p>
            {post.comments ? <p className="comments-stats">View all {post.comments.length} comments</p> : null}
        </section>

    )
}