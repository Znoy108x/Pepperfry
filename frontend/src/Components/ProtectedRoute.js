import React , {useContext} from "react";
import { Route, Navigate } from "react-router-dom";
import EcomContext from "../Context/EcomContext";

export default  async function ProtectedRoute  ({children }) {
    const {CHECK_IS_LOGGED_IN} = useContext(EcomContext)
    const loggedin = await CHECK_IS_LOGGED_IN()
    console.log(loggedin )
    if(loggedin){
        return children
    }
    return <Navigate to="/"/>
};