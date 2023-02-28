import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./all-routes";
import "./App.css";
import Category from "./components/owner/lms/categories/temp";
import Content from "./components/owner/lms/contents/temp";
// import UsersTable from "./components/owner/users/temp";
import LmsContent from "./components/owner/lms/contents/temp";
import SiteSetting from "./components/owner/master-settings/site-settings/site-settings";
import Categories from "./components/student/lms/categories/categories";


function App() {
  return (
    <div>
      <BrowserRouter>
        <AllRoutes />
      </BrowserRouter>
     {/* <LmsContent/> */}
           {/* <UsersTable /> */}
         {/* <SiteSetting/> */}
         {/* <Categories/> */}
    </div>
  );
}

export default App;
