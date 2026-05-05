import React, { useState } from "react";
import LoaderElement from "../Loader/LoaderElement";
import ProductElement from "../ProductElement/ProductElement";
import TableauHomePage from "../TableauHomePage/TableauHomePage";
import ProductDetailSheet from "../ProductDetailSheet/ProductDetailSheet";

const ProductOverview = ({ loading, products, setFilter, filter, wineColorFilter, setWineColorFilter }) => {
  const [activeProduct, setActiveProduct] = useState(null);

  return (
    <>
      <TableauHomePage
        setFilter={setFilter}
        filter={filter}
        wineColorFilter={wineColorFilter}
        setWineColorFilter={setWineColorFilter}
      >
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
                  onOpen={setActiveProduct}
                />
              </div>
            );
          })
        )}
      </TableauHomePage>
      <ProductDetailSheet
        product={activeProduct}
        open={!!activeProduct}
        onClose={() => setActiveProduct(null)}
      />
    </>
  );
};

export default ProductOverview;
