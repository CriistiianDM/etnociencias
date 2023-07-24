import React from "react";
import { decodeToken } from "react-jwt";
import Cookies from 'js-cookie';
import { Typography } from "@mui/material";

const Header = ({
    data_,
    setIsLogin
}) => {

    const [data , setData] = React.useState({
        name: '',
        email: '',
        picture: ''
    });

    const onCloseSession = () => {
        Cookies.remove('token');
        setIsLogin(false);
    }

    React.useEffect(() => {

        if(data_) {
            
                const tokenDecode = decodeToken(data_) as any;
                setData(tokenDecode);
                console.log(tokenDecode , 'data444');

        }

    }, [data_])

    React.useEffect(() => {

        const token = Cookies.get('token');

        if(token) {
            const tokenDecode = decodeToken(token) as any;
            setData(tokenDecode);
            console.log(tokenDecode , 'data');
        }
        
    } ,[])
    
    return (
        <>
            <header className="_container_header">
                <section className='_logo_etonociencias'>
                    <div className='_container_img'>
                            <img src='/assets/sources/logo-para-inicio.webp' alt='google' />
                    </div>
                </section>
                <section className='info_profile'>
                    <div className='_container_name'>
                        <Typography 
                                className='title-header' 
                                variant="h1" 
                               >
                                {data?.name}
                        </Typography>
                    </div>
                    <a onClick={onCloseSession} className="_close_sesion">
                        <div className='_container_img_profile'>
                                <img src={data?.picture} alt='profile' />
                        </div>
                    </a>
                </section>
            </header>
        </>
    )
}


export default Header;