
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from './components/auth/login';
import Register from './components/auth/register';
import Esign from './components/main/esign';
import Cert from "./components/main/cert";
import CertList from "./components/main/table";
import CheckList from "./components/main/checkedTabled";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/esign" element={<Esign />}></Route>
      <Route path="/cert" element={<Cert />}></Route>
      <Route path="/list" element={<CertList />}></Route>
      <Route path="/checkList" element={<CheckList />}></Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
