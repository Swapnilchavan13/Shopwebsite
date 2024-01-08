import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Allshops, Products } from './Component/Allshops';
import { Home } from './Component/Home';
import { AddShops } from './Component/AddShops';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="allshops" element={<Allshops />} />
        <Route path="addshops" element={<AddShops />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
