import Footer from "../Footer/Footer"
import Navbar from "../Navbar/Navbar"


const DefaultLayout = ({children ,handleLogout}) =>{
    return(
        <div className="default-layout">
            <Navbar handleLogout={handleLogout}/>
            <div className="layout-content">
                {children}
            </div>
            <Footer/>
        </div>
    )
}
export default DefaultLayout;