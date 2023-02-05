import {BrowserRouter as Router , Routes , Route  } from "react-router-dom"
import Home from "./Pages/Home"
import Furniture from "./Pages/Furniture"
import Seating from "./Pages/Furnitures/Seating"
import Chairs from "./Pages/Furnitures/Chairs"
import Beds from "./Pages/Furnitures/Beds"
import Tables from "./Pages/Furnitures/Tables.jsx"
import Dinings from "./Pages/Furnitures/Dinings"
import Single from "./Pages/Single"
import Storage from "./Pages/Storage"
import Wardrobes from "./Pages/Storages/Wardrobes"
import ShoeRacks from "./Pages/Storages/ShoeRacks"
import BookShelves from "./Pages/Storages/BookShelves"
import Drawers from "./Pages/Storages/Drawers"
import BestDeals from "./Pages/BestDeals"
import ScrollToTop from "./Components/ScrollToTop"
import { ToastContainer} from 'react-toastify';
import Cart from "./Pages/Cart"
import Wishlist from "./Pages/Wishlist"
import Profile from "./Pages/Profile"
import 'react-toastify/dist/ReactToastify.css';
import Address from "./Pages/Address"

function App() {
  return (
    <Router>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<ScrollToTop><Home/></ScrollToTop>}/>
        <Route path="/Furniture" element={<ScrollToTop><Furniture/></ScrollToTop>}/>
        <Route path ="/Furniture/Seating" element={<ScrollToTop><Seating/></ScrollToTop>} />
        <Route path ="/Furniture/Chairs" element={<ScrollToTop><Chairs/></ScrollToTop>} />
        <Route path ="/Furniture/Beds" element={<ScrollToTop><Beds/></ScrollToTop>} />
        <Route path ="/Furniture/Tables" element={<ScrollToTop><Tables/></ScrollToTop>} />
        <Route path ="/Furniture/Dining" element={<ScrollToTop><Dinings/></ScrollToTop>} />
        <Route path ="/:item/detail" element={<ScrollToTop><Single/></ScrollToTop>} />
        <Route path ="/Storage" element={<ScrollToTop><Storage/></ScrollToTop>} />
        <Route path ="/Storage/Wardrobes" element={<ScrollToTop><Wardrobes/></ScrollToTop>} />
        <Route path ="/Storage/ShoeRacks" element={<ScrollToTop><ShoeRacks/></ScrollToTop>} />
        <Route path ="/Storage/BookShelves" element={<ScrollToTop><BookShelves/></ScrollToTop>} />
        <Route path ="/Storage/Drawers" element={<ScrollToTop><Drawers/></ScrollToTop>} />
        <Route path ="/BestDeals" element={<ScrollToTop><BestDeals/></ScrollToTop>} />
        <Route path ="/Cart" element={<ScrollToTop><Cart/></ScrollToTop>} />
        <Route path ="/Wishlist" element={<ScrollToTop><Wishlist/></ScrollToTop>} />
        <Route path ="/Profile" element={<ScrollToTop><Profile/></ScrollToTop>} />
        <Route path="/Address" element={<ScrollToTop><Address/></ScrollToTop>}/>
      </Routes>
    </Router>
  );
}
export default App;