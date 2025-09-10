import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShopNameProvider from "./components/ShopNameProvider/ShopNameProvider.jsx";
import { MainManoGrp } from "./pages/MainManoGrp.jsx";
import { Liltots } from "./pages/Liltots.jsx";
import { Wowla } from "./pages/Wowla.jsx";
import { ManoStore } from "./pages/ManoStore.jsx";
import { Authentication } from "./pages/Authentication.jsx";
import { Payments } from "./pages/Payments.jsx";
import PaymentTest from "./components/PaymentTest/PaymentTest.jsx";
import { MainProduct } from "./pages/MainProduct.jsx";
import { Profile } from "./pages/Profile.jsx";

// ⬇️ import UserProvider
import { UserProvider } from "./context/UserContext.jsx";

const App = () => (
  <BrowserRouter>
    <UserProvider>
      <ShopNameProvider>
        <Routes>
          <Route path="/" element={<MainManoGrp />} />
          <Route path="/liltots" element={<Liltots />} />
          <Route path="/liltots/products/:link" element={<Liltots />} />
          <Route path="/Wowla-store" element={<Wowla />} />
          <Route path="/Wowla-store/products/:link" element={<Wowla />} />
          <Route path="/Mano-store" element={<ManoStore />} />
          <Route path="/Mano-store/products/:link" element={<ManoStore />} />
          <Route path="/authentication" element={<Authentication />} />
          <Route path="/payment" element={<Payments />} />
          <Route path="/test" element={<PaymentTest />} />
          <Route path="/:shopname/products/:Cat" element={<MainProduct />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </ShopNameProvider>
    </UserProvider>
  </BrowserRouter>
);

export default App;
