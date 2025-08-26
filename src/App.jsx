import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShopNameProvider from "./components/ShopNameProvider/ShopNameProvider.jsx";
import { MainManoGrp } from "./pages/MainManoGrp.jsx";
import { Liltots } from "./pages/Liltots.jsx";
import { Wowla } from "./pages/Wowla.jsx";
import { ManoStore } from "./pages/ManoStore.jsx";
import { Authentication } from "./pages/Authentication.jsx";
import { Payments } from "./pages/Payments.jsx";
import PaymentTest from "./components/PaymentTest/PaymentTest.jsx"
import { MainProduct } from "./pages/MainProduct.jsx";

const App = () => (
  <BrowserRouter>
    <ShopNameProvider>
      <Routes>
        <Route path="/" element={<MainManoGrp />} />
        <Route path="/liltots" element={<Liltots />} />
        <Route path="/liltots/products/:link" element={<Liltots />} />
        <Route path="/wowla" element={<Wowla />} />
        <Route path="/wowla/products/:link" element={<Wowla />} />
        <Route path="/manostore" element={<ManoStore />} />
        <Route path="/manostore/products/:link" element={< ManoStore />} />
        <Route path="/authentication" element={<Authentication />} />
        <Route path="/payment" element={<Payments />} />
        <Route path="/test" element={<PaymentTest/>}></Route>
        <Route path="/:shopname/products/:Cat" element={<MainProduct/>} />
      </Routes>
    </ShopNameProvider>
  </BrowserRouter>
);

export default App;
