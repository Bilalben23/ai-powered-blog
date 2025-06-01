import { assets } from '@constants/assets';
import { timeAgo } from '@utils/timeAgo';
import { type FC } from 'react'


type CommentCardProps = {
    name: string;
    content: string;
    createdAt: string
}

const CommentCard: FC<CommentCardProps> = ({ name, content, createdAt }) => {
    return (
        <div className='flex justify-between p-5 border-2 rounded-md gap-x-8 bg-primary/2 border-primary/5'>
            <div className='flex gap-x-3'>
                <div className='shrink-0'>
                    <img
                        src={assets.user_icon}
                        alt={`${name}'s avatar`}
                        className='size-8'
                    />
                </div>
                <div>
                    <p className='mb-2 text-lg font-medium'>{name}</p>
                    <p className='font-light text-gray-700'>{content}</p>
                </div>
            </div>
            <div className='self-end shrink-0'>
                <p className='text-sm font-light text-gray-500'>{timeAgo(createdAt)}</p>
            </div>
        </div>
    )
}


export default CommentCard