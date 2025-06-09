import type { FC } from 'react';
import CommentCard from './CommentCard';
import CommentCardSkeleton from '@components/skeletons/CommentCardSkeleton';
import type { Comment } from '@hooks/useApprovedComments';
import ErrorMessage from '@components/ErrorMessage';

type BlogCommentsListProps = {
    isLoading: boolean;
    isError: boolean;
    error?: string;
    comments?: Comment[]
}

const BlogCommentsList: FC<BlogCommentsListProps> = ({ isLoading, isError, error, comments }) => {

    if (isError) {
        return <ErrorMessage
            title="Failed to load comments"
            message={error}
        />
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


    if (comments?.length === 0) {
        return <div className="py-6 text-center text-gray-600">
            <p className="text-lg font-medium">No comments yet</p>
            <p className="text-sm text-gray-500">Be the first to share your thoughts on this post.</p>
        </div>

    }

    return (
        <div className='flex flex-col gap-y-6'>
            {comments?.map(comment => (
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
