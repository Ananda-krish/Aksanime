import Adminsidebar from '../../components/Admin-Panel/Adminsidebar'
import DefaultLayout from  '../../components/DefaultLayout/DefaultLayout'
import { Outlet } from "react-router-dom";
import './AdminDashboard.css'
import Navbar from '../../components/Navbar/Navbar';

function AdminDashboard() {
  return (
   <div>
         {/* <Navbar showEasyList={false} /> */}
       <div className="admindashboard">
        <div className="admin-sidebar">
          <Adminsidebar />
        </div>
        <div className="admin-body">
          {/* Outlet renders the nested routes' content */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
