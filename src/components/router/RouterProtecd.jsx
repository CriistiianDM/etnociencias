import React from 'react'
import { 
    BrowserRouter as Router, 
    Routes, 
    Route 
} from "react-router-dom";

//import Components
import HomeLogin from "./HomeLogin";


const RouterProtecd = ({
    data,
    setIsLogin
}) => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomeLogin data={data} setIsLogin={setIsLogin} />} />
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

export default RouterProtecd;