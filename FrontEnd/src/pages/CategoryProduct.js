import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import "../styles/CategoryProductStyles.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CategoryProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [products, setProduct] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getProductByCat();
  }, [params?.slug]);
  const getProductByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProduct(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="mt-3">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} result found</h6>
        <div className="row center">
          <div className="d-flex flex-wrap ms-5">
            {products?.map((p) => (
              <div className="home_card m-3" key={p._id}>
                <div
                  className="image"
                  onClick={() => navigate(`/product/${p.slug}`)}
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
      </div>
    </Layout>
  );
};

export default CategoryProduct;
