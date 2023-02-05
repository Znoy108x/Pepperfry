import {BrowserRouter as Router , Routes , Route   , Navigate} from "react-router-dom"
import {useEffect , useState , useContext} from "react"
import Home from "./pages/Home"
import AllProducts from "./pages/AllProducts"
import AddProduct from "./pages/AddProduct"
import AllCategories from "./pages/AllCategories"
import AddCategory from "./pages/AddCategory"
import Login from "./pages/Login"
import Register from "./pages/Register"
import AddItems from "./pages/AddItems"
import AllItems from "./pages/AllItems"
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';
import Order from "./pages/Orders"
import PrivateRoute from "./components/PrivateRoute"


function App() {
  return (
    <Router>
      <ToastContainer/>
      <Routes>
        <Route exact path="/login" element={<PrivateRoute fromAuth={true}><Login/> </PrivateRoute>}/>
        <Route exact path="/" element={<PrivateRoute><Home/></PrivateRoute>}/>
        <Route exact path="/register" element={<PrivateRoute><Register/></PrivateRoute>}/>
        <Route exact path="/all-products"  element={<PrivateRoute><AllProducts/></PrivateRoute>}/>
        <Route exact path="/add-product" element={<PrivateRoute><AddProduct/></PrivateRoute>}/>
        <Route exact path="/all-categories" element={<PrivateRoute><AllCategories/></PrivateRoute>}/>
        <Route exact path="/add-categories" element={<PrivateRoute><AddCategory/></PrivateRoute>}/>
        <Route exact path="/add-items" element={<PrivateRoute><AddItems/></PrivateRoute>}/>
        <Route exact path="/all-items" element={<PrivateRoute><AllItems/></PrivateRoute>}/>
        <Route exact path="/all-orders" element={<PrivateRoute><Order/></PrivateRoute>}/>
      </Routes>
    </Router>
  );
}
export default App;