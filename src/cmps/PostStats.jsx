export default function PostStats({ post }) {

    return (
        <>
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
            <p className="name-stats"><strong className="name-color" > {post.by?.fullname} </strong>{post.txt}</p>
            {post.comments ? <p className="comments-stats">View all {post.comments.length} comments</p> : null}
        </>
    )
}