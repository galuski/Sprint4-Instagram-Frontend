export default PostImage

function PostImage({ img }) {
    return (
        <div className="post-img-container">
            <img className="post-img" src={img} alt="profile" />
        </div>
    )
}