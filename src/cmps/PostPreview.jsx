import PostPreviewHeader from '../cmps/PostPreviewHeader'
import PostImage from '../cmps/PostImage'
import PostActions from '../cmps/PostActions'
import PostStats from './PostStats'
import InputComment from '../cmps/InputComment'

export function PostPreview({ post, onDeletePost }) {

    return (
        <article className="post-preview">
            <PostPreviewHeader post={post} />
            <PostImage img={post.imgUrl} />
            <PostActions post={post} />
            <PostStats post={post} />
            <InputComment post={post} />
        </article>
    )
}
