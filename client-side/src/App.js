import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./all-routes";
import "./App.css";
import Category from "./components/owner/lms/categories/temp";
import Content from "./components/owner/lms/contents/temp";
import UsersTable from "./components/owner/users/temp";
import LmsContent from "./components/owner/lms/contents/temp";


function App() {
  return (
    <div>
      <BrowserRouter>
        <AllRoutes />
      </BrowserRouter>
       {/* <LmsContent/>
         <UsersTable /> */}
    </div>
  );
}

export default App;
