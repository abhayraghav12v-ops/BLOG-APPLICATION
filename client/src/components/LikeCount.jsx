import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import { useFetch } from "@/hooks/useFetch";
import React, { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";

const LikeCount = ({ props }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const user = useSelector((state) => state.user);

  const useridForGet = user?.isLoggedIn ? user.user._id : "";

  const { data: blogLikeCount } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog-like/get-like/${props.blogid}/${useridForGet}`,
    {
      method: "get",
      credentials: "include",
    }
  );
  useEffect(() => {
    if (blogLikeCount) {
      setLikeCount(blogLikeCount.likecount);
      setHasLiked(blogLikeCount.isUserLiked);
    }
  }, [blogLikeCount]);

  const handleLike = async () => {
    try {
      if (!user.isLoggedIn) {
        return showToast("error", "Please login into your account");
      }

      const res = await fetch(`${getEnv("VITE_API_BASE_URL")}/blog-like/do-like`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userid: user.user._id,
          blogid: props.blogid,
        }),
      });

      const data = await res.json();

      setLikeCount(data.likecount);
      setHasLiked(data.isUserLiked);  // ✅ SERVER TRUTH SE UPDATE ✔
    } catch (error) {
      showToast("error", error.message);
    }
  };

  return (
    <button onClick={handleLike} className="flex justify-between items-center gap-1">
      {!hasLiked ? <FaRegHeart /> : <FaHeart className="text-red-500" />}
      {likeCount}
    </button>
  );
};

export default LikeCount;
