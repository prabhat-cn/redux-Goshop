/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect, Fragment } from "react";
import Pagination from "react-js-pagination";

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import MetaData from "./layout/MetaData";
import Product from "./product/Product";
import Loader from "../components/layout/Loader";

import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { getProducts } from "../actions/productActions";

// price range sorting
const {createSliderWithTooltip} = Slider;
const Range = createSliderWithTooltip(Slider.Range)

const Home = ({ match }) => {
  const [currentPage, setCurrentPage] = useState(1)
  // price filter
  const [price, setPrice] = useState([1,1000])
  // category filter
  const [category, setCategory] = useState('')
  const categories =[
    'Electronics',
    'Cameras',
    'Laptop',
    'Accessories',
    'Headphones',
    'Food',
    'Books',
    'Clothes/Shoes',
    'Beauty/Health',
    'Sports',
    'Outdoor',
    'Home'
  ]
  console.log('categories', categories);

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
    dispatch(getProducts(keyword, currentPage, price, category));
  }, [dispatch, alert, error, keyword, currentPage, price, category]);
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
              {keyword ? (
                <>
                <div className="col-6 col-md-3 mt-5 mb-5">
                  <div className="px-5">
                    <Range 
                      marks={{
                        // min-max price pass here
                        1: `$1`,
                        1000: `$1000`
                      }}
                      min={1} 
                      max={1000} 
                      defaultValue={[1, 1000]}
                      tipFormatter={value => `$${value}`}
                      tipProps={{
                        placement: 'top',
                        visible: true
                      }}
                      value={price}
                      onChange={price => setPrice(price)}
                    />
                    <hr className="my-5" />
                    <div className="mt-5">
                      <h4 className="mb-3">
                      Categories
                      </h4>
                      <ul className="pl-0">
                        {categories.map(category =>(
                          <li style={{cursor: 'pointer', listStyleType: 'none'}} 
                          key={category} onClick={() => setCategory(category)}>
                              {category}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                </>

              ) : (
                products &&
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))
              )}
              {/* {products &&
                products.map((product) => (
                  <Product key={product._id} product={product} />
              ))} */}
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
