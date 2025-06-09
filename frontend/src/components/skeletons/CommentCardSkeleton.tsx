
const CommentCardSkeleton = () => {
    return (
        <div className='flex flex-col p-2 bg-gray-100 border-2 border-gray-200 rounded-md sm:p-5 gap-y-2 animate-pulse'>
            <div className='flex items-center gap-x-3'>
                <div className='bg-gray-300 rounded-full size-9'></div>
                <p className='w-1/3 h-4 bg-gray-300 rounded'></p>
            </div>
            <div className='pl-12'>
                <p className='w-full h-3 mb-1 bg-gray-300 rounded'></p>
                <p className='w-2/3 h-3 bg-gray-300 rounded'></p>
            </div>
            <div className='self-end mt-1'>
                <p className='h-3 bg-gray-300 rounded w-18'></p>
            </div>
        </div>
    )
}

export default CommentCardSkeleton;
