export default PostStats

function PostStats({ post }) {
    return (
        <>
            <p className="likes-stats">{post.likedBy?.length} likes</p>
            <p className="name-stats"><strong className="name-color" > {post.by?.fullname} </strong>{post.txt}</p>
            {post.comments ? <p className="comments-stats">View all {post.comments.length} comments</p> : null}
        </>
    )
}