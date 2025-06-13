import Hero from '@components/home/Hero';
import BlogList from '@components/home/BlogList';
import Newsletter from '@components/home/Newsletter';
import { useEffect } from 'react';

export default function HomePage() {

    useEffect(() => {
        window.scrollTo(0, 0);
    })

    return (
        <>
            <Hero />
            <BlogList />
            <Newsletter />
        </>
    )
}
