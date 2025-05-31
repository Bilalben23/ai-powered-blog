import { blogCategories, type BlogCategory } from '@constants/blogData'
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom'


export default function BlogList() {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialCategory = (searchParams.get("category") as BlogCategory) || "all";

    const [category, setCategory] = useState<BlogCategory>(initialCategory);


    useEffect(() => {
        setSearchParams({ category })
    }, [category]);


    return (
        <section className='border'>
            {/* categories */}
            <div className='relative flex flex-wrap justify-center gap-2 my-10 sm:gap-4' >
                {
                    blogCategories.map((cat, index) => (
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
            <div>

            </div>

        </section>
    )
}
