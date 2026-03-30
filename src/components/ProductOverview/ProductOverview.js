import React from "react";
import LoaderElement from "../Loader/LoaderElement";
import ProductElement from "../ProductElement/ProductElement";
import TableauHomePage from "../TableauHomePage/TableauHomePage";
const ProductOverview = ({ loading, products, setFilter, filter, wineColorFilter, setWineColorFilter }) => {
  return (
    <TableauHomePage setFilter={setFilter} filter={filter} wineColorFilter={wineColorFilter} setWineColorFilter={setWineColorFilter}>
      {loading ? (
        <LoaderElement />
      ) : (
        products?.map((product, index) => {
          return (
            <div key={product._id} style={{ width: "100%" }}>
              <ProductElement
                product={product}
                index={index}
                length={products.length}
              />
            </div>
          );
        })
      )}
    </TableauHomePage>
  );
};

export default ProductOverview;
