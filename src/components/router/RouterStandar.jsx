import React from 'react'
import { 
    BrowserRouter as Router, 
    Routes, 
    Route 
} from "react-router-dom";

//import Components
import Home from "./Home";


const RouterStandar = ({ 
    isLogin,
    setIsLogin,
    setData
 }) => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home
                    isLogin={isLogin}
                    setIsLogin={setIsLogin} 
                    setData={setData}
                />} />
                <Route
                    path="*"
                    element={
                        <>
                            <h1>No Found Route</h1>
                        </>
                    }
                />
            </Routes>
        </Router>
    )
}

export default RouterStandar;