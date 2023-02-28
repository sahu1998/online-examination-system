import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./all-routes";
import "./App.css";
import LmsCategory from "./components/owner/lms/categories/temp";
import Recaptcha from "./components/owner/master-settings/google-recaptcha/temp";




function App() {
  return (
    <div>

      <BrowserRouter>
        <AllRoutes />
      </BrowserRouter>
      {/* <LmsCategory /> */}
      {/* <Content /> */}
      {/* <Recaptcha /> */}
    </div>
  );
}

export default App;
