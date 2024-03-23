import { Route, Routes } from "react-router-dom";
import { Home, Login } from "./pages";
import Navbar from "./components/Navbar/Navbar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAuthMe } from "./redux/slices/auth";
import Register from "./pages/Register/Register";
import CardPage from "./pages/CardPage/CardPage";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/card" element={<CardPage />} />
      </Routes>
    </>
  );
}

export default App;
