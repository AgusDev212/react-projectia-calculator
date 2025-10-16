import "./App.css";
import Calculator from "./componets/Calculator";
import ListaPlatos from "./componets/ListaPlatos";
import Cobrar from "./componets/Cobrar";
import { ProductosProvider } from "./context/ProductosContext";
import { TotalProvider } from "./context/TotalContext";
import { CantidadesProvider } from "./context/CantidadesContext";
import Navbar from "./componets/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <ProductosProvider>
      <TotalProvider>
        <CantidadesProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Calculator />} />
              <Route path="/lista" element={<ListaPlatos />} />
              <Route path="/cobrar" element={<Cobrar />} />
              <Route path="*" element={<Calculator />} />
            </Routes>
          </BrowserRouter>
        </CantidadesProvider>
      </TotalProvider>
    </ProductosProvider>
  );
}

export default App;
