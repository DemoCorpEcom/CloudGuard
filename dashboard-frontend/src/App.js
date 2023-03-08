import Appbar from "./components/Appbar/Appbar";
import Sidebar from "./components/topbar/topbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScanStatus from "./components/scanStatus/scanStatus";
import Results from "./components/results/results";

function App() {
  return (
    <BrowserRouter>
      <div className="h-full">
        <Appbar />
        <div className="h-full w-full">
          <Sidebar />
          <Routes>
            <Route exact path="/" element={<ScanStatus />}></Route>
            <Route exact path="/results" element={<Results />}></Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter >
  );
}

export default App;
