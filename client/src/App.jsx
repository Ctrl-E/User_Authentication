import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginSignup from "./components/LoginSignup/LoginSignup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<LoginSignup />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
