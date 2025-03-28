import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Cart from './pages/Cart/Cart';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ProductDetailDisplay from './pages/productdetaildisplay/ProductDetailDisplay';
import PaymentPage from './pages/PaymentPage/PaymentPage';
import Adminuser from './components/Admin-Panel/Adminuser';
import Adminprofile from './components/Admin-Panel/Adminprofile';
import Login from './components/Login/Login';
import Register from './components/Login/Regiter';
import PublicRoute from './components/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';
import CreateCategory from './components/Admin-Panel/admincategory/CreateCategory';
import AdminCategory from './components/Admin-Panel/admincategory/AdminCategory';
import EditCategory from './components/Admin-Panel/admincategory/EditCategory';
import CreateAnimecard from './components/Admin-Panel/AdminAnimeCard/CreateAnimecard';
import AnimecardList from './components/Admin-Panel/AdminAnimeCard/animecardList';
import EditAnimecard from './components/Admin-Panel/AdminAnimeCard/EditAnimecard';
import CreateAnimeEpisode from './components/Admin-Panel/AdminAnimeCard/CreateAnimeEpisode';
import AnimeEpisodeList from './components/Admin-Panel/AdminAnimeCard/AnimeEpisodeList';
import EditAnimeEpisode from './components/Admin-Panel/AdminAnimeCard/EditAnimeEpisode';
import ProductCategoryCreate from './components/Admin-Panel/ProductCategory/ProductCategoryCreate';
import ProductCategoryList from './components/Admin-Panel/ProductCategory/ProductCategoryList';
import ProductCategoryEdit from './components/Admin-Panel/ProductCategory/ProductCategoryEdit';
import ProductCreate from './components/Admin-Panel/Product/ProductCreate';
import ProductList from './components/Admin-Panel/Product/ProductList';
import ProductEdit from './components/Admin-Panel/Product/ProductEdit';
import UserEpisode from './components/Userpage/UserEpisode';
import UserProduct from './components/Userpage/UserProduct';
import ProductCart from './components/Userpage/ProductCart';
import OrderList from './pages/Admin/OrderList';
import UserOrder from './components/Userpage/UserOrder';
import StripePaymentForm from './components/Userpage/StripePaymentForm';
import VerifyEmail from './components/Login/VerifyEmail';

import Called from './components/Userpage/Called';
import UserOrderPage from './components/Userpage/UserOrder';
import EditUser from './components/Admin-Panel/EditUser';
import AksanimeContact from './components/Userpage/AksanimeContact';
import AboutUs from './components/Userpage/AboutUs';



const App = () => {
  return (
    <BrowserRouter>
    
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />
         <Route path="/email/verify/:id/:hash" element={
          <PublicRoute>
            <VerifyEmail />
          </PublicRoute>
        } />

        {/* User Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute allowedRoles={["user", "admin"]}>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/product/:id" element={
          <ProtectedRoute allowedRoles={["user", "admin"]}>
            <ProductDetailDisplay />
          </ProtectedRoute>
        } />
       
        <Route path="/payment" element={
          <ProtectedRoute allowedRoles={["user", "admin"]}>
            <PaymentPage />
          </ProtectedRoute>
        } />
        <Route path="/cart" element={
          <ProtectedRoute allowedRoles={["user", "admin"]}>
            <Cart />
          </ProtectedRoute>
        } />
        
        <Route path="/UserEpisode/:animeId" element={
          <ProtectedRoute allowedRoles={["user", "admin"]}>
            <UserEpisode/>
          </ProtectedRoute>
        } />
         <Route path="/UserProduct/:animeId" element={
          <ProtectedRoute allowedRoles={["user", "admin"]}>
            <UserProduct/>
          </ProtectedRoute>
        } />
         <Route path="/Productcart" element={
          <ProtectedRoute allowedRoles={["user", "admin"]}>
            <ProductCart/>
          </ProtectedRoute>
        } />
         <Route path="/userorder" element={
          <ProtectedRoute allowedRoles={["user", "admin"]}>
            <UserOrderPage/>
          </ProtectedRoute>
          
        } />
          <Route path="/AksanimeContact" element={
          <ProtectedRoute allowedRoles={["user", "admin"]}>
            <AksanimeContact />
          </ProtectedRoute>
          
        } />
        <Route path="/Aboutus" element={
          <ProtectedRoute allowedRoles={["user", "admin"]}>
            <AboutUs />
          </ProtectedRoute>
          
        } />
          <Route path="/stripe/:total" element={
          <ProtectedRoute allowedRoles={["user", "admin"]}>
            <StripePaymentForm/>
          </ProtectedRoute>
        } />

        {/* Admin Protected Routes */}
        <Route path="/admin-dashboard" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }>
          <Route index element={<Adminprofile />} />
          <Route path="admin-profile" element={<Adminprofile />} />
          <Route path="admin-user" element={<Adminuser />} />
          <Route path="adminuser-edit/:id" element={<EditUser />} />
          
          {/* Category Routes */}
          <Route path="create/category" element={<CreateCategory />} />
          <Route path="admin/category" element={<AdminCategory />} />
          <Route path="edit/category/:id" element={<EditCategory />} />
          
          {/* Animecard Routes */}
          <Route path="create/animecard" element={<CreateAnimecard />} />
          <Route path="animecard/list" element={<AnimecardList />} />
          <Route path="editanimecard/:id" element={<EditAnimecard />} />

          <Route path="create/animeepisode" element={<CreateAnimeEpisode />} />
          <Route path="animeepisode/list" element={<AnimeEpisodeList />} />
          <Route path="editanimeepisode/:id" element={<EditAnimeEpisode />} />

          <Route path="create/productcategory" element={<ProductCategoryCreate />} />
          <Route path="list/productcategory" element={<ProductCategoryList />} />
          <Route path="edit/productcategory/:id" element={<ProductCategoryEdit />} />

          <Route path="create/product" element={<ProductCreate />} />
          <Route path="list/product" element={<ProductList />} />
          <Route path="edit/product/:id" element={<ProductEdit />} />

          <Route path="orderlist" element={<OrderList />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
     
    </BrowserRouter>
  );
};

export default App;
