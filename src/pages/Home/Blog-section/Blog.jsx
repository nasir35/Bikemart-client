import { useEffect, useState } from "react";
import SingleBlog from "./SingleBlog";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [isFetching, setIsfetching] = useState(true);
  useEffect(() => {
    fetch("https://bikemart-server-side.vercel.app/api/v1/blogs")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setBlogs(data.data);
        setIsfetching(false);
      });
  }, []);
  if (isFetching) return <LoadingSpinner />;
  else
    return (
      <div>
        <div className="py-4">
          <div className="text-center">
            <h2 className="inline-block text-xl font-medium border-b-2 border-green-custom px-4 text-green-custom font-qsand">
              Latest Blogs
            </h2>
            <p className="font-qsand md:text-4xl sm:text-2xl text-xl my-3 font-medium">
              Stay Updated And Read <br /> Our{" "}
              <span className="text-coral">Blog Posts!</span>
            </p>
          </div>

          {blogs.length === 0 ? (
            <div className="flex justify-center items-center py-6">
              <div className="animate-bounce text-stromboli mr-5 font-qsand font-medium">
                loading...
              </div>
              <div className=" animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-coral"></div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:p-12 md:pb-4 sm:p-10 sm:pb-3 pb-2 p-5 gap-8">
              {blogs.map((blog) => (
                <SingleBlog key={blog._id} blog={blog}></SingleBlog>
              ))}
            </div>
          )}
        </div>
      </div>
    );
};

export default Blog;
