import LoginForm from "./components/LoginForm";
import Dashbord from "./components/Dashbord";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    // <div>
    //   <LoginForm />
    //   {/* <Dashbord /> */}
    // </div>
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/dashbord" element={<Dashbord />} />
      </Routes>
    </Router>
  );
}

export default App;
