const CommentTableSkeleton = ({ skeletonRowsNumber = 10 }) => {
    return (
        <>
            {Array.from({ length: skeletonRowsNumber }).map((_, index) => (
                <tr key={index} className="animate-pulse border-b border-gray-200">
                    {/* Blog Title & Comment */}
                    <td className="p-4">
                        <div className="h-4 mb-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 mb-1 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                    </td>

                    {/* Date */}
                    <td className="p-4 max-sm:hidden">
                        <div className="h-3 w-20 bg-gray-200 rounded"></div>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-end">
                        <div className="flex justify-end gap-2">
                            <div className="h-6 w-12 bg-gray-200 rounded-full"></div>
                            <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
                        </div>
                    </td>
                </tr>
            ))}
        </>
    );
};

export default CommentTableSkeleton;
