// import dotsSvg from '/src/assets/icons/dots.svg'import { useSelector } from 'react-redux'
import PostPreviewHeader from '../cmps/PostPreviewHeader'
import PostImage from '../cmps/PostImage'
import PostActions from '../cmps/PostActions'
import PostStats from './PostStats'
import InputComment from '../cmps/InputComment'
export function PostList({ posts, onDeletePost }) {

    return (
        <>
            {posts.map(post => <PostPreview onDeletePost={onDeletePost} key={post._id} post={post} />)}
        </>
    )
}

function PostPreview({ post, onDeletePost }) {

    return (
        <article className="post-preview">
            <PostPreviewHeader onDeletePost={onDeletePost} post={post} />
            <PostImage img={post.imgUrl} />
            <PostActions post={post} />
            <PostStats post={post} />
            <InputComment post={post} />
            <hr />
        </article>
    )
}