import { Route, Routes } from "react-router-dom";
import { Home, Login } from "./pages";
import Navbar from "./components/Navbar/Navbar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAuthMe } from "./redux/slices/auth";

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
      </Routes>
    </>
  );
}

export default App;
