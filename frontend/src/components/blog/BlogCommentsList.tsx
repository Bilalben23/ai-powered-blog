import type { Comment } from '@constants/commentsData';
import type { FC } from 'react';
import CommentCard from './CommentCard';
import CommentCardSkeleton from '@components/skeletons/CommentCardSkeleton';

type BlogCommentsListProps = {
    isLoading: boolean;
    isError: boolean;
    comments: Comment[]
}

const BlogCommentsList: FC<BlogCommentsListProps> = ({ isLoading, isError, comments }) => {

    if (isError) {
        return <div>
            <p>Error occured while fecthing comments</p>
        </div>
    }

    if (isLoading) {
        return (
            <div className='flex flex-col gap-y-6'>
                {[...Array(3)].map((_, i) => (
                    <CommentCardSkeleton key={i} />
                ))}
            </div>
        )
    }


    if (comments.length === 0) {
        return <div>
            <p>No comments yet for this blog</p>
        </div>
    }

    return (
        <div className='flex flex-col gap-y-6'>
            {comments.map(comment => (
                <CommentCard
                    key={comment._id}
                    name={comment.name}
                    content={comment.content}
                    createdAt={comment.createdAt}
                />
            ))}
        </div>
    )
}

export default BlogCommentsList;
