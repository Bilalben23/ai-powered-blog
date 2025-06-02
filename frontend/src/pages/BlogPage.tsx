import BlogCommentsList from '@components/blog/BlogCommentsList';
import ErrorMessage from '@components/ErrorMessage';
import BlogDetailsSkeleton from '@components/skeletons/BlogDetailsSkeleton';
import { assets } from '@constants/assets';
import { blogData, type Blog } from '@constants/blogData';
import { commentsData, type Comment } from '@constants/commentsData';
import { formatDate } from '@utils/formatDate';
import { useEffect, useState, type ChangeEvent } from 'react';
import { useParams } from 'react-router-dom'


const INITIAL_COMMENT_DATA = {
    name: "",
    comment: ""
}

export default function BlogPage() {
    const { id } = useParams<{ id?: string }>();

    // TODO: Send the requests by id to the backend and get the real data.  
    const [blog, setBlog] = useState<Blog | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);

    const [isBlogError, setIsBlogError] = useState(false);
    const [isBlogLoading, setIsBlogLoading] = useState(false);

    const [isCommentsError, setIsCommentsError] = useState(false);
    const [isCommentsLoading, setIsCommentsLoading] = useState(false);

    const [commentData, setCommentData] = useState(INITIAL_COMMENT_DATA);


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCommentData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }


    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        // TODO: sending the comment to the backend...
        console.log("sending the comment...", commentData);
    }

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
                }, 4000)
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


    if (isBlogError) {
        return (
            <ErrorMessage
                title='Oops! Something went wrong.'
                message="We couldn' t fetch the blog post.Please try refreshing the page or check your connection."
            />
        )
    }


    if (isBlogLoading) {
        return <BlogDetailsSkeleton />
    }

    return (
        <>
            {
                blog && <section className='container px-2 mx-auto mt-10 sm:mt-16 md:mt-20'>

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
                                className='object-cover rounded-xl aspect-video'
                            />
                        </div>
                    </div>


                    <div className='max-w-4xl px-5 mx-auto mt-6'>
                        {/* Description section */}
                        <div className='blog-description' dangerouslySetInnerHTML={{ __html: blog.description }} />

                        {/* Comments Section */}
                        <div className='max-w-3xl my-12'>
                            <p className='mb-4 font-semibold'>Comments ({comments.length})</p>
                            <BlogCommentsList
                                isError={isCommentsError}
                                isLoading={isCommentsLoading}
                                comments={comments}
                            />
                        </div>

                        {/* Add comment section */}
                        <div className='max-w-2xl'>
                            <p className='mb-4 font-semibold'>Add your comment</p>
                            <form className='flex flex-col items-start gap-y-5' onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    name='name'
                                    placeholder="Your name"
                                    className="w-full p-3 transition border border-gray-300 rounded-md outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                    onChange={handleChange}
                                    value={commentData.name}
                                    required
                                />
                                <textarea
                                    name="comment"
                                    placeholder="Your comment..."
                                    className="w-full p-3 transition border border-gray-300 rounded-md outline-none focus:border-primary focus:ring-1 max-h-[400px] focus:ring-primary"
                                    rows={7}
                                    onChange={handleChange}
                                    value={commentData.comment}
                                    required
                                ></textarea>
                                <button
                                    type="submit"
                                    className='px-8 py-2 text-white transition rounded-md shadow-xs cursor-pointer hover:bg-primary/95 hover:shadow-none bg-primary hover:scale-102'
                                >Submit</button>
                            </form>
                        </div>

                        {/* Social Media Share Section */}
                        <div className='mt-12'>
                            <p className='mb-4 font-semibold'>Share this article on social media</p>
                            <div className='flex items-center gap-x-4'>
                                <a href="#" className='block p-2 transition rounded-full shadow-md hover:shadow-sm'>
                                    <img
                                        src={assets.facebook_icon}
                                        alt="Facebook"
                                        className='size-7'
                                    />
                                </a>
                                <a href="#" className='block p-2 transition rounded-full shadow-md hover:shadow-sm'>
                                    <img
                                        src={assets.twitter_icon}
                                        alt="Twitter"
                                        className='size-7'

                                    />
                                </a>

                                <a href="#" className='block p-2 transition rounded-full shadow-md hover:shadow-sm'>
                                    <img
                                        src={assets.googleplus_icon}
                                        alt="Google Plus"
                                        className='size-7'
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            }
        </>
    )
}
