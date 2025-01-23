import { useSearch } from "../context/search";
import Layout from "./../components/Layout/Layout";
import React from "react";

const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title={"Search Result"}>
      <div className="">
        <div className="text-center">
          <h1>Search Result</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap ms-5 mt-4">
            {values?.results.map((p) => (
              <div className="home_card m-3" key={p._id}>
                <div className="image">
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

export default Search;
