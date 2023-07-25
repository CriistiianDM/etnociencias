import React from "react";
import { decodeToken } from "react-jwt";
import Cookies from 'js-cookie';
import { _0x2970A } from "../../server/Logic"

//import Header from '../Home/Header';
import Header from "../Home/Header";
import Proyectos from "../Home/Proyectos";

const have_permision = ({
    data,
    dataToken
}) => {

    const result = (data)?.filter( (item) => {
        return item['correo_electrónico'] === dataToken['email']
    })

    return {
        "result": result.length > 0 ? true : false,
        "data": result 
    }

}

const listProyectsAll = ({
    dataProyect
}) => {
   
    const uniqueProyectos = dataProyect.reduce((accumulator: any , current: any) => {
    // Verificar si el proyecto actual ya está en el objeto auxiliar
    const exists = accumulator.find((item) => item.id_proyecto === current.id_proyecto);

    // Si el proyecto actual no está en el objeto auxiliar, agregarlo
    if (!exists) {
            accumulator.push(current);
    }

    return accumulator;

    }, []);

    return uniqueProyectos;
}

const filterSelect = ({
    dataProyect,
    filter,
    value
}) => {
    const filterProyects = dataProyect.filter((proyecto) => proyecto[filter] === value);
    return filterProyects;
}

const HomeLogin = ({
    data,
    setIsLogin
}) => {

    const [dataAcees_ , setDataAcess] = React.useState([]);
    const [ dataProyect , setDataProyect] = React.useState([]);
    const [dataMaestros , setDataMaestros] = React.useState([]);
    const [dataAlumnos , setDataAlumnos] = React.useState([]);
    const [dataToken , setDataToken] = React.useState({});
    const [proyect__ , setProyect__] = React.useState(undefined);
    const [dataUser , setDataUser] = React.useState([{
        permiso: 1
    }]);
   

    const getDataFecth = async () => {
    
        const data_access =  await _0x2970A('Capacitadores')
        const data_proyect =  await _0x2970A('Proyectos')
        const data_maestros =  await _0x2970A('Maestros')
        const data_alumnos =  await _0x2970A('Niñas')

        localStorage.setItem('data_proyect' , JSON.stringify(data_proyect.data));
        setDataAcess(data_access.data);
        setDataProyect(data_proyect.data);
        setDataMaestros(data_maestros.data);
        setDataAlumnos(data_alumnos.data);
    }

    React.useEffect(() => {

        if (dataAcees_) {
            if (dataToken && dataAcees_.length > 0) {
                
                const data_ = have_permision({ data: dataAcees_, 
                                            dataToken: dataToken});

                if (data_.result) {
                    setDataUser(data_.data);
                    if (data_.data[0].permiso === "2") {
                      setProyect__(listProyectsAll({ dataProyect: dataProyect}))
                    }
                    else {
                        setProyect__(filterSelect(
                            {
                                dataProyect: dataProyect,
                                filter: 'capacitador',
                                value: data_.data[0].nombre
                            }
                        ))
                    }
                }

            }
        }

    }, [dataAcees_])

    React.useEffect( () => {
       
        getDataFecth();

        if(data) {
            const token: any = decodeToken(data);
            Cookies.set('token', data, { expires: 5 });
            setDataToken(token)
        }

    },[])

    return (
        <>
           <Header 
               data_={data} 
               setIsLogin={setIsLogin}  />
            <div style={{
                height: '7em'
            }} />
           <Proyectos 
                proyectos_data={proyect__} 
                type={Number(((dataUser)[0])?.permiso)}
                dataMaestros={dataMaestros}
                dataAlumnos={dataAlumnos} 
            />
        </>
    )
}


export default HomeLogin;