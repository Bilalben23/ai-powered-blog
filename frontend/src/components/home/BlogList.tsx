import { blogCategories, blogData, type BlogCategory } from '@constants/blogData';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import BlogCard from './BlogCard';

type BlogCategoryFilter = 'all' | BlogCategory;


export default function BlogList() {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialCategory = (searchParams.get("category") as BlogCategoryFilter) || "all";

    const [category, setCategory] = useState<BlogCategoryFilter>(initialCategory);


    useEffect(() => {
        setSearchParams({ category })
    }, [category]);


    return (
        <section className='p-2 mb-24'>
            {/* categories */}
            <div className='relative flex flex-wrap justify-center gap-2 my-10 sm:gap-4' >
                {
                    (["all", ...blogCategories] as BlogCategory[]).map((cat, index) => (
                        <button
                            key={index}
                            type='button'
                            className={`relative px-5 py-1.5 text-gray-500 capitalize rounded-full cursor-pointer ${cat === category && "text-white"}`}
                            onClick={() => setCategory(cat)}

                        >
                            {cat}
                            {
                                cat === category && <motion.span
                                    layoutId='underline'
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}

                                    className='absolute inset-0 rounded-full bg-primary -z-1'></motion.span>
                            }
                        </button>
                    ))
                }
            </div>

            {/* blog cards */}
            <div className='container grid grid-cols-1 mx-auto gap-x-7 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                {
                    blogData
                        .filter(c => category === "all" ? true : c.category === category)
                        .map(blog => <BlogCard
                            key={blog._id}
                            id={blog._id}
                            image={blog.image}
                            category={blog.category}
                            title={blog.title}
                            description={blog.description}
                        />)
                }
            </div>

        </section>
    )
}
