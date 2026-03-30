import { combineReducers } from "redux";
import { userReducer } from "./User/reducer";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { productReducer } from "./Products/reducer";
import { categoryReducer } from "./Categories/reducer";
import { configReducer } from "./Config/reducer";
import { placeLocation } from "../../_const";

const persistConfig = {
  key: placeLocation,
  storage,
  whitelist: ["user", "products", "categories", "appConfig"],
};

const reducers = combineReducers({
  user: userReducer,
  products: productReducer,
  categories: categoryReducer,
  appConfig: configReducer,
});

export default persistReducer(persistConfig, reducers);
