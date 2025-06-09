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
        <div className='flex flex-col p-3 border-2 rounded-md sm:p-5 gap-y-2 bg-primary/2 border-primary/5'>
            <div className='flex items-center w-full gap-x-3'>
                <img
                    src={assets.user_icon}
                    alt={`${name}'s avatar`}
                    className='size-9'
                />
                <p className='text-lg font-medium'>{name}</p>
            </div>

            <div className='pl-12'>
                <p className='font-light text-gray-700'>{content}</p>
            </div>

            <div className='self-end mt-1'>
                <p className='text-sm font-light text-gray-500'>{timeAgo(createdAt)}</p>
            </div>
        </div>
    )
}


export default CommentCard