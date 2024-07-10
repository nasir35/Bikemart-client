import { useEffect, useState } from "react";
import SingleProduct from "../Home/Product-section/SingleProduct";
import LoadingSpinner from "../../components/shared/LoadingSpinner";

const Explore = () => {
  const [products, setProducts] = useState([]);
  const [isFetching, setIsfetching] = useState(true);
  scrollTo(0, 0);
  const fetchProducts = () => {
    fetch("https://bikemart-server-side.vercel.app/api/v1/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
        setIsfetching(false);
      })
      .catch((err) => {
        console.log("An error occured");
      });
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  if (isFetching) {
    return <LoadingSpinner />;
  } else
    return (
      <div>
        <div className="md:p-12 sm:p-8 p-4">
          <div className="text-center">
            <h2 className="sm:text-2xl text-xl font-qsand inline-block border-b-4 border-green-custom px-4 text-stromboli font-medium">
              Choose your Bike
            </h2>
          </div>

          {products.length === 0 ? (
            <div className="flex justify-center items-center py-6">
              <div className="animate-bounce text-stromboli mr-5 font-qsand font-medium">
                loading...
              </div>
              <div className=" animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-coral"></div>
            </div>
          ) : (
            <div className="mt-5 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
              {products.map((product) => (
                <SingleProduct
                  key={product._id}
                  product={product}
                ></SingleProduct>
              ))}
            </div>
          )}
        </div>
      </div>
    );
};

export default Explore;
