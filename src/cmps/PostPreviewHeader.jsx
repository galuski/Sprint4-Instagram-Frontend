import dotsSvg from '/src/assets/icons/dots.svg'
export default PostPreviewHeader

function PostPreviewHeader({ post, onDeletePost }) {

    return (
        <div className="post-preview-header">
            <div>
                <img src={post.by?.imgUrl} alt="profile" />
                <strong className="userName-preview">{post.by?.fullname}</strong>
            </div>

            <img title='Delete post' onClick={() => onDeletePost(post._id)} src={dotsSvg} alt="" />
        </div>
    )
}