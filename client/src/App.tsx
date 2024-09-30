import { HashRouter, Route, Routes } from "react-router-dom";

import Search from "./Components/Search";
import Shabad from "./Components/Shabad";
import { ShabadContextProvider } from "./Context/ShabadContext";

function App() {
  return (
    <>
      <ShabadContextProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/Shabad" element={<Shabad />} />
          </Routes>
        </HashRouter>
      </ShabadContextProvider>
    </>
  );
}

export default App;
