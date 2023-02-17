import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./all-routes";
import "./App.css";
import LmsContent from "./components/owner/lms/contents/temp";
import BasicSelect from "./components/owner/lms/series/temp";

function App() {


  return (
    <div>

      <BrowserRouter>
        <AllRoutes />
      </BrowserRouter>
      {/* <LmsContent/>
      <BasicSelect/> */}
    </div>
  );
}

export default App;
