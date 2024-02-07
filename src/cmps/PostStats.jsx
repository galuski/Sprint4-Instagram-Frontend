export default function PostStats({ post }) {

    const likesCount = post.likedBy?.length

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
        </section>
    )
}