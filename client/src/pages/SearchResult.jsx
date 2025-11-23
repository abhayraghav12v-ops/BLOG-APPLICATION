import BlogCard from '@/components/BlogCard';
import { getEnv } from '@/helpers/getEnv';
import { useFetch } from '@/hooks/useFetch';
import React from 'react'
import { useSearchParams } from 'react-router-dom'

const SearchResult = () => {
    const [searchParams] = useSearchParams();
    const q = searchParams.get('q');
    const {
        data: blogData,
        loading,
        error,
    } = useFetch(
        `${getEnv("VITE_API_BASE_URL")}/blog/search?q=${q}`,
        {
            method: "GET",
            credentials: "include",
        }
    );

    return (
        <>
         <div className='flex grid-cols-3 text-2xl font-bold mb-5 items-center gap-3 text-violet-500 border-b-2 pb-3'>
         <h4 >Search Result For: {q}</h4>
            </div>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 place-items">
                {blogData?.blog?.length > 0 ? (
                    blogData.blog.map((item) => (
                        <BlogCard key={item._id} props={item} />
                    ))
                ) : (
                    "Data Not Found"
                )}

            </div>
        </>
    )
}

export default SearchResult
