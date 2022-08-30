import "./App.css";
import { CartProvider } from "./Context";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Cart from "./Components/Cart";
import Checkout from "./Components/Checkout";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Placeorder from "./Components/Placeorder";
function App() {
  return (
    <div className="App">
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/cart' element={<Cart />}/>
          <Route path="/checkout" element={<Checkout /> } />
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/placeorder" element={<Placeorder />}/>
        </Routes>
      </CartProvider>
    </div>
  );
} 

export default App;
