import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainManoGrp } from "./pages/MainManoGrp.jsx";
import { Liltots } from "./pages/Liltots.jsx";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainManoGrp />} />
      <Route path="/liltot" element={<Liltots />} />
    </Routes>

  </BrowserRouter>
);

export default App;
