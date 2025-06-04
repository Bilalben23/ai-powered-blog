import { assets } from '@constants/assets';
import { blogCategories, type BlogCategory } from '@constants/blogData';
import { useState, type ChangeEvent } from 'react';
import { motion } from "motion/react";
import { Pencil } from 'lucide-react';


type blogDataType = {
    thumbnail: File | null;
    title: string;
    subtitle: string;
    description: string;
    category: Exclude<BlogCategory, "all">;
    isPublished: boolean
}

export default function AdminAddBlog() {

    const [blogData, setBlogData] = useState<blogDataType>({
        thumbnail: null,
        title: "",
        subtitle: "",
        description: "",
        category: "startup",
        isPublished: false
    });


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        setBlogData(prevData => ({
            ...prevData,
            [name]: type === "checkbox"
                ? (e.target as HTMLInputElement).checked
                : type === "file"
                    ? (e.target as HTMLInputElement).files?.[0] || null
                    : value
        }))
    }

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        // TODO: send POST request to the backend to create a new blog.
        console.log("Send blog data...", blogData);
    }


    const generateContentWithAI = () => {

    }


    return (
        <section className='flex-1 w-full p-3 sm:p-6 md:p-10'>

            <form className='flex flex-col w-full max-w-3xl p-4 text-gray-700 bg-white rounded shadow gap-y-6 md:p-10'
                onSubmit={handleSubmit}
            >
                <div>
                    <p className='mb-2'>Upload thumbnail</p>
                    <label htmlFor="thumbnail" className='block cursor-pointer w-fit'>
                        <img
                            src={!blogData.thumbnail ? assets.upload_area : URL.createObjectURL(blogData.thumbnail)}
                            alt={!blogData.thumbnail ? "Upload Area" : "Uploaded Image"}
                            className='h-16 border border-gray-300 rounded'
                        />
                    </label>
                    <input
                        type="file"
                        id="thumbnail"
                        name='thumbnail'
                        className='hidden'
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='flex flex-col gap-y-2'>
                    <label htmlFor="title">Blog title</label>
                    <input
                        type="text"
                        name='title'
                        id='title'
                        placeholder='Type here...'
                        className='w-full max-w-xl p-2.5 border-2 border-gray-300 rounded outline-none'
                        onChange={handleChange}
                        value={blogData.title}
                        required
                    />
                </div>

                <div className='flex flex-col gap-y-2'>
                    <label htmlFor="subtitle">Sub title</label>
                    <input
                        type="text"
                        name='subtitle'
                        id='subtitle'
                        placeholder='Type here...'
                        className='w-full max-w-xl p-2.5 border-2 border-gray-300 rounded outline-none'
                        onChange={handleChange}
                        value={blogData.subtitle}
                        required
                    />
                </div>

                <div className='max-w-xl'>
                    <p>Blog Description</p>


                    <div className='relative pt-2 pb-16 h-72 sm:pb-10'>

                        <button
                            type="button"
                            className='absolute flex items-center px-4 py-2 text-xs text-white transition rounded shadow cursor-pointer bg-black/75 hover:opacity-95 bottom-1 right-2 gap-x-2'
                            onClick={generateContentWithAI}
                        ><Pencil size={15} /> Generate with AI</button>
                    </div>

                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="category">
                        Blog Category
                    </label>
                    <select
                        name="category"
                        id="category"
                        className="w-44 px-4 py-2.5 border-2 border-gray-300 rounded shadow-sm focus:outline-none focus:border-gray-400 transition"
                        onChange={handleChange}
                        value={blogData.category}
                    >
                        {blogCategories.map((category, index) => (
                            <option key={index} value={category} className='capitalize'>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>


                <div className="inline-flex items-center">
                    <label className="mr-2 cursor-pointer" htmlFor="publish_now">
                        Publish now
                    </label>
                    <label className="relative flex items-center cursor-pointer" htmlFor="publish_now">
                        <input
                            type="checkbox"
                            className="transition-all border rounded shadow appearance-none cursor-pointer size-4.5 peer hover:shadow-md border-slate-300 checked:bg-primary checked:border-primary"
                            id="publish_now"
                            name='isPublished'
                            onChange={handleChange}
                            checked={blogData.isPublished}
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
                        className="px-9 shadow transition py-2.5 cursor-pointer text-white rounded bg-primary"
                    >
                        Add Blog
                    </motion.button>

                </div>

            </form>
        </section>
    )
}
