import PostPreviewHeader from '../cmps/PostPreviewHeader'
import PostImage from '../cmps/PostImage'
import PostPreviewFooter from '../cmps/PostPreviewFooter'


export function PostPreview({ post, onDeletePost }) {

    return (
        <section className="post-preview">
            <PostPreviewHeader post={post} />
            <PostImage img={post.imgUrl} />
            <PostPreviewFooter post={post} />
        </section>
    )
}
