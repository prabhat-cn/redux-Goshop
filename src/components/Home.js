/* eslint-disable prettier/prettier */
import React, { useEffect } from "react";
import MetaData from "./layout/MetaData";
import Product from "./product/Product";
import Loader from "../components/layout/Loader";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { getProducts } from "../actions/productActions";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  // "allProducts" name in store
  // value inside of "products" api end loading, productsCount, products, error from reducer
  // const state = useSelector((state) => state.allProducts.products)
  const { loading, productsCount, products, error } = useSelector(
    (state) => state.allProducts
  );
  console.log("all-pro->", products, productsCount);
  useEffect(() => {
    if (error) {
      // alert.success('Success')
      return alert.error(error);
    }
    dispatch(getProducts());
  }, [dispatch, alert, error]);
  return (
    <>
      {loading ? (
        <Loader />
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
