import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./all-routes";
import "./App.css";
import Category from "./components/owner/lms/categories/temp";
import Content from "./components/owner/lms/contents/temp";
import UsersTable from "./components/owner/users/temp";

function App() {
  return (
    <div>
      {/* <BrowserRouter>
        <AllRoutes />
      </BrowserRouter> */}
      {/* <Category /> */}
      {/* <Content /> */}
      <UsersTable />
    </div>
  );
}

export default App;
