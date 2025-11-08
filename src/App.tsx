import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./Components/Navigation.tsx";
import HomePage from "./Components/HomePage.tsx";
import AdminPanel from "./Components/AdminPanel.tsx";

function App() {
    return (
        <BrowserRouter>
            <div className="bg-white">
                <Navigation />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/admin" element={<AdminPanel />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;