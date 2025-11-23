
import { getEnv } from '@/helpers/getEnv';
import { RouteBlogDetails } from '@/helpers/RouteName';
import { useFetch } from '@/hooks/useFetch';
import React from 'react'
import { Link } from 'react-router-dom';

const RelatedBlog = ({ props }) => {
    const { data, loading, error } = useFetch(
        `${getEnv("VITE_API_BASE_URL")}/blog/get-related-blog/${props.category}/${props.currentBlog}`,
        {
            method: "get",
            credentials: "include",
        }
    );

    if (loading) return <div>Loading...</div>

    return (
        <div className='bg-white p-4 rounded-xl shadow-sm'>
            <h2 className='text-2xl font-bold mb-5'>Related Blogs</h2>

            <div>
                {data && data.relatedBlog.length > 0 ?
                    data.relatedBlog.map(blog => {
                        const url = RouteBlogDetails(props.category, blog.slug);

                        return (
                            <Link
                                key={blog._id}
                                to={url}
                                onClick={(e) => {
                                    e.preventDefault(); 
                                    // 🚀 INSTANT full page reload (no delay)
                                    window.location.href = url;
                                }}
                            >
                                <div className='flex items-center gap-3 mb-4 p-2 rounded-md hover:bg-gray-100 cursor-pointer'>
                                    <img
                                        className='w-[100px] h-[70px] object-cover rounded-md'
                                        src={blog.featuredImage}
                                    />
                                    <h4 className='line-clamp-2 text-lg font-semibold'>
                                        {blog.title}
                                    </h4>
                                </div>
                            </Link>
                        )
                    })
                    :
                    <div>No Related Blog</div>
                }
            </div>
        </div>
    )
}

export default RelatedBlog;
