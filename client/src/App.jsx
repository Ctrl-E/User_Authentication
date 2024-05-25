import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Home from "./pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
