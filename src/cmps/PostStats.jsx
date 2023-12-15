export default function PostStats({ post }) {

    return (

        <section className="post-stats">
            {post.likedBy?.length > 0 && (
                <p className="likes-stats"><strong>
                    {post.likedBy?.length} {post.likedBy?.length === 1 ? 'like' : 'likes'}
                </strong></p>
            )}
            {post.likedBy?.length === 0 && (
                <p className="likes-stats">
                    {post.likedBy?.length === 1 ? 'Be the first to like' : 'Be the first to like'}
                </p>
            )}
            <span className="userName-preview">{post.by?.fullname}</span>
            <p>{post.txt}</p>
            {post.comments ? <p className="comments-stats">View all {post.comments.length} comments</p> : null}
        </section>

    )
}