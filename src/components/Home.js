/* eslint-disable prettier/prettier */
import React, { useEffect } from "react";
import MetaData from "./layout/MetaData";
import Product from "./product/Product";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../actions/productActions";

const Home = () => {
  // "allProducts" name in store
  // value inside of "products" api end loading, productsCount, products, error from reducer
  // const state = useSelector((state) => state.allProducts.products)
  const { loading, productsCount, products } = useSelector(
    (state) => state.allProducts
  );
  console.log("all-pro->", productsCount, products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {/* Prop pass here */}
          <MetaData title={`Buy Best Products Online`} />
          <h1 id="products_heading">Latest Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              {products &&
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Home;
