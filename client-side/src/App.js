import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./all-routes";
import "./App.css";
import LmsCategory from "./components/owner/lms/categories/temp";


function App() {
  return (
    <div>

      {/* <BrowserRouter>
        <AllRoutes />
      </BrowserRouter> */}
      <LmsCategory />
      {/* <Content /> */}
    </div>
  );
}

export default App;
