import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Nav";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import CompareCars from "./pages/CompareCars";
import Cars from "./pages/Cars";
import Wishlist from "./pages/Wishlist";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import CarDetails from "./pages/CarDetails";
import CompareBar from "./components/CompareBar.jsx";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/cars" element={<Cars />} />

        <Route path="/compare/:car1/:car2" element={<CompareCars />} />

        <Route path="/wishlist" element={<Wishlist />} />

        <Route path="/cars/:id" element={<CarDetails />} />
      </Routes>

      {/* IMPORTANT */}
      <CompareBar />

      <Footer />
    </>
  );
}

<Footer />;

export default App;
