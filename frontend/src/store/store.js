import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import adminProductsReducer from "./admin/productSlice";
import shopProductsReducer from "./shop/productSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsReducer,
    shopProducts: shopProductsReducer,
  },
});

export default store;
