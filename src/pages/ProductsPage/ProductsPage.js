import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductOverview from "../../components/ProductOverview/ProductOverview";
import { selectProductsBySubCategory } from "../../redux/reducers/Products/selectors";
import { selectCurrentUser } from "../../redux/reducers/User/selector";
import { getCurrentTimeSlotFrance } from "../../_const";
import useFetchProducts from "../../useFetchProducts/useFetchProducts";
import { PriceSortBar } from "../../components/WineFilters/WineFilters";

const ProductsPage = ({ loading, setLoading }) => {
  const params = useParams();

  let category = params.category || "suggestions";
  useFetchProducts(setLoading, category);
  const [filter, setFilter] = useState("");
  const [wineColorFilter, setWineColorFilter] = useState(
    () => {
      try { return JSON.parse(localStorage.getItem("20hvin_wineColorFilter")); }
      catch { return null; }
    }
  );
  const [priceSort, setPriceSort] = useState(
    () => localStorage.getItem("20hvin_priceSort") || null
  );
  const allProducts = useSelector(selectProductsBySubCategory(filter, category));
  const user = useSelector(selectCurrentUser);
  const currentSlot = getCurrentTimeSlotFrance();

  const visibleProducts =
    user?.role === "isAdmin"
      ? allProducts
      : allProducts?.filter((p) => {
          const show = p.show ?? "always";
          return show === "always" || show === currentSlot;
        });

  const products = useMemo(() => {
    if (!visibleProducts) return [];
    let filtered = [...visibleProducts];

    // Wine color filter (only for cave category)
    if (wineColorFilter && category === "cave") {
      filtered = filtered.filter((p) =>
        p.couleur?.some(
          (c) => c.isChecked && c.value === wineColorFilter
        )
      );
    }

    // Price sort
    if (priceSort) {
      filtered.sort((a, b) => {
        const priceA = a.price ?? a.couleur?.find((c) => c.isChecked)?.price ?? 0;
        const priceB = b.price ?? b.couleur?.find((c) => c.isChecked)?.price ?? 0;
        return priceSort === "asc" ? priceA - priceB : priceB - priceA;
      });
    }

    return filtered;
  }, [visibleProducts, wineColorFilter, priceSort, category]);

  useEffect(() => {
    setFilter("");
  }, [loading, category]);

  useEffect(() => {
    if (wineColorFilter) {
      localStorage.setItem("20hvin_wineColorFilter", JSON.stringify(wineColorFilter));
    } else {
      localStorage.removeItem("20hvin_wineColorFilter");
    }
  }, [wineColorFilter]);

  useEffect(() => {
    if (priceSort) {
      localStorage.setItem("20hvin_priceSort", priceSort);
    } else {
      localStorage.removeItem("20hvin_priceSort");
    }
  }, [priceSort]);

  const isCave = category === "cave";
  const isEvenements = category === "evenements";

  return (
    <main>
      {!isEvenements && (
        <PriceSortBar priceSort={priceSort} setPriceSort={setPriceSort} />
      )}
      <ProductOverview
        products={products}
        loading={loading}
        setFilter={setFilter}
        filter={filter}
        wineColorFilter={isCave ? wineColorFilter : null}
        setWineColorFilter={isCave ? setWineColorFilter : null}
      />
    </main>
  );
};

export default ProductsPage;
