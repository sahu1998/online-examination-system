import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./all-routes";
import "./App.css";
import Category from "./components/owner/lms/categories/temp";
import Content from "./components/owner/lms/contents/temp";

function App() {


  return (
    <div>

      <BrowserRouter>
        <AllRoutes />
      </BrowserRouter>
      {/* <Category /> */}
      {/* <Content /> */}
    </div>
  );
}

export default App;
