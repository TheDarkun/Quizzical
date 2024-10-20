import './App.css'
import Header from "@/components/layout/Header.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Home} from "./components/pages/Home.jsx";
import {Motivation} from "./components/pages/Motivation.jsx";
import {Table} from "./components/pages/Table.jsx";
import {Login} from "@/components/pages/Login.jsx";
import {Register} from "@/components/pages/Register.jsx";
import {Footer} from "@/components/layout/Footer.jsx";

function App() {
  return (
    <>
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route index element={<Home />} />
                <Route path="motivation" element={<Motivation />} />
                <Route path="table" element={<Table />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Routes>
            <Footer/>
        </BrowserRouter>
    </>
  )
}

export default App
