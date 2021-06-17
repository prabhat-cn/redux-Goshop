/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import axios from "axios";
import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants";

// "keyword" for search
export const getProducts = (keyword='', currentPage = 1, price) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCTS_REQUEST })
    let link = `${process.env.REACT_APP_API}/api/v1/product?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}`


    const { data } = await axios.get(link)

    dispatch({
      type: ALL_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// after click each product
export const getProductDetails = (id) => async(dispatch)=>{
  try{
      dispatch({type:PRODUCT_DETAILS_REQUEST})
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/${id}`)
      dispatch({
          type:PRODUCT_DETAILS_SUCCESS,
          payload:data.product
      })
  }catch(error){
      dispatch({
          type:PRODUCT_DETAILS_FAIL,
          payload:error.response.data.message
      })

  }
}

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
