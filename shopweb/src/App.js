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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
