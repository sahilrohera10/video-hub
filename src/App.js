import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CurrentImg from "./Components/CurrentImg/CurrentImg";
import CardsPage from "./Pages/CardsPage/CardsPage";

import Main from "./Pages/Main";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />}>
            <Route index element={<CurrentImg />}></Route>
            <Route path=":id/:name" element={<CardsPage />}></Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
