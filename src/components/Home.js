/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import MetaData from "./layout/MetaData";
import Product from "./product/Product";
import Loader from "../components/layout/Loader";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { getProducts } from "../actions/productActions";

const Home = ({ match }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const alert = useAlert();
  const dispatch = useDispatch();
  // "allProducts" name in store
  // from backend value inside of "products" api end loading, productsCount, products, error from reducer
  // const state = useSelector((state) => state.allProducts.products)
  const { loading, productsCount, products, resPerPage, error } = useSelector(
    (state) => state.allProducts
  );
  console.log("all-pro->", products, productsCount);
  // take from home.js
  const keyword = match.params.keyword
  console.log('keyword', keyword);

  function setCurrentPageNo(pageNumber){
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    if (error) {
      // alert.success('Success')
      return alert.error(error);
    }
    dispatch(getProducts(keyword, currentPage));
  }, [dispatch, alert, error, keyword, currentPage]);
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
          {/* Pagination showed maximun 2 pages */}
          {resPerPage <= productsCount && (
            <div className="d-flex justify-content-center mt-5">
                <Pagination 
                  activePage={currentPage}
                  itemsCountPerPage={resPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNo}
                  nextPageText={'Next'}
                  prevPageText={'Prev'}
                  firstPageText={'First'}
                  lastPageText={'Last'}
                  itemClass='page-item'
                  linkClass='page-link'
                />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Home;
