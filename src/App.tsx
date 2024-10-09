import './App.css'
import Header from "./components/Header/Header.tsx";
import Footer from "./components/Footer/Footer.tsx";
import {Route, Routes} from "react-router-dom";
import Pictures from "./components/Pictures/Pictures.tsx";
import Login from "./components/Login/Login.tsx";

function App() {

  return (
    <>
        <Header />
        <main>
            <Routes>
                <Route path={'/'} element={<Pictures />} />
                <Route path={'login'} element={<Login />} />
            </Routes>
        </main>
        <Footer />
    </>
  );
}

export default App;
