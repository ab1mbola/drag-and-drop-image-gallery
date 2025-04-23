import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/home/Home";
import Signup from "./components/Signup/Signup";
import useAxios from "./hooks/useAxios";
import { createContext, useState } from "react";

export const ImageContext = createContext();

function App() {
  const [searchImage, setSearchImage] = useState("");
  const { response, isLoading, error, fetchData } = useAxios(
    "search/photos?page=1&query=art&client_id=vpN6aaOmzhay294brMX_8TgxPbij2lFMSv_0xfx8Wyc"
  );
  console.log(response);

  const value = {
    response,
    isLoading,
    error,
    fetchData,
    searchImage,
    setSearchImage,
  };

  return (
    <ImageContext.Provider value={value}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </ImageContext.Provider>
  );
}

export default App;
