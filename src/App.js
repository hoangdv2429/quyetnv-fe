
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from './components/auth/login';
import Register from './components/auth/register';
import Esign from './components/main/esign';
<<<<<<< HEAD
import Cert from './components/main/cert';
=======
import Cert from "./components/cert/cert";
>>>>>>> 78367bbc07dc6de7500690a5605eb8eb939a2dc4

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/esign" element={<Esign />}></Route>
<<<<<<< HEAD
      <Route path="/cert" element={<Cert />}></Route>
=======
      <Route path={`/cert/:targetHash`} element={<Cert />} exact/>
>>>>>>> 78367bbc07dc6de7500690a5605eb8eb939a2dc4
    </Routes>
  </BrowserRouter>
  );
}

export default App;
