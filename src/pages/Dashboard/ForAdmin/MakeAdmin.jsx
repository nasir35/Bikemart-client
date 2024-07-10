import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const MakeAdmin = () => {
  const { register, handleSubmit, reset } = useForm();
  const bikemartToken = JSON.parse(localStorage.getItem("bikemartToken"));

  const onSubmit = (data) => {
    fetch(
      `https://bikemart-server-side.vercel.app/api/v1/users/${data.email}`,
      {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${bikemartToken}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({ role: "admin" }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          toast.success("Made Admin successfully!");
          reset();
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("An error occured!");
      });
  };

  return (
    <div className="my-4">
      <Toaster />
      <div className="text-center">
        <h2 className="inline-block border-coral text-stromboli text-2xl px-4 border-b-4 rounded font-semibold font-qsand">
          Make Admin
        </h2>
        <p className="w-3/4 pt-3 pb-5 text-gray-600 mx-auto">
          <strong>Instructions: </strong> to make an admin, first ensure the
          email is already registered as user. And after clicking on make admin
          button, please wait a seconds to get the feedback!
        </p>
      </div>
      <div className="text-center my-3">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto">
          <input
            type="email"
            {...register("email")}
            className="block w-5/6 mx-auto border-2 rounded px-3 py-1 mb-3"
            placeholder="Email"
            id="email"
          />
          <input
            type="submit"
            value="Make Admin"
            className="px-10 mb-3 py-1 rounded cursor-pointer bg-green-custom text-white text-xl"
          />
        </form>
      </div>
    </div>
  );
};

export default MakeAdmin;
