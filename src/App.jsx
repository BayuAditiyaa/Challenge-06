import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Login from "./component/Login";
import Register from "./component/Register";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import Store from "./Redux/Store";
import Home from "./Pages/Home";
import Detail from "./Pages/Detail";

function App() {
  return (
    <Provider store={Store}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/Detail/:id" element={<Detail />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </Provider>
  );
}

export default App;
