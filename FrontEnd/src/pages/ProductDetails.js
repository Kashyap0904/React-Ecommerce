import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";
import { Button } from "antd";
import { useCart } from "../context/cart";

const ProductDetails = () => {
  const params = useParams();
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Layout>
        <div className="row mt-2">
          <div className="col-md-4 p-2 m-4">
            <img
              src={`/api/v1/product/product-photo/${product._id}`}
              className="card-img-top"
              alt={product.name}
              height="100%"
              width="100%"
            />
          </div>
          <div className="col-md-6 text-start">
            <h1 className="mb-4">Product Details</h1>
            <hr />
            <h4 className="mb-4">Name : {product.name}</h4>
            <h4 className="mb-4">Description : {product.description}</h4>
            <h4 className="mb-4">Category : {product?.category?.name}</h4>
            <h4 className="mb-4">Price : $ {product.price}</h4>
            <Button className="btn btn-secondary ms-1">ADD TO CART</Button>
          </div>
        </div>
        <hr />
        <div className="row">
          <h3 className="text-center">Smilar Product</h3>
          {relatedProducts.length < 1 && (
            <p className="text-center">No Similare Products Found</p>
          )}
          <div className="d-flex flex-wrap ms-5 justify-content-center">
            {relatedProducts?.map((p) => (
              <div className="home_card m-3" key={p._id}>
                <div
                  className="image"
                  // onClick={() => navigate(`/product/${p.slug}`)}
                >
                  <img
                    title="Click To More"
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                </div>
                <div className="cart">
                  <span className="title">{p.name}</span>
                  <span className="price">${p.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default ProductDetails;
