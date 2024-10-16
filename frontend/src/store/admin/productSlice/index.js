import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

// ADD PRODUCT ASYNC THUNK
export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (formData) => {
    const res = await axios.post(
      "http://localhost:8000/api/products/add",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res?.data;
  }
);

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    const res = await axios.get("http://localhost:8000/api/products/get");

    return res?.data;
  }
);

export const editProduct = createAsyncThunk(
  "products/editProduct",
  async ({ id, formData }) => {
    const res = await axios.put(
      `http://localhost:8000/api/products/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res?.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProducts",
  async (id) => {
    const res = await axios.delete(
      `http://localhost:8000/api/products/delete/${id}`
    );

    return res?.data;
  }
);

const adminProductSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.products;
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default adminProductSlice.reducer;
