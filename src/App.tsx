import './App.css'
import Header from "./components/Header/Header.tsx";
import Footer from "./components/Footer/Footer.tsx";
import {Route, Routes} from "react-router-dom";
import Pictures from "./components/Pictures/Pictures.tsx";
import Login from "./components/Login/Login.tsx";
import Register from "./components/Register/Register.tsx";
import AddPicture from "./components/AddPicture/AddPicture.tsx";

function App() {

  return (
    <>
        <Header />
        <main>
            <Routes>
                <Route path="/" element={<Pictures />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="add-picture" element={<AddPicture />} />
            </Routes>
        </main>
        <Footer />
    </>
  );
}

export default App;
