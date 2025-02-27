import { Link } from "react-router-dom"
import "./Easylist.css"
function EasyLinkst (){
 return(
<div className="easylist-container">
<div className="easylist">
    <ul>
    <li><Link to='/'>HOME</Link></li>
    <li><Link to='/lips'>LIPS</Link></li>
    <li><Link to='/eyes'>EYES</Link></li>
    <li><Link to='/face'>FACE</Link></li>
    <li><Link to='/nails'>NAILS</Link></li>
    <li><Link to='/skincare'>SKINCARE</Link></li>
    <li><Link to='/accessories'>ACCESSORIES</Link></li>
    <li><Link to='/gifting'>GIFTING </Link></li>
    <li><Link to='*'>BESTSELLERS</Link></li>
    <li><Link to='/newlaunch'>NEW LAUNCHES</Link></li>
    <li><Link to='*'>OFFERS</Link></li>
    <li><Link to='*'>BLOG</Link></li>
    <li><Link to='*'>SUGAR POP</Link></li>

    </ul>
</div>
</div>
 )
}
export default EasyLinkst