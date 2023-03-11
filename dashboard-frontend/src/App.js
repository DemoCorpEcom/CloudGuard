import Appbar from "./components/Appbar/Appbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScanStatus from "./components/scanStatus/scanStatus";
import Results from "./components/results/results";

function App() {
  return (
    <BrowserRouter>
      <div className="sticky top-0 w-full">
        <Appbar />
      </div>
      <div className="w-full">
        <Routes>
          <Route exact path="/" element={<ScanStatus />}></Route>
          <Route exact path="/results" element={<Results />}></Route>
        </Routes>
      </div>
    </BrowserRouter >
  );
}

export default App;
