import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import CartPage from "./pages/CartPage/CartPage";
import FavoritePage from "./pages/FavoritePage/FavoritePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import CartProvider from "./Providers/CartProvider/CartProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckOutPage from "./pages/CheckOutPage/CheckOutPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import AuthProvider from "./Providers/AuthProvider/AuthProvider";
import ProductProvider from "./Providers/ProductProvider/ProductProvider";
import WomenPage from "./pages/WomenPage/WomenPage";
import MenPage from "./pages/MenPage/MenPage";
import KidsPage from "./pages/KidsPage/KidsPage";
import FavoriteProvider from "./Providers/FavoriteProvider/FavoriteProvider";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
          <FavoriteProvider>
            <ToastContainer />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/favorite" element={<FavoritePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/checkout" element={<CheckOutPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/women" element={<WomenPage />} />
              <Route path="/men" element={<MenPage />} />
              <Route path="/kids" element={<KidsPage />} />
            </Routes>
          </FavoriteProvider>
        </ProductProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
