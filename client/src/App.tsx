import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Modal from "./components/Modal";
import Onboarding_Form_Main from "./components/Onboarding_Main";
import Offboarding_main from "./components/Offboarding_main";
import Offboarding_form from "./components/Offboarding_form";
import Onboarding_form from "./components/Onboarding_Form";
import { LoginForm } from "./components/LoginForm";

function App() {
  return (
    <>
      <div className="main-header">
        <Navbar />
        <Routes>
          <Route path="/webdev" element={<Modal />} />
          <Route path="/" element={<Home />} />
          <Route path="/onboarding" element={<Onboarding_Form_Main />} />
          <Route path="/offboarding" element={<Offboarding_main />} />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/onboarding/user/:userId"
            element={<Onboarding_form />}
          />
          <Route
            path="/offboarding/user/:userId"
            element={<Offboarding_form />}
          />
          <Route path="/component" element={<Onboarding_form />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
