import BlogCard from '@/components/BlogCard';
import Loading from '@/components/Loading';
import { getEnv } from '@/helpers/getEnv';
import { useFetch } from '@/hooks/useFetch';
import React from 'react'
import { useParams } from 'react-router-dom';
import { TbCategory2 } from "react-icons/tb";


const BlogByCategory = () => {
    const { category } = useParams();
    const {
        data: blogData,
        loading,
        error,
    } = useFetch(
        `${getEnv("VITE_API_BASE_URL")}/blog/get-blog-by-category/${category}`,
        {
            method: "GET",
            credentials: "include",
        }, [category]);

    if (loading) return <Loading />;

    return (
        <>
            <div className='flex grid-cols-3 text-2xl font-bold mb-5 items-center gap-3 text-violet-500 border-b-2 pb-3'>
                <TbCategory2 />
         <h4 >{blogData && blogData.categoryData ?.name}</h4>
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
    );
}

export default BlogByCategory
