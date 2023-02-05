import React , {useContext} from "react";
import { Route, Navigate } from "react-router-dom";
import PanelContext from "../context/PanelContext";

export default function PrivateRoute ({children , fromAuth}) {
    const {CHECK_IS_LOGGED_IN} = useContext(PanelContext)
    const loggedin = CHECK_IS_LOGGED_IN()
    console.log(loggedin)
    if(fromAuth && !loggedin){
            return children
    }else if(fromAuth && loggedin){
        return <Navigate to="/"/>
    }
    else if(!loggedin){
        return <Navigate to="/login"/>
    }
    return children
};
