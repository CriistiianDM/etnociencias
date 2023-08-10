import React from 'react'
import { Typography } from '@mui/material';
import Filter from './Filter';
import Modal from './Modal';

const listProyectsAll = ({
    dataProyect,
    filter
}) => {
   
    const uniqueProyectos = dataProyect.reduce((accumulator , current) => {
    // Verificar si el proyecto actual ya está en el objeto auxiliar
    const exists = accumulator.find((item) => item[filter] === current[filter]);

    // Si el proyecto actual no está en el objeto auxiliar, agregarlo
    if (!exists) {
        accumulator.push(current);
    }

    return accumulator;

    }, []);

    return uniqueProyectos;
}

//Estoy cansado y tengo que sacarlo para mañana!!!!
//Que alguien me lance un salvavidas
const filterSelect = ({
    dataProyect,
    filter,
    value,
    type,
    otherSelect,
    otherValue
}) => {

    let filterProyects = [];
    if (type === 1) {
        filterProyects = dataProyect.filter((proyecto) => proyecto[filter] === value);
    }
    else {
        filterProyects = dataProyect.filter((proyecto) => {
            return proyecto[filter] === value && proyecto[otherSelect] === otherValue
        });
       
    }

    return filterProyects;

}

const abrasitoDeValennnn = ({
    dataFiltrada,
    dataMaestros,
    dataAlumnos
}) => {

    let dataMaestro_ = [];
    let dataAlumno_ = [];

    dataFiltrada.map((proyecto) => {

        //sacar los maestros y alumnos de cada proyecto
        const dataMaestro = dataMaestros.filter((maestro) => maestro['proyecto'] === proyecto['id_proyecto']);
        const dataAlumno = dataAlumnos.filter((alumno) => alumno['proyecto'] === proyecto['id_proyecto']);
        
        //concatenar las listas de maestros y alumnos
        dataMaestro_ = dataMaestro_?.concat(dataMaestro);
        dataAlumno_ = dataAlumno_?.concat(dataAlumno);
    });

 
    //sacar los maestros lideres y acompañantes de forma unica
    return {
        maestroLider: listProyectsAll({
            dataProyect:dataMaestro_.filter((maestro) => maestro['tipo'] === 'LIDER'),
            filter: 'identificación'
        }),
        maestroAc: listProyectsAll({
            dataProyect:dataMaestro_.filter((maestro) => maestro['tipo'] !== 'LIDER'),
            filter: 'identificación'
        }),
        ninas: listProyectsAll({
            dataProyect: dataAlumno_,
            filter: 'identificación'
        }),
    }

}

const allCountTotal = ({
    __newProyects,
    dataMaestros,
    dataAlumnos,
    setDataTotal
}) => {

    const total_ = abrasitoDeValennnn({
        dataFiltrada: __newProyects,
        dataMaestros: dataMaestros,
        dataAlumnos: dataAlumnos
    });

    setDataTotal({
        ninas: total_.ninas.length,
        lideresP: total_.maestroLider.length,
        acomP: total_.maestroAc.length,
        proyectos: __newProyects.length
    });
}

const Proyectos = ({
    proyectos_data,
    type,
    dataMaestros,
    dataAlumnos,
    dataVisitas,
    dataSegimiento
}) => {

    const [isSearch , setIsSearch] = React.useState(true);
    const [ typeSearch , setTypeSearch ] = React.useState(1);
    const [municipios, setMunicipios] = React.useState([]);
    const [ activeModal , setActiveModal ] = React.useState(false);
    const [ dataModal , setDataModal ] = React.useState({})
    const [capacitadores, setCapacitadores] = React.useState([]);
    const [data, setData] = React.useState({
        proyectos: []
    });

    const [ dataTotal , setDataTotal ] = React.useState({
        ninas: 0,
        lideresP: 0,
        acomP: 0,
        proyectos: 0
    });

    const onChangeSelect = (e,filter) => {
        const value = e.target.value;
        let type_ = 1

        const data = {
            capacitador: 'municipio',
            municipio: 'capacitador'
        }

        const select_other = document.getElementById(`select_${data[filter]}`);
        const select_other_ = select_other.value;

        if (select_other_ !== 'todos') {
            type_ = 2;
            setIsSearch(false);
        }

        if (value !== 'todos') {

            const __newProyects = filterSelect({
                dataProyect: proyectos_data,
                filter: filter,
                value: value,
                type: type_,
                otherSelect: data[filter],
                otherValue: select_other_
            });

            allCountTotal({
                __newProyects: __newProyects,
                dataMaestros: dataMaestros,
                dataAlumnos: dataAlumnos,
                setDataTotal: setDataTotal
            });

            setData({
                proyectos: __newProyects
            });
        }
        else {

            
            //poner el otro select en todos
            select_other.value = 'todos';

            allCountTotal({
                __newProyects: proyectos_data,
                dataMaestros: dataMaestros,
                dataAlumnos: dataAlumnos,
                setDataTotal: setDataTotal
            });
           
            setData({
                proyectos: proyectos_data
            });
        }

    }

    const onClickModal = (data) => {
        setActiveModal(true);
        setDataModal(data)
    }

    React.useEffect(() => {

        if (proyectos_data?.length > 0) {

            allCountTotal({
                __newProyects: proyectos_data,
                dataMaestros: dataMaestros,
                dataAlumnos: dataAlumnos,
                setDataTotal: setDataTotal
            });

            setData({
                proyectos: proyectos_data
            });

            setMunicipios(listProyectsAll({
                dataProyect: (proyectos_data.map((proyecto) => ({ municipio: proyecto['municipio']  }))),
                filter: 'municipio'
            }));

            setCapacitadores(listProyectsAll({
                dataProyect: proyectos_data.map((proyecto) => ({ capacitador: proyecto['capacitador'] })),
                filter: 'capacitador'
            }));

        }
        else if (proyectos_data !== undefined) {
            setIsSearch(false);
        }

    }, [proyectos_data]);

    React.useEffect(() => {
        if (type !== undefined) {
            setTypeSearch(type);
        }
    }, [type]);

    return (
     <>
       <Filter
            capacitadores={capacitadores}
            municipios={municipios}
            onChangeSelect={onChangeSelect}
            typeSearch={typeSearch}
            dataTotal={dataTotal}
            dataProyect={data}
            isSearch={proyectos_data}
         />
       <main className='_container_proyectos'>
          <section className='_conatiner_proyectos_ol'>
            { (data.proyectos.length > 0) ?
               
                data.proyectos.map((proyecto, index) => (
                        <a onClick={() => {onClickModal(proyecto)}} className='_conatianer_a' key={index}>
                            <div className='_container_event'>
                                <p>{proyecto?.id_proyecto} -</p>
                                <p>{proyecto?.municipio} -</p>
                                <p>{proyecto?.nombre_del_proyecto} -</p>
                                <p>{proyecto['nombre_de_la_institución_educativa']}</p>
                            </div>
                        </a>
                ))              
               :
               isSearch? 
               <Typography className='_loading_p' variant='h1'>
                     Cargando Proyectos
               </Typography> 
               :
                <Typography className='_loading_p' variant='h1'>
                        No Tienes Proyectos Asignados
                </Typography>
            }
          </section>
       </main>
       {
              activeModal && 
              <Modal 
                  setActiveModal={setActiveModal}
                  data_proyect={dataModal}
                  dataMaestros={dataMaestros}
                  dataAlumnos={dataAlumnos}
                  dataVisitas={dataVisitas}
                  dataSeguimiento={dataSegimiento}
              />
       }
     </>
    )

}


export default Proyectos;