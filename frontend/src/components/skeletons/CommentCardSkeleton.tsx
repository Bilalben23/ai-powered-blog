
const CommentCardSkeleton = () => {
    return (
        <div className='flex justify-between p-5 bg-gray-100 border-2 border-gray-200 rounded-md gap-x-8 animate-pulse'>
            <div className='flex w-full gap-x-3'>
                <div className='shrink-0'>
                    <div className='w-8 h-8 bg-gray-300 rounded-full'></div>
                </div>
                <div className='flex-1'>
                    <p className='w-1/3 h-4 mb-2 bg-gray-300 rounded'></p>
                    <p className='w-full h-3 mb-1 bg-gray-300 rounded'></p>
                    <p className='w-2/3 h-3 bg-gray-300 rounded'></p>
                </div>
            </div>
            <div className='self-end shrink-0'>
                <p className='w-16 h-3 bg-gray-300 rounded'></p>
            </div>
        </div>
    )
}

export default CommentCardSkeleton;
