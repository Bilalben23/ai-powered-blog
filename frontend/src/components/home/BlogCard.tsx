import type { BlogCategory } from '@constants/blogData'
import { type FC } from 'react'
import { useNavigate } from 'react-router-dom'

type BlogCardProps = {
    id: string;
    image: string;
    category: BlogCategory;
    title: string;
    description: string
}

const BlogCard: FC<BlogCardProps> = ({ id, image, category, title, description }) => {
    const navigate = useNavigate();

    return (
        <div
            className='block w-full overflow-hidden duration-300 rounded-lg shadow cursor-pointer hover:scale-102 hover:shadow-primary/25'
            onClick={() => navigate(`blog/${id}`)}
        >
            <div>
                <img
                    src={image}
                    alt={title}
                    className='aspect-video'
                />
            </div>
            <div className='p-4'>
                <span className='inline-block px-3 py-1.5 mb-4 text-sm rounded-full capitalize shadow-xs bg-primary/10 text-primary'>{category}</span>
                <p className='mb-2 text-lg font-medium text-gray-900'>{title}</p>
                <p className='mb-3 text-sm text-gray-600 line-clamp-3' dangerouslySetInnerHTML={{ __html: description }} />
            </div>
        </div>
    )
}


export default BlogCard;