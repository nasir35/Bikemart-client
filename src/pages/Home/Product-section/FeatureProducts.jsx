import React, { useEffect, useState } from "react";
import SingleProduct from "./SingleProduct";

const FeatureProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://bikemart-server-side.vercel.app/api/v1/products?limit=6")
      .then((res) => res.json())
      .then((data) => setProducts(data.data));
  }, []);

  return (
    <div className="md:p-12 sm:p-8 p-4">
      <div className="text-center">
        <h2 className="sm:text-2xl text-xl font-qsand inline-block border-b-4 border-green-custom rounded px-4 text-stromboli font-medium">
          Feature Bicycles
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
            <SingleProduct key={product._id} product={product}></SingleProduct>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeatureProducts;
