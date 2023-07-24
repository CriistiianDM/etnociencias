//import libs
import React  from 'react';
import { Button , Typography } from '@mui/material';
import GoogleLogin from '../google/GoogleLogin';

//respuesta de google
const responseGoogle = (response) => {
    console.log(response);
}


//component
const Home = ({
    isLogin,
    setIsLogin,
    setData
}) => {

    
    return (
        <>
            <GoogleLogin 
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                setData={setData}
            />
            <main className='_container_main_home'>
                <section className='_logo_etonociencias'>
                    <div className='_container_img'>
                            <img src='/assets/sources/logo-para-inicio.webp' alt='google' />
                    </div>
                </section>
                <section>
                    <div>
                         <Typography 
                                className='title-home' 
                                variant="h1" 
                                component="div" 
                                gutterBottom>
                                Etnociencias
                                <p className='subtitle-home'>
                                    Inicia sesion con tu cuenta de google
                                </p>
                         </Typography>
                    </div>
                </section>
                <section className='_display_none' id="section-button-google">
                    <Button id="buttonDiv">
                        Iniciar con google
                    </Button>
                </section>
            </main>
        </>
    )
}

export default Home;