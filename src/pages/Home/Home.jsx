import Banner from "./Banner-section/Banner";
import Blog from "./Blog-section/Blog";
import FeatureProducts from "./Product-section/FeatureProducts";
import Reviews from "./Review-section/Reviews";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <FeatureProducts />
      <Reviews></Reviews>
      <Blog></Blog>
    </div>
  );
};

export default Home;
