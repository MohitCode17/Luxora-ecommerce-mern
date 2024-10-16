import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import adminProductsReducer from "./admin/productSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsReducer,
  },
});

export default store;
