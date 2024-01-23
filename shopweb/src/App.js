import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Allshops } from './Component/Allshops';
import { Home } from './Component/Home';
import { AddShops } from './Component/AddShops';
import { Navbar } from './Component/Navbar';
import { Login } from './Component/Login';
import { Register } from './Component/Register';
import { MyShops } from './Component/MyShops';
import { Singleshop } from './Component/Singleshop';
import { Paymentpage } from './Component/Paymentpage';
import { Order } from './Component/Order';
import { Admin } from './Component/Admin';
import { Adallshops } from './Admincomponent/Adallshops';
import { Adaddshops } from './Admincomponent/Adaddshops';
import { Adallorders } from './Admincomponent/Adallorders';

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="allshops" element={<Allshops />} />
        <Route path="paymentpage" element={<Paymentpage />} />
        <Route path="/allshops/:id" element={<Singleshop />} />
        <Route path="myshops" element={<MyShops />} />
        <Route path="/order" element={<Order />} />
        <Route path="addshops" element={<AddShops />} />
        <Route path="admin9049" element={<Admin />} />
        <Route path="admin9049/adaddshops" element={<Adaddshops />} />
        <Route path="admin9049/adallshops" element={<Adallshops />} />
        <Route path="admin9049/adallorders" element={<Adallorders />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
