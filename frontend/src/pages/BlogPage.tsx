import BlogCommentsList from '@components/blog/BlogCommentsList';
import ErrorMessage from '@components/ErrorMessage';
import BlogDetailsSkeleton from '@components/skeletons/BlogDetailsSkeleton';
import { assets } from '@constants/assets';
import { commentsData, type Comment } from '@constants/commentsData';
import { zodResolver } from '@hookform/resolvers/zod';
import useBlogById from '@hooks/useBlogById';
import useCreateComment from '@hooks/useCreateComment';
import { formatDateStandard } from '@utils/formatDate';
import { createCommentSchema } from '@validations/commentSchema';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';


export default function BlogPage() {
    const { id } = useParams<{ id?: string }>();
    const {
        register,
        handleSubmit,
        getValues,
        formState: {
            errors
        },
        reset
    } = useForm({
        resolver: zodResolver(createCommentSchema),
        defaultValues: {
            name: "",
            content: ""
        }
    })

    const {
        data: blog,
        isLoading: isBlogLoading,
        isError: isBlogError,
        error: blogError
    } = useBlogById(id);

    const { mutate: createComment, isPending } = useCreateComment(id);

    const [comments, setComments] = useState<Comment[]>([]);

    const [isCommentsError, setIsCommentsError] = useState(false);
    const [isCommentsLoading, setIsCommentsLoading] = useState(false);



    const onsSubmit = () => {
        createComment(getValues(), {
            onSuccess: () => {
                toast.success("Your comment has been submitted and is awaiting approval", {
                    duration: 3000
                });
                reset()
            },
            onError: (err) => {
                console.error(err.message);
                toast.error("Something went wrong. Please try again later.")
            }
        })
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
            setIsCommentsError(true);
        } finally {
            setIsCommentsLoading(false);
        }
    }

    useEffect(() => {
        fetchComments();
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])


    if (isBlogError) {
        return (
            <ErrorMessage
                title='Oops! Something went wrong.'
                message={blogError.message}
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
                            <p className='text-primary'>Published on {formatDateStandard(blog.createdAt)}</p>
                            <h1 className='max-w-2xl mx-auto my-4 text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl'>{blog.title}</h1>
                            <p className='mb-4 font-light text-gray-500'>{blog.subTitle}</p>
                            <div className='inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-2 sm:mb-4 text-sm border rounded-full border-primary bg-primary/5'>
                                <p className='text-primary'>{blog.author.name}</p>
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
                            <form className='flex flex-col items-start gap-y-5' onSubmit={handleSubmit(onsSubmit)}>
                                <div className='w-full'>
                                    <input
                                        type="text"
                                        {...register("name")}
                                        placeholder="Your name"
                                        className={`w-full p-3 transition border rounded-md outline-none focus:border-primary focus:ring-1 focus:ring-primary ${errors.name ? "border-red-500" : "border-gray-300"}`}
                                    />
                                    {errors.name && <p className='text-sm font-light text-red-500'>{errors.name.message}</p>}
                                </div>
                                <div className='w-full'>
                                    <textarea
                                        {...register("content")}
                                        placeholder="Your comment..."
                                        className={`w-full p-3 transition border rounded-md outline-none focus:border-primary focus:ring-1 max-h-[400px] focus:ring-primary ${errors.content ? "border-red-500" : "border-gray-300"}`}
                                        rows={7}
                                    ></textarea>
                                    {errors.content && <p className='text-sm font-light text-red-500'>{errors.content.message}</p>}
                                </div>
                                <button
                                    type="submit"
                                    className='px-8 py-2 text-white transition rounded-md shadow-xs cursor-pointer disabled:opacity-75 hover:bg-primary/95 hover:shadow-none bg-primary hover:scale-102'
                                    disabled={isPending}
                                >
                                    {isPending ? "Submitting..." : "Submit"}
                                </button>
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
