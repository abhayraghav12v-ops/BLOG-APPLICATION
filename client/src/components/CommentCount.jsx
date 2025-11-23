import { getEnv } from '@/helpers/getEnv';
import { useFetch } from '@/hooks/useFetch';
import React from 'react'
import { FaRegCommentDots } from "react-icons/fa";


const CommentCount = ({ props }) => {
    const { data, loading, error } = useFetch(
        `${getEnv("VITE_API_BASE_URL")}/comment/get-count/${props.blogid}`,
        {
            method: "get",
            credentials: "include",
        }
    );

    return (
        <button type='button' className='flex justify-between items-center gap-1'>
            <FaRegCommentDots />
            {data && data.commentCount}
        </button>
    )
}

export default CommentCount
