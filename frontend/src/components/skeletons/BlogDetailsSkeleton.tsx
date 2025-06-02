import CommentCardSkeleton from "./CommentCardSkeleton";

export default function BlogDetailsSkeleton() {
    return (
        <div className="container px-2 mx-auto mt-10 sm:mt-16 md:mt-20">
            {/* Header Section */}
            <div className="mb-8 text-center">
                {/* Published date skeleton */}
                <p className="w-24 h-4 mx-auto bg-gray-300 rounded-full animate-pulse"></p>
                {/* Title skeleton */}
                <p className="w-3/4 h-10 mx-auto mt-4 mb-2 bg-gray-300 rounded-full animate-pulse"></p>
                {/* Subtitle skeleton */}
                <p className="w-1/2 h-6 mx-auto mb-4 bg-gray-300 rounded-full animate-pulse"></p>
                {/* Author badge skeleton */}
                <div className="inline-block w-32 h-8 mx-auto bg-gray-300 rounded-full animate-pulse"></div>
            </div>

            {/* Image Skeleton */}
            <div className="max-w-5xl mx-auto bg-gray-300 rounded-xl aspect-video animate-pulse" />

            {/* Description Section */}
            <div className="max-w-4xl px-5 mx-auto mt-6 space-y-3">
                {/* Multiple lines simulating paragraphs */}
                <div className="h-4 bg-gray-300 rounded-full animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded-full animate-pulse"></div>
                <div className="w-5/6 h-4 bg-gray-300 rounded-full animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded-full animate-pulse"></div>
            </div>

            {/* Comments Section */}
            <div className="max-w-3xl mx-auto my-12">
                {/* Comments header */}
                <p className="w-32 h-6 mb-4 bg-gray-300 rounded-full animate-pulse"></p>

                {/* Comments list skeleton */}
                <div className="flex flex-col gap-y-6">
                    {[1, 2, 3].map((i) => (
                        <CommentCardSkeleton key={i} />
                    ))}
                </div>
            </div>

            {/* Add Comment Section */}
            <div className="max-w-2xl mx-auto">
                <p className="w-40 h-6 mb-4 bg-gray-300 rounded-full animate-pulse"></p>
                <form className="flex flex-col items-start gap-y-5">
                    <div className="w-full h-10 bg-gray-300 rounded-md animate-pulse"></div>
                    <div className="w-full bg-gray-300 rounded-md h-28 animate-pulse"></div>
                    <div className="w-24 h-10 mt-2 bg-gray-300 rounded-md animate-pulse"></div>
                </form>
            </div>

            {/* Social Media Share Section */}
            <div className="max-w-2xl mx-auto mt-12">
                <p className="w-64 h-6 mb-4 bg-gray-300 rounded-full animate-pulse"></p>
                <div className="flex items-center gap-x-4">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="w-10 h-10 bg-gray-300 rounded-full shadow-md animate-pulse"
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
}
