//import Libs
import React from "react";
import Cookies from 'js-cookie';

//import Components
import RouterProtecd from "./components/router/RouterProtecd";
import RouterStandar from "./components/router/RouterStandar";


export default function RenderApp() {
    
    const [isLogin, setIsLogin] = React.useState(false);
    const [data, setData] = React.useState(null);

    React.useEffect(() => {

        const _data = Cookies.get('token');

        if(_data){
            setIsLogin(true);
            setData(_data);
        }

    }, []);

    return (
        <>
            {
                isLogin ?
                <RouterProtecd 
                    isLogin={isLogin}
                    setIsLogin={setIsLogin}
                    data={data}
                /> : 
                <RouterStandar 
                    isLogin={isLogin}
                    setIsLogin={setIsLogin}
                    setData={setData}
                />
            }      
        </>
    );
}
