import { assets } from '@constants/assets';
import { blogCategories } from '@constants/blogData';
import { useEffect, useRef } from 'react';
import { motion } from "motion/react";
import { Pencil } from 'lucide-react';
import Quill from 'quill';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { blogSchema, type BlogFormInputs } from '@validations/blogSchema';
import useCreateBlog from '@hooks/useCreateBlog';
import toast from 'react-hot-toast';
import useGenerateDescription from '@hooks/useGenerateDescription';
import { parse } from "marked";
import { ClipLoader } from "react-spinners";


export default function AdminAddBlog() {
    const {
        handleSubmit,
        watch,
        setValue,
        register,
        getValues,
        reset,
        formState: { errors }
    } = useForm<BlogFormInputs>({
        resolver: zodResolver(blogSchema),
        defaultValues: {
            thumbnail: undefined,
            title: "",
            subTitle: "",
            description: "",
            category: "startup",
            isPublished: false
        }
    });
    const { mutate: createBlog, isPending: isCreateBlogPending } = useCreateBlog();
    const { mutate: generateDescription, isPending: isGenerateDescriptionPending } = useGenerateDescription();


    const editorRef = useRef<HTMLDivElement | null>(null);
    const quillRef = useRef<Quill | null>(null);
    const thumbnail = watch('thumbnail');


    const onSubmit = () => {
        createBlog(getValues(), {
            onSuccess: () => {
                toast.success("Blog created successfully!");
                reset();
                quillRef.current?.setContents?.([]);
            },
            onError: (err) => {
                console.log(err);
                toast.error("Failed to create blog. Please try again.");
            }
        })
    }


    const generateContentWithAI = () => {
        generateDescription(getValues("title"), {
            onSuccess: async (data) => {
                if (quillRef.current?.root && data.description) {
                    quillRef.current.root.innerHTML = await parse(data.description);
                }
            },
            onError: (err) => {
                toast.error("Failed to generate description.");
                console.error(err);
            }
        });
    }

    useEffect(() => {
        if (editorRef.current && !quillRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: "snow",
                placeholder: "Write something awesome..."
            });
        }

        quillRef.current?.on("text-change", () => {
            const html = quillRef.current?.root.innerHTML || "";
            setValue("description", html, { shouldValidate: true })
        })

    }, [setValue])


    // Cleanup object URL to avoid memory leak
    useEffect(() => {
        if (!(thumbnail instanceof File)) return;
        const objectUrl = URL.createObjectURL(thumbnail);
        return () => {
            URL.revokeObjectURL(objectUrl);
        }
    }, [thumbnail]);


    return (
        <section className='flex-1 w-full p-3 sm:p-6 md:p-10'>

            <form className='flex flex-col w-full max-w-3xl p-4 text-gray-700 bg-white rounded shadow gap-y-6 md:p-10'
                onSubmit={handleSubmit(onSubmit)}
            >
                <div>
                    <p className='mb-2'>Upload thumbnail</p>
                    <label htmlFor="thumbnail" className='block cursor-pointer w-fit'>
                        <img
                            src={
                                thumbnail instanceof File
                                    ? URL.createObjectURL(thumbnail)
                                    : assets.upload_area
                            }
                            alt={thumbnail instanceof File ? "Uploaded Image" : "Upload Area"}
                            className={`h-16 border border-dashed  rounded-md ${errors.thumbnail ? "border-red-500" : "border-gray-300"}`}
                        />
                    </label>
                    <input
                        type="file"
                        id="thumbnail"

                        {...register("thumbnail", {
                            onChange: (e) => {
                                setValue("thumbnail", e.target.files?.[0], {
                                    shouldValidate: true
                                })
                            }
                        })}
                        className='hidden'
                    />
                    {errors.thumbnail && (
                        <p className='text-sm font-light text-red-500'>{errors.thumbnail.message}</p>
                    )}
                </div>

                <div className='flex flex-col gap-y-2'>
                    <label htmlFor="title">Blog title</label>
                    <input
                        type="text"
                        id='title'
                        placeholder='Type here...'
                        className={`w-full max-w-xl p-2.5 border-2 rounded outline-none ${errors.title ? "border-red-500" : "border-gray-300"}`}
                        {...register("title")}
                    />
                    {errors.title && (
                        <p className="text-sm font-light text-red-500">{errors.title.message}</p>
                    )}
                </div>

                <div className='flex flex-col gap-y-2'>
                    <label htmlFor="subTitle">Sub title</label>
                    <input
                        type="text"
                        id='subTitle'
                        placeholder='Type here...'
                        className={`w-full max-w-xl p-2.5 border-2 rounded outline-none ${errors.subTitle ? "border-red-500" : "border-gray-300"}`}
                        {...register("subTitle")}
                    />
                    {errors.subTitle && (
                        <p className="text-sm font-light text-red-500">{errors.subTitle.message}</p>
                    )}
                </div>

                <div className='max-w-xl'>
                    <p>Blog Description</p>

                    <div className='relative pt-2 pb-16 h-72 sm:pb-10'>

                        <div ref={editorRef}></div>

                        <button
                            type="button"
                            disabled={isGenerateDescriptionPending || !watch("title")}
                            className='absolute flex items-center px-4 py-2 text-xs text-white transition rounded shadow cursor-pointer bg-black/75 hover:opacity-95 bottom-1 right-2 gap-x-2 disabled:opacity-50'
                            onClick={generateContentWithAI}
                        >
                            {
                                isGenerateDescriptionPending ?
                                    <ClipLoader size={15} />
                                    : <Pencil size={15} />
                            }
                            {isGenerateDescriptionPending ? "Generating description..." : "Generate with AI"}
                        </button>
                    </div>
                    {errors.description && (
                        <p className="text-sm font-light text-red-500">{errors.description.message}</p>
                    )}
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="category">
                        Blog Category
                    </label>
                    <select
                        id="category"
                        className={`w-44 px-4 py-2.5 border-2 rounded shadow-sm focus:outline-none focus:border-gray-400 transition ${errors.category ? "border-red-500" : "border-gray-300"}`}
                        {...register("category")}
                    >
                        {blogCategories.map((category, index) => (
                            <option key={index} value={category} className='capitalize'>
                                {category}
                            </option>
                        ))}
                    </select>
                    {errors.category && (
                        <p className="text-sm font-light text-red-500">{errors.category.message}</p>
                    )}
                </div>


                <div className="inline-flex items-center">
                    <label className="mr-2 cursor-pointer" htmlFor="publish_now">
                        Publish now
                    </label>
                    <label className="relative flex items-center cursor-pointer" htmlFor="publish_now">
                        <input
                            type="checkbox"
                            id="publish_now"
                            className="transition-all border rounded shadow appearance-none cursor-pointer size-4.5 peer hover:shadow-md border-slate-300 checked:bg-primary checked:border-primary"
                            {...register("isPublished")}
                        />
                        <span className="absolute text-white transform -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 top-1/2 left-1/2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-3.5" viewBox="0 0 20 20" fill="currentColor"
                                stroke="currentColor" strokeWidth="1">
                                <path fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"></path>
                            </svg>
                        </span>
                    </label>
                </div>

                <div>
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.03, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="px-9 shadow transition py-2.5 cursor-pointer text-white rounded bg-primary disabled:opacity-75"
                        disabled={isCreateBlogPending}
                    >
                        {isCreateBlogPending ? "Adding Blog..." : "Add Blog"}
                    </motion.button>

                </div>

            </form>
        </section>
    )
}