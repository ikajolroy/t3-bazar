import Head from "next/head";
import FlashSell from "~/components/FlashSellHeader";
import HeroSection from "~/components/HeroSection";
import Categories from "~/components/Home/Categories";
import Product from "~/components/Product";
import { categories } from "~/constants/data";
import { ProductResponse } from "~/interface/dataType";

type Props = { flashResponse?: ProductResponse; productRes?: ProductResponse };
const Home = ({ flashResponse, productRes }: Props) => {
  return (
    <>
      <Head>
        <title>Bazar</title>
        <meta
          name="description"
          content="World top buy and sell product marketplace."
        />
        <link rel="icon" href="/favicon.png" />
      </Head>

      {/* Body */}
      <main>
        {/* Hero Slider */}
        <div className="container">
          <HeroSection />
        </div>
        {/* Flash sell */}
        <div className="container py-10">
          <div className="bg-white">
            <FlashSell />
            <div className="my-2 grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
              {flashResponse?.products.map((item, index) => (
                <Product item={item} key={index} />
              ))}
            </div>
          </div>
        </div>
        {/* Categories */}
        <div className="container ">
          <h2 className="text-2xl font-medium text-slate-800">Categories</h2>
          <div className="grid grid-cols-2 gap-1 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
            {categories.map((item, index) => (
              <Categories item={item} key={index} />
            ))}
          </div>
        </div>
        {/* More Product */}
        <div className="container py-10">
          <h2 className="text-2xl font-medium text-slate-800">Just For You</h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
            {/*  product */}
            {productRes?.products.map((item, index) => (
              <Product item={item} key={index} />
            ))}
          </div>
          <div className="mt-5 flex justify-center">
            <button className="text-lx w-2/6 rounded-sm border bg-teal-500 px-5 py-2 text-white transition hover:border-teal-600 hover:bg-transparent hover:text-teal-600 focus:outline-none">
              Load More
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const flashRes = await fetch("https://dummyjson.com/products?limit=6");
  const loadProductRes = await fetch(
    "https://dummyjson.com/products?limit=18&skip=0&select=title,price,discountPercentage,rating,thumbnail"
  );
  const flashResponse = await flashRes.json();
  const productRes = await loadProductRes.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      flashResponse,
      productRes,
    },
  };
}
export default Home;
