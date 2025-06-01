import type { Comment } from '@constants/commentsData';
import type { FC } from 'react';
import CommentCard from './CommentCard';

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


    return (
        <>
            {
                isLoading
                    ? <div className='flex flex-col gap-y-4'>
                        <p>Loading...</p>
                    </div>
                    : comments.length === 0
                        ? <div>
                            <p>No comments yet for this blog</p>
                        </div>
                        : <div className='flex flex-col max-w-3xl gap-y-6'>
                            {
                                comments.map(comment => (
                                    <CommentCard
                                        key={comment._id}
                                        name={comment.name}
                                        content={comment.content}
                                        createdAt={comment.createdAt}
                                    />
                                ))
                            }
                        </div>
            }
        </>
    )
}

export default BlogCommentsList;
