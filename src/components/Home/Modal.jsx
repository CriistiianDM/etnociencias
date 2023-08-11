import React from "react";
import { Typography } from "@mui/material";
import Table from "./Table";
import Dropdown from "./Droopdown";

import { filter_, 
        verificateArray, 
        setDataState,
        setDataWithFilter,
        verificateObject
} from "../../utils/_";

//Modal Informacion All
const Modal = ({
    setActiveModal,
    data_proyect,
    dataMaestros,
    dataAlumnos,
    dataVisitas,
    dataSeguimiento,
}) => {

    const [data_, setData_] = React.useState({
        "id_proyecto": "aaa",
        "no. de proyectos": "",
        "municipio": "",
        "nombre_de_la_institución_educativa": "",
        "sede": "",
        "nit": "",
        "nombre del rector de la institución": "",
        "nombre del coordinador de sede": "",
        "teléfono de la institución": "",
        "correo electrónico institucional": "",
        "nombre del grupo": "",
        "nombre_del_proyecto": "",
        "capacitador": ""
    });
    const [dataMaestros_, setDataMaestros_] = React.useState([]);
    const [dataAlumnos_, setDataAlumnos_] = React.useState([]);
    const [dataVisitas_, setDataVisitas_] = React.useState([]);
    const [dataSeguimiento_, setDataSeguimiento_] = React.useState([]);

    const onClickCloseModal = () => {
        setActiveModal(false);
    }

    React.useEffect(()=> {

        if(verificateObject(data_proyect)) {
            setData_(data_proyect)
        }

    },[data_proyect])


    React.useEffect( ()=> {
     
        const array_ = [{
            sourceArray: dataVisitas,
            setDataFunc: setDataVisitas_,
        },
        {
            sourceArray: dataSeguimiento,
            setDataFunc: setDataSeguimiento_,
        },
        {
            sourceArray: dataMaestros,
            setDataFunc: setDataMaestros_,
        },
        {
            sourceArray: dataAlumnos,
            setDataFunc: setDataAlumnos_,
        }]

        array_.map((item) => {
            setDataWithFilter({
                sourceArray: item.sourceArray,
                filterField: 'proyecto',
                targetArray: data_proyect,
                targetFilterField: 'id_proyecto',
                setDataFunc: item.setDataFunc
            })
        })

    },[dataVisitas, dataSeguimiento, dataMaestros, dataAlumnos])

    return (
        <>
            <main className="_modal_content">
                <a onClick={onClickCloseModal} className="_close_modal"/>
                <section className="_container_modal_data">
                    <a onClick={onClickCloseModal} className="_close_modal_x">x</a>
                    <div className="_container_info_proyecto">
                        <div>
                            <Typography variant="h1">
                                <span>id proyecto:</span>
                                {data_['id_proyecto']}
                            </Typography>
                            <Typography variant="h1">
                                <span>nombre proyecto:</span>
                                {data_['nombre_del_proyecto']}
                            </Typography>
                            <Typography variant="h1">
                                <span>institución:</span>
                                {data_['nombre_de_la_institución_educativa']}
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="h1">
                                <span>capacitador:</span>
                                {data_['capacitador']}
                            </Typography>
                            <Typography variant="h1">
                                <span>sede:</span>
                                {data_['sede']}
                            </Typography>
                            <Typography variant="h1">
                                <span>municipio:</span>
                                {data_['municipio']}
                            </Typography>
                        </div>
                    </div>
                    <div>
                        <Dropdown title={"Visitas"} callback={ (e) => { e(dataVisitas_)} }/>
                    </div>
                    <div>
                        <Dropdown title={"Seguimiento"} callback={ (e) => {e(dataSeguimiento_)} } />
                    </div>
                    <div className="_container_list_table">
                        <Table 
                            data_header={["maestro", "identificación", "Correo electrónico del maestro", "tipo"]}
                            data_cell={["maestro", "identificación", "correo electrónico del maestro", "tipo"]}
                            data_={dataMaestros_}
                        />
                    </div>
                    <div className="_container_list_table">
                        <Table 
                            data_header={["nombres", "apellidos", "Identificación", "Edad", "Grado", "correo electronico"]}
                            data_cell={["nombres", "apellidos", "identificación", "edad", "grado", "correo electronico"]}
                            data_={dataAlumnos_}
                        />
                    </div>
                </section>
            </main>
        </>
    )

}

export default Modal;