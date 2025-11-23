
import { getEnv } from '@/helpers/getEnv';
import { useFetch } from '@/hooks/useFetch';
import { Avatar } from './ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar';
import usericon from '@/assets/images/user.png'
import moment from 'moment';
import { useSelector } from 'react-redux';

const CommentList = ({ blogid, newComment }) => {
    const user = useSelector(state => state.user)
    const { data, loading, error } = useFetch(
        `${getEnv("VITE_API_BASE_URL")}/comment/get/${blogid}`,
        {
            method: "get",
            credentials: "include",
        }
    );


    if (loading) return <div>Loading...</div>
    return (
        <div>
            <h4 className='text-2xl font-bold'>
                <span className='me-2'>{(data?.comments?.length ?? 0) + (newComment ? 1 : 0)}</span> Comments
            </h4>

            <div className='mt-5'>

                {newComment &&

                    <div className='flex gap-2 mb-3'>
                        <Avatar>
                            <AvatarImage src={user?.user?.avatar || usericon} />
                        </Avatar>
                        <div>
                            <p className='font-bold'>{user?.user?.name}</p>
                            <p>{moment(newComment?.createdAt).format('DD-MM-YYYY')}</p>
                            <div className='pt-3'>
                                {newComment?.comment}
                            </div>
                        </div>
                    </div>
                }



                {data && data.comments.length > 0
                    &&
                    data.comments.map(comment => {
                        return (
                            <div key={comment._id} className='flex gap-2 mb-3'>
                                <Avatar>
                                    <AvatarImage src={comment?.user?.avatar || usericon} />
                                </Avatar>
                                <div>
                                    <p className='font-bold'>{comment?.user?.name}</p>
                                    <p>{moment(comment?.createdAt).format('DD-MM-YYYY')}</p>
                                    <div className='pt-3'>
                                        {comment?.comment}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default CommentList;
