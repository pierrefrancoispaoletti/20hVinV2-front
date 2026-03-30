import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductOverview from "../../components/ProductOverview/ProductOverview";
import { selectProductsBySubCategory } from "../../redux/reducers/Products/selectors";
import { selectCurrentUser } from "../../redux/reducers/User/selector";
import { getCurrentTimeSlotFrance } from "../../_const";
import useFetchProducts from "../../useFetchProducts/useFetchProducts";
import useRemoveDuplicateSpans from "../../useRemoveDuplicateSpans/useRemoveDuplicateSpans";

const ProductsPage = ({ loading, setLoading }) => {
  const params = useParams();

  let category = params.category || "suggestions";
  useFetchProducts(setLoading, category);
  //  useRemoveDuplicateSpans();
  const [filter, setFilter] = useState("");
  const allProducts = useSelector(selectProductsBySubCategory(filter, category));
  const user = useSelector(selectCurrentUser);
  const currentSlot = getCurrentTimeSlotFrance();

  const products =
    user?.role === "isAdmin"
      ? allProducts
      : allProducts?.filter((p) => {
          const show = p.show ?? "always";
          return show === "always" || show === currentSlot;
        });

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
