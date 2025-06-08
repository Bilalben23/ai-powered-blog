export default function BlogCardSkeleton() {
    return (
        <div className='rounded-lg shadow-sm animate-pulse bg-white'>
            {/* Image Placeholder */}
            <div>
                <div className='aspect-video bg-gray-300 animate-pulse rounded-lg'></div>
            </div>

            <div className='space-y-2 p-4'>
                {/* Category Pill */}
                <p className='rounded-full mb-3 w-fit px-15 h-7.5 bg-gray-300 '></p>

                {/* Title */}
                <p className="h-5 bg-gray-300 rounded-full"></p>

                {/* Description lines */}
                <p className="h-4 mt-4 bg-gray-300 rounded-full"></p>
                <p className="h-4 bg-gray-300 rounded-full"></p>
                <p className="h-4 w-1/2 bg-gray-300 rounded-full"></p>
            </div>
        </div>
    )
}
