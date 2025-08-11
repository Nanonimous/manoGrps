import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainManoGrp } from "./pages/MainManoGrp.jsx";
import { Liltots } from "./pages/Liltots.jsx";
import { Wowla } from "./pages/Wowla.jsx";
import { ManoStore } from "./pages/ManoStore.jsx";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainManoGrp />} />
      <Route path="/liltot" element={<Liltots />} />
      <Route path="/wowla" element={<Wowla />} />
      <Route path="/manostore" element={<ManoStore />} />
    </Routes>

  </BrowserRouter>
);

export default App;
