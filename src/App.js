
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from './components/auth/login';
import Register from './components/auth/register';
import Esign from './components/main/esign';
import Cert from "./components/cert/cert";
import "./css/auth.css"
import "./css/cert.css"
import "./css/footer.css"
import "./css/header.css"
import "./css/main.css"
import CertList from "./components/main/table";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/esign" element={<Esign />}></Route>
      <Route path="/cert/:targetHash" element={<Cert />}></Route>
      <Route path="/list" element={<CertList />}></Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
