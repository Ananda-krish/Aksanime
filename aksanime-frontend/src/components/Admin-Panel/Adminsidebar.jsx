import "./Adminsidebar.css";
import { Link } from "react-router-dom";

function Adminsidebar() {
  return (
    <div className="adminsidebar-main">
      <ul>
        <li><Link to="admin-user">User</Link></li>
        <li><Link to="orderlist">orders</Link></li>
        <li><Link to="animecard/list">Animecard</Link></li>
        <li><Link to="animeepisode/list">Episode</Link></li>
        <li><Link to="admin/category">category</Link></li>
        <li><Link to="list/productcategory">productcategory</Link></li>
        <li><Link to="list/product">Product</Link></li>
        <li><Link to="admin-profile">Profile</Link></li>
        
      </ul>
    </div>
  );
}

export default Adminsidebar;
