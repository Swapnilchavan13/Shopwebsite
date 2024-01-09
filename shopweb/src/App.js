import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Allshops, Products } from './Component/Allshops';
import { Home } from './Component/Home';
import { AddShops } from './Component/AddShops';
import { Navbar } from './Component/Navbar';
import { Login } from './Component/Login';
import { Register } from './Component/Register';
import { MyShops } from './Component/MyShops';
import { ShopProducts } from './Component/ShopProducts';
import { AddShop } from './Component/AddShop';

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="allshops" element={<Allshops />} />
        <Route path="myshops" element={<MyShops />} />
        <Route path="addshops" element={<AddShops />} />
        <Route path="addshop" element={<AddShop />} />

        <Route path="shopproducts" element={<ShopProducts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
