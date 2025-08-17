import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext.jsx";
import { MainManoGrp } from "./pages/MainManoGrp.jsx";
import { Liltots } from "./pages/Liltots.jsx";
import { Wowla } from "./pages/Wowla.jsx";
import { ManoStore } from "./pages/ManoStore.jsx";
import { Authentication } from "./pages/Authentication.jsx";
import Payment from "./components/payment/Payment.jsx"
const App = () => (
  <BrowserRouter>
    <CartProvider>
      <Routes>
        <Route path="/" element={<MainManoGrp />} />
        <Route path="/liltots" element={<Liltots />} />
        <Route path="/liltots/:link" element={<Liltots />} />
        <Route path="/wowla" element={<Wowla />} />
        <Route path="/wowla/:link" element={<Wowla />} />
        <Route path="/manostore" element={<ManoStore />} />
        <Route path="/manostore/:link" element={< ManoStore />} />
        <Route path="/authentication" element={<Authentication />} />
        <Route path="/payment" element={<Payment />} />

      </Routes>
    </CartProvider>
  </BrowserRouter>
);

export default App;
