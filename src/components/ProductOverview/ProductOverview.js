import React, { useEffect, useState } from "react";
import LoaderElement from "../Loader/LoaderElement";
import ProductElement from "../ProductElement/ProductElement";
import TableauHomePage from "../TableauHomePage/TableauHomePage";
import ColorFilter from "../ColorFilter/ColorFilter";

const ProductOverview = ({ loading, products, setFilter, filter }) => {
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    filter === "champagnes" && setSelectedColor("");
  }, [filter]);

  const filteredProducts = selectedColor
    ? products.filter((product) =>
        product.couleur.some(
          (color) => color.value === selectedColor && color.isChecked,
        ),
      )
    : products;
  return (
    <TableauHomePage
      setFilter={setFilter}
      filter={filter}
    >
      {["vins-corse", "vins-fr", "vins-mnd"].includes(filter) && (
        <ColorFilter
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
      )}
      {loading ? (
        <LoaderElement />
      ) : (
        filteredProducts?.map((product, index) => (
          <div
            key={product._id}
            style={{ width: "100%" }}
          >
            <ProductElement
              className='product'
              product={product}
              index={index}
              length={filteredProducts.length}
            />
          </div>
        ))
      )}
    </TableauHomePage>
  );
};

export default ProductOverview;
