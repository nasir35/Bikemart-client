import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
const AddBlog = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const bikemartToken = JSON.parse(localStorage.getItem("bikemartToken"));
  const onSubmit = (data) => {
    data.author = {
      userId: user._id,
      name: user.name,
    };
    const proceedToAdd = window.confirm(`Are you sure about adding the blog?`);
    if (proceedToAdd) {
      fetch("https://bikemart-server-side.vercel.app/api/v1/blogs", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${bikemartToken}`,
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.status === "success") {
            toast.success("You have successfully posted a Blog!");
            reset();
          } else {
            toast.error("something went wrong!");
          }
        });
    }
  };
  return (
    <div className="py-5">
      <Toaster />
      <div className="text-center">
        <h2 className="inline-block border-coral text-stromboli text-2xl px-4 border-b-4 rounded font-semibold font-qsand">
          Post a Blog!
        </h2>
      </div>
      <div className="text-center my-3">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="md:w-4/6 w-full mx-auto"
        >
          <input
            type="text"
            {...register("title")}
            className="block w-full border-2 rounded px-3 py-1 mb-3"
            placeholder="Blog title"
            id="title"
          />
          <input
            type="text"
            {...register("img")}
            className="block w-full border-2 rounded px-3 py-1 mb-3"
            placeholder="img link"
            id="img"
          />
          <textarea
            type="text"
            {...register("post")}
            rows="6"
            className="block w-full border-2 rounded px-3 py-1 mb-3"
            placeholder="Write the blog here..."
            id="post"
          />
          <input
            type="submit"
            value="Post"
            className="px-10 mb-3 py-1 rounded cursor-pointer bg-green-custom text-white text-xl"
          />
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
