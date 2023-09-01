import "./App.css";
import AddUser from "./Pages/AddUser/AddUser.jsx";
import Home from "./Pages/Home/Home.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position="top-center" theme="dark" autoClose={2000} />
        <Routes>
          <Route excat path="/" Component={Home} />
          <Route path="/adduser" Component={AddUser} />
          <Route path="/edituser/:id" Component={AddUser} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
