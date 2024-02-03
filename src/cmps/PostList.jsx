// import { useSelector } from 'react-redux'
import { PostPreview } from "./PostPreview"
export function PostList({ posts, onDeletePost }) {
    return (
        <>
            {posts.map(post => <PostPreview onDeletePost={onDeletePost} key={post._id} post={post} />)}
        </>
    )
}
