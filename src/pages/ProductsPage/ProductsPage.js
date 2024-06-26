import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductOverview from "../../components/ProductOverview/ProductOverview";
import { selectProductsBySubCategory } from "../../redux/reducers/Products/selectors";
import useFetchProducts from "../../useFetchProducts/useFetchProducts";

const ProductsPage = ({ loading, setLoading }) => {
  const params = useParams();
  let category = params.category || "pizze";
  useFetchProducts(setLoading, category);

  const [filter, setFilter] = useState("");
  const products = useSelector(selectProductsBySubCategory(filter, category));

  useEffect(() => {
    setFilter("");
  }, [loading, category]);

  return (
    <main>
      <ProductOverview
        products={products}
        loading={loading}
        setFilter={setFilter}
        filter={filter}
      />
    </main>
  );
};

export default ProductsPage;
