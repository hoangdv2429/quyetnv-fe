
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from './components/auth/login';
import Register from './components/auth/register';
import Esign from './components/main/esign';
import Cert from "./components/cert/cert";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/esign" element={<Esign />}></Route>
      <Route path={`/cert/:targetHash`} element={<Cert />} exact/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
