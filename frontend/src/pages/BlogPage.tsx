import BlogCommentsList from '@components/blog/BlogCommentsList';
import { assets } from '@constants/assets';
import { blogData, type Blog } from '@constants/blogData';
import { commentsData, type Comment } from '@constants/commentsData';
import { formatDate } from '@utils/formatDate';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

export default function BlogPage() {
    const { id } = useParams<{ id?: string }>();

    // TODO: Send the requests to the backend and get the real data.  
    const [blog, setBlog] = useState<Blog | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);

    const [isBlogError, setIsBlogError] = useState(false);
    const [isBlogLoading, setIsBlogLoading] = useState(false);

    const [isCommentsError, setIsCommentsError] = useState(false);
    const [isCommentsLoading, setIsCommentsLoading] = useState(false);

    const fetchBlog = async () => {
        setIsBlogLoading(true);
        setIsBlogError(false);

        try {
            const result = await new Promise((resolve, reject) => {
                setTimeout(() => {
                    const found = blogData.find((blog) => blog._id === id);
                    if (found) {
                        resolve(found);
                    } else {
                        reject(new Error("Blog not found"));
                    }
                }, 3000)
            })

            setBlog(result as Blog);
        } catch (err) {
            setIsBlogError(true);
        } finally {
            setIsBlogLoading(false);
        }
    }



    const fetchComments = async () => {
        setIsCommentsLoading(true);
        setIsCommentsError(false);

        try {
            const result = await new Promise((resolve, reject) => {
                setTimeout(() => {
                    const found = commentsData.filter(comment => comment.blog._id === id);
                    if (found) {
                        resolve(found);
                    } else {
                        reject(new Error("Blog not found for getting the comments"));
                    }
                }, 3000)
            })

            setComments(result as Comment[]);
        } catch (err) {
            setIsBlogError(true);
        } finally {
            setIsCommentsLoading(false);
        }
    }

    useEffect(() => {
        fetchBlog();
        fetchComments();
    }, [])


    return (
        <>
            {
                !isBlogError ?
                    isBlogLoading ?
                        <div>
                            <p>Loading...</p>
                        </div>
                        : blog && <section className='container px-2 mx-auto mt-10 sm:mt-16 md:mt-20'>

                            <div className='relative'>
                                <img
                                    src={assets.gradientBackground}
                                    alt="Gradient Background"
                                    className='absolute opacity-50 -top-40 -z-1'
                                />

                                <div className='mb-8 text-center'>
                                    <p className='text-primary'>Published on {formatDate(blog.createdAt)}</p>
                                    <h1 className='max-w-2xl mx-auto my-4 text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl'>{blog.title}</h1>
                                    <p className='mb-4 font-light text-gray-500'>{blog.subTitle}</p>
                                    <div className='inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-2 sm:mb-4 text-sm border rounded-full border-primary bg-primary/5'>
                                        <p className='text-primary'>Micheal Brown</p>
                                    </div>
                                </div>

                                <div className='max-w-5xl mx-auto'>
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className='rounded-xl aspect-video'
                                    />
                                </div>

                                <div className='max-w-4xl px-5 mx-auto mt-6'>
                                    <div className='blog-description' dangerouslySetInnerHTML={{ __html: blog.description }} />

                                    {/* Comments Section */}
                                    <div className='mt-12'>
                                        <p className='mb-4 font-semibold'>Comments ({comments.length})</p>
                                        <BlogCommentsList
                                            isError={isCommentsError}
                                            isLoading={isCommentsLoading}
                                            comments={comments}
                                        />
                                    </div>

                                </div>
                            </div>

                        </section>
                    : <div>
                        <p>Error occurred while fetching blog data</p>
                    </div>
            }
        </>
    )
}
