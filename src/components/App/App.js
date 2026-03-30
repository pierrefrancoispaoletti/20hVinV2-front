import React, { lazy, Suspense, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Route, Routes } from "react-router";
import { selectCurrentUser } from "../../redux/reducers/User/selector";
import { getCategories } from "../../redux/reducers/Categories/querries";
import { getConfig } from "../../redux/reducers/Config/querries";
import CategorySelector from "../CategorySelector/CategorySelector";
import Header from "../Header/Header";
import Loader from "../Loader/Loader";
import LocalMessage from "../LocalMessage/LocalMessage";
import BottomAppBar from "../BottomAppBar/BottomAppBar";
import Copyright from "../Copyright";

const Login = lazy(() => import("../../pages/Login/Login"));
const ProductsPage = lazy(() =>
  import("../../pages/ProductsPage/ProductsPage")
);
const CategoryAdmin = lazy(() =>
  import("../CategoryAdmin/CategoryAdmin")
);
const SocialAdmin = lazy(() =>
  import("../SocialAdmin/SocialAdmin")
);

const App = () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategories(dispatch);
    getConfig(dispatch);
  }, [dispatch]);

  return (
    <div
      style={{
        margin: "0 0 25px 0",
        paddingBottom: "80px",
      }}
    >
      <Header />
      {/* <OrderNumberBanner /> */}
      <LocalMessage />
      <CategorySelector />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            element={<ProductsPage loading={loading} setLoading={setLoading} />}
          >
            <Route
              path={`products/:category`}
              element={
                <ProductsPage loading={loading} setLoading={setLoading} />
              }
            />
          </Route>
          <Route
            path="connexion"
            element={
              user ? (
                <Navigate replace to="/" />
              ) : (
                <Login loading={loading} setLoading={setLoading} />
              )
            }
          />
          <Route
            path="admin/categories"
            element={
              user?.role === "isAdmin" ? (
                <CategoryAdmin />
              ) : (
                <Navigate replace to="/" />
              )
            }
          />
          <Route
            path="admin/config"
            element={
              user?.role === "isAdmin" ? (
                <SocialAdmin />
              ) : (
                <Navigate replace to="/" />
              )
            }
          />
        </Routes>
      </Suspense>
      <Copyright />
      <BottomAppBar />
    </div>
  );
};

export default App;
