const BlogTableSkeleton = ({ rowsNumber = 6 }) => {
    return (
        <>
            {Array.from({ length: rowsNumber }).map((_, i) => (
                <tr key={i} className="animate-pulse border-b border-gray-200">
                    <td className="pl-5 py-4">
                        <div className="size-4 bg-gray-200 rounded" />
                    </td>
                    <td className="px-2 py-4">
                        <div className="w-32 h-5 bg-gray-200 rounded" />
                    </td>
                    <td className="px-2 py-4 max-sm:hidden">
                        <div className="w-20 h-5 bg-gray-200 rounded" />
                    </td>
                    <td className="px-2 py-4 max-w-sm:hidden">
                        <div className="w-16 h-5 bg-gray-200 rounded" />
                    </td>
                    <td className="px-2 py-4 flex items-center gap-x-3">
                        <div className="w-24 h-6 bg-gray-200 rounded" />
                        <div className="size-6 bg-gray-200 rounded-full" />
                    </td>
                </tr>
            ))}
        </>
    );
};

export default BlogTableSkeleton;
