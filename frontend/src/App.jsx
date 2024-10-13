import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminLayout from "./components/admin/layout";
import Dashboard from "./pages/admin/Dashboard";
import Features from "./pages/admin/Features";
import Orders from "./pages/admin/Orders";
import Products from "./pages/admin/Products";
import ShoppingLayout from "./components/shopping/layout";
import Home from "./pages/shopping/Home";
import Listing from "./pages/shopping/Listing";
import Checkout from "./pages/shopping/Checkout";
import Account from "./pages/shopping/Account";
import PaypalReturn from "./pages/shopping/PaypalReturn";
import PaymentSuccess from "./pages/shopping/PaymentSuccess";
import Search from "./pages/shopping/Search";
import NotAuth from "./pages/not-auth";
import NotFound from "./pages/not-found";

const App = () => {
  return (
    <div className="">
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="features" element={<Features />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
        </Route>

        <Route path="/shop" element={<ShoppingLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="listing" element={<Listing />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="account" element={<Account />} />
          <Route path="paypal-return" element={<PaypalReturn />} />
          <Route path="payment-success" element={<PaymentSuccess />} />
          <Route path="search" element={<Search />} />
        </Route>

        <Route path="/unauth" element={<NotAuth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
