import './App.css'
import Header from "@/components/layout/Header.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Home} from "./components/pages/Home.jsx";
import {Login} from "@/components/pages/Login.jsx";
import {Register} from "@/components/pages/Register.jsx";
import {Footer} from "@/components/layout/Footer.jsx";
import {Dashboard} from "@/components/pages/Dashboard.jsx";
import {DashboardInfoPage} from "@/components/pages/dashboard/DashboardInfoPage.jsx";
import {DashboardAdmin} from "@/components/pages/dashboard/DashboardAdmin.jsx";
import {CreateQuiz} from "@/components/pages/quiz/CreateQuiz.jsx";

function App() {
  return (
    <>
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="create" element={<CreateQuiz />} />
                <Route path="dashboard" element={<Dashboard />} >
                    <Route index element={<DashboardInfoPage />} />
                    <Route path="admin" element={<DashboardAdmin/>} />
                </Route>
            </Routes>
            <Footer/>
        </BrowserRouter>
    </>
  )
}

export default App
