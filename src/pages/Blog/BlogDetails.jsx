import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../components/shared/LoadingSpinner";

const BlogDetails = () => {
  const [blog, setBlog] = useState(null);
  const [fetching, setFetching] = useState(true);
  const { id } = useParams();

  const fetchBlog = async () => {
    try {
      const res = await axios.get(
        `https://bikemart-server-side.vercel.app/api/v1/blogs/${id}`
      );
      if (res.status === 200) {
        setBlog(res.data.data);
        setFetching(false);
      }
    } catch (error) {
      console.log(error);
      setFetching(false);
    }
  };

  useEffect(() => {
    scrollTo(0, 0);
    fetchBlog();
  }, [id]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  let formattedDate;
  if (blog?.createdAt) {
    formattedDate = formatDate(blog?.createdAt);
  }

  if (fetching) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md overflow-hidden">
        <img
          className="w-full object-contain"
          src={blog?.img}
          alt={blog?.title}
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{blog?.title}</h1>
          <div className="flex items-center mb-6">
            <div className="text-sm text-gray-600">
              <p>By {blog?.author?.name || "Unknown Author"}</p>
              <p>{formattedDate}</p>
            </div>
          </div>
          <div className="prose lg:prose-xl max-w-none">
            {blog?.post.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
